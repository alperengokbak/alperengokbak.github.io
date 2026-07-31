/* global document, window, getComputedStyle */
import { devices, webkit } from "@playwright/test";

const URL = process.env.AUDIT_URL ?? "http://localhost:5173";
const ROUTES = ["/", "/case-studies/azure-devops-terraform", "/no-such-page"];

const PROFILES = {
  mobile: devices["iPhone 14"],
  desktop: { viewport: { width: 1440, height: 900 } },
};

const browser = await webkit.launch();
let findings = 0;

for (const [profileName, profile] of Object.entries(PROFILES)) {
  for (const route of ROUTES) {
    const context = await browser.newContext(profile);
    const page = await context.newPage();

    const consoleErrors = [];
    const failedRequests = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160));
    });
    page.on("requestfailed", (r) => failedRequests.push(`${r.url().slice(-70)} ${r.failure()?.errorText ?? ""}`));
    page.on("response", (r) => {
      if (r.status() >= 400) failedRequests.push(`HTTP ${r.status()} ${r.url().slice(-70)}`);
    });

    await page.goto(URL + route, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: `.reveal{opacity:1!important;transform:none!important}` });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    const audit = await page.evaluate((isMobile) => {
      const out = {
        overflow: [],
        smallTapTargets: [],
        imagesNoAlt: [],
        namelessControls: [],
        duplicateIds: [],
        clipped: [],
        brokenImages: [],
      };

      const docW = document.documentElement.clientWidth;
      const label = (el) =>
        `${el.tagName.toLowerCase()}.${(typeof el.className === "string" ? el.className : "").trim().split(/\s+/)[0] || "-"}`;

      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > docW + 1 || r.left < -1)) {
          out.overflow.push(`${label(el)} left=${Math.round(r.left)} right=${Math.round(r.right)}`);
        }
      });

      if (isMobile) {
        document.querySelectorAll("a[href], button, input, select, textarea").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (getComputedStyle(el).display === "none") return;
          if (r.height < 44 || r.width < 44) {
            out.smallTapTargets.push(
              `${label(el)} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 28)}" ${Math.round(r.width)}x${Math.round(r.height)}`
            );
          }
        });
      }

      document.querySelectorAll("img").forEach((img) => {
        if (!img.hasAttribute("alt")) out.imagesNoAlt.push(img.src.slice(-55));
        if (img.complete && img.naturalWidth === 0) out.brokenImages.push(img.src.slice(-55));
      });

      document.querySelectorAll("a[href], button").forEach((el) => {
        const name = (el.textContent || "").trim() || el.getAttribute("aria-label") || el.getAttribute("title");
        if (!name) out.namelessControls.push(label(el));
      });

      const seen = new Set();
      document.querySelectorAll("[id]").forEach((el) => {
        if (seen.has(el.id)) out.duplicateIds.push(el.id);
        seen.add(el.id);
      });

      document.querySelectorAll("*").forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.overflow !== "hidden" && cs.overflowY !== "hidden") return;
        if (el.scrollHeight > el.clientHeight + 2 && el.clientHeight > 0) {
          const txt = (el.textContent || "").trim().slice(0, 30);
          if (txt) out.clipped.push(`${label(el)} "${txt}" ${el.clientHeight}<${el.scrollHeight}`);
        }
      });

      return out;
    }, profileName === "mobile");

    const report = { ...audit, consoleErrors, failedRequests };
    const hits = Object.entries(report).filter(([, v]) => v.length);
    findings += hits.reduce((n, [, v]) => n + v.length, 0);

    console.log(`\n### ${profileName} ${route}`);
    if (!hits.length) console.log("  clean");
    for (const [k, v] of hits) {
      console.log(`  ${k} (${v.length}):`);
      [...new Set(v)].slice(0, 6).forEach((line) => console.log(`    - ${line}`));
    }

    await context.close();
  }
}

console.log(`\ntotal findings: ${findings}`);
await browser.close();
