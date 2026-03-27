# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run preview` — Preview production build

## Architecture

React 19 single-page app built with Vite 7. Pure JavaScript/JSX (no TypeScript).

All application logic lives in `src/App.jsx` — a single monolithic component managing transactions via `useState`. There is no routing, no external state management, and no component decomposition.

**Entry flow:** `index.html` → `src/main.jsx` (creates React root in StrictMode) → `src/App.jsx`

**Data model:** Transactions have `id`, `description`, `amount`, `type` (income/expense), `category`, and `date` fields. Filtering applies AND logic across type and category.

## Project Context

This is a starter project for a Claude Code course. The app intentionally contains bugs, poor UI, and messy code — it is designed to be improved.
