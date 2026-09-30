# invoisapp.com

Product site for **Invois** — static HTML, no build step, no dependencies.

```
index.html               landing page
privacy/index.html       privacy policy   ← the Play Store privacy URL
terms/index.html         terms of service
delete-account/index.html account deletion  ← required by Play for uninstalled users
assets/                  logo + stylesheet
CNAME                    invoisapp.com
```

## Why this is a separate repo

The app lives in a private repo, and GitHub Pages cannot serve from a private repo on
the free plan. These pages are public documents anyway.

**When the app changes what data it collects, update `privacy/index.html` in the same
breath.** Nothing enforces that from here — it is the one thing this split costs us.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` publishes to GitHub Pages and refuses to
deploy if any of the four required pages or the CNAME is missing.

Pages settings → Source must be **GitHub Actions** (not "Deploy from a branch").
