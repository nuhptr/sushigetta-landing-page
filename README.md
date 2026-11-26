# Sushigetta Landing Page

Landing page for sushi ordering built with HTML, Native CSS Nesting (BEM naming convention), Motion, and Vite 8 using a section-colocated structure.

## Tech Stack

- **Bundler**: Vite `^8.4.0` + `vite-plugin-html-inject`
- **Styling**: Native CSS Nesting (`&`, nested `@media`) & Media Query Range Syntax
- **Animations**: `motion` (`inView` + `animate` with `prefers-reduced-motion` support)
- **Methodology**: BEM naming convention & section-colocated partials

## Preview

<p align="center">
  <img width="1440" alt="Sushigetta Landing Page" src="https://github.com/nuhptr/sushigetta-landing-page/assets/50306963/86ede63b-be6c-4ba5-b261-609576336dca" />
</p>

## Project Structure

```text
├── index.html                    # Main HTML shell (includes section partials)
├── vite.config.js                # Vite 8 config + vite-plugin-html-inject
├── public/                       # Static root assets (favicon)
└── src/
    ├── main.js                   # App entry point
    ├── animations.js             # Motion scroll reveal animations
    ├── assets/
    │   ├── icons/                # SVG icons
    │   └── images/               # PNG illustrations & background images
    ├── styles/
    │   ├── main.css              # CSS entry point
    │   ├── tokens.css            # Design tokens (:root CSS variables)
    │   ├── base.css              # Global reset & base element styles
    │   └── utilities.css         # Shared utility & typography classes
    └── sections/
        ├── header/               # header.html + header.css
        ├── hero/                 # hero.html + hero.css
        ├── about/                # about.html + about.css
        ├── popular/              # popular.html + popular.css
        ├── trending/             # trending.html + trending.css
        ├── subscribe/            # subscribe.html + subscribe.css
        └── footer/               # footer.html + footer.css
```

## Getting Started

```bash
npm install
npm run dev
```

*(Also works with `bun install` / `bun run dev`.)*

### Available Scripts

- `npm run dev` — start the Vite development server
- `npm run build` — build production assets into `dist/`
- `npm run preview` — preview the production build locally
