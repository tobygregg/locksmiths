# Guernsey Locksmiths Limited — website

Single-page site in plain HTML + Tailwind CSS v3 (compiled and committed), with a little vanilla JavaScript. No frameworks, no runtime CDNs.

## Folder layout

```
index.html              the whole site – sections separated by big comment banners
thanks.html             page shown after the quote form is sent
404.html                "page not found" page (GitHub Pages serves it automatically)
assets/css/styles.css   compiled Tailwind – don't edit by hand, run `npm run build`
assets/js/main.js       menu, scroll reveals, header, services explorer, sticky mobile bar, form checks
assets/fonts/           self-hosted Fraunces + Figtree (woff2) with their OFL licences
images/brand/           logo-mark.svg – the GL key-and-keyhole logo redrawn as SVG
images/work/            photos, each in two WebP sizes (name.webp + name-sm.webp)
images/                 favicons, og-image.jpg (share card), site.webmanifest
src/input.css           Tailwind source: fonts, buttons, form fields, hero + van animations
tailwind.config.js      brand colours and fonts
package.json            `npm run build` / `npm run watch`
sitemap.xml, robots.txt
_fb-pack/               research pack from the Facebook page (not published – see Source)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| Ink | `#181818` | Logo black. Text, buttons, the reviews band and footer |
| Paper | `#fdfdfb` | Logo white. Page background |
| Paper 100 / 200 | `#f6f5f1` / `#eeece6` | Warm tints for alternating sections and illustration backdrops |
| Steel 200 / 400 | `#d8d8d6` / `#a6a8a9` | Logo grey and the van's silver. Padlock shackle, van graphic, safe |
| Brass 400 / 500 | `#d1a043` / `#b8862f` | The one warm accent (key brass). Not in the pack – chosen to lift the black-and-white logo. Underline, icons, keys |

- **Fonts:** Fraunces (headings) and Figtree (body), both self-hosted, both SIL Open Font License.
- **Logo:** the Facebook logo was only 237px wide, so it was traced to a clean SVG (`images/brand/logo-mark.svg`) – same key, keyhole, oval and chain. The header wordmark is set in Figtree with a keyhole in place of the O in "Locksmiths", after the van lettering.
- **Favicon:** the keyhole escutcheon from the logo.

## Editing

- **Text:** everything is in `index.html`. Search for the words you want to change.
- **Colours:** change them in `tailwind.config.js`, then run `npm install` (first time only) and `npm run build`.
- **Services explorer:** each service is a `<button role="tab">` plus a matching `<article role="tabpanel">` (ids `tab-xxx` / `panel-xxx`). To add one, copy a pair, give both new ids, and add the service to the form's `<select>`. The "Ask about this" buttons use `data-service="…"` – it must match an `<option>` exactly so the form pre-selects it.
- **Adding a photo:** export two WebP files (about 1600px and 800px wide) into `images/work/` as `name.webp` and `name-sm.webp`, then copy the `<img srcset=…>` from the About section. Always set `width`, `height` and real `alt` text.
- **Gallery / before–after:** not included – see the checklist below.
- **Hero animation:** the padlock is inline SVG in `index.html`; its timing lives in `src/input.css` under "Hero padlock". The van is the `.van-track` block just below it. Both stop for visitors who have reduced motion turned on.

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/locksmiths/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, the JSON-LD, `sitemap.xml`, `robots.txt` and the form's `_next` field.
- [ ] **When the client goes ahead, switch the form from Toby's email to the client's** (`action="https://formsubmit.co/…"` in `index.html`), then send one test enquiry and click FormSubmit's activation email.
- [ ] Confirm phone (07781 146006), WhatsApp (+44 7781 146006) and email (guernseylocksmiths@cwgsy.net) with the client.
- [ ] Get the client to sign off the services wording. The pack only gives the four lines on the van (architectural ironmongery, master key systems, safes & security, traditional locksmiths) plus what the reviews describe (lockouts, weekend call-outs, a bike lock, a key adjusted to fit). Assumptions to check:
  - The "What's included" lists are written out from those headings – e.g. lock changes after a move, key cutting, security checks, door closers and letter plates.
  - "Homes, offices and commercial buildings", and "offices, shops, rental properties and shared buildings" for master keys.
  - "We can get out to you quickly" and the weekend call-outs come from the reviews, not a stated policy. Check they're happy to promise both.
  - Address shown as "Guernsey, GY6 8AU" only, as on Facebook.
- [ ] Ask whether the reviewers are happy to be quoted (first name + initial). Two quotes were trimmed slightly – "F.O.C." was taken out of Simon G.'s so it doesn't read like a free-work offer.
- [ ] A review names "Jez". If that's the owner, an About line with his name and a photo of him at work would be the single best improvement.
- [ ] Ask for photos of real jobs (locks fitted, master-keyed doors, safes, ironmongery). The pack only had two van photos, so there's no Recent work gallery yet. Before/after doesn't suit a locksmith.
- [ ] No opening hours or prices were given, so none are shown.

Left out of the pack on purpose: the anniversary post and wedding photo (personal), the follower and review counts, and a duplicate of the side-of-van photo.

## Source

Built from the Facebook pack in `_fb-pack/` (BRIEF.md, data.json, images). The folder starts with an underscore so GitHub Pages doesn't publish it on the live site.
