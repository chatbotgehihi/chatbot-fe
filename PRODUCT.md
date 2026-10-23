# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Public, real-world users (not a class demo audience) who open the app to ask a general-purpose AI assistant questions and get answers in a conversational thread. Desktop and phone browsers. Further audience segmentation is undecided.

## Product Purpose

Gemini AI Studio is a chat interface in front of Google's Gemini 3.1 Flash-Lite model, served through the team's own Node.js backend. Success: a user can ask, read, and continue a conversation without friction, and trusts what the interface tells them about state (sending, waiting, failed).

## Positioning

Undecided beyond the name. The product currently differentiates by being a lightweight, fast front end to a Flash-Lite (speed-tier) model; no further claims are confirmed.

## Operating Context

- Single chat route: `app/chat/page.tsx` (Next.js 16 App Router, React 19, Tailwind v4).
- Backend: `POST http://localhost:5000/api/chat` with `{ message }`, responds `{ message }` on success or `{ error }` on failure. Only the latest message is sent; no history, streaming, or conversation persistence exists.

## Capabilities and Constraints

- The backend API contract above must be preserved; redesign is front-end only.
- No authentication, accounts, or multi-conversation storage exist; do not imply them.
- Undecided: Markdown/code rendering of replies, UI language policy (current copy is Vietnamese), persistent history.

## Brand Commitments

- Name: "Gemini AI Studio" (kept by the user). Model label "Gemini 3.1 Flash-Lite" is a factual product detail.
- Personal student identifiers (name/ID) are not part of the public product.
- Standing preference (2026-10-06): the category standard, played straight. The chat surface should sit alongside Claude.ai at its craft level; no themed world or quirk. Light/dark follows the user's system setting.

## Evidence on Hand

None. No testimonials, usage numbers, or benchmarks exist; do not fabricate them.

## Product Principles

1. Honest state: always make clear whether a message is sending, answered, or failed.
2. The conversation is the product; chrome stays out of the way of reading.
3. Fast in feel as well as in model: no decoration that slows the loop of ask → read → ask.
4. Do not promise capabilities the backend does not have.
