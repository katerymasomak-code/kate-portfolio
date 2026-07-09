# Architectural Portfolio + Blog — Astro Website

A minimal, fast architectural portfolio with a project log and a fixed left-hand navigation (**Visuals · Projects · About · Contact**) featuring responsive image galleries and technical rendering case studies. Built with [Astro](https://astro.build) and deployed as a fully static site.

- **Visuals** is the home page — a dedicated showcase for 3D architectural renders, visualizations, and design concepts.
- **Projects** is a Markdown/MDX-driven blog and archive for architectural case studies, technical documentation, blueprints, and building updates.
- **About / Contact / License / Privacy** are clean, accessible structural pages.
- Layout adapts dynamically from a sidebar (desktop) to a top bar + overlay menu (tablet & phone).
- Fully optimized WebP asset processing, light/dark theme toggle, privacy-first analytics-free build, and robust SEO out of the box.

---

## 1. Local Development & Scripts

**Requirements:** Node **≥ 22.12** (pinned via `.nvmrc`).

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev

```

Open **http://localhost:4321**. Edits to components, styles, configurations, or content in `src/content/` hot-reload instantly.

To compile and preview the production build (optimized assets, sitemap generation, and asset cleanup):

```bash
npm run build
npm run preview

```

---

## 2. Technical Architecture & Asset Pipeline

### 2.1 Content Management

The site relies on Astro's type-safe content collections defined in `src/content.config.ts`.

* **Visuals (`src/assets/visuals/`):** Houses render outputs (`.jpg`, `.png`, `.webp`). Filenames dictate sorting order and initial alt descriptors (e.g., `01-barnhouse-facade.jpg` → *"Barnhouse facade"*). Optional metadata extensions are keyed inside `src/data/galleries.ts`.
* **Projects Collection (`src/content/projects/`):** Markdown (`.md`) and MDX (`.mdx`) records for individual design cases. Frontmatter fields accept a primary optimized `cover` image schema helper to render hero graphics.

```yaml
---
title: 'Modular Housing Complex Design'
description: 'Technical explanation and population density metrics for the Ostroh modular village.'
pubDate: 2026-03-15
tags: ['BIM', 'DBN', 'Residential']
cover: '../../assets/blog/ostroh-masterplan.jpg'
coverAlt: 'Masterplan render of the modular housing community.'
draft: false
---

```

### 2.2 Image Optimization & Rendering

The site **never serves full-resolution or printable originals** to protect intellectual property.

* At build time, every asset routed through the pipeline is compressed into modern, responsive **WebP** formats, capped at **`MAX_WEB` = 3840px** (4K) on the long edge via `src/lib/photos.ts`.
* A custom post-build script (`scripts/strip-unreferenced-assets.mjs`) parses compiled outputs and purges unreferenced source originals copied by Astro, ensuring only downscaled web renditions are deployed.
* Right-click, selection, and drag-to-save intents on portfolio images are mitigated client-side via UI deterrence parameters.

---

## 3. Configuration & Branding

Core data hooks are isolated within `src/config.ts` to populate structural SEO targets, Open Graph wrappers, JSON-LD schemas (`Person` + `WebSite`), and `llms.txt` indexes:

```ts
export const site = {
  name: 'Your Name',
  nameZh: '',                 // Optional script variation
  title: 'Architectural Portfolio & Design Log',
  description: 'Professional architectural portfolio featuring modern visualizations and project case studies.',
};

export const social = {
  instagram: '[https://www.instagram.com/yourusername](https://www.instagram.com/yourusername)',
  linkedin:  '[https://www.linkedin.com/in/yourusername](https://www.linkedin.com/in/yourusername)',
  github:    '[https://github.com/yourusername](https://github.com/yourusername)',
};

```

* **Brand Logotype:** Custom asset marks reside at `src/assets/logo-seal-light.png` and `src/assets/logo-seal-dark.png`. Favicons and static inline UI tokens are generated locally via `npm run gen:icons`.
* **OG Sharing Graphics:** `public/og.jpg` uses a canvas generator referencing configurations. Re-run script hooks (`npm run gen:placeholders -- --og-only`) to flush structural alterations.

---

## 4. Discoverability & Compliance

* **Search Engine / AI Scraping Policy (`src/pages/robots.txt.ts`):** Standard search indexing crawlers and semantic citation systems are permitted full access. Mass text-and-image training agents (`GPTBot`, `CCBot`, `ClaudeBot`) are programmatically restricted.
* **Security Configuration:** Standard deployment maps `public/_headers` to enforce strong **Content-Security-Policy** directives (`default-src 'self'`), HSTS parameters, and `Cross-Origin-Resource-Policy` definitions to eliminate image hot-linking.
* **Data Minimization:** Zero cookies, tracking pixels, or external analytics agents are injected. The platform maintains a compliance baseline targeting GDPR, CCPA, and Law 25 parameters.

---

## 5. Commands Reference

| Command | Action |
| --- | --- |
| `npm run dev` | Instantiates local Vite/Astro runtime environment. |
| `npm run build` | Builds static assets into `dist/` and strips raw originals. |
| `npm run preview` | Spins up a local web server to audit production-ready assets. |
| `npm run gen:brand` | Processes brand graphic vector maps. |
| `npm run gen:icons` | Recompiles multi-resolution favicons and system identity seals. |

---

## 6. Directory Structure

```
src/
├── assets/
│   ├── visuals/         # ← Main page architectural renders & visualizations
│   └── blog/            # ← Embedded case-study graphics (<Photo> / <Gallery>)
├── components/          # Navigation, PhotoGrid, Lightbox, UI Elements
├── content/             
│   └── projects/        # ← Case studies & technical blog (Markdown / MDX)
├── content.config.ts    # ← Strict validation schema for project entries
├── data/
│   └── galleries.ts     # ← Context metadata & drawing descriptions
├── lib/photos.ts        # Image pipeline controller (WebP sizing restraints)
├── layouts/             # Base Layout and BlogPost wrappers
├── pages/               # Functional pages: index.astro (Visuals), projects.astro, about, contact
└── config.ts            # ← Core identity settings, navigation targets, and social URLs

```

---

## License

The website **code** is released under the [MIT License](https://www.google.com/search?q=./LICENSE) — use it freely, including for commercial projects. Your design files, renders, drawings, and texts remain completely your own.
