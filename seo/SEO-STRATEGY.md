# SEO Strategy: Patel Cosmetic & Plastic Surgery Center (Dr. Manish Patel), Goa

Plan date: 20 Nov 2026. Template: local-service (adapted for a YMYL medical practice under NMC advertising rules). Inputs: `SEO-AUDIT.md` (score 74/100), `COMPETITOR-ANALYSIS.md`.

## 1. Discovery summary

| Item | Finding |
|---|---|
| Business | Single-surgeon cosmetic and plastic surgery practice, two clinics (Margao, Panaji), Goa, India. MBBS, MS (General Surgery), MCh (Plastic Surgery), 30+ years claimed (to be reconciled) |
| Audience | Goa residents (South and North Goa), Indian visitors/second-home owners (Mumbai, Pune, Bengaluru), NRIs and overseas patients combining travel and treatment |
| Conversion | Phone call and WhatsApp (contact form hands off to WhatsApp). Primary conversion events: call taps, WhatsApp starts, directions taps |
| Current site | New static site (55 pages, 35 posts) on a GitHub Pages preview (noindex). Final domain `patelcosmeticsurgeryclinic.com` currently serves the old WordPress site |
| Constraint | NMC ethical advertising rules: no testimonials, reviews, before/after, patient media, superlatives, guarantees, promotional offers/prices; registration number must show |
| Resources assumed | Clinic supplies registration number, GBP access, photos, review sign-off on medical content; one developer maintains `_src/`; content writers draft, Dr. Patel reviews |

### Overrides of the generic local-service template (because of NMC)
| Template says | Here |
|---|---|
| `/reviews` page, AggregateRating schema | Not allowed. No reviews page, no review/rating schema, no embedded reviews |
| `/gallery` or `/portfolio`, before/after | Not allowed. Use premises and equipment photos and surgeon-explainer videos only (no patient media) |
| Location-specific testimonials | Replace with location-specific logistics, doctor consultation days, FAQs |
| `priceRange`, offers, "from INR" pricing | Not allowed. Cost is covered as educational "what determines cost", no figures or packages |
| "Best of" lists for AI visibility | Do not claim rank. Seek factual listings and profile pages (societies, Practo, faculty pages), no ranking claims |
| GBP reviews and Q&A | Reviews exist on Google independent of the site; do not solicit through the site, do not display or mark up. Public GBP Q&A is being phased out, so answer FAQs on the website and in the GBP description instead |

## 2. Goals and KPIs

Primary business goal: more qualified consultation requests (calls and WhatsApp) at both clinics, from search.
SEO goals: (1) keep and grow the rankings of the existing domain through migration; (2) rank in the local pack for Margao and Panaji queries; (3) own the informational and trust queries around each treatment; (4) be cited by AI answer engines for Goa plastic-surgery questions.

Baselines are unknown until Search Console/GA4 data from the old site is exported (first task in Roadmap Phase 0). Targets use ranges and must be re-based after the first 4 weeks of data.

| Metric | Baseline | 3 month | 6 month | 12 month |
|---|---|---|---|---|
| Organic sessions / month | Export from old GA4 (`G-TNRG47FTEZ` / `GT-M38ZHZ3F`) | At least 90% of old-site baseline (migration safe) | 1.4x baseline | 2.5x baseline |
| Non-brand organic clicks (GSC) | Export | Tracking live | 1.5x | 3x |
| Keywords in top 10 (tracked set of 30 below) | Measure at launch | 5 | 12 | 20 |
| Local-pack: GBP views for "plastic surgeon" queries, per clinic | GBP Insights at launch | +20% | +50% | +100% |
| Calls + WhatsApp starts + direction taps from organic and GBP | Add event tracking in Phase 0 | Baseline set, then +15% | +40% | +80% |
| Indexed pages (GSC) | 0 on new site pre-launch; old ~35 | 54+ indexed, no "Crawled, not indexed" bulk | Every sitemap URL indexed | 90+ pages (see Site Structure) |
| Referring domains (quality, relevant) | Check with Moz/Bing/CC | +8 | +20 | +40 (societies, directories, press, hospital pages) |
| Core Web Vitals (field, mobile) | CrUX/PSI at launch | LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on 75th percentile | Pass on all templates | Pass sustained |
| Domain authority (Moz DA) | Check at launch | Hold | +3 | +8 |
| AI citations (manual prompt panel: 20 Goa plastic-surgery questions across ChatGPT, Perplexity, Google AI Overviews) | Run at launch | Brand named in 1 of 20 | 4 of 20 | 8 of 20 |
| NAP consistency across top 10 citations | Audit | 100% | 100% | 100% |
| Pages with registration number visible | 0 | 100% | 100% | 100% |

Success criteria per phase are in `IMPLEMENTATION-ROADMAP.md`.

## 3. Tracked keyword set (30 starting queries)

Hand-picked from the competitor research; validate demand in Search Console and a keyword tool before committing.

- Head local: plastic surgeon in Goa, cosmetic surgeon in Goa, plastic surgery clinic Goa
- City local: plastic surgeon in Margao, plastic surgeon Panaji, cosmetic surgeon Margao, cosmetic surgeon Panjim
- Hair: hair transplant Goa, FUE hair transplant Goa, hair transplant Panaji, hair transplant doctor Margao
- Nose/face: rhinoplasty Goa, nose surgery Goa, septoplasty Goa, facelift Goa, eyelid surgery Goa, otoplasty Goa
- Body/breast: liposuction Goa, tummy tuck Goa, breast augmentation Goa, breast reduction Goa, gynecomastia surgery Goa
- Skin/laser: Botox Goa, dermal fillers Goa, laser hair removal Goa, acne scar treatment Goa, pigmentation treatment Goa
- Trust: how to choose a plastic surgeon in Goa, how to check a plastic surgeon's qualifications India, is hair transplant permanent
(30 items; see `CONTENT-CALENDAR.md` for the supporting content.)

## 4. Strategic pillars

### Pillar A. Migrate without losing equity (Phase 0, before launch)
The old site already ranks and has backlinks. Treat launch as a migration: full 301 map, preserved top URLs where sensible, sitemap swap, Search Console checks, rollback plan. Details in `IMPLEMENTATION-ROADMAP.md`. This is the highest-value, highest-risk task.

### Pillar B. Fix trust and entity signals (Weeks 1 to 4)
Registration number everywhere and in schema; credentials and affiliations block with years; visible "reviewed by Dr. Patel, date"; one consistent experience claim; Physician/Clinic schema enriched (identifier, geo, hours, sameAs, alumniOf, memberOf). These are the factors raters and AI systems read first on YMYL pages.

### Pillar C. Local pack for two clinics
1. **GBP x2**: claim and verify (video verification is now typical), consistent name, primary category "Plastic surgeon", only truthful secondary categories, hours, services list, appointment link, WhatsApp as the messaging channel, photos of premises and equipment (no patients), weekly educational posts (a post a week per clinic: one explained topic, no offers). Do not ask for reviews through the site; replies to any existing reviews follow NMC (generic thanks only, no clinical details).
2. **Location pages** (`/locations/margao/`, `/locations/panaji/`): 700 to 900 unique words each: how to reach, landmarks, consultation days, treatments consulted at each site, nearby-areas paragraph, 4 location FAQs, place embed, `MedicalClinic` with geo/hours/hasMap.
3. **Citations**: one name/address/phone everywhere; Bing Places, Apple Business Connect, Practo, Justdial, Sulekha, Lybrate, society directories; fix transposed-phone and stale "Manipal Hospital / 36 years" entries.
4. **Do not** create doorway pages for every Goa locality (quality gate: stay at 2 location pages; the template warns at 30 and stops at 50).

### Pillar D. Treatment pages that out-answer the SERP
Depth standard for money pages (1,100 to 1,600 words): who it suits and who it does not, how the surgeon plans it, technique options, anaesthesia and setting, recovery timeline by week, risks and complications, alternatives (including non-surgical and "wait"), what determines cost (no figures), Goa-specific logistics, 4 to 6 FAQs, "Related guides" links to 3 to 5 posts, both clinics linked, byline with registration number and review date. Priorities: rhinoplasty (weakest competition), hair transplant, liposuction, breast augmentation, gynecomastia, facelift, tummy tuck. Then add service pages for treatments the posts already cover: blepharoplasty, breast lift, breast reduction, otoplasty, PRP for hair loss, lip fillers (only if offered).

### Pillar E. Topical clusters with the 35 (soon 55) posts
Turn the flat journal into hub-and-spoke clusters (hair, nose and face, body, breast, skin and laser, planning and safety). Each hub is the service page; the blog index gets filter sections; every post links up to its hub, sideways to 2 siblings, and to a location page. Details in `SITE-STRUCTURE.md` and `CONTENT-CALENDAR.md`.

### Pillar F. Authority and off-site
- Faculty/profile links: Wockhardt Institute of Aesthetics, IAAPS AESURG 2022, FADS World Congress 2023 (South Goa), hospital pages, society directories, medical-college pages (only where factual and current).
- Press: guest explainers in Goan publications (Herald, O Heraldo, The Goan, Navhind Times) on topics like sun and pigmentation, monsoon planning; no promotional claims.
- YouTube: host the reels on the clinic channel (explainers only), embed on service pages with VideoObject.
- Link magnets that fit NMC: "How to verify a plastic surgeon's registration in India" guide; "Recovery planning checklist"; downloadable pre-op checklist (PDF) with schema `MedicalWebPage`.

### Pillar G. AI search / GEO
- Keep `llms.txt` generated from data; add registration number, posts, last-updated.
- Keep AI crawlers allowed (already in `robots.txt`).
- Every post and service keeps a 40 to 60 word self-contained answer block; add FAQ anchors; add a sourced "References" section (WHO/ISAPS/ASPS/NMC/IAAPS/PubMed) to clinical claims, which is what answer engines look for on YMYL topics.
- Track brand mentions with a fixed 20-question prompt panel monthly.
- Entities: consistent `@id`s; `sameAs` to GBP x2, YouTube, Facebook, Instagram (two handles currently: `patelcosmeticsurgerycenter` and `drmanishp`), Practo.

### Pillar H. Technical and performance hygiene
- Sitemap with real `lastmod`; keep `robots.txt` minimal.
- Copy-lint in the build for NMC-sensitive words and a launch-switch assertion (NOINDEX/BASE).
- Core Web Vitals: confirm the LCP element is not lazy; shorten the first-visit loader; load GSAP/ScrollTrigger only where used; add `poster` to videos.
- New host: HTTPS, HSTS, gzip/brotli, long cache for hashed assets, 301s for old URLs, custom 404.
- Analytics with consent (DPDP Act): GA4 with events for `tel:`, WhatsApp, directions; Search Console and Bing Webmaster verified before launch.

## 5. Schema plan by page type

| Page type | Schema (all NMC-safe: no Review, AggregateRating, Offer) |
|---|---|
| Home | MedicalBusiness (+Organization), Physician, WebSite, FAQPage (visible FAQs only), VideoObject (reels) |
| Location | MedicalClinic with `geo`, `hasMap`, `openingHoursSpecification`, `areaServed`, `sameAs` (GBP), `identifier`; BreadcrumbList |
| Treatment | MedicalWebPage (+ MedicalProcedure: `bodyLocation`, `preparation`, `howPerformed`, `followup`), `lastReviewed`, `reviewedBy` (Physician), FAQPage, BreadcrumbList, VideoObject when a reel is embedded |
| Blog post | BlogPosting + MedicalWebPage (`reviewedBy`, `lastReviewed`), `about` (MedicalProcedure/MedicalCondition), real `dateModified`, BreadcrumbList |
| About | AboutPage, Physician with `identifier`, `alumniOf`, `memberOf`, `affiliation`, `hasCredential` |
| FAQ | FAQPage, individual anchors |
| Contact | ContactPage, MedicalClinic x2 contact points |

## 6. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Traffic loss at domain cutover (URL changes) | High without a plan | High | 301 map; staged launch; GSC monitoring; keep rollback copy of old site for 30 days |
| NMC breach (copy, schema, GBP, social) | Medium | High | Copy-lint in build; clinic sign-off on all new content; reviews policy; no price/offer content |
| Registration number delayed | Medium | High (compliance + trust) | Block launch on it (Phase 0 gate), because the site cannot go live compliant without it |
| Thin location pages seen as templated | Medium | Medium | 700+ unique words each, no extra doorway pages |
| YMYL quality: AI-written medical content flagged | Medium | High | Dr. Patel reviews each page; cite sources; real review dates; add original photos and first-hand explanations |
| Content velocity outpaces review capacity | Medium | Medium | Batch review weekly; keep 2 to 3 posts per week maximum after the first 55 |
| Third-party listing drift | High | Medium | Quarterly citation audit |
| JS animation harms INP/LCP on low-end phones | Medium | Medium | Lazy-load GSAP; reduced-motion; measure CrUX |

## 7. Resource requirements

| Role | Effort |
|---|---|
| Developer (`_src/`) | 3 to 4 days for Phase 0/1 code changes; 1 day/month after |
| Content editor/writer | 8 to 12 hours/week during Phases 1 to 3 |
| Dr. Patel review | 2 to 3 hours/week (batch sign-off) |
| Clinic admin | GBP updates (1 hour/week per clinic), photo sessions (1 half-day), citation clean-up (one-off 4 hours) |
| SEO lead | 4 to 6 hours/week: tracking, links, GBP, reporting |

## 8. Dependencies (blocking)

1. Registration number.
2. Domain, DNS and a host that serves 301s.
3. GBP access for both listings.
4. Search Console and GA4 access on the old property.
5. Decision on which old-site treatments are still offered.
6. Hours and consultation days per clinic.

## 9. Measurement cadence

| Frequency | Report |
|---|---|
| Weekly (first 8 weeks after launch) | Search Console coverage, 404s, redirect hits, top queries, GBP calls and direction taps |
| Monthly | KPI table above, prompt-panel AI citations, new links, content shipped vs calendar |
| Quarterly | Citation/NAP audit, schema validation, CWV field data, competitor snapshot, content pruning |
