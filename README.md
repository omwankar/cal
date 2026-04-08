# Picture Perfect Calendar

A responsive wall-style calendar web app built with React + Vite + TypeScript.

## Source Code

Public repository: [https://github.com/omwankar/cal.git](https://github.com/omwankar/cal.git)

## What I Built

- Day range selector with clear visual states:
  - start date
  - end date
  - in-between days
- Notes system with local persistence:
  - month-level notes
  - selection/range-level notes
- Holiday indicators (Indian/Hindu festival-focused list for 2026)
- Month-specific hero images
- Mobile-focused UI adjustments for better spacing and interaction

## Key Implementation Choices

- **Frontend stack**: React + TypeScript + Vite for fast development/build.
- **Styling**: Tailwind CSS with reusable UI components.
- **State handling**: Component state + `localStorage` for notes persistence.
- **Range selection UX**: Click-based start/end selection with highlighted range.
- **Mobile behavior**: Reduced vertical spacing and touch-friendly interactions.

## Run Locally

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Setup

```bash
git clone https://github.com/omwankar/cal.git
cd cal
npm install
```

### Start development server

```bash
npm run dev
```

Then open the local URL shown in terminal (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

## Available Scripts

- `npm run dev` - run development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run lint checks
- `npm run test` - run tests once
- `npm run test:watch` - run tests in watch mode
