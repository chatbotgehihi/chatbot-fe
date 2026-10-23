---
name: Gemini AI Studio
description: A quiet, system-themed chat surface for Gemini 3.1 Flash-Lite, in Vietnamese.
colors:
  ground: "oklch(0.985 0.003 270)"
  surface: "oklch(1 0 0)"
  surface-2: "oklch(0.948 0.012 270)"
  line: "oklch(0.905 0.007 270)"
  line-strong: "oklch(0.8 0.01 270)"
  ink: "oklch(0.22 0.015 270)"
  ink-muted: "oklch(0.48 0.014 270)"
  ink-faint: "oklch(0.53 0.012 270)"
  indigo: "oklch(0.47 0.17 272)"
  indigo-deep: "oklch(0.41 0.17 272)"
  on-indigo: "oklch(0.99 0.005 272)"
  indigo-wash: "oklch(0.94 0.035 272)"
  danger: "oklch(0.52 0.19 25)"
typography:
  display:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "28px"
  body-sm:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
  caption:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "24px"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
spacing:
  gutter: "16px"
  gutter-md: "24px"
  block: "16px"
  turn: "32px"
  column: "768px"
  measure: "68ch"
components:
  button-send:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.on-indigo}"
    rounded: "{rounded.xl}"
    size: "40px"
  button-send-hover:
    backgroundColor: "{colors.indigo-deep}"
  button-send-disabled:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-faint}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.lg}"
    padding: "0 12px"
    height: "36px"
  button-ghost-hover:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 10px"
    height: "32px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-2}"
  composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    padding: "8px 8px 8px 16px"
  starter-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
  starter-card-hover:
    backgroundColor: "{colors.surface-2}"
  user-turn:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    padding: "10px 16px"
  code-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
---

# Design System: Gemini AI Studio

## Overview

**Creative North Star: "The Quiet Desk"**

The conversation is the whole screen. This is the category-standard chat surface played straight, at the craft level of Claude.ai: a neutral ground with the faintest cool tint, one deep indigo accent, hairline borders, and a single soft shadow under the composer. Nothing on the page is decorative; chrome is a 56px top bar and a docked composer, and everything between them is reading.

Density is calm and generous. One centered column (768px wide, 720px of content at desktop gutters) carries the empty state, the thread, and the composer, so the eye never relocates. User turns are quiet tinted pills on the right; assistant turns are unboxed prose on a 68ch measure, signed by a small four-point indigo mark. Light and dark follow the operating system with no in-app toggle; both modes are full token sets, not inversions.

This world replaces the earlier dark-gradient glass look. Gradient fills, gradient text, glass blur, and avatar-bubble widget styling are not part of it.

**Key Characteristics:**
- One centered column for empty state, thread, and composer.
- Neutral ground tinted toward hue 270; one indigo accent used sparingly.
- Hairline borders define every container; only the composer is lifted.
- Be Vietnam Pro for every word, with full Vietnamese diacritics; JetBrains Mono only for code.
- Light/dark from `prefers-color-scheme`, no toggle.
- Short, expo-eased motion that switches off under reduced motion.

## Colors

A near-achromatic cool-gray ground with one deep indigo voice; every value is OKLCH and has a light and a dark counterpart (dark values live in `.impeccable/design.json` under `colorMeta.*.dark`).

### Primary
- **Deep Indigo** (`indigo`): the one accent. The send button fill, the assistant mark, the text caret, and the 2px focus ring. In dark mode it lifts to a lighter, softer indigo so it keeps contrast on the dark ground.
- **Pressed Indigo** (`indigo-deep`): send-button hover only. In dark mode the hover goes lighter, not darker.
- **Paper on Indigo** (`on-indigo`): icon color on the indigo send button.
- **Indigo Wash** (`indigo-wash`): text selection background. Not used as a surface.

### Neutral
- **Cool Ground** (`ground`): page background behind everything.
- **Card White** (`surface`): raised containers: composer, starter cards, code blocks, retry button.
- **Tinted Pill** (`surface-2`): user-turn fill, hover fill for ghost and card buttons, disabled send fill.
- **Hairline** (`line`): every 1px border and divider; also the thin scrollbar thumb.
- **Firm Hairline** (`line-strong`): border on hover (starter cards) and on composer focus-within.
- **Ink** (`ink`): primary text.
- **Muted Ink** (`ink-muted`): secondary text: model label, purpose line, starter descriptions, ghost-button labels, code language caption.
- **Faint Ink** (`ink-faint`): placeholder, disclaimer, disabled send icon.

### Status
- **Signal Red** (`danger`): inline error text and its icon under a failed user turn. Errors are text plus icon, never a filled banner.

### Named Rules
**The One Indigo Rule.** Indigo appears only on the assistant mark, the send button, the caret, the focus ring, and selection. Every other element is neutral. If a new surface needs a second color to communicate, it is the wrong surface.

**The System Decides Rule.** Light and dark come from `prefers-color-scheme` alone. Every color is a token defined in both modes; never hard-code a color that exists in only one.

## Typography

**Display Font:** Be Vietnam Pro (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Be Vietnam Pro (same stack; weights 400, 500, 600 loaded)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace), code only

**Character:** A single geometric-humanist sans built for Vietnamese, so stacked diacritics sit cleanly at every size; the mono is a working tool that appears only where code does.

### Hierarchy
- **Display** (600, clamp(1.75rem, 4vw, 2.25rem), 1.25, -0.025em, balanced wrap): the empty-state greeting only.
- **Title** (600, 15px, -0.01em): the product name in the top bar.
- **Body** (400, 15px, 28px line-height): assistant prose on a 68ch measure. User pills use the same size at 1.625 line-height; the composer textarea uses 24px line-height.
- **Body Small** (14px; 500 for titles, 400 at 1.625 for descriptions): starter cards, error text, retry and "new chat" buttons, the loading line.
- **Label** (400, 13px): model label and the copy action under replies.
- **Caption** (400, 12px, 16px line-height): disclaimer under the composer and the code-block header.
- **Code** (JetBrains Mono 400, 13px, 24px line-height): code block bodies and their language tag.

### Named Rules
**The One Family Rule.** Every word of UI and prose is Be Vietnam Pro. JetBrains Mono appears only inside code blocks; never for labels, numbers, or decoration.

**The Diacritics Rule.** Any font added to this system must load the `vietnamese` subset. Copy is Vietnamese; a face that fakes diacritics is a broken face.

## Layout

A full-height three-band stack: a 56px top bar with a hairline bottom border, a scrolling `main`, and a docked footer holding the composer. The top bar spans the viewport (16px side padding, 24px from 768px up). Everything else sits in one centered column, max 768px wide with the same 16/24px gutters, so content is 720px at desktop.

- **Empty state:** vertically centered in the column: mark (32px), greeting, one purpose line (8px below), then a 2×2 grid of starter cards (32px below, 10px gaps), collapsing to one column under 640px.
- **Thread:** an ordered list with 32px between turns and 32px top and bottom padding. Inside an assistant turn, paragraphs and code blocks stack with 16px gaps; the mark sits 12px (16px from 768px up) left of the text.
- **Composer:** docked at the bottom of the same column, bottom padding respects the safe-area inset (min 12px). Disclaimer sits 10px below.
- **Scrolling:** only `main` scrolls; it reserves a stable scrollbar gutter on both edges so the column stays optically centered. Scrollbars are thin, thumb in the hairline color.
- **Breakpoints:** 640px (starter grid to two columns, model label and button text appear) and 768px (wider gutters, user pill narrows from 85% to 75%, copy action becomes hover-revealed).

### Named Rules
**The One Column Rule.** Greeting, turns, and composer share one centered column. Nothing in the reading area breaks out of it, and no side rail is added.

## Elevation & Depth

Flat by default. Depth comes from tone (ground, white surface, tinted pill) and 1px hairlines. Exactly one element casts a shadow: the composer, which floats a little above the thread it feeds.

### Shadow Vocabulary
- **Composer lift** (light: `box-shadow: 0 1px 2px oklch(0.22 0.015 270 / 0.04), 0 6px 20px -4px oklch(0.22 0.015 270 / 0.08)`; dark: `0 1px 2px oklch(0 0 0 / 0.2), 0 8px 24px -6px oklch(0 0 0 / 0.45)`): the composer only.

### Named Rules
**The Single Shadow Rule.** The composer is the only lifted object. Cards, pills, code blocks, and buttons are separated by tone and hairline, never by shadow.

## Shapes

Soft, consistent rounding that grows with the size of the container: 6px for the smallest inline control (code-block copy), 8px for ghost and secondary buttons, 12px for starter cards, code blocks, and the send button, 16px for the composer and user pills. Every border is 1px in the hairline color. Icons are inline SVG line icons, 24px grid, 1.75 stroke (2.25 on the send arrow), round caps and joins. The assistant mark is a filled four-point star in indigo.

## Components

### Buttons
- **Shape:** gently rounded (8px) for text buttons; 12px for the square send button.
- **Send (primary):** 40px square, indigo fill, arrow-up icon in on-indigo. Hover deepens to `indigo-deep`; press scales to 95% over 150ms. Disabled (empty input or waiting): tinted-pill fill with faint-ink icon.
- **Ghost:** transparent, muted ink. Top-bar "Cuộc trò chuyện mới" is 36px tall, 12px side padding, 14px medium; the reply copy action is 32px, 8px padding, 13px regular. Hover fills `surface-2` and darkens text to ink. Disabled drops to 40% opacity.
- **Secondary:** the retry button: white surface, hairline border, 32px tall, 10px padding, medium weight, refresh icon. Hover fills `surface-2`.
- **Focus:** global 2px indigo outline at 2px offset on every focusable element.

### Cards / Containers
- **Starter cards:** 12px radius, white surface, hairline border, 12px by 16px padding (14px vertical from 640px). Title in 14px medium, prompt in muted 14px clamped to two lines. Hover firms the border and fills `surface-2`.
- **Code blocks:** 12px radius, white surface, hairline border, clipped. A 36px caption row (language tag in mono, "Sao chép mã" ghost button) over a hairline divider; body 12px by 16px padding, horizontal scroll, never wraps.

### Inputs / Fields
- **Composer:** 16px radius, white surface, hairline border, composer shadow, 8px padding (16px left). Autogrowing textarea, 15px text, up to 200px tall, then scrolls. The textarea itself has no outline; focus-within firms the container border to `line-strong`. The caret is indigo.

### Navigation
- **Top bar:** 56px, hairline bottom border, product name (title style) with model label in muted 13px baseline-aligned beside it (hidden under 640px). The only action is the ghost "new chat" button at the right, icon-only under 640px with a screen-reader label.

### Conversation Turns
- **User turn:** right-aligned tinted pill (`surface-2`, 16px radius, 10px by 16px padding), max 85% of the column (75% from 768px). Errors render beneath it, right-aligned: red icon and text, then the retry button.
- **Assistant turn:** unboxed prose beside a 20px indigo mark, 68ch measure, paragraphs and code blocks 16px apart. A copy action sits under each reply; always visible on touch widths, revealed on hover or focus from 768px.
- **Waiting state:** the mark rotates and scales gently (1.6s) beside "Đang soạn câu trả lời…" in muted 14px, which breathes in opacity. Both stop under reduced motion.
- **Entry motion:** each new turn fades up 6px over 420ms on `cubic-bezier(0.16, 1, 0.3, 1)`; disabled under reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep indigo to the mark, send button, caret, focus ring, and selection (The One Indigo Rule).
- **Do** define every new color as a token with both a light and a dark value.
- **Do** separate surfaces with 1px hairlines and tone; reserve the composer shadow for the composer.
- **Do** keep assistant replies unboxed on a 68ch measure and user turns as right-aligned tinted pills.
- **Do** load the `vietnamese` subset for any font, and use Be Vietnam Pro for all non-code text.
- **Do** honor `prefers-reduced-motion` for every animation, as the turn entry, thinking mark, and breathing text already do.

### Don't:
- **Don't** reintroduce gradient backgrounds, gradient text, or glass blur; this world replaced them.
- **Don't** wrap assistant replies in bubbles or give users an avatar; the indigo mark is the only turn signature.
- **Don't** add a second accent hue or a light/dark toggle.
- **Don't** use JetBrains Mono outside code.
- **Don't** add shadows to cards, pills, code blocks, or buttons.
