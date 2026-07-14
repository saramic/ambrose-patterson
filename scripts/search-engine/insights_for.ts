#!/usr/bin/env node

/**
 * Researches a topic across the web using Gemini + Google Search grounding,
 * and writes out a categorized directory of resources: background reading,
 * galleries/museums, image sources, influences/related artists, etc.
 *
 * Usage: node insights_for.ts "<topic>"
 *
 * API key comes from GEMINI_API_KEY in the environment or in a local .env file.
 */

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODEL = process.env.GEMINI_MODEL || "gemini-pro-latest";

interface Entry {
  title: string;
  url: string;
  summary: string;
  has_images: boolean;
  image_note?: string;
}

interface Category {
  key: string;
  label: string;
  entries: Entry[];
}

interface InsightsResult {
  topic: string;
  overview: string;
  categories: Category[];
}

interface GroundingSource {
  title?: string;
  uri?: string;
}

function buildPrompt(topic: string): string {
  return `You are a research assistant building a resource directory on a specific topic, using Google Search to find real, current, live web pages.

TOPIC: "${topic}"

Search broadly and pull together a directory of the best resources for someone who wants to go deep on this topic. Cover these categories (skip a category only if you genuinely find nothing relevant):

- biography_background: biographical / background / historical overview pages
- galleries_museums: museums, galleries, or institutions where related works or subject matter can be seen in person, and their collection/exhibition pages
- image_sources: pages with a meaningful number of photos/images relevant to the topic (e.g. artwork images, archival photos)
- influences_related: related people, movements, or topics that connect to this one, and pages that explain the connection
- further_reading: books, monographs, academic papers, essays
- news_press: recent articles, news, interviews, events

RULES:
- Only include a URL if it came back from an actual search result you retrieved. Never invent or guess a URL.
- Prefer authoritative, specific pages (a museum's collection page, not its homepage) over generic ones.
- Each entry's summary must be 1-3 sentences describing specifically what is at that URL and why it's useful for this topic.
- Set has_images true only if the page itself displays multiple relevant images (not just an icon/logo).
- Return ONLY a JSON object, no markdown fences, no commentary, matching exactly this shape:

{
  "topic": "string",
  "overview": "2-3 sentence synthesis of what's out there on this topic",
  "categories": [
    {
      "key": "biography_background | galleries_museums | image_sources | influences_related | further_reading | news_press",
      "label": "Human-readable category name",
      "entries": [
        {
          "title": "page title",
          "url": "https://...",
          "summary": "1-3 sentences",
          "has_images": true,
          "image_note": "optional: what kind of images, e.g. 'high-res photos of 6 paintings from his Paris period'"
        }
      ]
    }
  ]
}`;
}

function parseResult(rawResponse: string): InsightsResult | null {
  try {
    return JSON.parse(rawResponse);
  } catch {
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        // fall through
      }
    }
    return null;
  }
}

function slugify(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const REDIRECT_HOST = "vertexaisearch.cloud.google.com/grounding-api-redirect";
const redirectCache = new Map<string, string>();

// Gemini's Google Search grounding sometimes surfaces its internal redirect
// link instead of the page's real URL. The redirect does work, but it's ugly
// and opaque — resolve it to the actual destination so the directory is
// readable and stable.
async function resolveRedirect(url: string): Promise<string> {
  if (!url.includes(REDIRECT_HOST)) return url;
  if (redirectCache.has(url)) return redirectCache.get(url)!;

  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    const resolved = res.url || url;
    redirectCache.set(url, resolved);
    return resolved;
  } catch {
    return url;
  }
}

async function resolveRedirectsInResult(
  parsed: InsightsResult,
  sourcesConsulted: GroundingSource[],
): Promise<void> {
  const entries = parsed.categories.flatMap((c) => c.entries);
  await Promise.all(
    entries.map(async (entry) => {
      entry.url = await resolveRedirect(entry.url);
    }),
  );
  await Promise.all(
    sourcesConsulted.map(async (source) => {
      if (source.uri) source.uri = await resolveRedirect(source.uri);
    }),
  );
}

async function research(topic: string, apiKey: string) {
  const client = new GoogleGenAI({ apiKey });

  console.log(
    `Researching "${topic}" with ${MODEL} + Google Search grounding...`,
  );
  const startTime = Date.now();

  const response = await client.models.generateContent({
    model: MODEL,
    contents: [{ role: "user", parts: [{ text: buildPrompt(topic) }] }],
    config: {
      tools: [{ googleSearch: {} }],
      temperature: 0.2,
    },
  });

  console.log(`Research completed in ${Date.now() - startTime}ms`);

  if (!response?.text) {
    throw new Error("No text content in Gemini response");
  }

  const parsed = parseResult(response.text.trim());
  if (!parsed) {
    console.warn("Response was not valid JSON. Raw output follows:");
    console.log(response.text);
    throw new Error("Failed to parse Gemini response as JSON");
  }

  const groundingChunks =
    response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  const sourcesConsulted: GroundingSource[] = groundingChunks
    .map((chunk: { web?: GroundingSource }) => chunk.web)
    .filter((web: GroundingSource | undefined): web is GroundingSource =>
      Boolean(web),
    );

  const webSearchQueries =
    response.candidates?.[0]?.groundingMetadata?.webSearchQueries ?? [];

  return { parsed, sourcesConsulted, webSearchQueries };
}

async function main() {
  const [topic] = process.argv.slice(2);

  if (!topic) {
    console.error(`
Usage: node insights_for.ts "<topic>"

  topic  The subject to research, e.g. "ambrose patterson"

Environment:
  GEMINI_API_KEY  Read from .env or the shell environment
  GEMINI_MODEL    Optional override, defaults to gemini-pro-latest
    `);
    process.exit(1);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      "API key required. Set GEMINI_API_KEY in .env or the environment.",
    );
    process.exit(1);
  }

  const { parsed, sourcesConsulted, webSearchQueries } = await research(
    topic,
    apiKey,
  );

  console.log("Resolving search-redirect links to their real URLs...");
  await resolveRedirectsInResult(parsed, sourcesConsulted);

  console.log("\n" + "=".repeat(60));
  console.log("RESULTS:");
  console.log("=".repeat(60) + "\n");

  for (const category of parsed.categories) {
    console.log(`\n${category.label} (${category.entries.length})`);
    for (const entry of category.entries) {
      console.log(`  - ${entry.title}${entry.has_images ? " [images]" : ""}`);
      console.log(`    ${entry.url}`);
    }
  }

  const output = {
    ...parsed,
    sources_consulted: sourcesConsulted,
    search_queries_used: webSearchQueries,
    generated_at: new Date().toISOString(),
  };

  const outputDir = path.resolve(__dirname, "output");
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${slugify(topic)}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nSaved to ${outputPath}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
