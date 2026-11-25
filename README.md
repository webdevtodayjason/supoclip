# Pressloom Clips

AI video clipping for Pressloom and its clients: give it a long video (a podcast, a talk, a
stream VOD) and it finds the strongest moments, scores them, and renders vertical 9:16 clips
with face-centered cropping, word-synced subtitles, hook titles and optional B-roll.

## Based on SupoClip

Pressloom Clips is a modified version of [SupoClip](https://github.com/FujiwaraChoki/supoclip),
© the SupoClip contributors, and is licensed under the
[GNU Affero General Public License v3](LICENSE) (AGPL-3.0), like the SupoClip release it is built
on (commit `d2378a9`, 18 November 2026, the last release published under AGPL-3.0). It is not
affiliated with or endorsed by SupoClip or Shiori LLC, and it does not use the SupoClip name or
logo as its own brand.

- **Source code:** everyone who uses an install of Pressloom Clips over a network can get its
  complete source from the "Source" link in the app (AGPL-3.0 §13). Set `NEXT_PUBLIC_SOURCE_URL`
  to the exact code you deploy.
- **Changes:** files changed by Pressloom carry a "Modified by Pressloom" notice with the date.
- **Clean room:** this fork does not include any SupoClip code released after 18 November 2026
  under the SupoClip Noncommercial Source License. Features added later upstream are rebuilt
  here from their public descriptions only. Do not merge or cherry-pick from upstream `main`.

## Features

- **YouTube, Twitch, Kick & uploads** — paste a YouTube video, a Twitch VOD or clip, or a Kick VOD or clip, or upload your own file (live streams are not supported). Twitch and Kick download providers and the optional Apify fallbacks are set in [docs/configuration.md](docs/configuration.md#twitch-and-kick-imports)

- **AI clip selection** — an LLM (Gemini, GPT, Claude, or a local Ollama model) picks the 3–7 most clip-worthy segments from the transcript
- **Virality scoring** — every clip gets hook, engagement, value, and shareability scores
- **Smart vertical cropping** — face detection keeps the speaker centered in the 9:16 frame
- **Word-synced subtitles** — AssemblyAI word-level timestamps, custom fonts, caption templates with animation styles
- **Hook titles** — an AI-written headline burned into the top of each clip's opening seconds
- **B-roll & transitions** — optional Pexels stock footage overlays and transition effects
- **Built-in editor** — trim, split, and merge clips, then export with platform presets (TikTok, Reels, Shorts)
- **Direct publishing** — connect your own YouTube, TikTok and Instagram accounts, then post or schedule clips from the task page
- **Performance loop** — views, likes, comments and shares flow back from each platform and steer future clip selection toward what works for your audience
- **Real-time progress** — live pipeline updates streamed to the browser while your video processes

## Quick Start

You need Docker, an [AssemblyAI](https://www.assemblyai.com/) API key for transcription, and one LLM provider key (Google, OpenAI, Anthropic, or a local Ollama).

```bash
git clone https://github.com/FujiwaraChoki/supoclip.git
cd supoclip
```

Create a `.env` in the root with your keys:

```env
ASSEMBLY_AI_API_KEY=your_assemblyai_api_key
LLM=google-gla:gemini-3-flash-preview
GOOGLE_API_KEY=your_google_api_key
```

Then start everything:

```bash
docker-compose up -d
```

First startup takes a few minutes; watch it with `docker-compose logs -f`. Once healthy, open [http://localhost:3107](http://localhost:3107), create an account, and start clipping. The backend API lives at [http://localhost:8000](http://localhost:8000) with interactive docs at `/docs`.

The template sets `FRONTEND_PORT=3107`. Existing deployments without this setting keep port `3001`; preserve that port if your production reverse proxy uses it. See the [setup guide](docs/setup.md) for custom ports and public URLs.

To run fully local with Whisper and Ollama (including the Docker networking Ollama needs), see [docs/configuration.md](docs/configuration.md). To use a different LLM provider or configure the optional pieces (B-roll, analytics, emails, YouTube metadata), see the [configuration guide](docs/configuration.md). If something misbehaves, the [troubleshooting guide](docs/troubleshooting.md) covers the common failure modes.

## Documentation

Everything beyond this page lives in [`docs/`](docs/README.md):

| Guide | What it covers |
|---|---|
| [Setup](docs/setup.md) | Docker-first install, local development, first-run checklist |
| [Configuration](docs/configuration.md) | Every environment variable, operating modes, provider options |
| [App Guide](docs/app-guide.md) | Screens, workflows, admin features, hosted vs self-host |
| [Architecture](docs/architecture.md) | How the frontend, API, worker, queue, and pipeline fit together |
| [API Reference](docs/api-reference.md) | Backend endpoints, API keys, admin and billing routes |
| [Development](docs/development.md) | Running locally without Docker, testing, contributing workflow |
| [Troubleshooting](docs/troubleshooting.md) | Fixes for the common ways things go wrong |

## Development & Testing

The stack runs locally without Docker too — see [development](docs/development.md) for the backend (`uv` + FastAPI + ARQ worker) and frontend (Next.js + pnpm) commands. The test suite spans pytest, Vitest, and Playwright, all reachable from the repo root:

```bash
make test
```

## License

Pressloom Clips is released under the [AGPL-3.0 License](LICENSE). It is a modified version of
[SupoClip](https://github.com/FujiwaraChoki/supoclip) (see "Based on SupoClip" above).
Contributions are accepted under AGPL-3.0; see [CONTRIBUTING.md](CONTRIBUTING.md).
