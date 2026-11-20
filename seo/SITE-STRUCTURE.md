# Site Structure and Information Architecture

Date: 20 Nov 2026. Current build: 54 indexable URLs + `404.html` (Home, About, Treatments hub, 11 treatment pages, Journal hub + 35 posts, FAQ, Contact, 2 location pages, Privacy). Blog count may still change.

## 1. Principles

1. **Keep the `-goa` suffix URLs** (`/services/<treatment>-goa/`): they carry local intent in the URL and already work. Do not rename; redirect old WordPress URLs to them.
2. **One page per clinic, not per locality.** Two location pages, no doorway pages. Quality gate from the local-service template: a warning at 30 location pages and a hard stop at 50 are irrelevant here; stay at 2.
3. **No reviews, gallery, offers, or pricing pages** (NMC). The template's `/reviews`, `/gallery`, `/emergency` nodes are intentionally omitted.
4. **Hub-and-spoke:** each treatment page is the hub of a cluster of posts; the Journal is a spoke index, not a flat list.
5. **Every page shows** registration line, doctor byline, review date, link to both clinics, call and WhatsApp.

## 2. Current vs target hierarchy

```
/                                         Home (head local + brand)
├── /about/                               Dr. Patel: credentials, registration no., affiliations, faculty roles, team
├── /services/                            Treatments hub (11 now, up to ~19 targeted)
│   ├── Hair
│   │   ├── /services/hair-transplant-goa/              (existing)
│   │   └── /services/prp-hair-loss-goa/                (new, if offered)
│   ├── Nose and face
│   │   ├── /services/rhinoplasty-goa/                  (existing)
│   │   ├── /services/facelift-goa/                     (existing)
│   │   ├── /services/blepharoplasty-goa/               (new; old URL /blepheroplasty/)
│   │   └── /services/otoplasty-goa/                    (new; old URL /otoplasty/)
│   ├── Body
│   │   ├── /services/liposuction-goa/                  (existing)
│   │   ├── /services/tummy-tuck-goa/                   (existing)
│   │   └── /services/mommy-makeover-goa/               (new, optional)
│   ├── Breast and chest
│   │   ├── /services/breast-augmentation-goa/          (existing)
│   │   ├── /services/gynecomastia-surgery-goa/         (existing)
│   │   ├── /services/breast-lift-goa/                  (new; old URL /breast-lift/)
│   │   └── /services/breast-reduction-goa/             (new; old URL /breast-reduction/)
│   └── Skin and laser
│       ├── /services/botox-fillers-goa/                (existing)
│       ├── /services/laser-hair-removal-goa/           (existing)
│       ├── /services/acne-scar-treatment-goa/          (existing)
│       ├── /services/skin-rejuvenation-pigmentation-goa/ (existing)
│       ├── /services/laser-tattoo-removal-goa/         (new; old URL /laser-tattoo-removal/)
│       └── /services/hifu-skin-tightening-goa/         (new, only if still offered; old /hifu/)
├── /locations/margao/                    Clinic page (South Goa)
├── /locations/panaji/                    Clinic page (North/Central Goa)
├── /blog/                                Journal hub, grouped by cluster
│   └── /blog/<slug>/                     35 posts (see cluster map below)
├── /faq/                                 Cross-cutting FAQ with anchors
├── /patient-guides/                      (new, optional) pre-op checklist, how to verify a surgeon, planning a procedure trip; PDFs + HTML
├── /contact/
└── /privacy/
```

Sitemap sections: pages (home, about, services, locations, faq, contact), treatments, journal. Target total: 54 now, about 62 after the 8 to 10 new treatment pages and 2 to 3 guides, then +2 to 3 posts per month. Remove `<priority>`; use real `lastmod`.

## 3. Cluster map (existing posts assigned to hubs)

| Hub (treatment page) | Spoke posts (existing) | Gaps to fill (see CONTENT-CALENDAR) |
|---|---|---|
| Hair transplant | is-a-hair-transplant-permanent; fue-vs-fut-hair-transplant-goa; hairline-design-and-age-planning; hair-loss-in-women-causes; prp-for-hair-loss-what-to-know; beard-and-eyebrow-transplant-questions | hair-transplant aftercare in monsoon; FUE for women; what determines hair-transplant cost; medicines (minoxidil/finasteride) overview |
| Rhinoplasty | rhinoplasty-recovery-what-to-expect; rhinoplasty-for-breathing-septoplasty | rhinoplasty for Indian noses; best age/candidacy; revision rhinoplasty; what determines rhinoplasty cost |
| Facelift and eyes/ears/chin | facelift-or-non-surgical-options; eyelid-surgery-blepharoplasty-explained; chin-and-jaw-augmentation-options; otoplasty-ear-correction-children-adults; under-eye-dark-circles-options | neck lift; facelift recovery by week |
| Liposuction and tummy tuck | liposuction-or-tummy-tuck; liposuction-recovery-week-by-week; tummy-tuck-after-pregnancy-c-section; mommy-makeover-planning-guide; arm-lift-and-thigh-lift-explained | liposuction vs non-surgical fat reduction; tummy-tuck scar care in humid climate |
| Breast and gynecomastia | breast-augmentation-implant-choices; breast-lift-vs-breast-implants; breast-reduction-for-back-pain; gynecomastia-questions-men-ask | breast implant safety and follow-up; gynecomastia vs chest fat; breast surgery and breastfeeding |
| Botox, fillers, skin, laser | botox-vs-fillers-difference; lip-fillers-what-to-know-before; laser-hair-removal-indian-skin-sessions; laser-tattoo-removal-what-to-know; acne-scars-fractional-co2-laser; melasma-and-pigmentation-in-goa; sunscreen-and-pigmentation-in-goa; chemical-peels-in-humid-climate; keloid-and-raised-scar-treatment; skin-tag-and-mole-removal-safety | filler dissolving and complications; stretch marks; microneedling vs laser for scars |
| Planning and safety (links to Home, About, Contact) | how-to-choose-a-plastic-surgeon-in-goa; preparing-for-cosmetic-surgery; when-to-plan-surgery-in-goa-monsoon-summer | verify registration guide; anaesthesia and day-care safety; travelling to Goa for surgery; smoking and surgery |

## 4. Internal linking rules (implement in `_src/build.mjs`)

| From | Must link to |
|---|---|
| Every treatment page | Its 3 to 5 spoke posts ("Related guides"), both location pages ("Where we consult"), Contact, the sibling treatment in its group, About (credentials) |
| Every post | Its hub treatment page (contextual, within first 300 words), 2 sibling posts, one location page, About (byline) |
| Location pages | All treatments consulted there, Contact, nearby related guide ("Planning a visit") |
| Home | All hubs, both locations, 3 latest posts, FAQ |
| Blog index | Grouped by cluster with a hub link on each group; "Start here" list |
| FAQ | Each answer links to the relevant treatment/post (FAQ currently has 0 inbound contextual links; link it from Home, Contact, Journal, and each treatment page "More questions") |
| About | Treatments, both locations, "How to verify a surgeon" guide |

Anchor text: descriptive, vary naturally (e.g. "FUE vs FUT in Goa", "recovery after rhinoplasty").
Orphan check: add a build step that fails if any indexable page has fewer than 3 inbound in-content links.

## 5. Title and meta templates (60 characters title, 140 to 155 characters description; no superlatives, no prices)

| Page | Title template | Example |
|---|---|---|
| Home | `Dr. Manish Patel | Plastic & Cosmetic Surgeon, Margao & Panaji, Goa` (59) | keep as is, add clinics |
| Treatment | `<Treatment> in Goa: Margao & Panaji | Dr. Manish Patel` | `Rhinoplasty in Goa: Margao & Panaji | Dr. Manish Patel` (53) |
| Treatment (compound) | `<Treatment> (<detail>) in Goa | Dr. Manish Patel` | `Hair Transplant (FUE & FUT) in Goa | Dr. Manish Patel` (53) |
| Location | `Plastic Surgeon in <City>, Goa | Patel Cosmetic & Plastic Surgery` | `Plastic Surgeon in Margao, Goa | Patel Cosmetic & Plastic Surgery` (62, trim to "Patel Cosmetic Surgery") |
| Post | `<Question or topic> | Dr. Manish Patel` | `Is a Hair Transplant Permanent? | Dr. Manish Patel` |
| Description | `<what it is in plain words> + <who performs it and where> + <soft CTA: consultation, not offer>` | "Rhinoplasty in Goa to reshape the nose or improve breathing. Planned by Dr. Manish Patel, MCh Plastic Surgery, at clinics in Margao and Panaji." |

## 6. URL conventions

- Lowercase, hyphenated, trailing slash, no dates in post URLs.
- Posts: topic + (optionally) `goa` only when the intent is local (`when-to-plan-surgery-in-goa-monsoon-summer`).
- New treatment pages: `/services/<treatment>-goa/`.
- Retire nothing without a 301.

## 7. Page templates and required components

| Template | Required blocks |
|---|---|
| Treatment | Answer box (40 to 60 words), who it suits / does not suit, how Dr. Patel plans it, technique and setting, recovery timeline, risks, alternatives, "what determines cost" (no figures), Goa logistics, 4 to 6 FAQs, related guides, both clinics, reel video if available, byline with registration number and review date, disclaimer |
| Post | Short answer, H2 per question, list of questions to ask, "when to seek help", References, byline + registration number + last reviewed, related treatment link |
| Location | Hero, address with place embed, how to reach (by road/public transport/parking), consultation days and languages, treatments consulted, 4 location FAQs, nearby areas, call/WhatsApp/directions buttons |
| FAQ | Grouped questions with anchors, links into treatments |
| About | Photo, credentials with years, registration number, affiliations and faculty roles, languages, philosophy, clinic team (staff only; no patient media) |

## 8. Crawl and index policy

- Index: everything in the sitemap. Noindex: 404 (already), any future thank-you or search pages.
- Canonical: self-referencing absolute on the production domain. No parameter pages exist.
- Pagination: none today; if the Journal exceeds about 50 posts, use topic hubs instead of `/blog/page/2/`.
- No faceted navigation, no tag archives (avoid thin duplicates).
- Hreflang: not needed (single en-IN site).
