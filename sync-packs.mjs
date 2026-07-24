import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { sanitizePack } from "./sanitize-pack.mjs";

const BASE = process.env.PACK_SOURCE_BASE;
if (!BASE) {
  console.error("PACK_SOURCE_BASE not set");
  process.exit(1);
}

const ID_SHAPE = /^[A-Za-z0-9_-]{1,64}$/;

async function fetchWithRetry(url, attempts = 4, delayMs = 10000) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (res.ok) return res;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, delayMs));
  }
  throw lastErr;
}

const sources = JSON.parse(await readFile("sources.json", "utf8"));
const catalog = [];

for (const { client_id, video_id } of sources) {
  if (!ID_SHAPE.test(client_id) || !ID_SHAPE.test(video_id)) {
    console.warn(`skip invalid entry: ${client_id}/${video_id}`);
    continue;
  }
  try {
    const res = await fetchWithRetry(`${BASE}/v1/${client_id}/pack/${video_id}`);
    const raw = await res.json();
    const sanitized = sanitizePack(raw);
    await mkdir(`packs/${client_id}`, { recursive: true });
    await writeFile(`packs/${client_id}/${video_id}.json`, JSON.stringify(sanitized));
    catalog.push({ client_id, video_id, ...(raw.video_title ? { title: raw.video_title } : {}) });
    console.log(`synced ${client_id}/${video_id} (${sanitized.items.length} items)`);
  } catch (e) {
    console.warn(`skip ${client_id}/${video_id}: ${e.message ?? e}`);
  }
}

await writeFile("catalog.json", JSON.stringify(catalog));
await rm("pack.json", { force: true });
console.log(`synced ${catalog.length}/${sources.length} pairs`);
