// ../../platform/kernel/dist/types/index.js
var CARD_STYLES = ["default", "compact", "minimal", "bold", "horror", "title_card"];
function normalizeCardStyle(value) {
  return CARD_STYLES.includes(value) ? value : "default";
}
var CTA_KINDS = ["shop", "tip", "fund", "subscribe", "book", "sponsor", "link"];
function normalizeCtaKind(value) {
  return CTA_KINDS.includes(value) ? value : "link";
}
var CARD_POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "middle-left",
  "center",
  "middle-right",
  "bottom-left",
  "bottom-center",
  "bottom-right"
];
function normalizeCardPosition(value, fallback = "center") {
  return CARD_POSITIONS.includes(value) ? value : fallback;
}
var HARD_EXIT_REASONS = ["closed", "switched"];
var CLIENT_CONFIG_DEFAULTS = {
  theme: {},
  tags: [],
  metrics: [],
  templates: [],
  strings: {},
  flags: {
    max_items_per_video: 5,
    max_items_per_session: 20,
    prompt_window_sec: 2,
    review_mode: false
  }
};
var MAX_FOLLOWUP_DEPTH = 3;

// ../../platform/kernel/dist/validation/compiled.js
function __ucs2length(str2) {
  const len = str2.length;
  let length = 0, pos = 0, value;
  while (pos < len) {
    length++;
    value = str2.charCodeAt(pos++);
    if (value >= 55296 && value <= 56319 && pos < len) {
      value = str2.charCodeAt(pos);
      if ((value & 64512) === 56320) pos++;
    }
  }
  return length;
}
var func2 = Object.prototype.hasOwnProperty;
var func3 = __ucs2length;
var pattern0 = new RegExp("^https?://", "u");
var pattern1 = new RegExp("^https://", "u");
var validatePackEnvelopeSchema = validate11;
var schema14 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "https://creai.dev/schemas/pack-envelope/1.16.0", "title": "PackEnvelope", "description": "Immutable per-video pack of interaction items. v1.2.0 adds optional nested `followups` on items. v1.3.0 adds optional `context` on items \u2014 a topical classification (domain \u2192 category \u2192 topic) from whole-transcript analysis, distinct from per-item signal `tags`, powering the viewer interest tree. v1.4.0 adds an optional video-level `context`: the canonical classification for the whole video (the video is the unit of classification; items inherit it). v1.5.0 adds an optional `video_title`, captured at generation, so creator and viewer surfaces label the video by its real title instead of its id. v1.6.0 adds the `action` primitive (a non-question call-to-action card with an attributed https link \u2014 kinds like shop/tip/fund/subscribe/sponsor) via an optional `cta` object, plus an optional `position` (named player zone) on any item. v1.7.0 lets a follow-up prompt also be an `action` (a commercial follow-up \u2014 e.g. answer \u2192 shop/book/subscribe), adding `action` + `cta` to followupPrompt. v1.8.0 adds an optional per-item `card_style` (default/compact/minimal/bold) \u2014 the interaction archetype for that prompt (nudge/quick/panel/spotlight); overrides the client-config default, unknown values degrade to default. v1.9.0 adds an optional `generator` object ({provider, model?}) stamped at generation time, so creator surfaces can show which LLM/provider produced a pack's items. v1.10.0 adds the `up_next` primitive on items (not follow-ups) \u2014 an auto-dismissing \"what's coming next\" card placed from chapter markers or audience-retention drop-offs. v1.11.0 adds optional per-item `image_url` (https-only) and `caption` \u2014 a leading image and secondary caption line available to ANY primitive, generalizing the `action` primitive's image support so notice/up_next/scale/single_choice can carry one too. v1.12.0 adds `horror` to the `cardStyle` enum \u2014 a boxless glow-fade treatment with bundled display fonts (Nosifer/Special Elite/Bebas Neue/JetBrains Mono), no new fields. v1.13.0 adds optional `seek_to` (seconds, \u22650) in two places: on an `option` (choosing it seeks the player \u2014 a 'skip to X / skip to Y' navigation branch) and on an item (for `up_next`, the moment it previews \u2014 clicking Jump seeks there). v1.14.0 adds an optional per-video `intro` object ({body?, fullscreen?, subscribe_url?, countdown_sec?}) \u2014 a creator-toggled intro card shown once near the start, offering a countdown-to-fullscreen and/or Subscribe. v1.15.0 adds `title_card` to the `cardStyle` enum \u2014 a cinematic full-bleed chapter-reveal treatment for choose-your-own-path arrival/landing cards (or any item), no new fields. v1.16.0 adds an optional top-level `branch_brief` \u2014 a free-text strategy brief from CALL 1 of the two-call context-driven branching flow (creator-facing display only; untrusted LLM text). All additive and backward-compatible.", "type": "object", "required": ["schema_version", "client_id", "video_id", "generated_at", "items"], "additionalProperties": false, "properties": { "schema_version": { "type": "string" }, "client_id": { "type": "string", "minLength": 1 }, "video_id": { "type": "string", "minLength": 1 }, "video_title": { "type": "string", "description": "Human-readable video title captured at generation (yt-dlp). Untrusted \u2014 render with textContent only." }, "branch_brief": { "type": "string", "description": "Free-text strategy brief from CALL 1 of the two-call context-driven branching flow \u2014 how the video was understood for choose-your-own-path design. Present only when branching produced one; creator-facing display only, never affects rendering/validation. Untrusted (LLM output) \u2014 render with textContent only." }, "generated_at": { "type": "string", "format": "date-time" }, "generator": { "type": "object", "description": "Which LLM/provider produced this pack's items \u2014 presence only, for creator-facing display; never affects rendering or validation of item content.", "required": ["provider"], "additionalProperties": false, "properties": { "provider": { "type": "string", "minLength": 1 }, "model": { "type": "string" } } }, "context": { "$ref": "#/definitions/context", "description": "Canonical video-level topical classification. The video is the unit of classification; its items inherit this. Distinct from per-item signal `tags`." }, "intro": { "type": "object", "additionalProperties": false, "description": "Optional per-video intro card, toggled by the creator ('Add intro / fullscreen'). Shown once near the start; offers a countdown-to-fullscreen and/or a Subscribe link.", "properties": { "body": { "type": "string" }, "fullscreen": { "type": "boolean" }, "subscribe_url": { "type": "string", "format": "uri", "pattern": "^https://" }, "countdown_sec": { "type": "number", "minimum": 1, "maximum": 30 } } }, "segments": { "type": "array", "items": { "type": "object", "required": ["segment_id", "start", "end"], "additionalProperties": false, "properties": { "segment_id": { "type": "string" }, "start": { "type": "number", "minimum": 0 }, "end": { "type": "number", "minimum": 0 }, "label": { "type": "string" } } } }, "items": { "type": "array", "minItems": 1, "items": { "$ref": "#/definitions/item" } } }, "definitions": { "option": { "type": "object", "required": ["option_id", "label"], "additionalProperties": false, "properties": { "option_id": { "type": "string", "minLength": 1 }, "label": { "type": "string", "minLength": 1 }, "url": { "type": "string", "format": "uri", "pattern": "^https://" }, "seek_to": { "type": "number", "minimum": 0, "description": "Seconds. When set, choosing this option seeks the player there \u2014 a 'skip to X / skip to Y' navigation branch." }, "mappings": { "type": "object", "additionalProperties": false, "properties": { "signal": { "type": "string", "enum": ["clarity", "confusion", "application", "other"] }, "effect": { "type": "number" } } } } }, "tag": { "type": "object", "required": ["tag_id", "weight"], "additionalProperties": false, "properties": { "tag_id": { "type": "string", "minLength": 1 }, "weight": { "type": "number", "minimum": 0, "maximum": 1 } } }, "scale": { "type": "object", "required": ["min", "max"], "additionalProperties": false, "properties": { "min": { "type": "integer" }, "max": { "type": "integer" }, "min_label": { "type": "string" }, "max_label": { "type": "string" } } }, "followup": { "type": "object", "required": ["on", "prompt"], "additionalProperties": false, "properties": { "on": { "type": "string", "enum": ["correct", "wrong"] }, "prompt": { "$ref": "#/definitions/followupPrompt" } } }, "followupPrompt": { "type": "object", "required": ["item_id", "primitive", "body"], "additionalProperties": false, "properties": { "item_id": { "type": "string", "minLength": 1 }, "primitive": { "type": "string", "enum": ["single_choice", "scale", "notice", "action"] }, "body": { "type": "string", "minLength": 1 }, "options": { "type": "array", "items": { "$ref": "#/definitions/option" } }, "correct_option_id": { "type": "string" }, "scale": { "$ref": "#/definitions/scale" }, "cta": { "$ref": "#/definitions/cta" }, "tags": { "type": "array", "items": { "$ref": "#/definitions/tag" } }, "followups": { "type": "array", "items": { "$ref": "#/definitions/followup" } } } }, "item": { "type": "object", "required": ["item_id", "template_id", "primitive", "anchor", "body", "tags"], "additionalProperties": false, "properties": { "item_id": { "type": "string", "minLength": 1 }, "template_id": { "type": "string", "minLength": 1 }, "primitive": { "type": "string", "enum": ["single_choice", "scale", "notice", "action", "up_next"] }, "anchor": { "type": "object", "required": ["mode"], "additionalProperties": false, "properties": { "mode": { "type": "string", "enum": ["time_window", "segment_end", "pause", "video_end", "immediate"] }, "start": { "type": "number", "minimum": 0 }, "end": { "type": "number", "minimum": 0 }, "segment_id": { "type": "string" }, "min_pause_sec": { "type": "number", "minimum": 0 } } }, "body": { "type": "string", "minLength": 1 }, "options": { "type": "array", "items": { "$ref": "#/definitions/option" } }, "tags": { "type": "array", "items": { "$ref": "#/definitions/tag" } }, "correct_option_id": { "type": "string" }, "replay_segment_start": { "type": "number", "minimum": 0, "description": "Optional timestamp (seconds) of the explanation segment for this item. When present alongside correct_option_id, the overlay offers a replay-and-seek action after an incorrect answer." }, "seek_to": { "type": "number", "minimum": 0, "description": "Seconds. For an up_next card, the moment it previews \u2014 clicking it seeks the player there (a real 'jump to what's next')." }, "scale": { "$ref": "#/definitions/scale" }, "context": { "$ref": "#/definitions/context" }, "cta": { "$ref": "#/definitions/cta" }, "position": { "$ref": "#/definitions/position" }, "card_style": { "$ref": "#/definitions/cardStyle" }, "image_url": { "type": "string", "format": "uri", "pattern": "^https://", "description": "Optional leading image for this card, any primitive. https-only (validated at load AND render)." }, "caption": { "type": "string", "description": "Optional secondary caption line shown under the eyebrow, any primitive." }, "followups": { "type": "array", "description": "Branching follow-ups. on=correct \u2192 deep-dive; on=wrong \u2192 clarification. Nesting is depth-capped at render (MAX_FOLLOWUP_DEPTH).", "items": { "$ref": "#/definitions/followup" } } } }, "context": { "type": "object", "additionalProperties": false, "description": "Topical classification from whole-transcript analysis (channel-persistent taxonomy): domain \u2192 category \u2192 topic. Distinct from per-item signal `tags`; powers the viewer interest tree. ids reference the per-channel taxonomy store; labels are denormalized snapshots for display.", "properties": { "domain": { "type": "string" }, "category_id": { "type": "string" }, "category": { "type": "string" }, "topic_id": { "type": "string" }, "topic": { "type": "string" } } }, "cta": { "type": "object", "required": ["kind", "url"], "additionalProperties": false, "description": "Call-to-action for an `action` item: an attributed outbound link. `kind` is a platform-known category (shop/tip/fund/subscribe/book/sponsor/link) that drives the icon, default disclosure, and styling; unknown kinds degrade to a generic link. `url`/`image_url` are https-only (validated at load AND render).", "properties": { "kind": { "type": "string", "minLength": 1 }, "url": { "type": "string", "format": "uri", "pattern": "^https://" }, "image_url": { "type": "string", "format": "uri", "pattern": "^https://" }, "button_label": { "type": "string" }, "price": { "type": "string" }, "disclosure": { "type": "string" } } }, "position": { "type": "string", "description": "Named player zone for the card. Unknown values degrade to the platform default at render.", "enum": ["top-left", "top-center", "top-right", "middle-left", "center", "middle-right", "bottom-left", "bottom-center", "bottom-right"] }, "cardStyle": { "type": "string", "description": "Interaction archetype for this prompt: default (panel) / compact (quick card) / minimal (auto-dismissing nudge) / bold (centered spotlight with a scrim) / horror (boxless glow-fade treatment, bundled display fonts) / title_card (cinematic full-bleed chapter-reveal treatment). Overrides the client-config card_style; unknown values degrade to default at render.", "enum": ["default", "compact", "minimal", "bold", "horror", "title_card"] } } };
var schema16 = { "type": "object", "required": ["item_id", "template_id", "primitive", "anchor", "body", "tags"], "additionalProperties": false, "properties": { "item_id": { "type": "string", "minLength": 1 }, "template_id": { "type": "string", "minLength": 1 }, "primitive": { "type": "string", "enum": ["single_choice", "scale", "notice", "action", "up_next"] }, "anchor": { "type": "object", "required": ["mode"], "additionalProperties": false, "properties": { "mode": { "type": "string", "enum": ["time_window", "segment_end", "pause", "video_end", "immediate"] }, "start": { "type": "number", "minimum": 0 }, "end": { "type": "number", "minimum": 0 }, "segment_id": { "type": "string" }, "min_pause_sec": { "type": "number", "minimum": 0 } } }, "body": { "type": "string", "minLength": 1 }, "options": { "type": "array", "items": { "$ref": "#/definitions/option" } }, "tags": { "type": "array", "items": { "$ref": "#/definitions/tag" } }, "correct_option_id": { "type": "string" }, "replay_segment_start": { "type": "number", "minimum": 0, "description": "Optional timestamp (seconds) of the explanation segment for this item. When present alongside correct_option_id, the overlay offers a replay-and-seek action after an incorrect answer." }, "seek_to": { "type": "number", "minimum": 0, "description": "Seconds. For an up_next card, the moment it previews \u2014 clicking it seeks the player there (a real 'jump to what's next')." }, "scale": { "$ref": "#/definitions/scale" }, "context": { "$ref": "#/definitions/context" }, "cta": { "$ref": "#/definitions/cta" }, "position": { "$ref": "#/definitions/position" }, "card_style": { "$ref": "#/definitions/cardStyle" }, "image_url": { "type": "string", "format": "uri", "pattern": "^https://", "description": "Optional leading image for this card, any primitive. https-only (validated at load AND render)." }, "caption": { "type": "string", "description": "Optional secondary caption line shown under the eyebrow, any primitive." }, "followups": { "type": "array", "description": "Branching follow-ups. on=correct \u2192 deep-dive; on=wrong \u2192 clarification. Nesting is depth-capped at render (MAX_FOLLOWUP_DEPTH).", "items": { "$ref": "#/definitions/followup" } } } };
var schema17 = { "type": "object", "required": ["option_id", "label"], "additionalProperties": false, "properties": { "option_id": { "type": "string", "minLength": 1 }, "label": { "type": "string", "minLength": 1 }, "url": { "type": "string", "format": "uri", "pattern": "^https://" }, "seek_to": { "type": "number", "minimum": 0, "description": "Seconds. When set, choosing this option seeks the player there \u2014 a 'skip to X / skip to Y' navigation branch." }, "mappings": { "type": "object", "additionalProperties": false, "properties": { "signal": { "type": "string", "enum": ["clarity", "confusion", "application", "other"] }, "effect": { "type": "number" } } } } };
var schema22 = { "type": "string", "description": "Named player zone for the card. Unknown values degrade to the platform default at render.", "enum": ["top-left", "top-center", "top-right", "middle-left", "center", "middle-right", "bottom-left", "bottom-center", "bottom-right"] };
var schema23 = { "type": "string", "description": "Interaction archetype for this prompt: default (panel) / compact (quick card) / minimal (auto-dismissing nudge) / bold (centered spotlight with a scrim) / horror (boxless glow-fade treatment, bundled display fonts) / title_card (cinematic full-bleed chapter-reveal treatment). Overrides the client-config card_style; unknown values degrade to default at render.", "enum": ["default", "compact", "minimal", "bold", "horror", "title_card"] };
var schema24 = { "type": "object", "required": ["on", "prompt"], "additionalProperties": false, "properties": { "on": { "type": "string", "enum": ["correct", "wrong"] }, "prompt": { "$ref": "#/definitions/followupPrompt" } } };
var schema25 = { "type": "object", "required": ["item_id", "primitive", "body"], "additionalProperties": false, "properties": { "item_id": { "type": "string", "minLength": 1 }, "primitive": { "type": "string", "enum": ["single_choice", "scale", "notice", "action"] }, "body": { "type": "string", "minLength": 1 }, "options": { "type": "array", "items": { "$ref": "#/definitions/option" } }, "correct_option_id": { "type": "string" }, "scale": { "$ref": "#/definitions/scale" }, "cta": { "$ref": "#/definitions/cta" }, "tags": { "type": "array", "items": { "$ref": "#/definitions/tag" } }, "followups": { "type": "array", "items": { "$ref": "#/definitions/followup" } } } };
var wrapper0 = { validate: validate13 };
function validate14(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.item_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "item_id" }, message: "must have required property 'item_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.primitive === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "primitive" }, message: "must have required property 'primitive'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.body === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "body" }, message: "must have required property 'body'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func2.call(schema25.properties, key0)) {
        delete data[key0];
      }
    }
    if (data.item_id !== void 0) {
      let data0 = data.item_id;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err3 = { instancePath: instancePath + "/item_id", schemaPath: "#/properties/item_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/item_id", schemaPath: "#/properties/item_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.primitive !== void 0) {
      let data1 = data.primitive;
      if (typeof data1 !== "string") {
        const err5 = { instancePath: instancePath + "/primitive", schemaPath: "#/properties/primitive/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
      if (!(data1 === "single_choice" || data1 === "scale" || data1 === "notice" || data1 === "action")) {
        const err6 = { instancePath: instancePath + "/primitive", schemaPath: "#/properties/primitive/enum", keyword: "enum", params: { allowedValues: schema25.properties.primitive.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.body !== void 0) {
      let data2 = data.body;
      if (typeof data2 === "string") {
        if (func3(data2) < 1) {
          const err7 = { instancePath: instancePath + "/body", schemaPath: "#/properties/body/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/body", schemaPath: "#/properties/body/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.options !== void 0) {
      let data3 = data.options;
      if (Array.isArray(data3)) {
        const len0 = data3.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data4 = data3[i0];
          if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
            if (data4.option_id === void 0) {
              const err9 = { instancePath: instancePath + "/options/" + i0, schemaPath: "#/definitions/option/required", keyword: "required", params: { missingProperty: "option_id" }, message: "must have required property 'option_id'" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
            if (data4.label === void 0) {
              const err10 = { instancePath: instancePath + "/options/" + i0, schemaPath: "#/definitions/option/required", keyword: "required", params: { missingProperty: "label" }, message: "must have required property 'label'" };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
            for (const key1 in data4) {
              if (!(key1 === "option_id" || key1 === "label" || key1 === "url" || key1 === "seek_to" || key1 === "mappings")) {
                delete data4[key1];
              }
            }
            if (data4.option_id !== void 0) {
              let data5 = data4.option_id;
              if (typeof data5 === "string") {
                if (func3(data5) < 1) {
                  const err11 = { instancePath: instancePath + "/options/" + i0 + "/option_id", schemaPath: "#/definitions/option/properties/option_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
              } else {
                const err12 = { instancePath: instancePath + "/options/" + i0 + "/option_id", schemaPath: "#/definitions/option/properties/option_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err12];
                } else {
                  vErrors.push(err12);
                }
                errors++;
              }
            }
            if (data4.label !== void 0) {
              let data6 = data4.label;
              if (typeof data6 === "string") {
                if (func3(data6) < 1) {
                  const err13 = { instancePath: instancePath + "/options/" + i0 + "/label", schemaPath: "#/definitions/option/properties/label/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err13];
                  } else {
                    vErrors.push(err13);
                  }
                  errors++;
                }
              } else {
                const err14 = { instancePath: instancePath + "/options/" + i0 + "/label", schemaPath: "#/definitions/option/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err14];
                } else {
                  vErrors.push(err14);
                }
                errors++;
              }
            }
            if (data4.url !== void 0) {
              let data7 = data4.url;
              if (typeof data7 === "string") {
                if (!pattern1.test(data7)) {
                  const err15 = { instancePath: instancePath + "/options/" + i0 + "/url", schemaPath: "#/definitions/option/properties/url/pattern", keyword: "pattern", params: { pattern: "^https://" }, message: 'must match pattern "^https://"' };
                  if (vErrors === null) {
                    vErrors = [err15];
                  } else {
                    vErrors.push(err15);
                  }
                  errors++;
                }
              } else {
                const err16 = { instancePath: instancePath + "/options/" + i0 + "/url", schemaPath: "#/definitions/option/properties/url/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
            }
            if (data4.seek_to !== void 0) {
              let data8 = data4.seek_to;
              if (typeof data8 == "number" && isFinite(data8)) {
                if (data8 < 0 || isNaN(data8)) {
                  const err17 = { instancePath: instancePath + "/options/" + i0 + "/seek_to", schemaPath: "#/definitions/option/properties/seek_to/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err17];
                  } else {
                    vErrors.push(err17);
                  }
                  errors++;
                }
              } else {
                const err18 = { instancePath: instancePath + "/options/" + i0 + "/seek_to", schemaPath: "#/definitions/option/properties/seek_to/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
              }
            }
            if (data4.mappings !== void 0) {
              let data9 = data4.mappings;
              if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
                for (const key2 in data9) {
                  if (!(key2 === "signal" || key2 === "effect")) {
                    delete data9[key2];
                  }
                }
                if (data9.signal !== void 0) {
                  let data10 = data9.signal;
                  if (typeof data10 !== "string") {
                    const err19 = { instancePath: instancePath + "/options/" + i0 + "/mappings/signal", schemaPath: "#/definitions/option/properties/mappings/properties/signal/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err19];
                    } else {
                      vErrors.push(err19);
                    }
                    errors++;
                  }
                  if (!(data10 === "clarity" || data10 === "confusion" || data10 === "application" || data10 === "other")) {
                    const err20 = { instancePath: instancePath + "/options/" + i0 + "/mappings/signal", schemaPath: "#/definitions/option/properties/mappings/properties/signal/enum", keyword: "enum", params: { allowedValues: schema17.properties.mappings.properties.signal.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err20];
                    } else {
                      vErrors.push(err20);
                    }
                    errors++;
                  }
                }
                if (data9.effect !== void 0) {
                  let data11 = data9.effect;
                  if (!(typeof data11 == "number" && isFinite(data11))) {
                    const err21 = { instancePath: instancePath + "/options/" + i0 + "/mappings/effect", schemaPath: "#/definitions/option/properties/mappings/properties/effect/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err21];
                    } else {
                      vErrors.push(err21);
                    }
                    errors++;
                  }
                }
              } else {
                const err22 = { instancePath: instancePath + "/options/" + i0 + "/mappings", schemaPath: "#/definitions/option/properties/mappings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err22];
                } else {
                  vErrors.push(err22);
                }
                errors++;
              }
            }
          } else {
            const err23 = { instancePath: instancePath + "/options/" + i0, schemaPath: "#/definitions/option/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          }
        }
      } else {
        const err24 = { instancePath: instancePath + "/options", schemaPath: "#/properties/options/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    if (data.correct_option_id !== void 0) {
      if (typeof data.correct_option_id !== "string") {
        const err25 = { instancePath: instancePath + "/correct_option_id", schemaPath: "#/properties/correct_option_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
    if (data.scale !== void 0) {
      let data13 = data.scale;
      if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
        if (data13.min === void 0) {
          const err26 = { instancePath: instancePath + "/scale", schemaPath: "#/definitions/scale/required", keyword: "required", params: { missingProperty: "min" }, message: "must have required property 'min'" };
          if (vErrors === null) {
            vErrors = [err26];
          } else {
            vErrors.push(err26);
          }
          errors++;
        }
        if (data13.max === void 0) {
          const err27 = { instancePath: instancePath + "/scale", schemaPath: "#/definitions/scale/required", keyword: "required", params: { missingProperty: "max" }, message: "must have required property 'max'" };
          if (vErrors === null) {
            vErrors = [err27];
          } else {
            vErrors.push(err27);
          }
          errors++;
        }
        for (const key3 in data13) {
          if (!(key3 === "min" || key3 === "max" || key3 === "min_label" || key3 === "max_label")) {
            delete data13[key3];
          }
        }
        if (data13.min !== void 0) {
          let data14 = data13.min;
          if (!(typeof data14 == "number" && (!(data14 % 1) && !isNaN(data14)) && isFinite(data14))) {
            const err28 = { instancePath: instancePath + "/scale/min", schemaPath: "#/definitions/scale/properties/min/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err28];
            } else {
              vErrors.push(err28);
            }
            errors++;
          }
        }
        if (data13.max !== void 0) {
          let data15 = data13.max;
          if (!(typeof data15 == "number" && (!(data15 % 1) && !isNaN(data15)) && isFinite(data15))) {
            const err29 = { instancePath: instancePath + "/scale/max", schemaPath: "#/definitions/scale/properties/max/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err29];
            } else {
              vErrors.push(err29);
            }
            errors++;
          }
        }
        if (data13.min_label !== void 0) {
          if (typeof data13.min_label !== "string") {
            const err30 = { instancePath: instancePath + "/scale/min_label", schemaPath: "#/definitions/scale/properties/min_label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err30];
            } else {
              vErrors.push(err30);
            }
            errors++;
          }
        }
        if (data13.max_label !== void 0) {
          if (typeof data13.max_label !== "string") {
            const err31 = { instancePath: instancePath + "/scale/max_label", schemaPath: "#/definitions/scale/properties/max_label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err31];
            } else {
              vErrors.push(err31);
            }
            errors++;
          }
        }
      } else {
        const err32 = { instancePath: instancePath + "/scale", schemaPath: "#/definitions/scale/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err32];
        } else {
          vErrors.push(err32);
        }
        errors++;
      }
    }
    if (data.cta !== void 0) {
      let data18 = data.cta;
      if (data18 && typeof data18 == "object" && !Array.isArray(data18)) {
        if (data18.kind === void 0) {
          const err33 = { instancePath: instancePath + "/cta", schemaPath: "#/definitions/cta/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err33];
          } else {
            vErrors.push(err33);
          }
          errors++;
        }
        if (data18.url === void 0) {
          const err34 = { instancePath: instancePath + "/cta", schemaPath: "#/definitions/cta/required", keyword: "required", params: { missingProperty: "url" }, message: "must have required property 'url'" };
          if (vErrors === null) {
            vErrors = [err34];
          } else {
            vErrors.push(err34);
          }
          errors++;
        }
        for (const key4 in data18) {
          if (!(key4 === "kind" || key4 === "url" || key4 === "image_url" || key4 === "button_label" || key4 === "price" || key4 === "disclosure")) {
            delete data18[key4];
          }
        }
        if (data18.kind !== void 0) {
          let data19 = data18.kind;
          if (typeof data19 === "string") {
            if (func3(data19) < 1) {
              const err35 = { instancePath: instancePath + "/cta/kind", schemaPath: "#/definitions/cta/properties/kind/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
          } else {
            const err36 = { instancePath: instancePath + "/cta/kind", schemaPath: "#/definitions/cta/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err36];
            } else {
              vErrors.push(err36);
            }
            errors++;
          }
        }
        if (data18.url !== void 0) {
          let data20 = data18.url;
          if (typeof data20 === "string") {
            if (!pattern1.test(data20)) {
              const err37 = { instancePath: instancePath + "/cta/url", schemaPath: "#/definitions/cta/properties/url/pattern", keyword: "pattern", params: { pattern: "^https://" }, message: 'must match pattern "^https://"' };
              if (vErrors === null) {
                vErrors = [err37];
              } else {
                vErrors.push(err37);
              }
              errors++;
            }
          } else {
            const err38 = { instancePath: instancePath + "/cta/url", schemaPath: "#/definitions/cta/properties/url/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err38];
            } else {
              vErrors.push(err38);
            }
            errors++;
          }
        }
        if (data18.image_url !== void 0) {
          let data21 = data18.image_url;
          if (typeof data21 === "string") {
            if (!pattern1.test(data21)) {
              const err39 = { instancePath: instancePath + "/cta/image_url", schemaPath: "#/definitions/cta/properties/image_url/pattern", keyword: "pattern", params: { pattern: "^https://" }, message: 'must match pattern "^https://"' };
              if (vErrors === null) {
                vErrors = [err39];
              } else {
                vErrors.push(err39);
              }
              errors++;
            }
          } else {
            const err40 = { instancePath: instancePath + "/cta/image_url", schemaPath: "#/definitions/cta/properties/image_url/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err40];
            } else {
              vErrors.push(err40);
            }
            errors++;
          }
        }
        if (data18.button_label !== void 0) {
          if (typeof data18.button_label !== "string") {
            const err41 = { instancePath: instancePath + "/cta/button_label", schemaPath: "#/definitions/cta/properties/button_label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err41];
            } else {
              vErrors.push(err41);
            }
            errors++;
          }
        }
        if (data18.price !== void 0) {
          if (typeof data18.price !== "string") {
            const err42 = { instancePath: instancePath + "/cta/price", schemaPath: "#/definitions/cta/properties/price/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
        }
        if (data18.disclosure !== void 0) {
          if (typeof data18.disclosure !== "string") {
            const err43 = { instancePath: instancePath + "/cta/disclosure", schemaPath: "#/definitions/cta/properties/disclosure/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
        }
      } else {
        const err44 = { instancePath: instancePath + "/cta", schemaPath: "#/definitions/cta/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err44];
        } else {
          vErrors.push(err44);
        }
        errors++;
      }
    }
    if (data.tags !== void 0) {
      let data25 = data.tags;
      if (Array.isArray(data25)) {
        const len1 = data25.length;
        for (let i1 = 0; i1 < len1; i1++) {
          let data26 = data25[i1];
          if (data26 && typeof data26 == "object" && !Array.isArray(data26)) {
            if (data26.tag_id === void 0) {
              const err45 = { instancePath: instancePath + "/tags/" + i1, schemaPath: "#/definitions/tag/required", keyword: "required", params: { missingProperty: "tag_id" }, message: "must have required property 'tag_id'" };
              if (vErrors === null) {
                vErrors = [err45];
              } else {
                vErrors.push(err45);
              }
              errors++;
            }
            if (data26.weight === void 0) {
              const err46 = { instancePath: instancePath + "/tags/" + i1, schemaPath: "#/definitions/tag/required", keyword: "required", params: { missingProperty: "weight" }, message: "must have required property 'weight'" };
              if (vErrors === null) {
                vErrors = [err46];
              } else {
                vErrors.push(err46);
              }
              errors++;
            }
            for (const key5 in data26) {
              if (!(key5 === "tag_id" || key5 === "weight")) {
                delete data26[key5];
              }
            }
            if (data26.tag_id !== void 0) {
              let data27 = data26.tag_id;
              if (typeof data27 === "string") {
                if (func3(data27) < 1) {
                  const err47 = { instancePath: instancePath + "/tags/" + i1 + "/tag_id", schemaPath: "#/definitions/tag/properties/tag_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err47];
                  } else {
                    vErrors.push(err47);
                  }
                  errors++;
                }
              } else {
                const err48 = { instancePath: instancePath + "/tags/" + i1 + "/tag_id", schemaPath: "#/definitions/tag/properties/tag_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err48];
                } else {
                  vErrors.push(err48);
                }
                errors++;
              }
            }
            if (data26.weight !== void 0) {
              let data28 = data26.weight;
              if (typeof data28 == "number" && isFinite(data28)) {
                if (data28 > 1 || isNaN(data28)) {
                  const err49 = { instancePath: instancePath + "/tags/" + i1 + "/weight", schemaPath: "#/definitions/tag/properties/weight/maximum", keyword: "maximum", params: { comparison: "<=", limit: 1 }, message: "must be <= 1" };
                  if (vErrors === null) {
                    vErrors = [err49];
                  } else {
                    vErrors.push(err49);
                  }
                  errors++;
                }
                if (data28 < 0 || isNaN(data28)) {
                  const err50 = { instancePath: instancePath + "/tags/" + i1 + "/weight", schemaPath: "#/definitions/tag/properties/weight/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err50];
                  } else {
                    vErrors.push(err50);
                  }
                  errors++;
                }
              } else {
                const err51 = { instancePath: instancePath + "/tags/" + i1 + "/weight", schemaPath: "#/definitions/tag/properties/weight/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err51];
                } else {
                  vErrors.push(err51);
                }
                errors++;
              }
            }
          } else {
            const err52 = { instancePath: instancePath + "/tags/" + i1, schemaPath: "#/definitions/tag/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err52];
            } else {
              vErrors.push(err52);
            }
            errors++;
          }
        }
      } else {
        const err53 = { instancePath: instancePath + "/tags", schemaPath: "#/properties/tags/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err53];
        } else {
          vErrors.push(err53);
        }
        errors++;
      }
    }
    if (data.followups !== void 0) {
      let data29 = data.followups;
      if (Array.isArray(data29)) {
        const len2 = data29.length;
        for (let i2 = 0; i2 < len2; i2++) {
          if (!wrapper0.validate(data29[i2], { instancePath: instancePath + "/followups/" + i2, parentData: data29, parentDataProperty: i2, rootData })) {
            vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err54 = { instancePath: instancePath + "/followups", schemaPath: "#/properties/followups/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err54];
        } else {
          vErrors.push(err54);
        }
        errors++;
      }
    }
  } else {
    const err55 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err55];
    } else {
      vErrors.push(err55);
    }
    errors++;
  }
  validate14.errors = vErrors;
  return errors === 0;
}
function validate13(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.on === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "on" }, message: "must have required property 'on'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.prompt === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "prompt" }, message: "must have required property 'prompt'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "on" || key0 === "prompt")) {
        delete data[key0];
      }
    }
    if (data.on !== void 0) {
      let data0 = data.on;
      if (typeof data0 !== "string") {
        const err2 = { instancePath: instancePath + "/on", schemaPath: "#/properties/on/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
      if (!(data0 === "correct" || data0 === "wrong")) {
        const err3 = { instancePath: instancePath + "/on", schemaPath: "#/properties/on/enum", keyword: "enum", params: { allowedValues: schema24.properties.on.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.prompt !== void 0) {
      if (!validate14(data.prompt, { instancePath: instancePath + "/prompt", parentData: data, parentDataProperty: "prompt", rootData })) {
        vErrors = vErrors === null ? validate14.errors : vErrors.concat(validate14.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate13.errors = vErrors;
  return errors === 0;
}
function validate12(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.item_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "item_id" }, message: "must have required property 'item_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.template_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "template_id" }, message: "must have required property 'template_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.primitive === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "primitive" }, message: "must have required property 'primitive'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.anchor === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "anchor" }, message: "must have required property 'anchor'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.body === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "body" }, message: "must have required property 'body'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.tags === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "tags" }, message: "must have required property 'tags'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func2.call(schema16.properties, key0)) {
        delete data[key0];
      }
    }
    if (data.item_id !== void 0) {
      let data0 = data.item_id;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err6 = { instancePath: instancePath + "/item_id", schemaPath: "#/properties/item_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/item_id", schemaPath: "#/properties/item_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.template_id !== void 0) {
      let data1 = data.template_id;
      if (typeof data1 === "string") {
        if (func3(data1) < 1) {
          const err8 = { instancePath: instancePath + "/template_id", schemaPath: "#/properties/template_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/template_id", schemaPath: "#/properties/template_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.primitive !== void 0) {
      let data2 = data.primitive;
      if (typeof data2 !== "string") {
        const err10 = { instancePath: instancePath + "/primitive", schemaPath: "#/properties/primitive/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
      if (!(data2 === "single_choice" || data2 === "scale" || data2 === "notice" || data2 === "action" || data2 === "up_next")) {
        const err11 = { instancePath: instancePath + "/primitive", schemaPath: "#/properties/primitive/enum", keyword: "enum", params: { allowedValues: schema16.properties.primitive.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.anchor !== void 0) {
      let data3 = data.anchor;
      if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
        if (data3.mode === void 0) {
          const err12 = { instancePath: instancePath + "/anchor", schemaPath: "#/properties/anchor/required", keyword: "required", params: { missingProperty: "mode" }, message: "must have required property 'mode'" };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
        for (const key1 in data3) {
          if (!(key1 === "mode" || key1 === "start" || key1 === "end" || key1 === "segment_id" || key1 === "min_pause_sec")) {
            delete data3[key1];
          }
        }
        if (data3.mode !== void 0) {
          let data4 = data3.mode;
          if (typeof data4 !== "string") {
            const err13 = { instancePath: instancePath + "/anchor/mode", schemaPath: "#/properties/anchor/properties/mode/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
          if (!(data4 === "time_window" || data4 === "segment_end" || data4 === "pause" || data4 === "video_end" || data4 === "immediate")) {
            const err14 = { instancePath: instancePath + "/anchor/mode", schemaPath: "#/properties/anchor/properties/mode/enum", keyword: "enum", params: { allowedValues: schema16.properties.anchor.properties.mode.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
        if (data3.start !== void 0) {
          let data5 = data3.start;
          if (typeof data5 == "number" && isFinite(data5)) {
            if (data5 < 0 || isNaN(data5)) {
              const err15 = { instancePath: instancePath + "/anchor/start", schemaPath: "#/properties/anchor/properties/start/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err15];
              } else {
                vErrors.push(err15);
              }
              errors++;
            }
          } else {
            const err16 = { instancePath: instancePath + "/anchor/start", schemaPath: "#/properties/anchor/properties/start/type", keyword: "type", params: { type: "number" }, message: "must be number" };
            if (vErrors === null) {
              vErrors = [err16];
            } else {
              vErrors.push(err16);
            }
            errors++;
          }
        }
        if (data3.end !== void 0) {
          let data6 = data3.end;
          if (typeof data6 == "number" && isFinite(data6)) {
            if (data6 < 0 || isNaN(data6)) {
              const err17 = { instancePath: instancePath + "/anchor/end", schemaPath: "#/properties/anchor/properties/end/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
          } else {
            const err18 = { instancePath: instancePath + "/anchor/end", schemaPath: "#/properties/anchor/properties/end/type", keyword: "type", params: { type: "number" }, message: "must be number" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
        if (data3.segment_id !== void 0) {
          if (typeof data3.segment_id !== "string") {
            const err19 = { instancePath: instancePath + "/anchor/segment_id", schemaPath: "#/properties/anchor/properties/segment_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err19];
            } else {
              vErrors.push(err19);
            }
            errors++;
          }
        }
        if (data3.min_pause_sec !== void 0) {
          let data8 = data3.min_pause_sec;
          if (typeof data8 == "number" && isFinite(data8)) {
            if (data8 < 0 || isNaN(data8)) {
              const err20 = { instancePath: instancePath + "/anchor/min_pause_sec", schemaPath: "#/properties/anchor/properties/min_pause_sec/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
          } else {
            const err21 = { instancePath: instancePath + "/anchor/min_pause_sec", schemaPath: "#/properties/anchor/properties/min_pause_sec/type", keyword: "type", params: { type: "number" }, message: "must be number" };
            if (vErrors === null) {
              vErrors = [err21];
            } else {
              vErrors.push(err21);
            }
            errors++;
          }
        }
      } else {
        const err22 = { instancePath: instancePath + "/anchor", schemaPath: "#/properties/anchor/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
    }
    if (data.body !== void 0) {
      let data9 = data.body;
      if (typeof data9 === "string") {
        if (func3(data9) < 1) {
          const err23 = { instancePath: instancePath + "/body", schemaPath: "#/properties/body/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
      } else {
        const err24 = { instancePath: instancePath + "/body", schemaPath: "#/properties/body/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    if (data.options !== void 0) {
      let data10 = data.options;
      if (Array.isArray(data10)) {
        const len0 = data10.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data11 = data10[i0];
          if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
            if (data11.option_id === void 0) {
              const err25 = { instancePath: instancePath + "/options/" + i0, schemaPath: "#/definitions/option/required", keyword: "required", params: { missingProperty: "option_id" }, message: "must have required property 'option_id'" };
              if (vErrors === null) {
                vErrors = [err25];
              } else {
                vErrors.push(err25);
              }
              errors++;
            }
            if (data11.label === void 0) {
              const err26 = { instancePath: instancePath + "/options/" + i0, schemaPath: "#/definitions/option/required", keyword: "required", params: { missingProperty: "label" }, message: "must have required property 'label'" };
              if (vErrors === null) {
                vErrors = [err26];
              } else {
                vErrors.push(err26);
              }
              errors++;
            }
            for (const key2 in data11) {
              if (!(key2 === "option_id" || key2 === "label" || key2 === "url" || key2 === "seek_to" || key2 === "mappings")) {
                delete data11[key2];
              }
            }
            if (data11.option_id !== void 0) {
              let data12 = data11.option_id;
              if (typeof data12 === "string") {
                if (func3(data12) < 1) {
                  const err27 = { instancePath: instancePath + "/options/" + i0 + "/option_id", schemaPath: "#/definitions/option/properties/option_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err27];
                  } else {
                    vErrors.push(err27);
                  }
                  errors++;
                }
              } else {
                const err28 = { instancePath: instancePath + "/options/" + i0 + "/option_id", schemaPath: "#/definitions/option/properties/option_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
            }
            if (data11.label !== void 0) {
              let data13 = data11.label;
              if (typeof data13 === "string") {
                if (func3(data13) < 1) {
                  const err29 = { instancePath: instancePath + "/options/" + i0 + "/label", schemaPath: "#/definitions/option/properties/label/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err29];
                  } else {
                    vErrors.push(err29);
                  }
                  errors++;
                }
              } else {
                const err30 = { instancePath: instancePath + "/options/" + i0 + "/label", schemaPath: "#/definitions/option/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err30];
                } else {
                  vErrors.push(err30);
                }
                errors++;
              }
            }
            if (data11.url !== void 0) {
              let data14 = data11.url;
              if (typeof data14 === "string") {
                if (!pattern1.test(data14)) {
                  const err31 = { instancePath: instancePath + "/options/" + i0 + "/url", schemaPath: "#/definitions/option/properties/url/pattern", keyword: "pattern", params: { pattern: "^https://" }, message: 'must match pattern "^https://"' };
                  if (vErrors === null) {
                    vErrors = [err31];
                  } else {
                    vErrors.push(err31);
                  }
                  errors++;
                }
              } else {
                const err32 = { instancePath: instancePath + "/options/" + i0 + "/url", schemaPath: "#/definitions/option/properties/url/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err32];
                } else {
                  vErrors.push(err32);
                }
                errors++;
              }
            }
            if (data11.seek_to !== void 0) {
              let data15 = data11.seek_to;
              if (typeof data15 == "number" && isFinite(data15)) {
                if (data15 < 0 || isNaN(data15)) {
                  const err33 = { instancePath: instancePath + "/options/" + i0 + "/seek_to", schemaPath: "#/definitions/option/properties/seek_to/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err33];
                  } else {
                    vErrors.push(err33);
                  }
                  errors++;
                }
              } else {
                const err34 = { instancePath: instancePath + "/options/" + i0 + "/seek_to", schemaPath: "#/definitions/option/properties/seek_to/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err34];
                } else {
                  vErrors.push(err34);
                }
                errors++;
              }
            }
            if (data11.mappings !== void 0) {
              let data16 = data11.mappings;
              if (data16 && typeof data16 == "object" && !Array.isArray(data16)) {
                for (const key3 in data16) {
                  if (!(key3 === "signal" || key3 === "effect")) {
                    delete data16[key3];
                  }
                }
                if (data16.signal !== void 0) {
                  let data17 = data16.signal;
                  if (typeof data17 !== "string") {
                    const err35 = { instancePath: instancePath + "/options/" + i0 + "/mappings/signal", schemaPath: "#/definitions/option/properties/mappings/properties/signal/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err35];
                    } else {
                      vErrors.push(err35);
                    }
                    errors++;
                  }
                  if (!(data17 === "clarity" || data17 === "confusion" || data17 === "application" || data17 === "other")) {
                    const err36 = { instancePath: instancePath + "/options/" + i0 + "/mappings/signal", schemaPath: "#/definitions/option/properties/mappings/properties/signal/enum", keyword: "enum", params: { allowedValues: schema17.properties.mappings.properties.signal.enum }, message: "must be equal to one of the allowed values" };
                    if (vErrors === null) {
                      vErrors = [err36];
                    } else {
                      vErrors.push(err36);
                    }
                    errors++;
                  }
                }
                if (data16.effect !== void 0) {
                  let data18 = data16.effect;
                  if (!(typeof data18 == "number" && isFinite(data18))) {
                    const err37 = { instancePath: instancePath + "/options/" + i0 + "/mappings/effect", schemaPath: "#/definitions/option/properties/mappings/properties/effect/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err37];
                    } else {
                      vErrors.push(err37);
                    }
                    errors++;
                  }
                }
              } else {
                const err38 = { instancePath: instancePath + "/options/" + i0 + "/mappings", schemaPath: "#/definitions/option/properties/mappings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err38];
                } else {
                  vErrors.push(err38);
                }
                errors++;
              }
            }
          } else {
            const err39 = { instancePath: instancePath + "/options/" + i0, schemaPath: "#/definitions/option/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err39];
            } else {
              vErrors.push(err39);
            }
            errors++;
          }
        }
      } else {
        const err40 = { instancePath: instancePath + "/options", schemaPath: "#/properties/options/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
    }
    if (data.tags !== void 0) {
      let data19 = data.tags;
      if (Array.isArray(data19)) {
        const len1 = data19.length;
        for (let i1 = 0; i1 < len1; i1++) {
          let data20 = data19[i1];
          if (data20 && typeof data20 == "object" && !Array.isArray(data20)) {
            if (data20.tag_id === void 0) {
              const err41 = { instancePath: instancePath + "/tags/" + i1, schemaPath: "#/definitions/tag/required", keyword: "required", params: { missingProperty: "tag_id" }, message: "must have required property 'tag_id'" };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
            if (data20.weight === void 0) {
              const err42 = { instancePath: instancePath + "/tags/" + i1, schemaPath: "#/definitions/tag/required", keyword: "required", params: { missingProperty: "weight" }, message: "must have required property 'weight'" };
              if (vErrors === null) {
                vErrors = [err42];
              } else {
                vErrors.push(err42);
              }
              errors++;
            }
            for (const key4 in data20) {
              if (!(key4 === "tag_id" || key4 === "weight")) {
                delete data20[key4];
              }
            }
            if (data20.tag_id !== void 0) {
              let data21 = data20.tag_id;
              if (typeof data21 === "string") {
                if (func3(data21) < 1) {
                  const err43 = { instancePath: instancePath + "/tags/" + i1 + "/tag_id", schemaPath: "#/definitions/tag/properties/tag_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err43];
                  } else {
                    vErrors.push(err43);
                  }
                  errors++;
                }
              } else {
                const err44 = { instancePath: instancePath + "/tags/" + i1 + "/tag_id", schemaPath: "#/definitions/tag/properties/tag_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err44];
                } else {
                  vErrors.push(err44);
                }
                errors++;
              }
            }
            if (data20.weight !== void 0) {
              let data22 = data20.weight;
              if (typeof data22 == "number" && isFinite(data22)) {
                if (data22 > 1 || isNaN(data22)) {
                  const err45 = { instancePath: instancePath + "/tags/" + i1 + "/weight", schemaPath: "#/definitions/tag/properties/weight/maximum", keyword: "maximum", params: { comparison: "<=", limit: 1 }, message: "must be <= 1" };
                  if (vErrors === null) {
                    vErrors = [err45];
                  } else {
                    vErrors.push(err45);
                  }
                  errors++;
                }
                if (data22 < 0 || isNaN(data22)) {
                  const err46 = { instancePath: instancePath + "/tags/" + i1 + "/weight", schemaPath: "#/definitions/tag/properties/weight/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err46];
                  } else {
                    vErrors.push(err46);
                  }
                  errors++;
                }
              } else {
                const err47 = { instancePath: instancePath + "/tags/" + i1 + "/weight", schemaPath: "#/definitions/tag/properties/weight/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
            }
          } else {
            const err48 = { instancePath: instancePath + "/tags/" + i1, schemaPath: "#/definitions/tag/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err48];
            } else {
              vErrors.push(err48);
            }
            errors++;
          }
        }
      } else {
        const err49 = { instancePath: instancePath + "/tags", schemaPath: "#/properties/tags/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
    }
    if (data.correct_option_id !== void 0) {
      if (typeof data.correct_option_id !== "string") {
        const err50 = { instancePath: instancePath + "/correct_option_id", schemaPath: "#/properties/correct_option_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err50];
        } else {
          vErrors.push(err50);
        }
        errors++;
      }
    }
    if (data.replay_segment_start !== void 0) {
      let data24 = data.replay_segment_start;
      if (typeof data24 == "number" && isFinite(data24)) {
        if (data24 < 0 || isNaN(data24)) {
          const err51 = { instancePath: instancePath + "/replay_segment_start", schemaPath: "#/properties/replay_segment_start/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err51];
          } else {
            vErrors.push(err51);
          }
          errors++;
        }
      } else {
        const err52 = { instancePath: instancePath + "/replay_segment_start", schemaPath: "#/properties/replay_segment_start/type", keyword: "type", params: { type: "number" }, message: "must be number" };
        if (vErrors === null) {
          vErrors = [err52];
        } else {
          vErrors.push(err52);
        }
        errors++;
      }
    }
    if (data.seek_to !== void 0) {
      let data25 = data.seek_to;
      if (typeof data25 == "number" && isFinite(data25)) {
        if (data25 < 0 || isNaN(data25)) {
          const err53 = { instancePath: instancePath + "/seek_to", schemaPath: "#/properties/seek_to/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err53];
          } else {
            vErrors.push(err53);
          }
          errors++;
        }
      } else {
        const err54 = { instancePath: instancePath + "/seek_to", schemaPath: "#/properties/seek_to/type", keyword: "type", params: { type: "number" }, message: "must be number" };
        if (vErrors === null) {
          vErrors = [err54];
        } else {
          vErrors.push(err54);
        }
        errors++;
      }
    }
    if (data.scale !== void 0) {
      let data26 = data.scale;
      if (data26 && typeof data26 == "object" && !Array.isArray(data26)) {
        if (data26.min === void 0) {
          const err55 = { instancePath: instancePath + "/scale", schemaPath: "#/definitions/scale/required", keyword: "required", params: { missingProperty: "min" }, message: "must have required property 'min'" };
          if (vErrors === null) {
            vErrors = [err55];
          } else {
            vErrors.push(err55);
          }
          errors++;
        }
        if (data26.max === void 0) {
          const err56 = { instancePath: instancePath + "/scale", schemaPath: "#/definitions/scale/required", keyword: "required", params: { missingProperty: "max" }, message: "must have required property 'max'" };
          if (vErrors === null) {
            vErrors = [err56];
          } else {
            vErrors.push(err56);
          }
          errors++;
        }
        for (const key5 in data26) {
          if (!(key5 === "min" || key5 === "max" || key5 === "min_label" || key5 === "max_label")) {
            delete data26[key5];
          }
        }
        if (data26.min !== void 0) {
          let data27 = data26.min;
          if (!(typeof data27 == "number" && (!(data27 % 1) && !isNaN(data27)) && isFinite(data27))) {
            const err57 = { instancePath: instancePath + "/scale/min", schemaPath: "#/definitions/scale/properties/min/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err57];
            } else {
              vErrors.push(err57);
            }
            errors++;
          }
        }
        if (data26.max !== void 0) {
          let data28 = data26.max;
          if (!(typeof data28 == "number" && (!(data28 % 1) && !isNaN(data28)) && isFinite(data28))) {
            const err58 = { instancePath: instancePath + "/scale/max", schemaPath: "#/definitions/scale/properties/max/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err58];
            } else {
              vErrors.push(err58);
            }
            errors++;
          }
        }
        if (data26.min_label !== void 0) {
          if (typeof data26.min_label !== "string") {
            const err59 = { instancePath: instancePath + "/scale/min_label", schemaPath: "#/definitions/scale/properties/min_label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err59];
            } else {
              vErrors.push(err59);
            }
            errors++;
          }
        }
        if (data26.max_label !== void 0) {
          if (typeof data26.max_label !== "string") {
            const err60 = { instancePath: instancePath + "/scale/max_label", schemaPath: "#/definitions/scale/properties/max_label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err60];
            } else {
              vErrors.push(err60);
            }
            errors++;
          }
        }
      } else {
        const err61 = { instancePath: instancePath + "/scale", schemaPath: "#/definitions/scale/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err61];
        } else {
          vErrors.push(err61);
        }
        errors++;
      }
    }
    if (data.context !== void 0) {
      let data31 = data.context;
      if (data31 && typeof data31 == "object" && !Array.isArray(data31)) {
        for (const key6 in data31) {
          if (!(key6 === "domain" || key6 === "category_id" || key6 === "category" || key6 === "topic_id" || key6 === "topic")) {
            delete data31[key6];
          }
        }
        if (data31.domain !== void 0) {
          if (typeof data31.domain !== "string") {
            const err62 = { instancePath: instancePath + "/context/domain", schemaPath: "#/definitions/context/properties/domain/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err62];
            } else {
              vErrors.push(err62);
            }
            errors++;
          }
        }
        if (data31.category_id !== void 0) {
          if (typeof data31.category_id !== "string") {
            const err63 = { instancePath: instancePath + "/context/category_id", schemaPath: "#/definitions/context/properties/category_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err63];
            } else {
              vErrors.push(err63);
            }
            errors++;
          }
        }
        if (data31.category !== void 0) {
          if (typeof data31.category !== "string") {
            const err64 = { instancePath: instancePath + "/context/category", schemaPath: "#/definitions/context/properties/category/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err64];
            } else {
              vErrors.push(err64);
            }
            errors++;
          }
        }
        if (data31.topic_id !== void 0) {
          if (typeof data31.topic_id !== "string") {
            const err65 = { instancePath: instancePath + "/context/topic_id", schemaPath: "#/definitions/context/properties/topic_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err65];
            } else {
              vErrors.push(err65);
            }
            errors++;
          }
        }
        if (data31.topic !== void 0) {
          if (typeof data31.topic !== "string") {
            const err66 = { instancePath: instancePath + "/context/topic", schemaPath: "#/definitions/context/properties/topic/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err66];
            } else {
              vErrors.push(err66);
            }
            errors++;
          }
        }
      } else {
        const err67 = { instancePath: instancePath + "/context", schemaPath: "#/definitions/context/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err67];
        } else {
          vErrors.push(err67);
        }
        errors++;
      }
    }
    if (data.cta !== void 0) {
      let data37 = data.cta;
      if (data37 && typeof data37 == "object" && !Array.isArray(data37)) {
        if (data37.kind === void 0) {
          const err68 = { instancePath: instancePath + "/cta", schemaPath: "#/definitions/cta/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err68];
          } else {
            vErrors.push(err68);
          }
          errors++;
        }
        if (data37.url === void 0) {
          const err69 = { instancePath: instancePath + "/cta", schemaPath: "#/definitions/cta/required", keyword: "required", params: { missingProperty: "url" }, message: "must have required property 'url'" };
          if (vErrors === null) {
            vErrors = [err69];
          } else {
            vErrors.push(err69);
          }
          errors++;
        }
        for (const key7 in data37) {
          if (!(key7 === "kind" || key7 === "url" || key7 === "image_url" || key7 === "button_label" || key7 === "price" || key7 === "disclosure")) {
            delete data37[key7];
          }
        }
        if (data37.kind !== void 0) {
          let data38 = data37.kind;
          if (typeof data38 === "string") {
            if (func3(data38) < 1) {
              const err70 = { instancePath: instancePath + "/cta/kind", schemaPath: "#/definitions/cta/properties/kind/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err70];
              } else {
                vErrors.push(err70);
              }
              errors++;
            }
          } else {
            const err71 = { instancePath: instancePath + "/cta/kind", schemaPath: "#/definitions/cta/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err71];
            } else {
              vErrors.push(err71);
            }
            errors++;
          }
        }
        if (data37.url !== void 0) {
          let data39 = data37.url;
          if (typeof data39 === "string") {
            if (!pattern1.test(data39)) {
              const err72 = { instancePath: instancePath + "/cta/url", schemaPath: "#/definitions/cta/properties/url/pattern", keyword: "pattern", params: { pattern: "^https://" }, message: 'must match pattern "^https://"' };
              if (vErrors === null) {
                vErrors = [err72];
              } else {
                vErrors.push(err72);
              }
              errors++;
            }
          } else {
            const err73 = { instancePath: instancePath + "/cta/url", schemaPath: "#/definitions/cta/properties/url/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err73];
            } else {
              vErrors.push(err73);
            }
            errors++;
          }
        }
        if (data37.image_url !== void 0) {
          let data40 = data37.image_url;
          if (typeof data40 === "string") {
            if (!pattern1.test(data40)) {
              const err74 = { instancePath: instancePath + "/cta/image_url", schemaPath: "#/definitions/cta/properties/image_url/pattern", keyword: "pattern", params: { pattern: "^https://" }, message: 'must match pattern "^https://"' };
              if (vErrors === null) {
                vErrors = [err74];
              } else {
                vErrors.push(err74);
              }
              errors++;
            }
          } else {
            const err75 = { instancePath: instancePath + "/cta/image_url", schemaPath: "#/definitions/cta/properties/image_url/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err75];
            } else {
              vErrors.push(err75);
            }
            errors++;
          }
        }
        if (data37.button_label !== void 0) {
          if (typeof data37.button_label !== "string") {
            const err76 = { instancePath: instancePath + "/cta/button_label", schemaPath: "#/definitions/cta/properties/button_label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err76];
            } else {
              vErrors.push(err76);
            }
            errors++;
          }
        }
        if (data37.price !== void 0) {
          if (typeof data37.price !== "string") {
            const err77 = { instancePath: instancePath + "/cta/price", schemaPath: "#/definitions/cta/properties/price/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err77];
            } else {
              vErrors.push(err77);
            }
            errors++;
          }
        }
        if (data37.disclosure !== void 0) {
          if (typeof data37.disclosure !== "string") {
            const err78 = { instancePath: instancePath + "/cta/disclosure", schemaPath: "#/definitions/cta/properties/disclosure/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err78];
            } else {
              vErrors.push(err78);
            }
            errors++;
          }
        }
      } else {
        const err79 = { instancePath: instancePath + "/cta", schemaPath: "#/definitions/cta/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err79];
        } else {
          vErrors.push(err79);
        }
        errors++;
      }
    }
    if (data.position !== void 0) {
      let data44 = data.position;
      if (typeof data44 !== "string") {
        const err80 = { instancePath: instancePath + "/position", schemaPath: "#/definitions/position/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err80];
        } else {
          vErrors.push(err80);
        }
        errors++;
      }
      if (!(data44 === "top-left" || data44 === "top-center" || data44 === "top-right" || data44 === "middle-left" || data44 === "center" || data44 === "middle-right" || data44 === "bottom-left" || data44 === "bottom-center" || data44 === "bottom-right")) {
        const err81 = { instancePath: instancePath + "/position", schemaPath: "#/definitions/position/enum", keyword: "enum", params: { allowedValues: schema22.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err81];
        } else {
          vErrors.push(err81);
        }
        errors++;
      }
    }
    if (data.card_style !== void 0) {
      let data45 = data.card_style;
      if (typeof data45 !== "string") {
        const err82 = { instancePath: instancePath + "/card_style", schemaPath: "#/definitions/cardStyle/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err82];
        } else {
          vErrors.push(err82);
        }
        errors++;
      }
      if (!(data45 === "default" || data45 === "compact" || data45 === "minimal" || data45 === "bold" || data45 === "horror" || data45 === "title_card")) {
        const err83 = { instancePath: instancePath + "/card_style", schemaPath: "#/definitions/cardStyle/enum", keyword: "enum", params: { allowedValues: schema23.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err83];
        } else {
          vErrors.push(err83);
        }
        errors++;
      }
    }
    if (data.image_url !== void 0) {
      let data46 = data.image_url;
      if (typeof data46 === "string") {
        if (!pattern1.test(data46)) {
          const err84 = { instancePath: instancePath + "/image_url", schemaPath: "#/properties/image_url/pattern", keyword: "pattern", params: { pattern: "^https://" }, message: 'must match pattern "^https://"' };
          if (vErrors === null) {
            vErrors = [err84];
          } else {
            vErrors.push(err84);
          }
          errors++;
        }
      } else {
        const err85 = { instancePath: instancePath + "/image_url", schemaPath: "#/properties/image_url/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err85];
        } else {
          vErrors.push(err85);
        }
        errors++;
      }
    }
    if (data.caption !== void 0) {
      if (typeof data.caption !== "string") {
        const err86 = { instancePath: instancePath + "/caption", schemaPath: "#/properties/caption/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err86];
        } else {
          vErrors.push(err86);
        }
        errors++;
      }
    }
    if (data.followups !== void 0) {
      let data48 = data.followups;
      if (Array.isArray(data48)) {
        const len2 = data48.length;
        for (let i2 = 0; i2 < len2; i2++) {
          if (!validate13(data48[i2], { instancePath: instancePath + "/followups/" + i2, parentData: data48, parentDataProperty: i2, rootData })) {
            vErrors = vErrors === null ? validate13.errors : vErrors.concat(validate13.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err87 = { instancePath: instancePath + "/followups", schemaPath: "#/properties/followups/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err87];
        } else {
          vErrors.push(err87);
        }
        errors++;
      }
    }
  } else {
    const err88 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err88];
    } else {
      vErrors.push(err88);
    }
    errors++;
  }
  validate12.errors = vErrors;
  return errors === 0;
}
function validate11(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.schema_version === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "schema_version" }, message: "must have required property 'schema_version'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.client_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "client_id" }, message: "must have required property 'client_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.video_id === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "video_id" }, message: "must have required property 'video_id'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.generated_at === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "generated_at" }, message: "must have required property 'generated_at'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.items === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "items" }, message: "must have required property 'items'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func2.call(schema14.properties, key0)) {
        delete data[key0];
      }
    }
    if (data.schema_version !== void 0) {
      if (typeof data.schema_version !== "string") {
        const err5 = { instancePath: instancePath + "/schema_version", schemaPath: "#/properties/schema_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.client_id !== void 0) {
      let data1 = data.client_id;
      if (typeof data1 === "string") {
        if (func3(data1) < 1) {
          const err6 = { instancePath: instancePath + "/client_id", schemaPath: "#/properties/client_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/client_id", schemaPath: "#/properties/client_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.video_id !== void 0) {
      let data2 = data.video_id;
      if (typeof data2 === "string") {
        if (func3(data2) < 1) {
          const err8 = { instancePath: instancePath + "/video_id", schemaPath: "#/properties/video_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/video_id", schemaPath: "#/properties/video_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.video_title !== void 0) {
      if (typeof data.video_title !== "string") {
        const err10 = { instancePath: instancePath + "/video_title", schemaPath: "#/properties/video_title/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.branch_brief !== void 0) {
      if (typeof data.branch_brief !== "string") {
        const err11 = { instancePath: instancePath + "/branch_brief", schemaPath: "#/properties/branch_brief/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.generated_at !== void 0) {
      if (!(typeof data.generated_at === "string")) {
        const err12 = { instancePath: instancePath + "/generated_at", schemaPath: "#/properties/generated_at/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.generator !== void 0) {
      let data6 = data.generator;
      if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
        if (data6.provider === void 0) {
          const err13 = { instancePath: instancePath + "/generator", schemaPath: "#/properties/generator/required", keyword: "required", params: { missingProperty: "provider" }, message: "must have required property 'provider'" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        for (const key1 in data6) {
          if (!(key1 === "provider" || key1 === "model")) {
            delete data6[key1];
          }
        }
        if (data6.provider !== void 0) {
          let data7 = data6.provider;
          if (typeof data7 === "string") {
            if (func3(data7) < 1) {
              const err14 = { instancePath: instancePath + "/generator/provider", schemaPath: "#/properties/generator/properties/provider/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
              }
              errors++;
            }
          } else {
            const err15 = { instancePath: instancePath + "/generator/provider", schemaPath: "#/properties/generator/properties/provider/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data6.model !== void 0) {
          if (typeof data6.model !== "string") {
            const err16 = { instancePath: instancePath + "/generator/model", schemaPath: "#/properties/generator/properties/model/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err16];
            } else {
              vErrors.push(err16);
            }
            errors++;
          }
        }
      } else {
        const err17 = { instancePath: instancePath + "/generator", schemaPath: "#/properties/generator/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.context !== void 0) {
      let data9 = data.context;
      if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
        for (const key2 in data9) {
          if (!(key2 === "domain" || key2 === "category_id" || key2 === "category" || key2 === "topic_id" || key2 === "topic")) {
            delete data9[key2];
          }
        }
        if (data9.domain !== void 0) {
          if (typeof data9.domain !== "string") {
            const err18 = { instancePath: instancePath + "/context/domain", schemaPath: "#/definitions/context/properties/domain/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
        if (data9.category_id !== void 0) {
          if (typeof data9.category_id !== "string") {
            const err19 = { instancePath: instancePath + "/context/category_id", schemaPath: "#/definitions/context/properties/category_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err19];
            } else {
              vErrors.push(err19);
            }
            errors++;
          }
        }
        if (data9.category !== void 0) {
          if (typeof data9.category !== "string") {
            const err20 = { instancePath: instancePath + "/context/category", schemaPath: "#/definitions/context/properties/category/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err20];
            } else {
              vErrors.push(err20);
            }
            errors++;
          }
        }
        if (data9.topic_id !== void 0) {
          if (typeof data9.topic_id !== "string") {
            const err21 = { instancePath: instancePath + "/context/topic_id", schemaPath: "#/definitions/context/properties/topic_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err21];
            } else {
              vErrors.push(err21);
            }
            errors++;
          }
        }
        if (data9.topic !== void 0) {
          if (typeof data9.topic !== "string") {
            const err22 = { instancePath: instancePath + "/context/topic", schemaPath: "#/definitions/context/properties/topic/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
        }
      } else {
        const err23 = { instancePath: instancePath + "/context", schemaPath: "#/definitions/context/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
    }
    if (data.intro !== void 0) {
      let data15 = data.intro;
      if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
        for (const key3 in data15) {
          if (!(key3 === "body" || key3 === "fullscreen" || key3 === "subscribe_url" || key3 === "countdown_sec")) {
            delete data15[key3];
          }
        }
        if (data15.body !== void 0) {
          if (typeof data15.body !== "string") {
            const err24 = { instancePath: instancePath + "/intro/body", schemaPath: "#/properties/intro/properties/body/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
            }
            errors++;
          }
        }
        if (data15.fullscreen !== void 0) {
          if (typeof data15.fullscreen !== "boolean") {
            const err25 = { instancePath: instancePath + "/intro/fullscreen", schemaPath: "#/properties/intro/properties/fullscreen/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err25];
            } else {
              vErrors.push(err25);
            }
            errors++;
          }
        }
        if (data15.subscribe_url !== void 0) {
          let data18 = data15.subscribe_url;
          if (typeof data18 === "string") {
            if (!pattern1.test(data18)) {
              const err26 = { instancePath: instancePath + "/intro/subscribe_url", schemaPath: "#/properties/intro/properties/subscribe_url/pattern", keyword: "pattern", params: { pattern: "^https://" }, message: 'must match pattern "^https://"' };
              if (vErrors === null) {
                vErrors = [err26];
              } else {
                vErrors.push(err26);
              }
              errors++;
            }
          } else {
            const err27 = { instancePath: instancePath + "/intro/subscribe_url", schemaPath: "#/properties/intro/properties/subscribe_url/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
        if (data15.countdown_sec !== void 0) {
          let data19 = data15.countdown_sec;
          if (typeof data19 == "number" && isFinite(data19)) {
            if (data19 > 30 || isNaN(data19)) {
              const err28 = { instancePath: instancePath + "/intro/countdown_sec", schemaPath: "#/properties/intro/properties/countdown_sec/maximum", keyword: "maximum", params: { comparison: "<=", limit: 30 }, message: "must be <= 30" };
              if (vErrors === null) {
                vErrors = [err28];
              } else {
                vErrors.push(err28);
              }
              errors++;
            }
            if (data19 < 1 || isNaN(data19)) {
              const err29 = { instancePath: instancePath + "/intro/countdown_sec", schemaPath: "#/properties/intro/properties/countdown_sec/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
              if (vErrors === null) {
                vErrors = [err29];
              } else {
                vErrors.push(err29);
              }
              errors++;
            }
          } else {
            const err30 = { instancePath: instancePath + "/intro/countdown_sec", schemaPath: "#/properties/intro/properties/countdown_sec/type", keyword: "type", params: { type: "number" }, message: "must be number" };
            if (vErrors === null) {
              vErrors = [err30];
            } else {
              vErrors.push(err30);
            }
            errors++;
          }
        }
      } else {
        const err31 = { instancePath: instancePath + "/intro", schemaPath: "#/properties/intro/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      }
    }
    if (data.segments !== void 0) {
      let data20 = data.segments;
      if (Array.isArray(data20)) {
        const len0 = data20.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data21 = data20[i0];
          if (data21 && typeof data21 == "object" && !Array.isArray(data21)) {
            if (data21.segment_id === void 0) {
              const err32 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/properties/segments/items/required", keyword: "required", params: { missingProperty: "segment_id" }, message: "must have required property 'segment_id'" };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
            if (data21.start === void 0) {
              const err33 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/properties/segments/items/required", keyword: "required", params: { missingProperty: "start" }, message: "must have required property 'start'" };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
            if (data21.end === void 0) {
              const err34 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/properties/segments/items/required", keyword: "required", params: { missingProperty: "end" }, message: "must have required property 'end'" };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
            for (const key4 in data21) {
              if (!(key4 === "segment_id" || key4 === "start" || key4 === "end" || key4 === "label")) {
                delete data21[key4];
              }
            }
            if (data21.segment_id !== void 0) {
              if (typeof data21.segment_id !== "string") {
                const err35 = { instancePath: instancePath + "/segments/" + i0 + "/segment_id", schemaPath: "#/properties/segments/items/properties/segment_id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err35];
                } else {
                  vErrors.push(err35);
                }
                errors++;
              }
            }
            if (data21.start !== void 0) {
              let data23 = data21.start;
              if (typeof data23 == "number" && isFinite(data23)) {
                if (data23 < 0 || isNaN(data23)) {
                  const err36 = { instancePath: instancePath + "/segments/" + i0 + "/start", schemaPath: "#/properties/segments/items/properties/start/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err36];
                  } else {
                    vErrors.push(err36);
                  }
                  errors++;
                }
              } else {
                const err37 = { instancePath: instancePath + "/segments/" + i0 + "/start", schemaPath: "#/properties/segments/items/properties/start/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
            }
            if (data21.end !== void 0) {
              let data24 = data21.end;
              if (typeof data24 == "number" && isFinite(data24)) {
                if (data24 < 0 || isNaN(data24)) {
                  const err38 = { instancePath: instancePath + "/segments/" + i0 + "/end", schemaPath: "#/properties/segments/items/properties/end/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err38];
                  } else {
                    vErrors.push(err38);
                  }
                  errors++;
                }
              } else {
                const err39 = { instancePath: instancePath + "/segments/" + i0 + "/end", schemaPath: "#/properties/segments/items/properties/end/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err39];
                } else {
                  vErrors.push(err39);
                }
                errors++;
              }
            }
            if (data21.label !== void 0) {
              if (typeof data21.label !== "string") {
                const err40 = { instancePath: instancePath + "/segments/" + i0 + "/label", schemaPath: "#/properties/segments/items/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err40];
                } else {
                  vErrors.push(err40);
                }
                errors++;
              }
            }
          } else {
            const err41 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/properties/segments/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err41];
            } else {
              vErrors.push(err41);
            }
            errors++;
          }
        }
      } else {
        const err42 = { instancePath: instancePath + "/segments", schemaPath: "#/properties/segments/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err42];
        } else {
          vErrors.push(err42);
        }
        errors++;
      }
    }
    if (data.items !== void 0) {
      let data26 = data.items;
      if (Array.isArray(data26)) {
        if (data26.length < 1) {
          const err43 = { instancePath: instancePath + "/items", schemaPath: "#/properties/items/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err43];
          } else {
            vErrors.push(err43);
          }
          errors++;
        }
        const len1 = data26.length;
        for (let i1 = 0; i1 < len1; i1++) {
          if (!validate12(data26[i1], { instancePath: instancePath + "/items/" + i1, parentData: data26, parentDataProperty: i1, rootData })) {
            vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err44 = { instancePath: instancePath + "/items", schemaPath: "#/properties/items/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err44];
        } else {
          vErrors.push(err44);
        }
        errors++;
      }
    }
  } else {
    const err45 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err45];
    } else {
      vErrors.push(err45);
    }
    errors++;
  }
  validate11.errors = vErrors;
  return errors === 0;
}

// ../../platform/kernel/dist/validation/index.js
function getErrors(compiled) {
  const errs = compiled.errors ?? [];
  return errs.map((e) => `${e.instancePath || "/"} ${e.message ?? "unknown error"}`);
}
function str(v) {
  return typeof v === "string" ? v : void 0;
}
function validatePackEnvelope(raw) {
  const valid = validatePackEnvelopeSchema(raw);
  const errors = getErrors(validatePackEnvelopeSchema);
  if (valid) {
    return { value: raw, errors: [], valid: true };
  }
  const partial = typeof raw === "object" && raw !== null ? raw : {};
  const value = {
    schema_version: str(partial.schema_version) ?? "1.0.0",
    client_id: str(partial.client_id) ?? "unknown",
    video_id: str(partial.video_id) ?? "unknown",
    generated_at: str(partial.generated_at) ?? (/* @__PURE__ */ new Date(0)).toISOString(),
    ...Array.isArray(partial.segments) ? { segments: partial.segments } : {},
    items: Array.isArray(partial.items) ? partial.items : []
  };
  return { value, errors, valid: false };
}

// ../../platform/kernel/dist/triggers/index.js
var TRIGGER_DEFAULTS = {
  /** Window (seconds) an anchor stays eligible after its start point. */
  promptWindowSec: 2,
  /** Minimum pause length before a pause-anchored item fires. */
  minPauseSec: 2,
  /** How close to the end (seconds) counts as video_end when no ended flag. */
  videoEndEpsilonSec: 1
};
function createSession() {
  return { shown: /* @__PURE__ */ new Set(), shownThisVideo: 0, shownThisSession: 0 };
}
function segmentById(segments, segment_id) {
  if (!segments || segment_id === void 0)
    return void 0;
  return segments.find((s) => s.segment_id === segment_id);
}
function anchorEligible(item, state, segments, windowSec) {
  const anchor = item.anchor;
  switch (anchor.mode) {
    case "time_window": {
      const start = anchor.start ?? 0;
      const end = anchor.end ?? start + windowSec;
      const prev = state.prevNow ?? state.now;
      return state.now >= start && prev <= end;
    }
    case "segment_end": {
      const segment = segmentById(segments, anchor.segment_id);
      if (!segment)
        return false;
      return state.now >= segment.end && state.now <= segment.end + windowSec;
    }
    case "pause": {
      const minPause = anchor.min_pause_sec ?? TRIGGER_DEFAULTS.minPauseSec;
      return state.paused && state.pausedForSec >= minPause;
    }
    case "video_end": {
      if (state.ended)
        return true;
      if (state.duration === void 0)
        return false;
      return state.now >= state.duration - TRIGGER_DEFAULTS.videoEndEpsilonSec;
    }
    case "immediate":
      return true;
    default:
      return false;
  }
}
function crossedStart(item, state) {
  if (item.anchor.mode !== "time_window")
    return false;
  const start = item.anchor.start ?? 0;
  const prev = state.prevNow ?? state.now;
  return prev < start && state.now >= start;
}
function nextItem(pack2, state, session2, caps) {
  const windowSec = caps.promptWindowSec ?? TRIGGER_DEFAULTS.promptWindowSec;
  const newCapReached = session2.shownThisVideo >= caps.maxItemsPerVideo || session2.shownThisSession >= caps.maxItemsPerSession;
  if (!newCapReached) {
    for (const item of pack2.items) {
      if (session2.shown.has(item.item_id))
        continue;
      const enters = item.anchor.mode === "time_window" ? crossedStart(item, state) : anchorEligible(item, state, pack2.segments, windowSec);
      if (enters)
        return item;
    }
  }
  for (const item of pack2.items) {
    if (session2.shown.has(item.item_id) && crossedStart(item, state))
      return item;
  }
  return null;
}
function markShown(session2, item_id) {
  if (session2.shown.has(item_id))
    return;
  session2.shown.add(item_id);
  session2.shownThisVideo++;
  session2.shownThisSession++;
}

// ../../platform/kernel/dist/triage/index.js
var TRIAGE_DEFAULTS = {
  binSeconds: 30,
  /** Bins with fewer events than this are gated (⚠ tune with pilot data). */
  minSamplePerBin: 30,
  severity: { critical: 0.6, high: 0.4, medium: 0.2 },
  intervention: { reEdit: 0.6, explainer: 0.4, example: 0.3, pacingSkipRate: 0.4 }
};
var WRONG_ANSWER_DEFAULTS = {
  /** Flag when one wrong option's share of all answers reaches this. */
  shareThreshold: 0.4,
  /** Minimum answers before a verdict — mirrors the triage sample gate. */
  minSample: TRIAGE_DEFAULTS.minSamplePerBin
};
var HARD_EXITS = new Set(HARD_EXIT_REASONS);
var DROPOFF_DEFAULTS = {
  binSeconds: TRIAGE_DEFAULTS.binSeconds,
  minSample: TRIAGE_DEFAULTS.minSamplePerBin,
  /** A 15-point retention drop in one 30s bin (⚠ tune with pilot data). */
  dropThreshold: 0.15
};

// ../../platform/kernel/dist/followups/index.js
function answerOutcome(prompt, optionId) {
  if (prompt.correct_option_id === void 0 || optionId === void 0)
    return "neutral";
  return optionId === prompt.correct_option_id ? "correct" : "wrong";
}
function pickFollowup(prompt, outcome, depth) {
  if (depth >= MAX_FOLLOWUP_DEPTH)
    return null;
  if (outcome !== "correct" && outcome !== "wrong")
    return null;
  return prompt.followups?.find((f) => f.on === outcome)?.prompt ?? null;
}
function isDeepDiveComplete(prompt, outcome, depth) {
  return outcome === "correct" && pickFollowup(prompt, "correct", depth) === null;
}

// ../../platform/primitives/dist/shared.js
var STRING_DEFAULTS = {
  overlay_title: "Reflect",
  dismiss_label: "Dismiss",
  skip_label: "Skip",
  submit_label: "Submit",
  link_label: "Learn more",
  feedback_up_label: "Good prompt",
  feedback_down_label: "Not helpful",
  snooze_label: "Snooze prompts",
  snooze_video_label: "Rest of this video",
  snooze_day_label: "For today",
  unknown_primitive_label: "This prompt type isn't supported yet.",
  up_next_label: "Up next:",
  up_next_jump_label: "Jump ahead \u2192",
  save_note_label: "Save to notebook",
  note_saved_label: "Saved \u2713",
  copy_label: "Copy prompt",
  copied_label: "Copied \u2713",
  intro_subscribe_label: "Subscribe",
  intro_fullscreen_label: "Watch fullscreen",
  intro_keep_label: "Keep as is",
  intro_cancel_label: "Cancel"
};
function resolveStrings(strings) {
  return { ...STRING_DEFAULTS, ...strings };
}
function isSafeUrl(url) {
  if (typeof url !== "string")
    return false;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}
function createCard(item, strings, callbacks, style, opts = {}) {
  const onDismiss = callbacks.onDismiss;
  const card = document.createElement("div");
  card.className = "ce-card";
  card.dataset["itemId"] = item.item_id;
  card.dataset["primitive"] = item.primitive;
  card.dataset["style"] = normalizeCardStyle(style);
  if (item.position !== void 0)
    card.dataset["position"] = normalizeCardPosition(item.position);
  card.setAttribute("role", "group");
  card.setAttribute("aria-live", "polite");
  card.setAttribute("aria-label", strings.overlay_title);
  const header = document.createElement("div");
  header.className = "ce-header";
  const titleText = opts.titleOverride ?? strings.overlay_title;
  if (titleText) {
    const title = document.createElement("div");
    title.className = "ce-title";
    title.textContent = titleText;
    header.appendChild(title);
  }
  if (callbacks.onSnooze)
    header.appendChild(createSnoozeControl(strings, callbacks.onSnooze));
  if (callbacks.onCopy) {
    header.appendChild(createHeaderAction("\u{1F4CB}", strings.copy_label, "ce-copy", "\u2713", strings.copied_label, callbacks.onCopy));
  }
  if (callbacks.onSaveNote) {
    header.appendChild(createHeaderAction("\u{1F4DD}", strings.save_note_label, "ce-savenote", "\u{1F4D3}", strings.note_saved_label, callbacks.onSaveNote));
  }
  const dismiss = document.createElement("button");
  dismiss.type = "button";
  dismiss.className = "ce-dismiss";
  dismiss.textContent = "\u2715";
  dismiss.title = strings.dismiss_label;
  dismiss.setAttribute("aria-label", strings.dismiss_label);
  dismiss.addEventListener("click", onDismiss);
  header.appendChild(dismiss);
  card.appendChild(header);
  if (item.image_url !== void 0 && isSafeUrl(item.image_url)) {
    const img = document.createElement("img");
    img.className = "ce-card-image";
    img.src = item.image_url;
    img.alt = "";
    img.loading = "lazy";
    card.appendChild(img);
  }
  if (item.caption !== void 0 && item.caption.length > 0) {
    const caption = document.createElement("div");
    caption.className = "ce-caption";
    caption.textContent = item.caption;
    card.appendChild(caption);
  }
  const body = document.createElement("div");
  body.className = "ce-body";
  body.textContent = item.body;
  if (item.body.length > 240)
    body.dataset["len"] = "xlong";
  else if (item.body.length > 140)
    body.dataset["len"] = "long";
  card.appendChild(body);
  const content = document.createElement("div");
  content.className = "ce-content";
  card.appendChild(content);
  if (callbacks.onFeedback)
    card.appendChild(createFeedbackBar(strings, callbacks.onFeedback));
  return { card, content };
}
function createHeaderAction(glyph, label, className, doneGlyph, doneLabel, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `ce-hdr-action ${className}`;
  btn.textContent = glyph;
  btn.title = label;
  btn.setAttribute("aria-label", label);
  btn.addEventListener("click", () => {
    if (btn.dataset["done"] === "true")
      return;
    btn.dataset["done"] = "true";
    btn.textContent = doneGlyph;
    btn.title = doneLabel;
    btn.setAttribute("aria-label", doneLabel);
    onClick();
  });
  return btn;
}
function createSnoozeControl(strings, onSnooze) {
  const wrap = document.createElement("div");
  wrap.className = "ce-snooze";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "ce-snooze-toggle";
  toggle.textContent = "\u{1F515}";
  toggle.title = strings.snooze_label;
  toggle.setAttribute("aria-label", strings.snooze_label);
  const menu = document.createElement("div");
  menu.className = "ce-snooze-menu";
  menu.dataset["open"] = "false";
  const option = (scope, label) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ce-snooze-opt";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      menu.dataset["open"] = "false";
      onSnooze(scope);
    });
    return btn;
  };
  menu.appendChild(option("video", strings.snooze_video_label));
  menu.appendChild(option("day", strings.snooze_day_label));
  toggle.addEventListener("click", () => {
    menu.dataset["open"] = menu.dataset["open"] === "true" ? "false" : "true";
  });
  wrap.appendChild(toggle);
  wrap.appendChild(menu);
  return wrap;
}
function createFeedbackBar(strings, onFeedback) {
  const bar = document.createElement("div");
  bar.className = "ce-feedback";
  const make = (value, glyph, label) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ce-fb-btn";
    btn.dataset["feedback"] = value;
    btn.textContent = glyph;
    btn.title = label;
    btn.setAttribute("aria-label", label);
    btn.addEventListener("click", () => {
      if (bar.dataset["done"] === "true")
        return;
      bar.dataset["done"] = "true";
      btn.classList.add("ce-fb-chosen");
      for (const b of Array.from(bar.querySelectorAll("button")))
        b.disabled = true;
      onFeedback(value);
    });
    return btn;
  };
  bar.appendChild(make("up", "\u{1F44D}", strings.feedback_up_label));
  bar.appendChild(make("down", "\u{1F44E}", strings.feedback_down_label));
  return bar;
}
function createLinkButton(url, strings, onLinkClick) {
  if (!isSafeUrl(url))
    return null;
  const link = document.createElement("a");
  link.className = "ce-btn ce-btn-link";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "\u2197";
  link.title = strings.link_label;
  link.setAttribute("aria-label", strings.link_label);
  if (onLinkClick) {
    link.addEventListener("click", () => onLinkClick(url));
  }
  return link;
}

// ../../platform/primitives/dist/single-choice.js
function renderSingleChoice(item, callbacks, strings, style) {
  const s = resolveStrings(strings);
  const { card, content } = createCard(item, s, callbacks, style);
  const actions = document.createElement("div");
  actions.className = "ce-actions";
  const buttons = /* @__PURE__ */ new Map();
  for (const option of item.options ?? []) {
    const wrap = document.createElement("div");
    wrap.className = "ce-choice-wrap";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ce-btn ce-btn-choice";
    btn.dataset["optionId"] = option.option_id;
    btn.textContent = option.label;
    buttons.set(option.option_id, btn);
    btn.addEventListener("click", () => {
      if (card.dataset["answered"] === "true")
        return;
      card.dataset["answered"] = "true";
      for (const b of buttons.values())
        b.disabled = true;
      btn.classList.add("ce-chosen");
      if (item.correct_option_id !== void 0) {
        buttons.get(item.correct_option_id)?.classList.add("ce-right");
        if (option.option_id !== item.correct_option_id)
          btn.classList.add("ce-wrong");
      }
      callbacks.onAnswer({ option_id: option.option_id });
      if (typeof option.seek_to === "number" && option.seek_to >= 0) {
        callbacks.onSeek?.(option.seek_to);
      }
    });
    wrap.appendChild(btn);
    if (option.url !== void 0) {
      const link = createLinkButton(option.url, s, callbacks.onLinkClick);
      if (link)
        wrap.appendChild(link);
    }
    actions.appendChild(wrap);
  }
  content.appendChild(actions);
  return card;
}

// ../../platform/primitives/dist/scale.js
var SCALE_DEFAULT = { min: 1, max: 5 };
var MAX_SCALE_POINTS = 11;
function renderScale(item, callbacks, strings, style) {
  const s = resolveStrings(strings);
  const { card, content } = createCard(item, s, callbacks, style);
  let { min, max } = item.scale ?? SCALE_DEFAULT;
  if (!Number.isInteger(min) || !Number.isInteger(max) || min >= max || max - min + 1 > MAX_SCALE_POINTS) {
    ({ min, max } = SCALE_DEFAULT);
  }
  const scaleRow = document.createElement("div");
  scaleRow.className = "ce-scale";
  scaleRow.setAttribute("role", "radiogroup");
  const buttons = [];
  for (let value = min; value <= max; value++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ce-btn ce-btn-scale";
    btn.dataset["scaleValue"] = String(value);
    btn.textContent = String(value);
    buttons.push(btn);
    btn.addEventListener("click", () => {
      if (card.dataset["answered"] === "true")
        return;
      card.dataset["answered"] = "true";
      for (const b of buttons)
        b.disabled = true;
      btn.classList.add("ce-chosen");
      callbacks.onAnswer({ scale_value: value });
    });
    scaleRow.appendChild(btn);
  }
  content.appendChild(scaleRow);
  const minLabel = item.scale?.min_label;
  const maxLabel = item.scale?.max_label;
  if (minLabel !== void 0 || maxLabel !== void 0) {
    const labels = document.createElement("div");
    labels.className = "ce-scale-labels";
    const lo = document.createElement("span");
    lo.className = "ce-scale-label-min";
    lo.textContent = minLabel ?? "";
    labels.appendChild(lo);
    const hi = document.createElement("span");
    hi.className = "ce-scale-label-max";
    hi.textContent = maxLabel ?? "";
    labels.appendChild(hi);
    content.appendChild(labels);
  }
  return card;
}

// ../../platform/primitives/dist/notice.js
function renderNotice(item, callbacks, strings, style) {
  const s = resolveStrings(strings);
  const { card } = createCard(item, s, callbacks, style);
  return card;
}

// ../../platform/primitives/dist/action.js
var DEFAULT_LABEL = {
  shop: "Shop now",
  tip: "Leave a tip",
  fund: "Support",
  subscribe: "Subscribe",
  book: "Book now",
  sponsor: "Learn more",
  link: "Open link"
};
var DEFAULT_DISCLOSURE = {
  shop: "Affiliate link",
  sponsor: "Sponsored"
};
var HEADER_LABEL = {
  shop: "Shop",
  tip: "Support",
  fund: "Support",
  subscribe: "Subscribe",
  book: "Book",
  sponsor: "Sponsored",
  link: ""
};
function renderAction(item, callbacks, strings, style) {
  const s = resolveStrings(strings);
  const cta = item.cta;
  const kind = cta ? normalizeCtaKind(cta.kind) : "link";
  const usable = cta !== void 0 && isSafeUrl(cta.url);
  const { card, content } = createCard(item, s, callbacks, style, usable ? { titleOverride: HEADER_LABEL[kind] } : {});
  if (!cta || !isSafeUrl(cta.url)) {
    return card;
  }
  card.dataset["ctaKind"] = kind;
  if (cta.image_url !== void 0 && isSafeUrl(cta.image_url)) {
    const img = document.createElement("img");
    img.className = "ce-cta-image";
    img.src = cta.image_url;
    img.alt = "";
    img.loading = "lazy";
    content.appendChild(img);
  }
  if (cta.price) {
    const price = document.createElement("div");
    price.className = "ce-cta-price";
    price.textContent = cta.price;
    content.appendChild(price);
  }
  const disclosureText = cta.disclosure ?? DEFAULT_DISCLOSURE[kind];
  if (disclosureText) {
    const disclosure = document.createElement("div");
    disclosure.className = "ce-cta-disclosure";
    disclosure.textContent = disclosureText;
    content.appendChild(disclosure);
  }
  const link = document.createElement("a");
  link.className = "ce-btn ce-btn-cta";
  link.href = cta.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = cta.button_label?.trim() || DEFAULT_LABEL[kind];
  link.addEventListener("click", () => {
    if (callbacks.onCtaClick)
      callbacks.onCtaClick(cta.url, kind);
    else
      callbacks.onLinkClick?.(cta.url);
  });
  content.appendChild(link);
  return card;
}

// ../../platform/primitives/dist/up-next.js
function renderUpNext(item, callbacks, strings, style) {
  const s = resolveStrings(strings);
  const { card, content } = createCard(item, s, callbacks, style);
  const heading = document.createElement("div");
  heading.className = "ce-upnext-heading";
  heading.textContent = s.up_next_label;
  content.insertBefore(heading, content.firstChild);
  if (typeof item.seek_to === "number" && item.seek_to >= 0) {
    const actions = document.createElement("div");
    actions.className = "ce-actions";
    const jump = document.createElement("button");
    jump.type = "button";
    jump.className = "ce-btn ce-btn-upnext-jump";
    jump.textContent = s.up_next_jump_label;
    jump.addEventListener("click", () => {
      callbacks.onSeek?.(item.seek_to);
      callbacks.onDismiss();
    });
    actions.appendChild(jump);
    content.appendChild(actions);
    card.classList.add("ce-upnext-actionable");
  }
  return card;
}

// ../../platform/primitives/dist/index.js
function renderItem(item, callbacks, strings, style) {
  switch (item.primitive) {
    case "single_choice":
      return renderSingleChoice(item, callbacks, strings, style);
    case "scale":
      return renderScale(item, callbacks, strings, style);
    case "notice":
      return renderNotice(item, callbacks, strings, style);
    case "action":
      return renderAction(item, callbacks, strings, style);
    case "up_next":
      return renderUpNext(item, callbacks, strings, style);
    default: {
      const s = resolveStrings(strings);
      const { card, content } = createCard(item, s, callbacks, style);
      const msg = document.createElement("div");
      msg.className = "ce-body";
      msg.textContent = s.unknown_primitive_label ?? "This prompt type isn't supported yet.";
      content.appendChild(msg);
      return card;
    }
  }
}

// src/yt-player.ts
var ENDED = 0;
var PLAYING = 1;
var API_SRC = "https://www.youtube.com/iframe_api";
function loadApi() {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previous) previous();
      if (window.YT) resolve(window.YT);
    };
    if (!document.querySelector(`script[src="${API_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = API_SRC;
      document.head.appendChild(script);
    }
  });
}
async function createPlayer(mountId, videoId) {
  const YT = await loadApi();
  const player2 = await new Promise((resolve) => {
    new YT.Player(mountId, {
      videoId,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1
      },
      events: {
        onReady: (e) => resolve(e.target)
      }
    });
  });
  return {
    now: () => player2.getCurrentTime() || 0,
    duration: () => player2.getDuration() || 0,
    isPlaying: () => player2.getPlayerState() === PLAYING,
    isEnded: () => player2.getPlayerState() === ENDED,
    seekTo: (seconds) => {
      player2.seekTo(seconds, true);
      player2.playVideo();
    },
    play: () => player2.playVideo(),
    pause: () => player2.pauseVideo()
  };
}

// src/main.ts
var $ = (id) => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el;
};
var pack = null;
var player = null;
var brandStrings;
var session = createSession();
var prevNow = 0;
var pausedSince = null;
function applyTheme(theme) {
  if (!theme) return;
  const root = $("ce-root");
  const set = (name, value) => {
    if (value) root.style.setProperty(name, value);
  };
  set("--ce-primary", theme.primary_color);
  set("--ce-accent", theme.accent_color);
  set("--ce-background", theme.background_color);
  set("--ce-text", theme.text_color);
}
function showBreadcrumb(label) {
  const player_ = $("player-stage");
  let crumb = document.getElementById("ce-breadcrumb");
  if (!crumb) {
    crumb = document.createElement("div");
    crumb.id = "ce-breadcrumb";
    player_.appendChild(crumb);
  }
  crumb.textContent = `Path: ${label}`;
}
var nudgeTimer = null;
function cancelNudgeTimer() {
  if (nudgeTimer !== null) {
    window.clearTimeout(nudgeTimer);
    nudgeTimer = null;
  }
}
function nudgeDismissMs(item, style) {
  if (item.primitive === "notice") return 5e3;
  if (item.primitive === "up_next") return 8e3;
  if (style === "minimal") return 8e3;
  return void 0;
}
function clearOverlay() {
  cancelNudgeTimer();
  const host = $("ce-root");
  host.replaceChildren();
  delete host.dataset["style"];
  delete host.dataset["promo"];
}
function asRenderable(prompt) {
  return {
    item_id: prompt.item_id,
    template_id: "",
    primitive: prompt.primitive,
    anchor: { mode: "immediate" },
    body: prompt.body,
    tags: prompt.tags ?? [],
    ...prompt.options !== void 0 ? { options: prompt.options } : {},
    ...prompt.correct_option_id !== void 0 ? { correct_option_id: prompt.correct_option_id } : {},
    ...prompt.scale !== void 0 ? { scale: prompt.scale } : {},
    ...prompt.cta !== void 0 ? { cta: prompt.cta } : {},
    ...prompt.followups !== void 0 ? { followups: prompt.followups } : {}
  };
}
function showDeepDiveComplete(thread) {
  const banner = document.createElement("div");
  banner.className = "ce-celebrate";
  banner.textContent = "Nailed every step \u2014 nice deep dive! \u{1F389}";
  thread.appendChild(banner);
  banner.scrollIntoView({ block: "nearest" });
}
function renderStage(thread, item, depth, allCorrect, style) {
  const element = renderItem(
    item,
    {
      onAnswer: (payload) => {
        cancelNudgeTimer();
        const outcome = answerOutcome(item, payload.option_id);
        const next = pickFollowup(item, outcome, depth);
        const stillAllCorrect = allCorrect && outcome === "correct";
        const holdMs = item.correct_option_id !== void 0 ? 1200 : 350;
        window.setTimeout(() => {
          if ($("ce-root").childElementCount === 0) return;
          if (next) {
            renderStage(thread, asRenderable(next), depth + 1, stillAllCorrect, style);
          } else if (depth >= 1 && stillAllCorrect && isDeepDiveComplete(item, outcome, depth)) {
            showDeepDiveComplete(thread);
            window.setTimeout(() => clearOverlay(), 2600);
          } else {
            clearOverlay();
          }
        }, holdMs);
      },
      onDismiss: () => clearOverlay(),
      // Attribution hooks only — the rendered <a target="_blank"> navigates
      // itself, so these must NOT also open the URL (that double-opens).
      onLinkClick: () => {
      },
      onCtaClick: () => {
      },
      onSeek: (seconds) => {
        if (!player || seconds < 0) return;
        player.seekTo(seconds);
        const chosen = item.options?.find((o) => o.seek_to === seconds)?.label;
        if (chosen !== void 0) showBreadcrumb(chosen);
      }
    },
    brandStrings,
    style
  );
  if (!element) return;
  thread.appendChild(element);
  element.scrollIntoView({ block: "nearest" });
}
function showItem(item) {
  const style = normalizeCardStyle(item.card_style);
  const host = $("ce-root");
  host.dataset["style"] = style;
  if (item.primitive === "action") host.dataset["promo"] = "true";
  else delete host.dataset["promo"];
  const thread = document.createElement("div");
  thread.className = "ce-thread";
  host.replaceChildren(thread);
  markShown(session, item.item_id);
  renderStage(thread, item, 0, true, style);
  cancelNudgeTimer();
  const dismissMs = nudgeDismissMs(item, style);
  if (dismissMs !== void 0) {
    const keepAlive = () => cancelNudgeTimer();
    thread.addEventListener("pointerenter", keepAlive, { once: true });
    thread.addEventListener("focusin", keepAlive, { once: true });
    nudgeTimer = window.setTimeout(() => clearOverlay(), dismissMs);
  }
}
function tick() {
  if (!pack || !player) return;
  const now = player.now();
  const playing = player.isPlaying();
  const ended = player.isEnded();
  if (playing) pausedSince = null;
  else if (pausedSince === null) pausedSince = Date.now();
  updateClock(now, player.duration(), playing, ended);
  if ($("ce-root").childElementCount === 0) {
    const state = {
      now,
      prevNow,
      paused: !playing,
      pausedForSec: pausedSince !== null ? (Date.now() - pausedSince) / 1e3 : 0,
      ended,
      duration: player.duration()
    };
    const flags = CLIENT_CONFIG_DEFAULTS.flags;
    const item = nextItem(pack, state, session, {
      maxItemsPerVideo: flags.max_items_per_video,
      maxItemsPerSession: flags.max_items_per_session,
      promptWindowSec: flags.prompt_window_sec
    });
    if (item) showItem(item);
    prevNow = now;
  }
}
function updateClock(now, duration, playing, ended) {
  const el = document.getElementById("clock");
  if (!el) return;
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };
  el.textContent = `${fmt(now)} / ${duration > 0 ? fmt(duration) : "\u2014"} ${ended ? "(ended)" : playing ? "\u25B6" : "\u23F8"}`;
}
function buildSeekBar(loadedPack, handle) {
  const host = document.getElementById("seek-buttons");
  if (!host) return;
  host.replaceChildren();
  const chips = loadedPack.items.map((it) => ({ it, start: it.anchor.mode === "time_window" ? it.anchor.start : void 0 })).filter((x) => typeof x.start === "number").sort((a, b) => a.start - b.start);
  for (const { it, start } of chips) {
    const btn = document.createElement("button");
    btn.type = "button";
    const m = Math.floor(start / 60);
    const s = Math.floor(start % 60);
    const branches = (it.followups?.length ?? 0) > 0;
    btn.textContent = `\u21B7 ${m}:${s.toString().padStart(2, "0")}${branches ? " \u2605" : ""}`;
    if (branches) btn.title = "Has follow-up prompts";
    btn.addEventListener("click", () => handle.seekTo(Math.max(0, start - 2)));
    host.appendChild(btn);
  }
}
async function boot() {
  const brand = await fetch("./brand.json").then((r) => r.json());
  brandStrings = brand.strings;
  applyTheme(brand.theme);
  if (brand.video_title) {
    document.title = `${brand.video_title} \u2014 demo (no extension)`;
    const titleEl = document.getElementById("video-title");
    if (titleEl) titleEl.textContent = brand.video_title;
  }
  if (brand.channel_name) {
    const chEl = document.getElementById("channel-name");
    if (chEl) chEl.textContent = brand.channel_name;
  }
  const packResult = validatePackEnvelope(await fetch("./pack.json", { cache: "no-store" }).then((r) => r.json()));
  if (!packResult.valid) {
    console.error("pack INVALID:", packResult.errors);
    return;
  }
  pack = packResult.value;
  player = await createPlayer("player", brand.videoId);
  const on = (id, fn) => document.getElementById(id)?.addEventListener("click", fn);
  on("btn-play", () => player?.play());
  on("btn-pause", () => player?.pause());
  buildSeekBar(pack, player);
  window.setInterval(tick, 250);
}
void boot();
