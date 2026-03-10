# TalentDeck

Multi-page reverse job hunting web app built with HTML, CSS, and vanilla JS.

## Pages
- `index.html` — landing with hero, how-it-works, stats, featured talent, testimonials.
- `explore.html` — recruiter view with live filters on mock talent data.
- `profile.html` — individual talent profile with reach-out modal and toast.
- `dashboard.html` — candidate dashboard (auth guarded via localStorage).
- `connections.html` — incoming/outgoing connections with drawer thread.
- `create-profile.html` — multi-step wizard to publish a profile.
- `login.html` — auth tabs for sign-in/sign-up.

## Scripts
- `js/theme.js` — dark mode toggle + persistence.
- `js/navbar.js` — dock behavior, scroll shrink, active states.
- `js/animations.js` — IntersectionObserver entrance animations.
- `js/data/mockTalent.js` — mock dataset shared across pages.

## Notes
- Uses Google Fonts (Inter for body, Sora for headings).
- All icons are inline SVG from `assets/icons/`.
- No build step required; open `index.html` in a browser.
