# ETS LIPN — Website

French responsive website for etslipn.com. Pure HTML, CSS and JavaScript; no paid API, database, build step or production dependencies. All graphics are local optimized WebP assets.

## Files
- `dist/index.html`: page content and SEO.
- `dist/assets/style.css`: responsive layout and branding.
- `dist/assets/app.js`: mobile menu and WhatsApp quote preparation.
- `dist/assets/`: supplied imagery, compressed for the web.
- `dist/CNAME`, `robots.txt`, `sitemap.xml`: etslipn.com configuration.
- `.github/workflows/pages.yml`: automatic deployment from main.

## Preview and checks
Use a static HTTP server pointed at `dist`, for example `python -m http.server 8080 --directory dist`. Open http://localhost:8080.
With Node.js 18 or later: `npm run check` and `npm test`. No installation required.

## Upload to your GitHub repository
Create an empty repository in your account, then run inside this folder:

```bash
git remote add github https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push github main
```

The Sites source remote, if present, is separate from your personal GitHub account. A GitHub URL and authenticated access are required to push there. Do not commit access tokens or passwords.

## GitHub Pages and domain
In GitHub repository Settings → Pages, select GitHub Actions as the source, then run the deployment workflow. Set custom domain to `etslipn.com`; verify ownership and use the exact DNS records GitHub provides. Enable HTTPS once the certificate is ready. Configure `www` according to your chosen hosting provider. Do not change MX or email records when configuring the website. The email address in the page requires a separately configured mailbox.

Publish the contents of `dist` on any static hosting provider if not using GitHub Pages. Canonical URLs assume the custom domain; a project subpath preview requires that path to be considered.

## Editing
Search for `243970339904` to change the WhatsApp number in HTML and JavaScript. Update metadata, CNAME, robots and sitemap together if changing domains. Keep every filename case identical to the HTML references.

## Before public launch
Confirm company address, registration numbers, scope of services and email mailbox. Original customer claims naming PNUD and FAO were omitted pending confirmation. The supplied hero visual is described as an illustration. Prices and delivery commitments are deliberately not invented.

## Quote handling and privacy
The form validates required fields and creates a URL-encoded WhatsApp message. The visitor clicks Open WhatsApp and must send the message in WhatsApp. There is no server-side storage, automated sending, inbox or delivery confirmation. No trackers, cookies or external font/icon services are used. WhatsApp applies its own policies after the visitor follows the link.
