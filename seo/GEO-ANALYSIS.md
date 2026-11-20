# GEO / AI Search Readiness: Dr. Manish Patel site

Checked: 20 November 2026, against the staging build at https://websons.github.io/drmanishpatel/ (the production domain patelcosmeticsurgeryclinic.com still serves the old WordPress site).

Framing: Google says optimising for AI search "is still SEO". Everything below is ordinary SEO applied to AI Overviews, AI Mode, ChatGPT Search, Perplexity and Claude search. No platform visibility was measured with a tool (no DataForSEO or SE Ranking connected), so platform readiness is qualitative.

## 1. GEO Readiness Score: 68 / 100

| Criterion | Weight | Score | Why |
|---|---|---|---|
| Citability | 25 | 17 | Every journal post opens with a "Short answer" block; service pages open with an "X is..." definition. Home and location pages have little quotable text. |
| Structural readability | 20 | 14 | Clean H1 > H2 > H3, FAQ sections, lists. Few question-form headings, no comparison tables anywhere (0 `<table>` on checked pages). |
| Multi-modal | 15 | 10 | Real photos, 4 educational videos with VideoObject markup. No tables, diagrams or charts. Videos sit only on the home page. |
| Authority & brand | 20 | 9 | Physician schema with credentials, bylined posts with dates. No register number shown, no "medically reviewed" line, posts cite no outside sources, thin `sameAs`, inconsistent facts on third-party directories. |
| Technical access | 20 | 18 | Fully static HTML: all content is present without JavaScript. All AI crawlers allowed. Staging is `noindex,nofollow` on purpose; production cutover not done. |

The site itself is in good shape. The score is held down mostly by off-site entity signals and by the production domain not yet serving this build.

## 2. Platform readiness (not measured)

| Surface | Readiness | Main gap |
|---|---|---|
| Google AI Overviews | Good once live | Needs the site indexed on the real domain with 301s from the old URLs; AIO cites pages that already rank. |
| Google AI Mode | Fair | Draws on entity authority and freshness. Visible review dates and consistent directory facts matter here. |
| ChatGPT Search | Fair | Leans on Wikipedia, directories and Reddit. Directories currently disagree on experience and repeat "best surgeon" claims. |
| Perplexity | Weak | Heavy on Reddit / community content; no presence found. |
| Claude search / Bing Copilot | Good once live | Bing index: submit sitemap in Bing Webmaster Tools and use IndexNow at launch. |

## 3. AI crawler access (live robots.txt)

`User-agent: * / Allow: /` covers every crawler not named. Each is reported on its own capability:

**Search / citation crawlers**
- `Googlebot` (Google Search, AI Overviews, AI Mode): allowed.
- `OAI-SearchBot` (ChatGPT Search citations): allowed, named.
- `PerplexityBot` (Perplexity search): allowed, named.
- `Claude-SearchBot` (Claude search citations): allowed via `*`, not named.
- `Applebot` (Siri, Spotlight, Safari): allowed via `*`.

**User-triggered fetchers**
- `ChatGPT-User`: allowed, named. `Claude-User`: allowed via `*`. `Perplexity-User`, `Google-Agent`: generally ignore robots.txt anyway.

**Training-only signals** (licensing choice, no effect on search visibility)
- `GPTBot`: allowed. `ClaudeBot`: allowed. `Google-Extended`: allowed. `Applebot-Extended`: allowed. `CCBot`: allowed via `*`.

Recommendation: no change needed for visibility. Optionally name `Claude-SearchBot` explicitly for clarity. If the clinic does not want its content used for model training, block `GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, `Applebot-Extended` without touching search visibility.

Note: the staging robots.txt already points its Sitemap line at the production domain. That is correct for launch.

## 4. llms.txt

Present at `/llms.txt`: summary, key facts, both clinic addresses, all treatment and journal URLs, last-updated date. Google states llms.txt has no effect on Search; no major AI provider has confirmed using it. Keep it (cheap, harmless), give it no weight. Small fixes: the "Treatments" fact line lists 11 treatments; add the register number once confirmed.

## 5. Brand and entity presence (web search, 20 Nov 2026)

| Platform | Found | Note |
|---|---|---|
| Wikipedia / Wikidata | No | Not notable enough for Wikipedia; a Wikidata item is feasible later. |
| Reddit | No | Nothing found. Do not seed posts (Google rejects mention-farming; NMC risk). |
| YouTube | Channel exists | Linked in schema. Strongest AI-citation correlate; the 4 cleared explainers belong there with plain titles. |
| LinkedIn | Not found | Add a personal profile for Dr. Patel and link it in `sameAs`. |
| Instagram / Facebook | Yes | @drmanishp, @patelcosmeticsurgerycenter, plus a third handle @patelcosmeticsurgerycentre. |
| Directories | Practo, Justdial (2 listings), Kivihealth, DocIndia, BNI, Radiance Diagnostics, Daffodils Hospital (Vasco) | Facts conflict (see below). |

**Conflicts AI systems will see:**
- Experience: Practo "36 years", Kivihealth "28+ yrs", Facebook / old site "30 years", our site "30+".
- Phone: Radiance Diagnostics lists 098220 32084, not the clinic numbers.
- Claims: Justdial "best plastic surgeon in Goa" with star ratings; DocIndia "more than 3000 surgeries"; Facebook "board certified". These are not the clinic's own pages, but they are what assistants quote, and the NMC rules make the doctor responsible for claims made on his behalf where he controls the listing.

**Possible register number:** Kivihealth's profile shows "Registration GMC3088". This is a third-party listing. Confirm with Dr. Patel or the Goa Medical Council before it goes on the site.

**Domain:** drmanishpatel.com is parked at GoDaddy. Worth buying and redirecting to the main site to stop anyone else using his name.

**Affiliation:** Daffodils Hospital, Vasco lists him as a plastic surgeon. If he operates there, it is a verifiable affiliation for the About page and `Physician.hospitalAffiliation`.

## 6. Passage-level citability

Strong (keep this pattern):
- Every journal post: "Short answer" block directly under the H1, 40–60 words, self-contained. Example from the sunscreen post: "Use a broad-spectrum sunscreen of SPF 30 or higher every morning on exposed skin, apply enough, and reapply every two to three hours when outdoors..."
- Service pages: first sentence is a definition ("A hair transplant moves healthy hair follicles from a donor area...").
- FAQ blocks on home and service pages, marked up as FAQPage.

Weak:
- Location pages: about 150 words of real content. Nothing an assistant could cite for "plastic surgeon in Margao" beyond the address.
- Home page: headings are taglines ("What would you like to discuss?") rather than answers.
- About page: credentials are in lists, but there is no single paragraph that answers "Who is Dr. Manish Patel?" in one go.

## 7. Server-side rendering

All checked pages (home, service, blog, about, location) are static HTML generated at build time. Headings, body text, FAQ answers and JSON-LD are in the raw HTML. GSAP / Lenis only animate; `data-reveal` elements carry their text in the markup. GPTBot, PerplexityBot and other non-rendering crawlers see the full content. No action needed.

## 8. Top 5 highest-impact changes

1. **Launch on the real domain with 301s.** Nothing here can be cited by Google AI features while production serves the old WordPress site and staging is noindex. Needs a host that supports redirects (see IMPLEMENTATION-ROADMAP.md).
2. **Confirm and publish the register number**, then show it on every page footer and in `Physician.identifier`. The Kivihealth "GMC3088" is a lead, not a source.
3. **Fix the directory facts.** One experience figure (choose a start year and let it count), the two clinic phone numbers, and removal of "best" / "board certified" / surgery-count claims on listings the clinic controls (Practo, Justdial, Facebook, Instagram bios, DocIndia).
4. **Add a visible "Medically reviewed by Dr. Manish Patel, MCh · Last reviewed [date]" line to every post and service page**, with matching `dateModified`, `reviewedBy` on `MedicalWebPage`, and a short "Sources" list (WHO, NHS, AAD, IAAPS or peer-reviewed papers) on each post.
5. **Grow the entity:** LinkedIn profile, Wikidata item (once there is a reliable source), YouTube uploads of the four cleared explainers with descriptions that link back to the matching service page, and add all of them to `sameAs`.

## 9. Schema recommendations

Current: WebSite, MedicalBusiness + Organization, Physician + Person, 2 × MedicalClinic, MedicalWebPage + MedicalProcedure on services, BlogPosting with author `@id`, FAQPage, BreadcrumbList, VideoObject. All parse.

Add:
- `Physician`: `identifier` (register number, already wired, waits on the value), `hospitalAffiliation` (if confirmed), `memberOf` (Association of Plastic Surgeons of India, IAAPS, if confirmed with years), more `sameAs` (LinkedIn, YouTube, Practo profile).
- `MedicalClinic` nodes: `geo`, `hasMap`, `openingHoursSpecification` (waits on hours), `areaServed` (South Goa / North Goa towns).
- `MedicalWebPage` on service pages and posts: `reviewedBy` the doctor `@id`, `lastReviewed` date. (Only once the visible line exists, so markup matches the page.)
- `BlogPosting`: `citation` entries once posts carry a Sources list.
- `VideoObject`: also on the matching service page (Botox video on Botox page, hair-care video on hair transplant page, tattoo video on laser page, acne video on acne scar page).

Do not add: `Review`, `AggregateRating` or any rating markup (NMC, and Google ignores self-serving reviews).

## 10. Content reformatting suggestions

- **Location pages (Margao, Panaji):** add a 130–170 word answer block: who consults there, which treatments are done at that clinic versus referred to a hospital, how to get there (landmarks: Bolshe Circle; next to State Central Library, Patto), parking, hours, languages. Add the map embed and a short FAQ ("Is surgery done at this clinic?", "Do I need an appointment?").
- **About page:** open with one paragraph that answers "Who is Dr. Manish Patel?": degrees, register number, years in practice (one figure), where he trained, where he operates, what he treats. This is the passage assistants will lift.
- **Service pages:** turn generic H2s into the questions people type: "What to expect" → "What happens during a hair transplant?"; "Recovery" → "How long is recovery after a hair transplant?". Keep the content.
- **Comparison posts** (Botox vs fillers, liposuction or tummy tuck, breast lift vs implants, FUE vs FUT): add a small table (what it does, anaesthesia, typical recovery, how long it lasts, main risks). Tables are among the most-quoted formats.
- **Every post:** add 2–4 outside sources at the end, and one first-hand line from Dr. Patel where true ("In clinic, the most common reason I advise waiting is...") so the content has experience that generic sites do not.
- **Home page:** keep the design headings, but make the first paragraph under the hero a plain factual sentence: "Dr. Manish Patel is a plastic surgeon (MBBS, MS, MCh) with clinics in Margao and Panaji, Goa..."

## Waiting on the clinic

Register number (confirm or correct GMC3088), single experience figure, opening hours, hospital affiliations and memberships with years, LinkedIn, access to Practo / Justdial / Google Business Profile listings, decision on the drmanishpatel.com domain.
