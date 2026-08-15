# opening-event

Upload photos/videos from tonight's opening to S3 and publish the JSON manifest
the `/opening-event` page reads.

Bucket `ambrose-patterson` (ap-southeast-2) is fully public-read (bucket policy
grants `s3:GetObject` on `*` to everyone — no signed URLs needed).

## Usage

```
cd scripts/opening-event
mise run sync <local-folder>     # upload everything in the folder + publish manifest.json
```

Or the two steps separately:

```
mise run upload <local-folder>   # just upload (jpg/jpeg/png photos, mp4/mov videos)
mise run manifest                # rebuild manifest.json from what's currently in the bucket, publish it
```

Equivalent plain-shell form (no mise): `./sync.sh sync <local-folder>`.

## What it does

- Photos (jpg/jpeg/png/**heic**/heif, any case — iPhone HEIC is converted
  automatically since most browsers can't render it) are each written as **two**
  JPEGs:
  - `s3://ambrose-patterson/opening-event/photos/<id>.jpg` — capped at 2400px
    long edge, for the lightbox/slideshow.
  - `s3://ambrose-patterson/opening-event/thumbs/<id>.jpg` — capped at 640px
    long edge, for the photo-wall grid tiles.
  - Neither ever upscales — a source image already smaller than the cap is just
    converted to JPEG unchanged. Override the caps with `FULL_MAX_DIM`/`THUMB_MAX_DIM`.
- Videos go to `s3://ambrose-patterson/opening-event/videos/<filename>` **as-is**
  (not resized/recompressed), plus an auto-generated first-frame poster at
  `.../videos/<name>-poster.jpg` (via ffmpeg) used as its grid thumbnail.
- `manifest.json` is rebuilt from an S3 listing (not from your local folder), so
  it's always in sync with whatever the bucket actually has, and running it twice
  is harmless.
- Object keys are cached `public, max-age=31536000, immutable` — if you need to
  replace a file, upload it under a new filename rather than overwriting, or the
  CDN/browser cache will keep serving the old bytes. `manifest.json` itself is
  `no-cache` so the page always sees the latest listing.

## Manifest format

```json
{
  "event": "Ambrose Patterson Exhibition Opening",
  "updatedAt": "2026-08-15T01:20:01Z",
  "items": [
    {
      "id": "IMG_0123",
      "type": "image",
      "src": "https://ambrose-patterson.s3.ap-southeast-2.amazonaws.com/opening-event/photos/IMG_0123.jpg",
      "thumb": "https://.../opening-event/thumbs/IMG_0123.jpg"
    },
    {
      "id": "MOV_0456",
      "type": "video",
      "src": "https://.../opening-event/videos/MOV_0456.mp4",
      "poster": "https://.../opening-event/videos/MOV_0456-poster.jpg"
    }
  ]
}
```

`id` is the filename without its extension, and `items` are sorted by S3 key
(i.e. by filename) — so name your files so that sort order is the order you
want them to appear in (e.g. keep your camera's chronological filenames).

## Requirements

- AWS CLI, authenticated as a profile with access to the bucket. Defaults to
  `AWS_PROFILE=saramic-family-oracle`; override with `AWS_PROFILE=... mise run sync ...`
  if needed.
- `ffmpeg` (video poster generation) and `jq` (manifest JSON building) — both via
  Homebrew (`brew install ffmpeg jq`).

## Env overrides

`BUCKET`, `REGION`, `PREFIX`, `PUBLIC_BASE_URL`, `AWS_PROFILE` — set any of these
before calling `sync.sh`/`mise run ...` to point at a different bucket/prefix/CDN.
