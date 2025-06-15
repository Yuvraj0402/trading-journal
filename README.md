# Trading Journal

A modern web app for tracking, analyzing, and improving your trading performance. Built with Next.js, React, and Tailwind CSS.

---

## Features

- **Add Trades:** Log detailed trade information (symbol, type, direction, entry/exit, quantity, strategy, notes, images).
- **Quick Add:** Instantly record basic trades from the home page.
- **Dashboard:** Visualize stats like win rate, profit/loss, and average trade performance.
- **Trade History:** Search, filter, and sort all your trades.
- **Calendar View:** See your trading activity by date.
- **Image Uploads:** Attach screenshots to trades for review.
- **Notes:** Document your thought process and lessons learned.
- **Responsive UI:** Works on desktop and mobile.
- **Local Storage:** All data stays in your browser.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

```sh
git clone https://github.com/your-username/trading-journal.git
cd trading-journal
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- [`app/`](app/) — Pages and routes (Next.js App Router)
- [`components/`](components/) — UI and feature components
- [`hooks/`](hooks/) — Custom React hooks
- [`lib/`](lib/) — Utilities and helpers
- [`public/`](public/) — Static assets
- [`styles/`](styles/) — Global styles

---

## Tech Stack

- **Next.js** — React framework
- **React** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — UI components
- **Recharts** — Data visualization
- **Radix UI** — Accessible UI primitives
- **Lucide Icons** — Icon library
- **date-fns** — Date utilities

---

## Customization

- **Theme & Colors:** Edit [`tailwind.config.ts`](tailwind.config.ts) and [`app/globals.css`](app/globals.css) or [`styles/globals.css`](styles/globals.css).
- **Components:** Extend or modify components in [`components/`](components/).

---

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.