# Implementation Roadmap

Date: 20 Nov 2026. Owners: DEV (developer, edits `_src/`), CLN (clinic), WRT (writer), SEO (SEO lead), DRP (Dr. Patel). Effort: S under 1 hour, M half to one day, L multiple days.

Phases follow the seo-plan structure (Foundation, Expansion, Scale, Authority), with a Phase 0 launch gate because the final domain already serves a live site.

---

## Phase 0: Gate and migration (before any traffic moves)

### Gate conditions: do not launch until all are true

| # | Gate | Owner |
|---|---|---|
| G1 | Goa Medical Council registration number received and rendered on About, footer, services, posts; `Physician.identifier` in JSON-LD | CLN + DEV |
| G2 | Host chosen that serves 301 redirects and HTTPS (nginx or equivalent); DNS plan and TTL lowered 48 hours ahead | CLN + DEV |
| G3 | Old-site export: Search Console performance (16 months), top landing pages, GA4 landing pages, backlinks (Moz/Bing/Common Crawl), full URL crawl | SEO |
| G4 | Redirect map below implemented and tested on staging | DEV |
| G5 | Copy-lint passes (no superlatives, reviews, before/after, offers) and Dr. Patel signs off the 11 treatment pages and About | DEV + DRP |
| G6 | Analytics and Search Console ready; consent approach decided | SEO + CLN |
| G7 | Hours, consultation days and GBP URLs received (or explicitly deferred) | CLN |

### Code changes in `_src/` (DEV)

| # | Task | File | Effort |
|---|---|---|---|
| 1 | `SITE.reg.no`, `Physician.identifier`, show number in byline blocks | `data.mjs`, `build.mjs` L17, L393 | S |
| 2 | Titles and descriptions per `SITE-STRUCTURE.md` section 5 | `build.mjs` L416, L441, L458 to L500 | S |
| 3 | MedicalClinic enrichment (`geo`, `hasMap`, `sameAs`, `openingHoursSpecification` when known), top-level graph nodes | `build.mjs` L91 | M |
| 4 | Real sitemap `lastmod`, remove `priority`; generate from page list | `build.mjs` L527 | S |
| 5 | BlogPosting/MedicalWebPage fix, real `dateModified`, `article:*` meta, visible review line | `build.mjs` L458 to L470 | M |
| 6 | Blog breadcrumb ends on post title | `build.mjs` L458 | S |
| 7 | Related-guides and where-we-consult blocks on treatment pages; location links on posts | `build.mjs` L424 to L441 | M |
| 8 | Footer lists all 11 treatments + both clinics; footer headings not H2 | `build.mjs` footer template | S |
| 9 | `llms.txt` generated from `POSTS` and `SERVICES`; `robots.txt` without `/_src/` | `build.mjs` L528 to L529 | S |
| 10 | VideoObject `duration`; reels on matching service pages | `reels.mjs`, `build.mjs` | M |
| 11 | Build assertions: copy-lint, `NOINDEX=0` requires `BASE=''`, orphan-page check, JSON-LD parse, unique titles/descriptions | `build.mjs` / new script | M |
| 12 | `og:image` dimensions + 1200x630 JPG variants | `build.mjs` | S |
| 13 | Strip schema from 404 | `build.mjs` L523 | S |
| 14 | Confirm LCP image is not `loading=lazy`; shorten first-visit loader; lazy-load GSAP on pages that need it; `poster` on videos | `main.js`, templates | M |

### Redirect map (301, permanent; also apply the non-trailing-slash variants)

Source URLs come from the old WordPress sitemap (about 30 URLs). Targets are existing pages on the new site; where no equivalent page exists yet, the interim target is the closest post, and the target moves to the new treatment page when it is published (Phase 2).

| Old URL | New URL (target) | Note |
|---|---|---|
| `/hair-transplant` | `/services/hair-transplant-goa/` | |
| `/hair-transplant-in-goa-your-complete-guide-to-hair-restoration/` | `/services/hair-transplant-goa/` | or FUE vs FUT post |
| `/liposuction/` | `/services/liposuction-goa/` | |
| `/breast-augmentation/` | `/services/breast-augmentation-goa/` | |
| `/rhinoplasty/` | `/services/rhinoplasty-goa/` | |
| `/8reasonstogetrhinoplasty/` | `/services/rhinoplasty-goa/` | |
| `/gynaecomastia/` | `/services/gynecomastia-surgery-goa/` | |
| `/facelift/` | `/services/facelift-goa/` | |
| `/abdominoplasty/` | `/services/tummy-tuck-goa/` | |
| `/botox/` and `/fillers/` | `/services/botox-fillers-goa/` | |
| `/laser-hair-reduction/` | `/services/laser-hair-removal-goa/` | |
| `/fractionalco2/` | `/services/acne-scar-treatment-goa/` | |
| `/photofacial/` | `/services/skin-rejuvenation-pigmentation-goa/` | |
| `/hifu/` | `/services/skin-rejuvenation-pigmentation-goa/` | interim; new page only if offered |
| `/laser-tattoo-removal/` | `/blog/laser-tattoo-removal-what-to-know/` | later `/services/laser-tattoo-removal-goa/` |
| `/blepheroplasty/` | `/blog/eyelid-surgery-blepharoplasty-explained/` | later `/services/blepharoplasty-goa/` |
| `/breast-lift/` | `/blog/breast-lift-vs-breast-implants/` | later `/services/breast-lift-goa/` |
| `/breast-reduction/` | `/blog/breast-reduction-for-back-pain/` | later `/services/breast-reduction-goa/` |
| `/otoplasty/` | `/blog/otoplasty-ear-correction-children-adults/` | later `/services/otoplasty-goa/` |
| `/cosmetic-gynaecology/` | `/services/` | interim; clinic decides whether to keep this offering |
| `/non-surgical-weight-loss/` | `/services/` | interim; clinic decides |
| `/why-should-you-get-your-plastic-surgery-in-goa/` | `/blog/how-to-choose-a-plastic-surgeon-in-goa/` | later the travelling-to-Goa post |
| `/an-in-depth-look-at-plastic-surgery-in-goa-costs-treatments-and-expert-recommendations/` | `/blog/how-to-choose-a-plastic-surgeon-in-goa/` | later the cost-determinants post |
| `/case-study-1-blepharoplasty/` | `/blog/eyelid-surgery-blepharoplasty-explained/` | before/after-style page: do not keep |
| `/case-study-1-gynocomestia/` | `/services/gynecomastia-surgery-goa/` | do not keep |
| `/case-study-3-abdominoplasty/` | `/services/tummy-tuck-goa/` | do not keep |
| `/contactus/` | `/contact/` | |
| `/about/`, `/services/`, `/blog/` | unchanged | same path on the new site |
| WordPress system URLs (`/feed/`, `/comments/feed/`, `/wp-json/*`, `/xmlrpc.php`, `/wp-admin/*`, category/tag/author archives) | `410` or `404` | no value |
| `/wp-content/uploads/*` images | `404` after 90 days; if any has meaningful backlinks, redirect to the matching treatment page | check backlink export first |
| `/sitemap.xml`, `/sitemap.rss`, `/post-sitemap.xml`, `/page-sitemap.xml`, `/category-sitemap.xml` | `/sitemap.xml` serves the new sitemap; the others 404 | |

Test: crawl every old URL (from G3 export, not just the sitemap) against staging; expect one hop, 301, final 200. Also add any URL in the export with at least one referring domain or 5 clicks in the last 16 months that is not in the table.
Example nginx fragment (to adapt on the real host):
```
location = /hair-transplant { return 301 /services/hair-transplant-goa/; }
location = /hair-transplant/ { return 301 /services/hair-transplant-goa/; }
location = /contactus/ { return 301 /contact/; }
# map block for the full table; add 'rewrite ^/(.*[^/])$ /$1/ permanent;' for the trailing-slash rule
```

### Launch-day checklist

1. Set repository variables `NOINDEX=0`, `BASE=''`; run the build assertions; deploy to the production host.
2. `curl -s https://patelcosmeticsurgeryclinic.com/ | grep -i 'name="robots"'` shows `index,follow,...`.
3. `robots.txt` and `sitemap.xml` at the root; sitemap has 54+ URLs, all 200, none noindex.
4. Spot-test 20 redirects (curl `-I`), `http` to `https`, `www` to apex, and `/x` to `/x/`.
5. Submit the sitemap in Google Search Console and Bing Webmaster; request indexing of Home, the 11 treatment pages, 2 location pages.
6. Validate JSON-LD on Home, one treatment, one post, both locations (Rich Results Test and Schema Markup Validator).
7. PageSpeed Insights on Home, a treatment, a post (mobile); note LCP element.
8. Confirm GA4 events (`tel`, WhatsApp, directions) fire; consent behaviour works.
9. Keep a full copy of the old site and a rollback plan for 30 days.
10. Announce the new URL to GBP (update website field on both listings).

### Post-launch monitoring (first 8 weeks)
Daily week 1, then weekly: GSC Coverage and Pages (new 404s, "Crawled, not indexed"), redirect hit logs, top queries vs old baseline, GBP calls/directions. Fix any 404 with traffic within 48 hours. Success: at least 90% of baseline clicks by week 8 and no more than 5% of old URLs returning 404.

---

## Phase 1: Foundation (weeks 1 to 4)

| Task | Owner | Effort | Done when |
|---|---|---|---|
| Verify both GBP listings; fix name, address, phone, hours, categories, services, website, appointment link, WhatsApp, photos | CLN + SEO | M | Both profiles complete, NAP identical to the site |
| Citation clean-up: Practo, Justdial, Sulekha, Lybrate, Bing Places, Apple Business Connect; fix phone `+91 9283462451` and "Manipal Hospital, 36 years" entries; one experience claim | SEO + CLN | M | 10 citations consistent |
| Rebuild location pages (700 to 900 words) | WRT + DEV | M | Both pages live with `geo`, hours, place embed |
| Credentials/affiliations block on About; review dates visible on all pages | DRP + DEV | S | Visible on every template |
| Expand rhinoplasty, hair transplant, liposuction, tummy tuck, breast augmentation, gynecomastia, facelift pages | WRT + DRP | L | Each at 1,100 words or more with 4+ FAQs and related guides |
| Blog index regrouped by cluster; FAQ anchors | DEV | M | Live |
| Baseline recorded: KPI table filled, 30 keyword rank snapshot, AI prompt panel run | SEO | S | Baseline sheet exists |
| Weekly GBP posts begin (both clinics) | CLN | S | 4 posts each |
**Success criteria:** all sitemap URLs indexed; no critical or high audit items open; GBP complete; baseline captured.

## Phase 2: Expansion (weeks 5 to 12)

| Task | Owner | Done when |
|---|---|---|
| New treatment pages: blepharoplasty, breast reduction, breast lift, otoplasty, laser tattoo removal, PRP (if offered), mommy makeover (optional); retarget the redirects from posts to these pages | WRT + DRP + DEV | Pages live, redirect map updated |
| Gap posts per `CONTENT-CALENDAR.md` (cost determinants, travelling to Goa, anaesthesia, smoking, revision, second opinion) | WRT + DRP | 12 new posts |
| Internal linking enforced by build (orphan check, related blocks) | DEV | Every page has 3+ in-content inbound links |
| Reels on service pages with VideoObject; YouTube upload | CLN + DEV | 4 reels placed |
| Authority outreach: profile and faculty links (Wockhardt Institute of Aesthetics, IAAPS/AESURG, FADS), society directories, hospital pages | SEO + DRP | 8 relevant referring domains |
**Success criteria:** at least 12 tracked keywords in the top 20; GBP views up 20%; calls and WhatsApp starts tracked and rising.

## Phase 3: Scale (weeks 13 to 24)

| Task | Owner | Done when |
|---|---|---|
| Continue posts (2/week max), filler/stretch-mark/neck-lift/hair-for-women topics | WRT + DRP | Calendar items shipped |
| CWV optimisation from field data (CrUX): lazy GSAP, loader, LCP image | DEV | LCP under 2.5 s, INP under 200 ms at p75 |
| Link building: press explainers, guide-based links ("how to verify a surgeon", pre-op checklist PDF) | SEO | 20 relevant referring domains total |
| GEO: references blocks on clinical posts; `llms.txt` kept current; monthly prompt-panel check | SEO + WRT | AI citations in 4 of 20 prompts |
| Schema validation sweep; fix warnings | DEV | 0 errors, 0 warnings on templates |
**Success criteria:** 12 keywords in top 10; organic sessions 1.4x baseline; link and citation targets met.

## Phase 4: Authority (months 7 to 12)

| Task | Owner |
|---|---|
| Monthly long-form "Surgeon's notes" explainer with references | DRP + WRT |
| Conference/faculty roundups (factual, no promotion) | DRP |
| Hindi/Konkani versions of top guides if demand appears; add hreflang | WRT + DEV |
| Quarterly citation/NAP audits; competitor snapshot; content pruning | SEO |
| Annual SEO audit (re-run `SEO-AUDIT.md` process); target score 90+ | SEO |
**Success criteria:** 20 keywords in top 10; organic 2.5x baseline; GBP views double; AI citations in 8 of 20 prompts; audit score 90+.

---

## Dependencies and critical path

Registration number (G1) and host with 301 support (G2) are the critical path. Everything in Phase 1 can be built on the preview while those are pending, since the preview stays `noindex`. Do not flip `NOINDEX=0` before G1 to G7.

## Risk register (summary)

| Risk | Mitigation |
|---|---|
| Migration traffic loss | Redirect map, staged launch, monitoring, 30-day rollback |
| NMC breach | Copy-lint, clinic sign-off, no reviews/offers/prices anywhere, including GBP posts and social |
| Registration number delayed | Hold launch; keep preview noindex |
| Review capacity for Dr. Patel | Batch weekly; cap at 2 posts/week |
| Citation drift | Quarterly audit |

## Tools and data needed

Google Search Console, GA4, Bing Webmaster Tools, GBP Insights (both clinics), a rank tracker (30 queries, mobile, Goa location), PageSpeed Insights/CrUX, Rich Results Test, Screaming Frog (or equivalent) for redirect testing, Moz or Bing for backlinks.
