# Image SEO Audit: Dr. Manish Patel site

Checked: 20 November 2026, on the built site: 56 pages, 702 `<img>` tags, 49 distinct image files.

## Summary

| Metric | Before | After |
|---|---|---|
| Total images | 702 tags / 49 files | same |
| Missing `alt` attribute | 0 | 0 |
| Empty `alt` (decorative) | 239 | 239. All correct: hidden loader, header logo inside a labelled link, avatars beside the doctor's name, aria-hidden marquee duplicates, video posters inside labelled buttons |
| Alt text that misdescribes the image | ~150 tags | 0 |
| Oversized (> 200 KB) | 2 (logo.png 214 KB, goa-2 205 KB) | 1 (goa-2, a wide banner under the 300 KB hero limit) |
| Not WebP | 1 (logo.png, used only as the schema logo) | same, now 52 KB |
| Missing width/height | 0 | 0 |
| width/height that disagree with the real file shape | ~600 tags | 3 (round avatars sized by CSS, correct) |
| Lazy images missing `decoding="async"` | 203 | 0 |
| LCP image lazy-loaded | 0 | 0. Every page hero has `fetchpriority="high"` and no `loading="lazy"` |
| Responsive `srcset` | All content images (a 720 px `-sm` variant plus the full file) | same |

## Fixes applied

1. **Alt text on stock photos.** Treatment and article images are licensed stock photos. Their alt text said "Hair Transplant at Patel Cosmetic Surgery Center" or repeated the article title, which neither describes the picture nor is true (the photos were not taken at the clinic). Each of the 24 stock images now has a factual description, for example "Man's receding hairline" or "Laser tattoo removal on a forearm". This also keeps the site clear of anything that could read as patient imagery under the NMC rules.
2. **Real image dimensions.** `width` and `height` described the crop box (for example 1000×667 for a square file), so browsers reserved the wrong space until the image loaded. The image helper now reads the real size from each WebP file.
3. **Home hero alt.** "Dr. Manish Patel: Dr. Manish Patel, MCh (Plastic Surgery)" became "Dr. Manish Patel, MCh (Plastic Surgery)".
4. **`decoding="async"`** added to the lazy avatar and footer logo images.
5. **Schema logo** `logo.png` resized from 1556 px (214 KB) to 600 px (52 KB). Google's logo minimum is 112 px.

## Already good

- WebP everywhere on pages, with a 720 px variant in `srcset` for phones.
- File sizes: every content image is under 210 KB; most are under 100 KB.
- Filenames are lowercase and hyphenated (`dr-world-congress`, `t-laser-legs`).
- Photos of Dr. Patel and events have specific captions and alt text (event, place, year).

## Not done, and why

- **AVIF.** It would save roughly 20–30% more, but the site already serves small WebP files and AVIF would double the asset count. Low value now.
- **IPTC / XMP creator metadata.** Display-only in Google Images, not a ranking factor. Worth adding to Dr. Patel's own photos (Creator, Copyright "Patel Cosmetic & Plastic Surgery Center") once the clinic confirms who owns the event photos.
- **Descriptive filenames for stock images** (`t-hair` → `receding-hairline`). It would help image search slightly, but renaming touches every page and the old URLs. Do it at the domain launch, when URLs change anyway.
- **Real clinic photos.** The biggest gain for image search and trust is the clinic's own photos (reception, consultation room, laser room, signboard, both buildings from the street). None of patients.
