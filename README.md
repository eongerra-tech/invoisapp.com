# invoisapp.com

Product site for **Invois** — static HTML, no build step, no dependencies.

```
index.html               landing page
privacy/index.html       privacy policy   ← the Play Store privacy URL
terms/index.html         terms of service
delete-account/index.html account deletion  ← required by Play for uninstalled users
guides/, ms/guides/, zh/guides/   guide articles + hub pages (styles: assets/guide.css)
assets/                  logo + stylesheets
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

## Writing a guide

Guides use a Medium-style reading layout from `assets/guide.css`. Copy an existing article in the same
language and keep this markup; each piece fails quietly (falls back to plain styling) if left out.

```html
<link rel="stylesheet" href="/assets/site.css">
<link rel="stylesheet" href="/assets/guide.css?v=2026-10-29e">  <!-- bump ?v= on every page whenever guide.css changes, or browsers keep the old file -->
<link rel="stylesheet" href="/assets/nav.css">
<!-- en / ms only: add Source Serif 4 to the Google Fonts URL (all 3 font links). zh pages use system CJK fonts -->

<main class="wrap story-wrap">
<article class="prose story">
  <nav class="crumbs" aria-label="Breadcrumb">…</nav>
  <h1>Title</h1>
  <p class="dek">One-line summary (usually the meta description).</p>
  <div class="byline">
    <img src="/assets/favicon-96.png" alt="" width="40" height="40">
    <div>
      <p class="who">Invois team, EONGERRA TECH</p>
      <p>7 min read · Last updated 13 October 2026</p>
    </div>
  </div>

  <section class="keypoints" aria-labelledby="kp-h">     <!-- "In short": 3–4 bullets that give the answers themselves -->
    <div class="kp-h" id="kp-h">In short</div>           <!-- ms: Ringkasnya · zh: 重点 -->
    <ul><li>…</li></ul>
    <nav class="kp-jump" aria-label="On this page"><span class="kp-jump-label">Jump to:</span><span class="kp-jump-links"><a href="#what-to-put">What to include</a> <a href="#faq">FAQ</a></span></nav>
  </section>                                              <!-- ms: Lompat ke: · zh: 目录：; short labels; no "·" in the HTML (CSS draws it) -->

  … body: <p>, <h2 id="…">, <h3>, <ul>/<ol> …
  <p class="app-note">One line on what Invois does here. More in <a href="#app">…</a>.</p>   <!-- after the main checklist -->

  <div class="table-wrap doc"><table>…</table></div>     <!-- example quotation/invoice: No. | Description | Qty | Unit price | Amount -->
  <div class="table-wrap money"><table>…</table></div>   <!-- payment ledger: label | RM | RM | RM -->
  <div class="table-wrap"><table>…</table></div>         <!-- anything else (text table): left-aligned -->
  <p>Note under a table renders small and grey.</p>
  <p class="plain">…unless it is real body text: add class="plain".</p>

  <section class="promo" id="app" aria-label="About Invois">       <!-- ms: Tentang Invois · zh: 关于 Invois -->
    <h2>… in Invois</h2> … <div class="cta">…Play badge…</div>
  </section>
  <p>More guides …</p>
  <hr class="dinkus">
  <section id="faq">                                      <!-- ms: Soalan lazim · zh: 常见问题 -->
    <h2>FAQ</h2>
    <div class="faq-list">
      <details><summary><h3>Question?</h3></summary><p>Answer.</p></details>   <!-- FAQPage JSON-LD = this text -->
    </div>
  </section>
  <ul class="sources">…</ul>                              <!-- optional source list -->
</article>
</main>
```

- **Read time:** en/ms ≈ words ÷ 230; zh ≈ Chinese characters ÷ 400 + Latin words ÷ 230. Round up.
  en "7 min read", ms "7 minit bacaan", zh "阅读约 7 分钟".
- **Hub pages** (`/guides/`, `/ms/guides/`, `/zh/guides/`): add a `<li>` to `.hub-list` with
  `<h2><a href>Title</a></h2>`, `<p class="hub-sum">` and `<p class="hub-meta">7 min read · 13 Oct 2026</p>`
  (same read time and date as the article's byline).
- Also add the new page to `sitemap.xml` with its hreflang alternates.

