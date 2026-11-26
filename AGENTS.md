# Repository Guidelines & Antigravity Rules

Follow these rules strictly when working on this repository. Never invent file paths, APIs, dependencies, or build results—verify against actual files and command output.

## Project Overview & Stack

- **App Type**: Static Vanilla HTML/CSS/JS landing page (`sushi`, brand: **Sushigetta**).
- **Bundler**: Vite `^8.4.0` (Rolldown + Lightning CSS default minifier) with `vite-plugin-html-inject` (`^1.2.0`).
  - If configuring Vite build options, use `build.rolldownOptions` instead of deprecated `build.rollupOptions`.
  - Keep `vite.config.js` simple—use `injectHTML()` and the `@` -> `src/` alias.
- **Animations**: `motion` (`^14.14.0`, Vanilla JS `inView` + `animate`).
- **Package Lockfile**: `bun.lock` is the tracked lockfile in this repo. Do not introduce a duplicate `package-lock.json` unless intentionally switching package managers.

## Directory Structure & Asset Path Rules

```text
├── index.html                  # Root HTML shell using <load src="..." />
├── vite.config.js              # Vite 8 config + injectHTML()
├── public/sushi.png            # Static favicon served at /sushi.png
└── src/
    ├── main.js                 # App entry point (calls initScrollAnimations)
    ├── animations.js           # Motion scroll-reveal setup
    ├── assets/
    │   ├── icons/              # SVG icons
    │   └── images/             # PNG illustrations & background images
    ├── styles/
    │   ├── tokens.css          # :root CSS variables
    │   ├── base.css            # Global reset (*), body, a
    │   ├── utilities.css       # .flex-*, .sushi__*, [data-animate]
    │   └── main.css            # Ordered CSS @import entry
    └── sections/
        └── <name>/             # header, hero, about, popular, trending, subscribe, footer
            ├── <name>.html
            └── <name>.css
```

- **HTML Partials**: Include section HTML in `index.html` using `<load src="src/sections/<name>/<name>.html" />` (from `vite-plugin-html-inject`). Do not inline all sections back into `index.html`, and do not replace `injectHTML()` with custom comment directives.
- **Asset Path Invariants**:
  - Inside `src/sections/<name>/<name>.html`, reference assets from root as `/src/assets/images/...` and `/src/assets/icons/...` (resolved against root `index.html` after partial injection).
  - Inside `src/sections/<name>/<name>.css`, reference background images with relative paths `url("../../assets/images/...")`.
  - Keep Google Fonts loaded via `<link>` + `preconnect` in `index.html`, not via remote `@import` inside CSS files.

## Styling Rules (Native CSS Nesting & BEM)

- Use **W3C Native CSS Nesting** (`&`, nested descendant/compound selectors, nested `@media`) and **Media Query Range Syntax** (`@media (width <= 1024px)`).
- **Never use Sass-style concatenation** (`&__element` or `&--modifier`)—this is invalid in native CSS. Write full BEM class names nested with `& .block__element` or `&.modifier`.
- Do not install Sass/SCSS unless explicitly requested.
- Keep each section's responsive `@media` queries colocated inside `src/sections/<name>/<name>.css`; keep shared tokens, resets, and utilities in `src/styles/`.

## Animation Rules (Motion — Do Not Use AOS)

- Scroll-reveal animations live in `src/animations.js` (`initScrollAnimations`) using `inView` and `animate` from `motion`.
- HTML partials trigger reveals with `data-animate="<preset>"`. Supported presets: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `flip-up`, `flip-down`, `zoom-in`.
- **Do not reintroduce `aos` or `data-aos` attributes.**
- Always preserve `prefers-reduced-motion: reduce` support in both `src/styles/utilities.css` and `src/animations.js`.

## Verification Requirements

Before reporting a task complete:

1. Run `npm run build` (or `bun run build`) and confirm exit code `0` with no CSS/asset warnings.
2. Confirm `dist/index.html` and `dist/assets/*.css` contain no unresolved `<load`, `/src/assets/`, or leftover `aos` / `data-aos` references.
3. Confirm `src/` contains no Sass-style `&__` or `&--` selectors.

## Git Commit Convention

1. **Conventional Commits v1.0.0**: Every commit message must follow `<type>[optional scope]: <description>` (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`).
   - Append `!` and/or include a `BREAKING CHANGE:` footer for breaking changes.
   - Keep the subject concise, imperative, lowercase, and without a trailing period.
2. **Co-Author Attribution**: Include this trailer (preceded by a blank line) at the bottom of AI-assisted commit messages:

   ```text
   Co-authored-by: Gemini <gemini@google.com>
   ```

## Simplified Git-Flow Workflow

1. **Single Main Branch**: `master` is the only long-lived branch in this repository (`main` in general) and must remain clean and release-ready. Never create a permanent `dev` or `develop` branch.
2. **Short-Lived Branches**: Always branch from `master` using lowercase kebab-case:
   - `feature/<name>` — new features or structural enhancements
   - `hotfix/<name>` — urgent patches; `fix/<name>` — routine bug fixes
   - `docs/<name>` / `chore/<name>` — documentation, config, or maintenance
   - `release/<version>` *(optional)* — stabilization before tagging
3. **Pull Requests & Branch Retention**:
   - Merge completed branches into `master` via Pull Request, waiting for explicit user confirmation before merging.
   - Prefer the **browser agent** on GitHub to create and merge PRs when available.
   - **Never automatically delete merged branches** (local or remote); keep them intact unless the user explicitly asks to delete them.
4. **Release Tagging**: Tag milestones or hotfixes on `master` with SemVer (`vMAJOR.MINOR.PATCH`).
5. **Push Policy**: Only run `git push` when the user explicitly requests a push.

## Code Review & PR Standards

- **PR Descriptions**: Structure PR bodies with **Summary / Context**, **Key Changes**, **Verification / Test Plan**, and **Notes / Risks**.
- **Review Comments**: Label feedback clearly as `[Blocker]`, `[Suggestion]`, or `[Nit]`, citing exact files/lines, the rationale, and a concrete fix.
