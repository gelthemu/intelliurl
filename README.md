# intelliURL

A fast, privacy-first URL shortener and SEO slug generator — built entirely in the browser....

## What It Does

- **URL Shortening** — Paste any valid URL and get a short link via TinyURL's API
- **Slug Generation** — Type a headline and get a clean, SEO-friendly slug (editable before saving)
- **Link Preview** — Shows OpenGraph metadata (title, description, image) for pasted URLs
- **History** — All generated results are saved locally in IndexedDB via Dexie
- **Export** — Download your history as JSON or CSV
- **Share** — Tweet your result with customizable share templates
- **Auto-copy** — Optionally auto-copy results to clipboard
- **Keyboard Shortcuts** — `⌘K` / `Ctrl+K` to focus input, `Esc` to close sidebar

## Privacy & Security

- **100% browser-based** — No accounts, no cookies, no tracking
- **IndexedDB storage** — History never leaves your device
- **Only external call** — URL shortening via TinyURL's public API over HTTPS
- **No data collection** — We never store, sell, or transmit your data

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** components
- **Dexie.js** — IndexedDB wrapper for local history
- **react-hot-toast** — Notifications
- **Lucide React** — Icons
- **slugify** — Slug generation

## Getting Started

```sh
# Clone the repo
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Main input/output UI
│   ├── UrlPreviewCard.tsx    # OpenGraph link preview
│   ├── HistorySidebar.tsx    # Slide-out history panel
│   ├── History.tsx           # History list
│   ├── ContentSections.tsx   # Informational content wrapper
│   ├── NavLink.tsx           # Section navigation
│   ├── SlugGenerator.tsx     # Slug generation component
│   ├── UrlShortener.tsx      # URL shortening component
│   └── sections/             # Content section components
│       ├── WhatIsSection.tsx
│       ├── UsageExamplesSection.tsx
│       ├── WhyUseSection.tsx
│       ├── BestPracticesSection.tsx
│       ├── PrivacySection.tsx
│       ├── FAQSection.tsx
│       └── TechnicalSection.tsx
├── db/
│   └── database.ts           # Dexie IndexedDB setup
├── hooks/
│   ├── useAutocopySetting.ts
│   ├── useKeyboardShortcuts.ts
│   └── use-mobile.tsx
├── utils/
│   ├── shortener.ts          # TinyURL API integration
│   ├── slugify.ts            # Slug generation logic
│   ├── validation.ts         # URL & headline validation
│   ├── shareTemplates.ts     # Twitter share templates
│   ├── exportHistory.ts      # JSON/CSV export
│   └── constants.ts
├── pages/
│   ├── Index.tsx             # Main page
│   └── NotFound.tsx
└── types/
    └── index.ts
```

## Validation Rules

- **URLs** — Must be a valid `https://` or `http://` URL
- **Headlines** — Minimum 8 characters, 2+ words, at least one letter, no repeated character sequences (5+)
- **Slugs** — Lowercase, hyphens only, stripped of special symbols

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Got questions or feedback?

Please send an email to:
[info@intelliurl.io](mailto:info@intelliurl.io)
