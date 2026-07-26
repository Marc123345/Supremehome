# Supreme Home Roofing & Construction

Marketing site for **Supreme Home Roofing and Construction**, DBA **Supreme Commercial Coatings** — Katy, TX.

Positioning is taken straight from the discovery questionnaire: they are a
**commercial roof restoration** company that also does residential, and the
whole site is built around one differentiator — *repair → restore → replace*,
in that order, rather than defaulting to a replacement quote.

- **Framework:** Next.js 15 (App Router, Turbopack) · React 19 · TypeScript
- **Styling:** Tailwind CSS v4 + a token layer in `app/globals.css`
- **Animation:** `motion` (Framer Motion v12)
- **Icons:** `lucide-react`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## Where the design came from

| Source | What was taken |
| --- | --- |
| `SCC_Professional_Logo_Master_Package` | The **primary identity**. Supreme Commercial Coatings leads the site, matching the commercial-first positioning. Official **SCC Red `#E00116`** (from `README_FIRST.txt`), plus the horizontal / stacked / symbol SVG masters, reverse and white-monochrome treatments, and favicons. |
| `Supreme Home Website 2` | The **residential lockup** (`#d4101a`, from `HexCode.jpg`) and the two CertainTeed credential badges. |
| `~/my-react-app/Varahnigroup` (Vharanani Group) | The **hero**. Full-bleed media, dark→brand gradient, blueprint grid, scramble headline, dual tickers, scroll cue and the 4px accent line. `TextScramble` is a direct port. |
| `~/Desktop/topfloor pack` | Component **patterns**: Preloader, Counter/CounterUp, BackToTop, Slidingtext, Circletext, About, Process, Whycoose, Cta, Team, Services. Rebuilt in Tailwind + motion — the pack's own images are grey placeholders and its markup is Bootstrap/jQuery-era, so only the ideas carried over. |
| `~/my-react-app/marc-portfolio-nextjs` | The **services arc slider** (`components/ArcSlider.tsx`), restyled to this palette. |

### Ported topfloor components

| topfloor file | Here |
| --- | --- |
| `elements/Preloader.js` | `components/ui/Preloader.tsx` — letter-flip + spinner, dismissed on `load`, hard-capped at 2.2s |
| `elements/Counter.js`, `CounterUp.js` | `components/ui/CounterUp.tsx` — one IntersectionObserver per instance, rAF eased tween (the original shared a single DOM-queried trigger across every counter) |
| `elements/BackToTop.js` | `components/ui/BackToTop.tsx` — circular scroll-progress ring |
| `home1/Slidingtext.js` | `components/sections/SlidingText.tsx` — giant marquee words, outlined until hover |
| `home3/Circletext.js` | `components/ui/CircleText.tsx` — rotating curved text, inline SVG `textPath` (drops the `react-curved-text` dependency) |
| `home1/About.js` | `components/sections/About.tsx` — checklist + stat badge + rotating badge |
| `home1/Process.js`, `home3/Whycoose.js` | `components/sections/WhyChoose.tsx` (reasons + capability tiles) and `components/sections/Process.tsx` (5-step timeline) |
| `home1/Team.js` | `components/sections/Team.tsx` |
| `home1/Services.js` | `components/sections/ServicesSlider.tsx` |
| `home3/Cta.js` | `components/sections/CTABand.tsx` |

### Carousels

- **Services** — `components/ui/ArcSlider.tsx`: 3D rotateY arc, pointer tilt on
  the active card, drag, ← / → keys, dots and side arrows. Under 768px it falls
  back to a horizontal scroll-snap row.
- **Who we work with** — `components/ui/CardCarousel.tsx`: paged track,
  responsive 1 / 2 / 3 cards per view, arrows, dots, swipe, auto-advance that
  pauses on hover and focus.

---

## Routes

| Route | Notes |
| --- | --- |
| `/` | Home |
| `/commercial-roofing` | Core money page |
| `/residential-roofing` | |
| `/service-areas` | Hub, links all 18 cities |
| `/service-areas/[city]` | **18 statically generated location pages** |
| `/about`, `/contact` | |
| `/api/lead` | Form endpoint — **see the warning below** |
| `/sitemap.xml`, `/robots.txt` | Generated from `lib/locations.ts` |

Location pages are in `lib/locations.ts`. Each has its own county, building
stock, local failure mode and nearby areas — they are *not* one template with
the city name swapped, because near-duplicate doorway pages are a ranking
liability.

---

## ⚠️ Before this goes live

1. **Wire up lead delivery.** `app/api/lead/route.ts` validates and logs the
   submission but **does not send it anywhere**. Until it is connected to email
   (Resend/Postmark), their CRM, or Jotform, form leads exist only in server
   logs. The phone number is the working conversion path today.
2. **Swap the photography.** Every image is a verified-live Unsplash URL in
   `media` (`lib/site.ts`). Replace with their own job photos and drone
   footage; add the new host to `remotePatterns` in `next.config.ts`.
3. ~~Add the real logo.~~ **Done** — the supplied master assets are in
   `public/brand/`. Note the SCC *reverse* file keeps the symbol red, so it is
   only valid on dark/black; red backgrounds use the *white monochrome* file.
4. **Add the VA letter.** `components/sections/Proof.tsx` states the Veterans
   Hospital letter of recommendation exists and is available on request. Drop
   the PDF in `/public` and link it.
5. **Fill in the team.** `team` in `lib/site.ts` lists *roles*, not people —
   no names or headshots were supplied and inventing them was not an option.
6. **Set the canonical domain.** `site.url` points at `mysupremehome.com`.
7. **Analytics.** Nothing is installed. Note that `G-CV8EEZJLCW` is the
   portfolio property — do not reuse it here.

## Claims accuracy

Content is constrained to what the questionnaire actually supports. There are
no invented review counts, project counts, or years in business (they report 1
year trading). The credentials line reads:

> Insured to $2M · Bonded where required · Oklahoma CIB residential roofing
> licence #80007778. Texas does not issue a state roofing contractor licence.

That last sentence matters — the questionnaire says "No licenses in Texas", and
Texas genuinely has no state roofing licence, so framing it this way is both
honest and a competitive advantage over rivals implying otherwise.

## Notes

- Component classes live in `@layer components` so Tailwind utilities always
  win. Without the layer `.btn { display:inline-flex }` beats `.hidden`, which
  silently breaks responsive visibility.
- A `<noscript>` block forces reveal-animated content visible, so the page
  never renders blank for non-JS clients.
- `prefers-reduced-motion` is respected across the scramble, counters,
  carousel auto-advance and all transitions.

## Brand usage

| Context | Asset |
| --- | --- |
| Header (on the red angled block) | `scc-horizontal-white.svg` |
| Footer red panel | `scc-horizontal-white.svg` |
| Mobile menu (white sheet) | `scc-horizontal.svg` |
| Residential page | `supreme-home-horizontal.png` |
| Favicon / touch icons | SCC symbol |

`Logo` takes `variant="dark" | "light" | "solid"`. **`light` is reverse — white
lettering but a still-red symbol, so it is for dark backgrounds only.** On red,
use `solid` (white monochrome), or the symbol vanishes.

The CertainTeed **ShingleMaster** and **Master Craftsman** badges are specific
credential tiers, shown in the Credentials band and on the residential page.
Wording matches CertainTeed's own naming; confirm both tiers are current before
launch.
