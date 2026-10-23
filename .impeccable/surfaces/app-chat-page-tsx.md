---
version: 1
slug: "app-chat-page-tsx"
primary_target: "app/chat/page.tsx"
related_targets: []
---

# Chat surface (`/chat`)

Mode: Operate. Audience: public users asking a general assistant questions, desktop and phone. Task: ask, read the reply, continue. Constraint: backend contract `POST /api/chat {message} → {message}|{error}` unchanged; no history, streaming, or accounts. Copy in Vietnamese.

## Direction contract

THESIS: The conversation is the whole screen. Category standard played straight at Claude.ai's craft level; refuses the incumbent dark-gradient glass, gradient text, and avatar-bubble chat-widget look.

OWN-WORLD: Neutral ground tinted faintly toward one deep indigo accent; light and dark from the system. Be Vietnam Pro for every word (full Vietnamese diacritics), JetBrains Mono (Vietnamese subset) only for code. Hairline borders, one soft offset shadow on the composer only. User turns are quiet tinted pills on the right; assistant turns are unboxed prose on a 68ch measure.

STORY: The visitor sees a greeting and starter prompts, asks, watches an honest "đang trả lời" state, reads the reply, copies or retries, and starts over when they want.

FIRST VIEWPORT: Slim top bar (name + model, "Cuộc trò chuyện mới" on the right). Empty state centered in a 720px column: greeting heading, one line of purpose, four starter prompts in a 2×2 grid. Composer docked at the bottom of the same column: autogrowing textarea with send button inside, disclaimer beneath.

FORM: canon (standing exit), reference Claude.ai; seed 02092dff.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
