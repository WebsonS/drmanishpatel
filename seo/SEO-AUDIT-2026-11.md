# SEO audit: Dr. Manish Patel website, 25 November 2026

Scope: the whole new site (55 pages), live Google results for the main searches, and the competitors who appear in them. All copy changes follow NMC rules: no prices, no superlatives, no testimonials or before/after photos.

## 1. What people search, and who shows up

| Search | Who ranks at the top today | Why they rank |
|---|---|---|
| plastic surgeon in Goa | Manipal (Dr. Amey Pednekar), GMC department, a medical-tourism top-10 list (lists Dr. Patel first), Galaxy Hospital, drpetersavio.com, **old patelcosmeticsurgeryclinic.com (#6)**, Practo (lists Dr. Patel first) | Exact phrase "Plastic Surgeon in Goa" at the start of the title, hospital domain authority, directory listings |
| cosmetic surgery Margao Goa | **Old site #1**, Dr. Patel's Instagram #2, Justdial, Victor Hospital, Dr. Peter Savio | The old site's age and links, plus the city name in the title |
| hair transplant in Goa | Reborn ("Starting at ₹29,999"), DNCC Panjim, SS Hair, WhatClinic, Traya, **old site /hair-transplant/ (#6)** | Price in the snippet, dedicated hair clinics, many pages on one topic |
| liposuction cost Goa | **Old site /liposuction/ (#1)**, Reborn, WhatClinic | A page that answers the cost question directly |
| laser hair removal Panjim | Reborn price pages, Justdial, My Looks Care, the "Hair Transplant and Laser Clinic by Dr Manish Patel" Facebook page | City-specific pages and prices |

What this tells us:
1. **Exact search phrase first in the title.** Every page in the top 3 starts its title with the phrase people type.
2. **Cost is the biggest search intent.** We cannot publish prices (NMC), but a page can answer "what affects the cost of X in Goa". Competitors' pages mostly show a price and little else.
3. **City names matter.** Margao, Panaji and "Panjim" are searched separately.
4. **The old domain already ranks.** Its authority must be passed to the new site with 301 redirects at launch, or those positions will be lost.
5. **Directories (Practo, Justdial) rank for the head terms.** Keeping those listings complete and consistent helps the clinic in the local results.

## 2. Technical audit (all 55 pages)

| Check | Result |
|---|---|
| One H1 per page | Pass, all pages |
| Canonical tag | Pass, every page canonicalises to itself |
| Meta description | Pass, 121–165 characters everywhere |
| Image alt text | Pass, 0 images missing alt |
| Sitemap | Pass, 55 URLs, real lastmod dates, listed in robots.txt |
| robots.txt | Pass, search and AI crawlers allowed |
| Schema | Pass: MedicalBusiness + Physician (credentials, register no.), MedicalClinic per location, MedicalProcedure + MedicalWebPage per treatment, FAQPage, BreadcrumbList, VideoObject, Article |
| llms.txt | Present |
| Mobile layout | Checked earlier this month across all pages |

FAQPage markup stays in place. Google no longer shows FAQ rich results, but the markup does no harm and keeps the questions machine-readable.

## 3. Problems found, and what was changed

| # | Problem | Fix made in this pass |
|---|---|---|
| 1 | Treatment pages were thin (about 360 words, 2 FAQs) compared with pages that rank | Each treatment page now has a **"What affects the cost of X in Goa?"** section (factors only, no prices), a **"X in Margao and Panaji"** section linking both clinics, and **3 more FAQs** taken from the questions people search ("Is a hair transplant painful?", "Will the fat come back after liposuction?", "Does laser hair removal work on Indian skin?" and so on). Pages are now 615–840 words. |
| 2 | Treatment pages did not link to the 35 journal guides | Each treatment page now ends with **"Guides on X"**, linking up to 4 related articles. This builds topic clusters in both directions. |
| 3 | Treatment titles all used one pattern ("X in Goa: Margao & Panaji") | Titles now match the searches: "Hair Transplant in Goa (FUE & FUT)", "Rhinoplasty (Nose Surgery) in Goa", "Liposuction in Goa: Cost, Recovery & Risks", "Tummy Tuck (Abdominoplasty) in Goa", "Laser Hair Removal in Goa: Sessions & Cost", and so on |
| 4 | Home title started with the name, not the search phrase | "Plastic & Cosmetic Surgeon in Goa \| Dr. Manish Patel, Margao" |
| 5 | Hub, FAQ, blog and contact H1s had no keywords ("Eleven treatments, explained plainly.") | Treatments: "Cosmetic & plastic surgery treatments in Goa." FAQ: "Plastic surgery in Goa: your questions." Journal: "Plastic surgery & skin guides." Contact: "Book a consultation in Margao or Panaji." The old wording moved into the small eyebrow line. |
| 6 | Location pages only targeted "plastic surgeon" | H1 is now "Plastic & cosmetic surgeon in Margao/Panaji". The Panaji title uses "Panjim", the spelling many people search. Added a "Cosmetic surgery and skin treatments in {city}" paragraph that links all 11 treatments. |
| 7 | FAQ title was generic | "Plastic Surgery in Goa: Cost, Safety & Recovery FAQ" |
| 8 | Home meta description did not mention treatments | Now lists MCh, 30+ years, the main treatments, and both cities |

Files changed: `_src/seo.mjs` (new: titles, cost factors and extra FAQs per treatment), `_src/build.mjs`, `assets/css/style.css`.

## 4. Action plan for launch (outside the code)

Ranked by impact. **Critical** items should be done on launch day.

1. **Critical: 301 redirects from the old site.** Map every old URL to its new page (/hair-transplant/ → /services/hair-transplant-goa/, /liposuction/ → /services/liposuction-goa/, and so on). The old pages hold #1 for "cosmetic surgery Margao" and "liposuction cost Goa". Without redirects those rankings start again from zero.
   *How we'd know it failed:* Search Console shows a drop in impressions for those queries in the 2–4 weeks after launch.
2. **Critical: point the domain and submit the sitemap** in Google Search Console and Bing Webmaster Tools, and request indexing of the home page, the 11 treatment pages and the 2 location pages.
3. **High: Google Business Profile, one per clinic.** Use the same name, address and phone (NAP) as the site, set the primary category to "Plastic surgeon", add each treatment as a service, link the website to the right location page, and add real photos of the clinic (no patient images). This drives the map pack, which sits above organic results for "near me" and city searches.
4. **High: directory consistency.** Make the Practo, Justdial, Medibuddy and Lybrate listings use the same NAP, and link them to the new site. Practo already lists Dr. Patel first for "plastic surgeon in Goa".
5. **High: Facebook pages.** The page titled "Hair Transplant and Laser Clinic by Dr Manish Patel" ranks for "laser hair removal Panjim". Update its website link to the new /services/laser-hair-removal-goa/ page.
6. **Medium: Physician sameAs.** Once the Practo profile URL is confirmed, add it to the Physician schema `sameAs`. This strengthens the link between the site and that profile.
7. **Medium: geo coordinates and opening hours** for both clinics in the schema (the TODO in `build.mjs`), once the clinic confirms them.
8. **Medium: new journal articles for searches with no page yet**: "hair transplant cost in Goa: what decides it", "rhinoplasty in Goa: first consultation questions", "is liposuction safe", "laser hair removal for men (beard line, back)". Each should link to its treatment page.
9. **Low: patient reviews on Google.** Reviews are written by patients on Google, and the website does not display them, in line with NMC rules. The clinic can let patients know where to leave one.

## 5. What to watch (leading indicators)

- Search Console impressions and average position for "plastic surgeon in Goa", "cosmetic surgeon Margao", "hair transplant Goa", "liposuction cost Goa" and "laser hair removal Panjim": check weekly for the first 8 weeks after launch.
- Clicks on the tel: and WhatsApp links. The site has no analytics yet; add Google Analytics 4 (or a privacy-friendly option) with events on these links, and update the privacy notice to match.
- How many of the 55 pages are indexed (Search Console, Pages report).
- Map pack position for "plastic surgeon Margao" and "plastic surgeon Panaji", checked from a phone in each city.
