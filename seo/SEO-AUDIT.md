# SEO Audit: Patel Cosmetic & Plastic Surgery Center (Dr. Manish Patel)

Audit date: 20 Nov 2026.
Scope: built HTML at the repo root (55 HTML files at audit time: 54 sitemap URLs + 404; 11 treatment pages, 2 location pages, 35 blog posts + index, About, FAQ, Contact, Privacy, Home), the generator in `_src/`, the live preview https://websons.github.io/drmanishpatel/, and the clinic's current production site at https://patelcosmeticsurgeryclinic.com (a WordPress site, found during the audit).
Method: parsed every built page (titles, descriptions, canonicals, headings, images, JSON-LD), HTTP-checked the live preview and the live domain, read `_src/build.mjs`, `data.mjs`, `dist.mjs`, `.github/workflows/pages.yml`, plus web search for the competitor set. No Google API, CrUX, GSC or Lighthouse data was available, so Core Web Vitals are assessed from code and asset weight, not field data. Blog counts will keep changing as the other agent adds posts. Nothing in the repo outside `seo/` was changed.

Legal frame for every fix below: NMC ethical-advertising rules. No testimonials, reviews, review/aggregateRating schema, before/after, patient media, superlatives, guarantees, or promotional prices/offers. The state council registration number must show on the doctor's pages.

---

## Overall SEO Health Score: 74 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 70 | 15.4 |
| Content Quality (E-E-A-T) | 23% | 71 | 16.3 |
| On-Page SEO | 20% | 71 | 14.2 |
| Schema / Structured Data | 10% | 72 | 7.2 |
| Performance (CWV, code-estimated) | 10% | 82 | 8.2 |
| AI Search Readiness | 10% | 84 | 8.4 |
| Images | 5% | 88 | 4.4 |
| **Total** | | | **73.7, rounded to 74** |

Business type: Local Service (medical, YMYL), two-location practice, single-practitioner brand.
The foundation is healthy: clean server-rendered static HTML, one H1 per page, a canonical on every page, a rich and valid schema graph (all JSON-LD blocks on all pages parse), llms.txt, AI crawlers allowed, NMC-safe copy, strong new content (35 posts, new ones at about 1,100 words). The score is held down by one launch-critical risk (the live domain already hosts a different indexed site), a blank registration number, thin location pages, no geo/hours/GBP signals in schema, and short, un-localised title tags.

---

## Quick fixes we can apply in code now (each under an hour, all in `_src/`)

1. **Lengthen and localise title tags** (`_src/build.mjs` L441 service titles, L500 location titles, L458-470 blog titles). 21 of 55 titles are under 50 characters; services run 34 to 45 (e.g. `Facelift in Goa | Dr. Manish Patel` = 34). Use `Rhinoplasty in Goa: Margao & Panaji | Dr. Manish Patel` style, 50 to 60 characters. No superlatives.
2. **Enrich both `MedicalClinic` nodes** (`_src/build.mjs` L91 area, `SITE.locations` in `data.mjs`): add `geo` (latitude/longitude from the Maps pins), `hasMap`, `sameAs`, `identifier`, `isAcceptingNewPatients`, `knowsLanguage`, `areaServed`; add `openingHoursSpecification` once hours are confirmed. Promote them from `department` to top-level `@graph` nodes.
3. **Replace the name-search map embeds** on the location pages (`google.com/maps?q=<name+address>&output=embed`) with the place embed of the verified GBP listing, otherwise the pin can resolve to a generic area.
4. **Fix sitemap quality** (`_src/build.mjs` L527): every URL has `lastmod` = build date and arbitrary priorities. Use real per-page dates (post `dateModified`, service `lastReviewed`), drop `<priority>`. Keep generating it from the page list so the new posts are included automatically.
5. **BlogPosting fixes** (`_src/build.mjs` L458-470): `dateModified == datePublished` on every post; `reviewedBy` is not a BlogPosting property (it belongs to `WebPage`/`MedicalWebPage`). Emit `["BlogPosting","MedicalWebPage"]` or a separate `MedicalWebPage` node carrying `reviewedBy` + `lastReviewed`; add `article:published_time` / `article:modified_time` meta; show "Written by Dr. Manish Patel, last reviewed <date>" in the visible byline.
6. **Blog breadcrumb** ends in the category ("Hair") instead of the post title, both visible and in `BreadcrumbList` (`crumbs: [... [p.cat, u]]`). Make it Home > Journal > Post title.
7. **Add `VideoObject.duration`** (ISO 8601) for the four reels (`_src/reels.mjs`) and reuse each reel on its matching service page with its own VideoObject.
8. **Internal links**: add a "Related guides" block on each service page (reverse links from service to its 3 to 5 posts), a "Where we consult" block linking both location pages from every service page, and link the ~11 posts that have only 1 inbound link from at least two relevant pages. `/faq/` has 0 contextual inbound links; `/about/` has 1. Footer lists 7 of 11 treatments: list all 11 plus both location pages.
9. **FAQ page**: add per-question anchors and a linked table of contents so each answer is individually citable.
10. **Registration line**: build already supports the number (`REG` in `_src/build.mjs` L17). Once the clinic sends it, set `SITE.reg.no` and also emit `Physician.identifier` (PropertyValue). See the clinic-dependent list.
11. **`llms.txt`** (`_src/build.mjs` L529): generate the blog section from `POSTS` (35 posts now), add registration number when known and a "Last updated" line.
12. **`robots.txt`**: remove `Disallow: /_src/` (never deployed; advertises source structure). Keep Sitemap line and AI bot allowances.
13. **Meta descriptions**: lengthen the blog and service descriptions under 130 characters to 140 to 155 (service + Margao/Panaji + "consultation"), no price and no superlative.
14. **Alt text**: informative stock images use generic alts ("Goa, near our Margao clinic"). Keep decorative ones `alt=""`; give informative ones concrete alts, replace Goa stock with real clinic photos when available.
15. **Footer `<h2>`s** ("Treatments", "Clinic", "Visit") add three headings to every page's outline. Switch to `<p>`/`<h3>` or label the footer nav.
16. **Build-time copy lint** (new, ~20 lines in `build.mjs`): fail the build if page text contains `best|top|leading|#1|guarantee|testimonial|review(s) from|before and after` outside the approved disclaimer sentence, and fail if `NOINDEX=0` while `BASE` is non-empty.

## Needs the clinic (cannot be fixed in code alone)

| Item | Why it matters | Owner |
|---|---|---|
| Goa Medical Council registration number (and NMC register number if any) | NMC cl. 3.2 Expl. III compliance, YMYL trust, `Physician.identifier` | Dr. Patel |
| Domain cutover: `patelcosmeticsurgeryclinic.com` currently serves the old WordPress site | Redirect map, launch, Search Console monitoring (Critical C1) | Clinic + host |
| Hosting that supports server-side 301 (the current nginx host does; GitHub Pages does not) | Old-URL redirects | Clinic/host |
| Google Business Profile access (two listings: Margao, Panaji) | Categories, services, hours, posts, Q&A, attributes, appointment URL, photos | Clinic |
| Confirmed hours per clinic, parking/landmark details, consultation days | Schema, location pages, GBP | Clinic |
| Google Search Console + GA4 (old site tags `GT-M38ZHZ3F`, `G-TNRG47FTEZ`) | Baseline data, migration monitoring | Clinic |
| Real clinic photography (exterior, reception, equipment, team) | E-E-A-T, replaces Goa stock imagery | Clinic |
| Directory clean-up (Practo, Justdial, Instagram bio): one phone number, one experience claim, no "Certified/leading" | NAP consistency, NMC | Clinic |
| Society memberships and hospital affiliations with year (TODO at `_src/build.mjs` L393) | Authority; `memberOf`, `affiliation` schema | Dr. Patel |
| Decision on which old-site treatments are still offered (blepharoplasty, breast lift/reduction, otoplasty, HIFU, photofacial, non-surgical weight loss, cosmetic gynaecology) | Page plan and redirect targets | Dr. Patel |

---

## Findings

Severity: Critical = blocks indexing/ranking or creates legal exposure; High = significant ranking/trust impact (fix within a week of launch); Medium = within a month; Low = backlog.

### CRITICAL

**C1. The final domain already hosts a live, indexed WordPress site with a different URL structure, and the repo has no redirect map.**
Evidence: `curl https://patelcosmeticsurgeryclinic.com/` returns 200 (nginx, WordPress, All in One SEO 5.0.5.1, GA tags `GT-M38ZHZ3F` and `G-TNRG47FTEZ`). Its sitemap lists about 30 URLs: `/hair-transplant`, `/liposuction/`, `/rhinoplasty/`, `/breast-augmentation/`, `/gynaecomastia/`, `/facelift/`, `/abdominoplasty/`, `/botox/`, `/fillers/`, `/laser-hair-reduction/`, `/laser-tattoo-removal/`, `/fractionalco2/`, `/hifu/`, `/photofacial/`, `/blepheroplasty/`, `/breast-lift/`, `/breast-reduction/`, `/otoplasty/`, `/cosmetic-gynaecology/`, `/non-surgical-weight-loss/`, `/contactus/`, four blog posts (`/8reasonstogetrhinoplasty/`, `/hair-transplant-in-goa-your-complete-guide-to-hair-restoration/`, `/why-should-you-get-your-plastic-surgery-in-goa/`, `/an-in-depth-look-at-plastic-surgery-in-goa-costs-treatments-and-expert-recommendations/`) and three `/case-study-*` pages. The new site uses `/services/<name>-goa/`. Only `/about/`, `/services/`, `/blog/` overlap. Nothing in the repo issues redirects, and GitHub Pages cannot send 301s.
Impact: every existing ranking URL would 404 at cutover; current Google positions and backlinks are lost.
Fix: deploy to a host that serves 301s (or add them at the existing nginx) with the map in `IMPLEMENTATION-ROADMAP.md` ("Redirect map"). Retain `/about/`, `/services/`, `/blog/`. Case-study (before/after style) pages must not be kept: 301 to the matching service page and delete. Set `NOINDEX=0` only after the redirects are live and tested.

**C2. NMC exposure carried over from the old site: "top" claim, review markup, case studies.**
Evidence: old homepage meta description reads "a top cosmetic & plastic surgeon in Goa"; its JSON-LD contains `reviewRating`; it has `case-study-*` pages; third-party snippets show "Certified" and "20+ Yrs". The new build is clean: no testimonial, review, before/after or promotional superlative in the built pages (the word "best" only appears in clinical sentences such as "works best when your weight is stable"; "guaranteed" only in disclaimers). Keep it that way.
Fix: do not migrate old copy; redirect instead. Ask the clinic to edit the Instagram bio, Practo and Justdial text. Add the build-time copy lint (Quick Fix 16).

### HIGH

**H1. Doctor registration number is blank on every page.**
Evidence: `SITE.reg = { council: 'Goa Medical Council', no: '' }` (`_src/data.mjs`); built pages say "Registered with the Goa Medical Council" with no number; JSON-LD has no `identifier`.
Fix: clinic supplies number; set `SITE.reg.no`; emit `Physician.identifier` (`{"@type":"PropertyValue","propertyID":"Goa Medical Council registration number","value":"..."}`); show it on About, footer, each service byline and each blog byline; add to `llms.txt`.

**H2. Title tags are short, generic and not localised.**
Evidence: `Facelift in Goa | Dr. Manish Patel` (34), `Rhinoplasty in Goa | Dr. Manish Patel` (37), `Liposuction in Goa | Dr. Manish Patel` (37), `Hair Transplant in Goa | Dr. Manish Patel` (41); 21 of 55 titles under 50 characters; Margao/Panaji appear in none of the service titles.
Fix: see Quick Fix 1 and the title table in `SITE-STRUCTURE.md`.

**H3. Location pages are thin and carry no unique local signals.**
Evidence: `/locations/margao/` and `/locations/panaji/` are about 420 words, mostly shared boilerplate (the same 11 treatment names and footer). No hours, directions, landmarks, parking, consultation days, or location-specific FAQ. Schema is a bare `MedicalClinic` (address, phone).
Fix: expand each to 600 to 900 unique words: how to reach (Margao: Bolshe Circle, Borda, CD Signature, near KTC/railway; Panaji: Patto, State Central Library, Kadamba stand), consultation days and languages, which treatments are consulted where, 3 to 4 location FAQs, nearby-area paragraph, place embed. Add `geo`, `hasMap`, `openingHoursSpecification`, `areaServed`, `sameAs`. No reviews, no ratings.

**H4. Google Business Profile status unknown; no GBP link anywhere on the site; off-site NAP drift.**
Evidence: no `maps.app.goo.gl`, `g.page` or CID in any built page; `sameAs` has no GBP. Search results show Justdial listing "Patel Cosmetic Surgery Center", Practo listing Dr. Patel with "36 Years Experience, Manipal Hospital", an Instagram caption with `+91 9283462451` (digits transposed vs the site's `+91 92845 62451`), and "20+ Yrs" on another Instagram bio. The site says "30+ years".
Fix: claim and verify both listings; same name/address/phone as the site; primary category "Plastic surgeon"; add only secondary categories that are true; add website, appointment URL, services, hours, photos, weekly posts (education only). Reconcile experience and affiliation claims everywhere. No review solicitation on the site or in schema (GBP reviews live on Google only).

**H5. Visibility switches must flip at launch; preview is internally inconsistent.**
Evidence: `.github/workflows/pages.yml` uses `NOINDEX: ${{ vars.NOINDEX || '1' }}`; the live preview emits `noindex,nofollow` (correct today); canonicals, sitemap, `og:*` and schema all use the final domain, which currently serves the old site; `BASE` comes from the Pages sub-path.
Fix: launch checklist in `IMPLEMENTATION-ROADMAP.md` (set `NOINDEX=0`, `BASE=''`, deploy to the real domain, verify robots/sitemap at root, `curl` for the robots meta, submit sitemap). Add the build assertion (Quick Fix 16).

**H6. YMYL authority gaps.**
Evidence: no hospital affiliation, society memberships or publications with years (TODO `_src/build.mjs` L393); byline shows qualifications but neither registration number nor review date; `dateModified == datePublished` on all posts; Physician `sameAs` lists only Instagram.
Fix: a "Credentials and affiliations" block (factual, with body and year); visible "Reviewed by Dr. Patel, <date>" on posts and services; `sameAs` for YouTube, Facebook, Practo profile; `alumniOf`, `memberOf`, `affiliation` in schema.

### MEDIUM

**M1. Sitemap metadata is fake.** All `<lastmod>` equal the build date; `priority` is arbitrary. Fix as Quick Fix 4.

**M2. robots.txt line `Disallow: /_src/`** points at a folder that is never deployed (`dist.mjs` SKIP list). On the preview host, `robots.txt` sits under `/drmanishpatel/`, which crawlers ignore (they read the host root); the noindex meta is the real control, which is fine.

**M3. Entity/claim consistency.** "30+ years" vs Practo "36 years" vs Instagram "20+ Yrs"; Manipal affiliation. Pick one verifiable statement (practising since <year>).

**M4. FAQPage on home, FAQ and all 11 service pages.** Valid and matches visible text, but Google restricts FAQ rich results to government and health authority sites, so expect no SERP feature. Keep for GEO; add more than 2 questions per service.

**M5. VideoObject (4 reels, home only).** Valid; `contentUrl` self-hosted MP4 (8.6 MB total), `embedUrl` Instagram; missing `duration`; the videos support no service page. Fix: Quick Fix 7; consider YouTube hosting with lazy embed.

**M6. Internal-link distribution (in-main links).** Home 54, blog index 35, contact 15, services index 12 to 13, service pages 8 to 14. Weak: `/faq/` 0, `/about/` 1, and about 11 posts have exactly one inbound link (e.g. `arm-lift-and-thigh-lift-explained`, `chemical-peels-in-humid-climate`, `chin-and-jaw-augmentation-options`, `eyelid-surgery-blepharoplasty-explained`, `facelift-or-non-surgical-options`, `hair-loss-in-women-causes`, `how-to-choose-a-plastic-surgeon-in-goa`, `laser-hair-removal-indian-skin-sessions`, `laser-tattoo-removal-what-to-know`). Fix: Quick Fix 8; add topic hub sections on the blog index (by treatment) rather than one flat list of 35.

**M7. Open Graph.** `og:image` is WebP without width/height; no 1200x630 JPG fallback. Fix: add `og:image:width/height` and JPG/PNG variants for key pages.

**M8. Post meta.** `og:type` is correctly `article` on posts but `article:published_time`/`modified_time` are absent.

**M9. Money-page depth.** Service pages are 685 to 824 words with 2 FAQs, while the new blog posts are about 1,100 to 1,200 words. The treatment pages that target the commercial queries are now thinner than the support content. Target 1,100 to 1,600 words and 4 to 6 FAQs for hair transplant, rhinoplasty, liposuction, breast augmentation, gynecomastia, facelift, tummy tuck.

**M10. Missing service pages for treatments the site already writes about.** There are posts on blepharoplasty, breast lift, breast reduction, otoplasty, PRP for hair loss, lip fillers, mommy makeover, chin/jaw, arm/thigh lift, chemical peels, keloid, mole/tag removal, under-eye, beard/eyebrow transplant, but no service page for any of them, while the old site had pages for blepharoplasty, breast lift, breast reduction, otoplasty, HIFU, photofacial, non-surgical weight loss and cosmetic gynaecology (existing rankings). Fix: Phase 2 service pages for those the clinic still offers, linked to their posts; interim redirect targets are the posts.

**M11. Consent and privacy.** The Maps iframes are lazy; if analytics or tags are added at launch (the old site ran GA4), add a consent banner for DPDP Act 2023 and keep analytics out until consent. The enquiry form hands off to WhatsApp (no server storage), which is good.

### LOW

- **L1.** `404.html` carries the full schema graph; strip it (noindex already set).
- **L2.** `rel="alternate" type="text/markdown" href="/llms.txt"` is non-standard; harmless.
- **L3.** `og:type` is `website` on About; `profile` is optional.
- **L4.** First-load loader and reveal states (`html.js [data-reveal]{opacity:0}`) hide content until JS runs and can delay perceived LCP. Googlebot renders it, and a `no-js` fallback exists; keep the loader under about 600 ms, animate transform instead of hiding hero text, and confirm `prefers-reduced-motion` handling (3 matches in CSS, 1 in JS).
- **L5.** "Journal" in navigation vs `Blog` schema type; align labels ("Journal").
- **L6.** No hreflang needed (single en-IN site). Add only if Hindi/Konkani pages are published.
- **L7.** On the real host, set long cache on hashed assets (`?v=` hashes exist), short on HTML (GitHub Pages fixes `max-age=600`), enable gzip/brotli, HSTS, `X-Content-Type-Options`, `Referrer-Policy`.

---

## Technical SEO detail (70)

| Check | Result | Notes |
|---|---|---|
| Indexability | Preview `noindex,nofollow` by design; built root HTML `index,follow,max-image-preview:large,max-snippet:-1`; `404.html` noindex | OK; see H5 |
| Canonical | On all pages, absolute, trailing slash, self-referencing | Preview canonicals point to a host serving different content (expected) |
| Trailing slash | Directory URLs; GitHub Pages redirects `/x` to `/x/` | Enforce one form with 301 on the new host |
| robots.txt | Valid; `*` allowed; AI bots listed; Sitemap line | M2 |
| sitemap.xml | 54 URLs, valid XML, all final-domain, all indexable, 404 excluded | M1; regenerate as posts land |
| hreflang | N/A | `lang="en-IN"` |
| Redirects | None | C1 |
| Status codes | Preview: 200, custom 404 returns 404 | OK |
| HTTPS / headers | HTTPS on Pages; headers not controllable | L7 |
| Sub-path | `dist.mjs` rewrites root-relative `href/src/srcset/poster/data-*` and CSS `url()` with `BASE`; live assets resolve under `/drmanishpatel/` | Build-only concern; `llms.txt` link in `<head>` and schema URLs are not base-prefixed, irrelevant while noindex |
| URL structure | `/services/<treatment>-goa/`, `/blog/<slug>/`, `/locations/<city>/` | Clean, keyword-bearing; matches local intent |
| JS rendering | Content is in initial HTML; JS only animates | No rendering risk |
| Third parties | None | Good |

## On-page SEO detail (71)

- H1: exactly one per page on all 55 files. Service H1s are `<Treatment> in Goa`.
- Titles: 33 to 67 characters, none missing or duplicated; 21 under 50 characters (H2).
- Meta descriptions: none missing or duplicated; 121 to 165 characters; shortest are older blog posts.
- Headings: service pages 10 H2; posts 10 to 13 H2; footer adds 3 H2s per page.
- Images: no `<img>` without width/height; each page has 4 intentionally empty alts (loader, logo, avatars); most images lazy; hero has `fetchpriority="high"`.
- Breadcrumbs: visible and `BreadcrumbList` on all inner pages (54 files with the markup).
- Open Graph/Twitter: present on all pages, `summary_large_image`.

## Schema validation (72)

All JSON-LD blocks parsed without error on all pages (0 invalid). Types in use: MedicalBusiness+Organization, MedicalClinic x2, Physician+Person, WebSite, BreadcrumbList, FAQPage, MedicalWebPage + MedicalProcedure, BlogPosting, VideoObject x4, Blog, ItemList, AboutPage, ContactPage.

| Type | Status | Issue / fix |
|---|---|---|
| MedicalBusiness+Organization | Valid | Add `identifier`, GBP in `sameAs`, `openingHoursSpecification`, `geo`, `hasMap`, `availableService`, `knowsLanguage`, `isAcceptingNewPatients`. Do not add `priceRange`/`offers` (promotional pricing is barred) |
| MedicalClinic x2 | Valid; nested as `department`, standalone on location pages with the same `@id` | Make top-level graph nodes; add geo/hours/hasMap/sameAs |
| Physician+Person | Valid | Add `identifier`, `alumniOf`, `memberOf`, `affiliation`, `sameAs` (YouTube, Facebook, Practo) |
| WebSite | Valid | OK (no SearchAction, correct) |
| BreadcrumbList | Valid | Blog trail ends on the category (Quick Fix 6) |
| FAQPage | Valid; matches visible text | No rich result for this site type; keep for GEO |
| MedicalWebPage + MedicalProcedure | Valid | Set `lastReviewed` to a real date; add `bodyLocation`, `preparation`, `howPerformed` |
| BlogPosting | JSON valid; `reviewedBy` not allowed on BlogPosting; `dateModified` = `datePublished` | Quick Fix 5 |
| VideoObject | Valid; `duration` recommended | Quick Fix 7 |

Absent by design (keep absent): Review, AggregateRating, reviewRating, before/after ImageObject, Offer/price.

## Local SEO

- NAP on site: identical across header, footer, location pages, contact page, JSON-LD and `llms.txt` (Margao: Near B101, CD Signature, Bolshe Cir, Borda, Margao, Goa 403602, +91 92845 62451; Panaji: 1st Floor, 112-A, Gerra Imperium Star, Patto, next to State Central Library, Panaji, Goa 403001, +91 97308 56787). Phone formats consistent (`tel:+919284562451`, schema E.164).
- NAP off site: drift found (H4).
- Name variants: "Patel Cosmetic & Plastic Surgery Center", "Patel Cosmetic Surgery Center" (Justdial), "...Center in Goa" (old WP). Choose one GBP name and list the others as `alternateName`.
- Maps: query-based embeds only, no `geo`, no `hasMap` (Quick Fix 2/3).
- Hours: none shown anywhere; the pages say "Please call ahead for an appointment".
- Citations to build or fix: GBP (x2), Bing Places, Apple Business Connect, Practo, Justdial, Sulekha, Lybrate, Facebook page, YouTube About, IAAPS/ASI member directories, FADS and AESURG faculty pages (authority). Reviews on third-party platforms are outside the site's control; the site itself must not display or mark them up.
- Two clinics about 33 km apart: one page per clinic, `areaServed` lists, no doorway pages per locality.

## Content / E-E-A-T

Strengths: plain-language, risk-first copy; "Short answer" block on posts and answer block on service pages (40 to 60 words, self-contained); who-it-suits, recovery and risk lists; clear disclaimer; credentials on every byline; 35 posts at 650 to 1,200 words, newer ones deeper. Weaknesses: registration number (H1), no review dates (H6), no hospital/society proof, thin locations (H3), service pages thinner than posts (M9), stock imagery, no author/credentials page distinct from About.

## Performance (82, code-estimated)

- Static HTML; self-hosted WOFF2 fonts (4 files, 108 KB; two preloaded; `font-display:swap`); font CSS inlined in dist; hashed asset URLs.
- CSS 91 KB source (PurgeCSS in dist). JS: `main.js` 37 KB + GSAP 72 KB + ScrollTrigger 43 KB + Lenis 13.5 KB (about 166 KB min, deferred). Main INP risk is smooth-scroll and scroll-linked animation on low-end Android; load GSAP only where used.
- Images: 102 files, 4.2 MB, WebP with `-sm` variants, one over 200 KB; all with width/height (CLS-safe). On the home page 47 of 50 images are lazy: confirm the LCP image is not one of them.
- Video: 4 MP4s, 8.6 MB total, `preload="none"`; add `poster`.
- LCP: first-visit loader and `opacity:0` reveals delay paint; measure with PageSpeed Insights and CrUX after launch. Targets LCP under 2.5 s, INP under 200 ms, CLS under 0.1.

## Images (88)

WebP, responsive `srcset`, explicit dimensions. Improve: descriptive file names, concrete alts, `og:image` 1200x630, original clinic photos in place of Goa stock, never patient imagery (NMC).

## AI Search / GEO readiness (84)

| Signal | Status |
|---|---|
| `llms.txt` | Present with key facts, page list, quick answers; keep generated; add posts and registration number |
| AI crawler access | GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended allowed; decide on CCBot |
| Citable answers | Self-contained answer blocks on services and posts |
| Entity clarity | Consistent `@id`s; `sameAs` thin; no Wikidata (not expected) |
| Passage structure | H2 per question, lists; FAQ anchors needed |
| Freshness | Dates are build-time; need real modified dates |
| Off-site brand signals | Build via Practo, IAAPS, FADS/AESURG faculty pages, local press |
| Agentic access | Semantic landmarks, skip link, labelled form; booking is a WhatsApp hand-off |

## Priority action list

| # | Severity | Action | Effort |
|---|---|---|---|
| 1 | Critical | Redirect map and cutover plan for the old WordPress URLs (C1) | M |
| 2 | Critical | Keep old NMC-risky copy and case studies out; add copy lint (C2) | S |
| 3 | High | Registration number everywhere + `identifier` (H1) | S |
| 4 | High | Localised, longer titles and metas (H2) | S |
| 5 | High | Rebuild location pages: unique content, geo, hours, place embed (H3) | M |
| 6 | High | Claim and optimise both GBP listings; fix NAP/claim drift (H4) | M |
| 7 | High | Launch switches with checks (H5) | S |
| 8 | High | Credentials block and visible review dates (H6) | S |
| 9 | Medium | Real sitemap dates, internal-link blocks, VideoObject duration, BlogPosting fixes | S |
| 10 | Medium | Deepen the 7 money pages; add service pages for the treatments already covered by posts (M9, M10) | L |

Companion documents: `SEO-STRATEGY.md`, `COMPETITOR-ANALYSIS.md`, `CONTENT-CALENDAR.md`, `IMPLEMENTATION-ROADMAP.md`, `SITE-STRUCTURE.md`.
