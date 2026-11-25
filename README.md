# MoonByte Academy — commercial website

A standalone Next.js and TypeScript website for MoonByte Academy. It uses a checked-in catalogue snapshot, so it can run without the internal proposal project. There is no login, database, analytics, registration endpoint or payment collection.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://127.0.0.1:3000`. For a production build use `npm.cmd run build` followed by `npm.cmd start`. Node.js 20.9 or newer is required.

## Contact link

The consultation button is hidden until a real contact URL is provided. Create `.env.local` in this folder with an HTTPS link, for example `MOONBYTE_CONTACT_URL=https://wa.me/COUNTRYCODEANDNUMBER`. Replace the example with the actual number. Restart the server after editing it. The link is public; never put a secret in it.

## Catalogue

`lib/catalog.json` is the public snapshot of active courses and prices. While inside Skopos, author prices in `../src/catalog/definitions.js`; `predev` and `prebuild` validate the source and sync it automatically. Use `npm run sync:catalog` for a manual refresh or `npm run check:catalog` to detect drift without writing. Held PictoBlox and Roblox programs are excluded. When this website folder is moved out of the workspace, edit its snapshot directly; builds use that local snapshot without requiring the proposal project.

## Code organization and checks

`components/home.tsx` composes the page. Catalogue filtering and individual package selection live in `components/catalog/`. Navigation, hero, content sections and intro artwork are separate components. `Experience` owns splash lifecycle, focus, scroll locking and smooth scrolling; the motion preference lives in `hooks/` with a stable server snapshot. The server supplies the footer year to prevent server/client date drift.

Run `npm run typecheck` and `npm run build` in this folder. Workspace lint/format, finance tests, catalogue validation, browser regression, accessibility and production security checks are documented in the parent README. The public page has no catalogue type assertions; sparse package-price keys are explicitly optional.

## Security and deployment

The app uses a per-request nonce-based CSP, anti-framing, content-type, referrer and permissions headers. Inline styles remain allowed for Framer Motion. Production HTTPS hosting must preserve response headers and use a Node-compatible Next.js host; the app requires dynamic rendering for per-request nonces. Keep dependencies patched and run `npm audit`. The project is local and has not been deployed or independently security audited. Add server-side validation, rate limiting and privacy handling before introducing any future forms, accounts, payments or external services.
