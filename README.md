# Dr. Manish Patel — website

Static site for Patel Cosmetic & Plastic Surgery Center, Goa. Built by Webson Systems.

## Build
- `npm install` once.
- `npm run build` regenerates every page from `_src/` (content in `_src/data.mjs`, home in `_src/home.mjs`, templates in `_src/build.mjs`).
- `npm run dist` also writes a minified, deployable copy to `dist/`.
  - `BASE=/drmanishpatel` serves it from a sub-path (GitHub Pages project site). Leave empty on the real domain.
  - `NOINDEX=1` marks every page `noindex` (preview builds).
- `npm run serve` previews the source build on http://localhost:4173.

## Deploy
Pushing to `main` runs `.github/workflows/pages.yml`, which builds `dist/` and publishes it to GitHub Pages.

Brand decisions (palette, type, devices) are in `brand-spec.md`. Original downloaded images are in `assets/img/site/` and are not deployed.
