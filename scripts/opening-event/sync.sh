#!/usr/bin/env bash
# Upload opening-event photos/videos to S3 and regenerate manifest.json.
#
# Usage:
#   ./sync.sh upload <local-dir>   # upload files, generate thumbs + posters
#   ./sync.sh manifest             # rebuild + upload manifest.json from bucket listing
#   ./sync.sh sync <local-dir>     # upload then manifest, in one go
#
# Photos (jpg/jpeg/png/heic/heif — any case) are converted to JPEG and written
# as three copies: a small "thumb" for the photo-wall grid, a resolution-capped
# "full" for the lightbox/slideshow, and a full-quality "original" (same pixel
# dimensions as the source, just normalized to JPEG) for the download button.
# Thumb/full never upscale a smaller original.
#
# Env overrides: BUCKET, REGION, PREFIX, PUBLIC_BASE_URL, AWS_PROFILE,
#                FULL_MAX_DIM, THUMB_MAX_DIM
set -euo pipefail

export AWS_PROFILE="${AWS_PROFILE:-saramic-family-oracle}"
BUCKET="${BUCKET:-ambrose-patterson}"
REGION="${REGION:-ap-southeast-2}"
PREFIX="${PREFIX:-opening-event}"
BASE_URL="${PUBLIC_BASE_URL:-https://$BUCKET.s3.$REGION.amazonaws.com}"
FULL_MAX_DIM="${FULL_MAX_DIM:-2400}"   # lightbox/slideshow size cap (long edge, px)
THUMB_MAX_DIM="${THUMB_MAX_DIM:-640}"  # photo-wall grid size cap (long edge, px)

# Resize (never upscale) + convert to JPEG in one step.
resize_to_fit() {
  local src="$1" out="$2" max="$3"
  local w h biggest
  w=$(sips -g pixelWidth "$src" | tail -1 | awk '{print $2}')
  h=$(sips -g pixelHeight "$src" | tail -1 | awk '{print $2}')
  biggest=$(( w > h ? w : h ))
  if [ "$biggest" -gt "$max" ]; then
    sips -s format jpeg -Z "$max" "$src" --out "$out" >/dev/null
  else
    sips -s format jpeg "$src" --out "$out" >/dev/null
  fi
}

cmd_upload() {
  local dir="$1"
  if [ ! -d "$dir" ]; then
    echo "Not a directory: $dir" >&2
    exit 1
  fi

  shopt -s nullglob nocaseglob

  for f in "$dir"/*.jpg "$dir"/*.jpeg "$dir"/*.png "$dir"/*.heic "$dir"/*.heif; do
    local name base full thumb original
    name=$(basename "$f")
    base="${name%.*}"
    echo "photo: $name -> ${base}.jpg (full + thumb + original)"

    full=$(mktemp -t "${base}-full").jpg
    thumb=$(mktemp -t "${base}-thumb").jpg
    original=$(mktemp -t "${base}-original").jpg
    resize_to_fit "$f" "$full" "$FULL_MAX_DIM"
    resize_to_fit "$f" "$thumb" "$THUMB_MAX_DIM"
    sips -s format jpeg "$f" --out "$original" >/dev/null

    aws s3 cp "$full" "s3://$BUCKET/$PREFIX/photos/${base}.jpg" \
      --region "$REGION" \
      --cache-control "public, max-age=31536000, immutable"
    aws s3 cp "$thumb" "s3://$BUCKET/$PREFIX/thumbs/${base}.jpg" \
      --region "$REGION" \
      --cache-control "public, max-age=31536000, immutable"
    # Content-Disposition here (not on photos/thumbs) so this copy always
    # downloads-to-disk instead of opening inline when linked from the page.
    aws s3 cp "$original" "s3://$BUCKET/$PREFIX/originals/${base}.jpg" \
      --region "$REGION" \
      --cache-control "public, max-age=31536000, immutable" \
      --content-disposition "attachment; filename=\"${base}.jpg\""
    rm -f "$full" "$thumb" "$original"
  done

  for f in "$dir"/*.mp4 "$dir"/*.mov; do
    local name base poster
    name=$(basename "$f")
    base="${name%.*}"
    echo "video: $name"
    aws s3 cp "$f" "s3://$BUCKET/$PREFIX/videos/$name" \
      --region "$REGION" \
      --cache-control "public, max-age=31536000, immutable"

    poster=$(mktemp -t "${base}-poster").jpg
    ffmpeg -y -ss 00:00:00.5 -i "$f" -frames:v 1 -vf "format=yuvj420p" -q:v 3 "$poster" -loglevel error
    aws s3 cp "$poster" "s3://$BUCKET/$PREFIX/videos/${base}-poster.jpg" \
      --region "$REGION" \
      --cache-control "public, max-age=31536000, immutable"
    rm -f "$poster"
  done

  shopt -u nullglob nocaseglob
  echo "Upload done. Run '$0 manifest' to publish the updated listing."
}

cmd_manifest() {
  local tmp; tmp=$(mktemp -d)

  aws s3api list-objects-v2 \
    --bucket "$BUCKET" --prefix "$PREFIX/photos/" --region "$REGION" \
    --query "Contents[].Key" --output json > "$tmp/photos.json"

  aws s3api list-objects-v2 \
    --bucket "$BUCKET" --prefix "$PREFIX/thumbs/" --region "$REGION" \
    --query "Contents[].Key" --output json > "$tmp/thumbs.json"

  aws s3api list-objects-v2 \
    --bucket "$BUCKET" --prefix "$PREFIX/originals/" --region "$REGION" \
    --query "Contents[].Key" --output json > "$tmp/originals.json"

  aws s3api list-objects-v2 \
    --bucket "$BUCKET" --prefix "$PREFIX/videos/" --region "$REGION" \
    --query "Contents[].Key" --output json > "$tmp/videos.json"

  jq -n \
    --slurpfile photoKeys "$tmp/photos.json" \
    --slurpfile thumbKeys "$tmp/thumbs.json" \
    --slurpfile originalKeys "$tmp/originals.json" \
    --slurpfile videoKeys "$tmp/videos.json" \
    --arg baseUrl "$BASE_URL" \
    --arg date "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    '
    def idOf: split("/")[-1] | sub("\\.[^.]+$"; "");
    def byId(keys): (keys // []) | map(select(. != null)) | map({(idOf): .}) | add // {};
    def photoItems:
      ($photoKeys[0] // []) | map(select(. != null)) as $photos
      | byId($thumbKeys[0]) as $thumbById
      | byId($originalKeys[0]) as $originalById
      | $photos
      | sort
      | map(
          . as $key
          | idOf as $id
          | {
              id: $id,
              type: "image",
              src: ($baseUrl + "/" + $key),
              thumb: (if $thumbById[$id] then ($baseUrl + "/" + $thumbById[$id]) else ($baseUrl + "/" + $key) end),
              original: (if $originalById[$id] then ($baseUrl + "/" + $originalById[$id]) else ($baseUrl + "/" + $key) end)
            }
        );
    def videoItems:
      ($videoKeys[0] // [])
      | map(select(. != null and (endswith("-poster.jpg") | not)))
      | sort
      | map({
          id: idOf,
          type: "video",
          src: ($baseUrl + "/" + .),
          poster: ($baseUrl + "/" + (. | sub("\\.[^.]+$"; "-poster.jpg"))),
          original: ($baseUrl + "/" + .)
        });
    { event: "Ambrose Patterson Exhibition Opening", updatedAt: $date, items: (photoItems + videoItems) }
    ' > "$tmp/manifest.json"

  cat "$tmp/manifest.json"

  aws s3 cp "$tmp/manifest.json" "s3://$BUCKET/$PREFIX/manifest.json" \
    --region "$REGION" \
    --content-type "application/json" \
    --cache-control "no-cache"

  rm -rf "$tmp"
  echo "manifest.json updated: $BASE_URL/$PREFIX/manifest.json"
}

case "${1:-}" in
  upload)
    cmd_upload "${2:?usage: $0 upload <local-dir>}"
    ;;
  manifest)
    cmd_manifest
    ;;
  sync)
    cmd_upload "${2:?usage: $0 sync <local-dir>}"
    cmd_manifest
    ;;
  *)
    echo "usage: $0 {upload <local-dir> | manifest | sync <local-dir>}" >&2
    exit 1
    ;;
esac
