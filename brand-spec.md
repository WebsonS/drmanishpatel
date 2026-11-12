# Dr. Manish Patel — Brand Spec

**Idea: "The Art of Renewal."** The logo shows a figure leaping out of a circle of leaves. Every visual decision comes from that: renewal, lightness, a living green and a calm, trustworthy blue.

## Assets (all real, sourced from patelcosmeticsurgeryclinic.com)
| Use | File |
|---|---|
| Logo | `assets/img/logo.png` |
| Dr. Patel, hero (with CO2 laser) | `assets/img/p/dr-laser.webp` |
| Dr. Patel, studio portrait | `assets/img/p/dr-portrait.webp` |
| Recognition | `dr-award-aesurg.webp` (IAAPS AESURG), `dr-world-congress.webp` (FADS World Congress 2023), `dr-gimacon.webp` (IMA GIMACON) |
| Team / theatre | `team-ot.webp`, `team-fads-2023.webp`, `team-group-1/2.webp`, `team-1..6.webp`, `team-doc-1.webp`, `t-device-1/2.webp` (operating theatre) |
| Treatments | `t-*.webp` |
| Goa | `goa-1.webp`, `goa-2.webp` |
Originals and all patient media (testimonial films, before-and-after photos, clinic reels with result shots) are kept outside the repository in `_private/`, which git ignores. They must not be published (see Compliance).

## Colour: a trust palette
Patients choosing a surgeon are anxious, and the main thing they are deciding is whether to trust him. The palette is built around that decision.
The token names stay the same in the CSS (`--forest` now holds navy) so the existing components keep working.

| Token | Hex | Role | Why |
|---|---|---|---|
| `--forest` | `#0F2A47` | Navy: dark sections, headings, header | Blue is the colour most associated with trust, competence and calm, which is why most healthcare brands use it. This is the logo blue, deepened for authority. |
| `--cobalt` | `#1C5FBF` | Logo blue: links, focus, selected states | Marks anything interactive that is not booking, so users learn one meaning per colour. |
| `--leaf` | `#2E7D3E` | Green: the booking button and accent words | Green reads as health and renewal (the logo's leaves) and as "go". It is the only saturated warm-against-cool colour on a blue page, so the Book button stands out by isolation (the Von Restorff effect). Darkened from `#3E8E4A`, which failed contrast for small text. |
| `--leaf-2` | `#6FBF7A` | Light green on navy | Accent words and icons on dark sections. |
| `--cream` | `#F7F4EE` | Warm ivory page background | Less sterile than clinical white, and warm neutrals flatter skin tones in before/after photos, where cold blue-greys make skin look sallow. |
| `--sand` | `#ECE4D8` | Results section | A warm backdrop behind skin photography. |
| `--ink` | `#14202C` | Body text (blue-black) | Softer than pure black on ivory: less glare, and it reads as part of the blue family. |
| `--muted` | `#55606C` | Secondary text | |
| `--gold` | `#E8A93B` | Review stars only | Kept to stars so they read as ratings. |

Red is deliberately absent: in a surgical context it signals danger and blood.

**Contrast (WCAG 2.2):**
| Pair | Ratio | Level |
|---|---|---|
| ink on ivory | 15.0:1 | AAA |
| navy on ivory | 13.3:1 | AAA |
| ivory on navy | 13.3:1 | AAA |
| muted on ivory | 5.8:1 | AA |
| cobalt on ivory | 5.6:1 | AA |
| white on cobalt | 6.1:1 | AA |
| white on the green CTA | 5.1:1 | AA |
| leaf on ivory | 4.6:1 | AA |
| light green on navy | 6.5:1 | AA |

Leaf on sand is 4.0:1, so it is used only for large italic display words, which pass AA for large text.

## Type (self-hosted in `assets/fonts/`)
- **Plus Jakarta Sans** (as `Jakarta`): headings (weight 600, tight tracking), UI and body.
- **Instrument Serif Italic** (as `Instrument`): accent words inside headings only (`h1 em`, `h2 em`), in leaf green.
- **Allura** (as `Signature`): Dr. Patel's signature, used once or twice per page, never for body copy.

## Signature devices
1. **Leaf mask**: images cropped to a leaf shape (`border-radius: 60% 0`), taken from the logo.
2. **Signature**: "Manish Patel" in script, drawn on in the preloader and footer.
3. **Living motion**: Lenis smooth scroll, GSAP reveals, image clip-path reveals, marquee rows, pinned treatment carousel, draggable recognition carousel.

## Compliance: NMC advertising rules
The site follows the National Medical Commission's *Guidelines on Ethical Advertising and Public Communication by Hospitals/Medical Institutions and Registered Medical Practitioners* (public notice R-13014/01/2024-Ethics, 6 October 2026). The site's job is to inform, not to persuade.

**Never publish**
- Patient testimonials, reviews, star ratings or review widgets, in any form (cl. 3.2 Expl. V, 8.1(xi)). Patient consent does not make them acceptable.
- Before-and-after images or case results (cl. 8.1(v)).
- Patient photos, videos or identifiable details (cl. 6, 7.4). This includes clinic reels that splice in result shots.
- Superlatives ("best", "leading", "No. 1"), success rates, patient counts, guarantees or outcome promises (cl. 8.1(iii), (vi), (ix)).
- Offers, discounts or time-limited deals (cl. 8.1(x)).

**Always show**
- Each doctor's name, qualifications and medical register number (cl. 3.2 Expl. III). Set `SITE.reg.no` in `_src/data.mjs`; until then the site prints "awaiting confirmation".
- Risks, recovery and who a procedure may not suit, on every treatment page (`RISKS` in `_src/data.mjs`).
- The disclaimer in the footer, and consent on the enquiry form (DPDP Act 2023, cl. 7.6).

**Allowed**
- Factual information: clinics, addresses, phone numbers, hours, services, qualifications, verifiable positions held (with body and year).
- Patient education that does not promote the practice (cl. 5.1): the risk sheets, the journal, and Dr. Patel's purely educational videos. Only `r-acne` passed a frame check; review any new reel frame by frame first.
- Calls to action are neutral: "Request an appointment", "Contact the clinic". Never "Book now" or urgency.
