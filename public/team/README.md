# Team headshots

| File                   | Person                            | Status                       |
| ---------------------- | --------------------------------- | ---------------------------- |
| `lauren-duppstadt.jpg` | Lauren Duppstadt, Head Mixologist | ⚠ low-resolution placeholder |
| `laura-leary.jpg`      | Laura Leary, Head Mixologist      | ⚠ low-resolution placeholder |

## ⚠ Both files need replacing before launch

The files in place are **160 × 110 px chat thumbnails** (~3–4 kB each), not the
originals. The client sent full-size versions (~159 kB and ~116 kB) — those are
the ones that belong here.

Why it matters: the About page renders each portrait in a **4:5 card**. Cropping
a 160 × 110 landscape thumbnail to 4:5 uses only an 88 × 110 slice — it discards
roughly 45% of the width, then scales that up about 5×. The result is visibly
soft and crops in tight on the face.

**To fix:** overwrite both files with the originals, cropped to portrait
orientation at roughly **800 × 1000 px**. No code change needed — same filenames,
same paths, and the page picks them up immediately.

## Fallback behaviour

If a file is missing or fails to load, the card shows an initials monogram
(LD / LL) rather than a broken image, so the page always looks intentional.
See the `team` array in `src/pages/about/About.tsx`.
