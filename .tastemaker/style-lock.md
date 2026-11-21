# Style lock: Dr. Manish Patel site (v13, 2026-11-21)

## Direction
Thesis: an older doctor's practice, shown the way he wants it: his photo large, his name large, calm text, big pictures.
First viewport: full-bleed portrait of Dr. Patel, navy scrim from the left, name set at display size in Newsreader.
Risk taken: the name is the headline, not a promise line.

## Type
- Display: Newsreader (self-hosted, opsz+wght variable, italic for accents)
- Text and UI: Figtree 300-800 (self-hosted)

## Color contract (v13.1, 2026-11-22: taken from the original patelcosmeticsurgeryclinic.com)
Method: NN/g colour guidance (follow brand colours, max three, 60-30-10, accent saved for the main action), monochromatic blue.
- 60% grounds: white, --cream #F7F9FC, --sand/--mist #EEF3F7 (the original's pale blue wash)
- 30% brand blue: --forest #0B3F7A (original brand blue), --forest-2 #1F5FA6, --forest-3 #072C57
- 10% accent: --leaf #2F6DB5 for labels and italic accents; --leaf-2 #A9CBEF on dark blue
- Text: --ink #13233A, --ink-2 #2C3E55, --muted #56657A
- Contrast: #0B3F7A on white 10.47:1, #2F6DB5 on #EEF3F7 4.73:1, #56657A on #EEF3F7 5.31:1, #A9CBEF on #072C57 8.28:1
- Bronze is retired.

## Motion
None. The client asked for no animation or carousels. The "Simple mode" block in style.css switches off transitions site-wide. Do not add GSAP.

## Rules
- NMC: no testimonials, before/afters, patient media, prices, offers, superlatives, patient counts.
- No overlays or name tags on photos of Dr. Patel.
- No em dashes in shipped copy.
