# ai-video-analysis

Send a local MP4 to Gemini AI to get back a timestamped chapter outline plus a
curated list of clippable highlight moments (see `PROMPT_EXCERPT_REVIEW.md` for
the exact output shape).

## Setup

```sh
cd scripts/ai-video-analysis
npm install
cp .env.example .env   # fill in GEMINI_API_KEY
```

## Usage

Gemini uploads top out around 100MB — compress first for anything larger
(this also speeds up processing and cuts token usage):

```sh
mise run compress input.mp4          # full video, 720p/1fps/low-bitrate
mise run compress-short input.mp4    # first 60s only, for a quick test
```

Then run the analysis:

```sh
npm run analyse -- input-ai.mp4
```

Results print to stdout and are saved to `output/<video-name>-review.json`.

To use a different prompt (e.g. the fuller talk-review style from
`gemini-talk-review`), pass it as a second argument:

```sh
npm run analyse -- input-ai.mp4 SOME_OTHER_PROMPT.md
```
