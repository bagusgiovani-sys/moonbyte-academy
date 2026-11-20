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

`lib/catalog.json` is the public snapshot of active courses and prices. Edit it when using the site independently. While this folder remains inside the Skopos workspace, run `node scripts/sync-catalog.mjs` to refresh it from the proposal catalogue; review changes before publication. Held PictoBlox and Roblox programs are excluded from that sync.

## Security and deployment

The app uses a per-request nonce-based CSP, anti-framing, content-type, referrer and permissions headers. Inline styles remain allowed for Framer Motion. Production HTTPS hosting must preserve response headers and use a Node-compatible Next.js host; the app requires dynamic rendering for per-request nonces. Keep dependencies patched and run `npm audit`. The project is local and has not been deployed or independently security audited. Add server-side validation, rate limiting and privacy handling before introducing any future forms, accounts, payments or external services.
