import { readFile } from "node:fs/promises";

function sanitizeOption(o) {
  const out = { option_id: o.option_id, label: o.label };
  if (o.url !== undefined) out.url = o.url;
  if (o.seek_to !== undefined) out.seek_to = o.seek_to;
  return out;
}

function sanitizeScale(s) {
  const out = { min: s.min, max: s.max };
  if (s.min_label !== undefined) out.min_label = s.min_label;
  if (s.max_label !== undefined) out.max_label = s.max_label;
  return out;
}

function sanitizeCta(c) {
  const out = { kind: c.kind, url: c.url };
  if (c.image_url !== undefined) out.image_url = c.image_url;
  if (c.button_label !== undefined) out.button_label = c.button_label;
  if (c.price !== undefined) out.price = c.price;
  if (c.disclosure !== undefined) out.disclosure = c.disclosure;
  return out;
}

function sanitizeAnchor(a) {
  const out = { mode: a.mode };
  if (a.start !== undefined) out.start = a.start;
  if (a.end !== undefined) out.end = a.end;
  if (a.segment_id !== undefined) out.segment_id = a.segment_id;
  if (a.min_pause_sec !== undefined) out.min_pause_sec = a.min_pause_sec;
  return out;
}

function sanitizeFollowup(f) {
  return { on: f.on, prompt: sanitizeFollowupPrompt(f.prompt) };
}

function sanitizeFollowupPrompt(p) {
  const out = { item_id: p.item_id, primitive: p.primitive, body: p.body };
  if (p.options !== undefined) out.options = p.options.map(sanitizeOption);
  if (p.correct_option_id !== undefined) out.correct_option_id = p.correct_option_id;
  if (p.scale !== undefined) out.scale = sanitizeScale(p.scale);
  if (p.cta !== undefined) out.cta = sanitizeCta(p.cta);
  if (p.followups !== undefined) out.followups = p.followups.map(sanitizeFollowup);
  return out;
}

function sanitizeItem(item) {
  const out = { item_id: item.item_id, primitive: item.primitive, anchor: sanitizeAnchor(item.anchor), body: item.body };
  if (item.options !== undefined) out.options = item.options.map(sanitizeOption);
  if (item.correct_option_id !== undefined) out.correct_option_id = item.correct_option_id;
  if (item.replay_segment_start !== undefined) out.replay_segment_start = item.replay_segment_start;
  if (item.seek_to !== undefined) out.seek_to = item.seek_to;
  if (item.scale !== undefined) out.scale = sanitizeScale(item.scale);
  if (item.cta !== undefined) out.cta = sanitizeCta(item.cta);
  if (item.position !== undefined) out.position = item.position;
  if (item.card_style !== undefined) out.card_style = item.card_style;
  if (item.image_url !== undefined) out.image_url = item.image_url;
  if (item.caption !== undefined) out.caption = item.caption;
  if (item.followups !== undefined) out.followups = item.followups.map(sanitizeFollowup);
  return out;
}

export function sanitizePack(raw) {
  return { items: (raw.items ?? []).map(sanitizeItem) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const raw = JSON.parse(await readFile(process.argv[2], "utf8"));
  process.stdout.write(JSON.stringify(sanitizePack(raw), null, 2) + "\n");
}
