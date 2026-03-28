# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run preview` — Preview production build

## Architecture

React 19 single-page app built with Vite 7. Pure JavaScript/JSX (no TypeScript).

`src/App.jsx` is the root component managing transactions state via `useState`. Child components live in `src/components/` and static data in `src/data/`. There is no routing or external state management.

**Entry flow:** `index.html` → `src/main.jsx` (creates React root in StrictMode) → `src/App.jsx`

**Components:**
- `App.jsx` — owns transactions state, passes data and callbacks to children
- `components/Summary.jsx` — computes and displays income/expense/balance totals
- `components/AddTransaction.jsx` — form with local state for adding transactions
- `components/TransactionList.jsx` — filterable transaction table with local filter state

**Data:**
- `data/categories.js` — category list shared by AddTransaction and TransactionList
- `data/initialTransactions.js` — seed transaction data

**Data model:** Transactions have `id`, `description`, `amount` (number), `type` (income/expense), `category`, and `date` fields. Filtering applies AND logic across type and category.

## Project Context

This is a starter project for a Claude Code course. The app intentionally contains bugs, poor UI, and messy code — it is designed to be improved.
