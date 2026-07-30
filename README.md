# Alperen Gökbak — Portfolio

Personal portfolio for Alperen Gökbak, DevOps Engineer and Solutions Architect. Single-page
React app, statically built and deployed to GitHub Pages.

**Live:** https://alperengokbak.github.io/

## Stack

| Concern | Choice |
|---|---|
| UI | React 18 |
| Build | Vite 7 |
| Styling | Tailwind CSS 3 + hand-written CSS per section (`src/styles/`) |
| Tests | Vitest + React Testing Library (jsdom) |
| Lint | ESLint 9 (flat config, `eslint.config.js`) |
| Deploy | GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`) |

Node `^20.19.0 || >=22.12.0` is required (see `engines` in `package.json` and `.nvmrc`).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm run lint` | ESLint, zero-warning policy |
| `npm run test` | Vitest in watch mode |
| `npm run test:run` | Vitest once (what CI runs) |

`npm run lint`, `npm run test:run`, and `npm run build` all run in CI before deploy — a
failure in any of them blocks the release.

## Layout

```
src/
  App.jsx                  router only: / , /case-studies/:slug , 404
  pages/
    Home.jsx               the one-page portfolio
    CaseStudy.jsx          long-form project write-up
    NotFound.jsx
  components/              one component per page section
  data/                    ALL site content lives here, not in components
  i18n/                    locale files, provider, useTranslation
  hooks/
    useScrollReveal.js     IntersectionObserver-driven scroll animation
    useCopyToClipboard.js  clipboard write with an execCommand fallback
    useTheme.js            light/dark with OS-preference following
    useDocumentMeta.js     per-route <title> and description
  lib/contact.js           contact email + mailto builder
  styles/                  one stylesheet per section, imported by styles.css
    theme.css              the colour tokens both themes are built from
  assets/                  all images, icons and fonts (see below)
  test/
    setup.js               jsdom stubs for IntersectionObserver, clipboard, matchMedia
    utils.jsx              render() that wraps in the router + locale providers
scripts/
  fetch-fonts.mjs          regenerates the self-hosted fonts and fonts.css
  sync-blogs.mjs           regenerates the blog list from the Medium RSS feed
```

**Editing content.** Everything the site says lives in `src/data/`. Components render it;
they don't own it. To update your experience, projects, certificates, or skills, edit the
matching file there.

## Themes

Light and dark are both built from the semantic tokens in `src/styles/theme.css`. The
design is made almost entirely of translucent overlays (`white/5`, `white/10`) layered
over a ground colour, so the theme only has to flip the *base* RGB those overlays mix
from — every alpha relationship, and therefore the whole sense of depth, is preserved.

Never hardcode a colour in a stylesheet. Use a token:

```css
background-color: rgb(var(--overlay-rgb) / 0.1);
color: var(--text-secondary);
```

An inline script in `index.html` resolves the theme before first paint so there is no
flash of the wrong one. **It is allowlisted by a sha256 hash in the CSP — if you edit that
script, recompute the hash or the browser will block it:**

```bash
printf '%s' '<exact script contents>' | openssl dgst -sha256 -binary | openssl base64
```

Both palettes are checked against WCAG AA for body text.

## Languages

EN / TR / DE, switched client-side, persisted to `localStorage`, defaulting to the
browser language. `src/i18n/locales.js` covers **UI chrome only** — navigation, headings,
buttons, form fields.

Substantive content (the hero summary, job descriptions, project blurbs) stays in English
in `src/data/`, deliberately. Those are professional claims in Alperen's own voice, and a
machine translation of them into the language of a prospective employer is a liability
rather than a feature. To localise them properly, add per-locale variants in `src/data/`.

A test asserts TR and DE define exactly the same key set as EN, so a missing translation
fails CI rather than silently falling back.

There are no `hreflang` tags: those require one URL per language, and this switches
locale on a single URL.

## Case studies

`src/data/caseStudies.js` holds long-form project write-ups at `/case-studies/<slug>`.

Both entries currently ship as **scaffolds** — every field is a `TODO`. A study with
`status: "draft"` is not linked from the projects grid and renders the 404 page if
visited directly, so placeholder text can never reach a visitor. Fill in the content and
set `status: "published"` to go live. A test enforces that anything still containing
`TODO` stays a draft.

Deep links work on GitHub Pages because the build copies `dist/index.html` to
`dist/404.html`, which Pages serves for unknown paths.

## Blog sync

`.github/workflows/sync-blogs.yml` runs `scripts/sync-blogs.mjs` daily, regenerating
`src/data/blogs.generated.js` from the Medium RSS feed and downloading each cover as an
800px WebP (Medium's own PNGs run 260–720 kB). It commits only when something changed.

Editorial control stays in `src/data/blogs.js`: a `HIDDEN` list keeps older posts off the
site, and `CURATION` sets the topic label and accent colour. New posts appear
automatically with sensible defaults.

Run it locally with `node scripts/sync-blogs.mjs`.

## Contact form

Posts to [Web3Forms](https://web3forms.com). Copy `.env.example` to `.env` and set
`VITE_WEB3FORMS_KEY`; for the deployed site add the same name as a GitHub Actions
repository secret. **The key is public** — Vite inlines `VITE_*` into the client bundle,
which is expected for Web3Forms (it is a submission token, not a credential). Spam
protection is the honeypot field.

Without a key the form falls back to opening the visitor's mail client, so it degrades
rather than failing silently — which is what the old `mailto:`-only version did for
anyone on mobile or webmail.

## Vendored assets

Nothing is fetched from a third party at runtime. Fonts, tech-stack icons, certification
badges and blog cover images are all committed under `src/assets/` and served from the
same origin. This keeps the page working when a CDN is unavailable, and means no visitor
request reaches Google Fonts, jsDelivr, or Unsplash — which matters for GDPR.

The `index.html` Content-Security-Policy is written to match: `default-src 'self'` with no
external asset origins allowed.

| Directory | Contents | Source |
|---|---|---|
| `assets/fonts/` | IBM Plex Sans, Space Grotesk (woff2, latin + latin-ext) | `scripts/fetch-fonts.mjs` |
| `assets/tech-icons/` | Tech stack SVGs | devicon v2.16.0 |
| `assets/cert-badges/` | Certification badges | Microsoft Learn, Simple Icons |
| `assets/blog-covers/` | Blog cover photos | Unsplash (Unsplash License) |
| `assets/social-icons/` | Social logos, downscaled to 96px | Official brand kits |
| `assets/hero/` | Hero background at 800/1200/1600w | — |

To refresh the fonts: `node scripts/fetch-fonts.mjs`.

## Known issues

`npm audit` reports 8 high-severity advisories from two roots. **Do not run
`npm audit fix --force` on either** — it makes both worse. Verified, not assumed:

**1. `brace-expansion` DoS via `minimatch` (7 of the 8).** Dev-only: it lives in ESLint's
glob matcher and never reaches the shipped bundle. `--force` downgrades
`eslint-plugin-react` to 7.22.0. Overriding `brace-expansion` to the patched `5.0.8` also
fails — v5 changed its export shape, so `minimatch@3` throws `expand is not a function`
and the linter stops running entirely. A clean `npm audit` is not worth a dead lint gate.
Revisit when ESLint ships a bumped `minimatch`.

**2. React Router RSC-mode CSRF (`GHSA-qwww-vcr4-c8h2`).** Requires RSC server actions;
this is a static client-side SPA with no server, so it is not reachable here. `--force`
pins to 7.11.0, which is *strictly worse* — that version carries five advisories including
an `unstable_` RSC XSS, an SSR XSS in `ScrollRestoration`, two open-redirect XSS issues,
and a turbo-stream RCE, all of which 7.18.x fixes. Stay on latest 7.x.

## License

MIT — see [LICENSE](LICENSE).

## Contact

- LinkedIn — https://www.linkedin.com/in/alperengokbak/
- GitHub — https://github.com/alperengokbak
- Medium — https://medium.com/@alperengokbak
- X — https://x.com/Alperengokbak
- Email — gokbakalperen@gmail.com
