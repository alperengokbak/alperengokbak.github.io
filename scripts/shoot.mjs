/* global document, window */
import { chromium, devices, webkit } from "@playwright/test";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const URL = process.env.SHOOT_URL ?? "http://localhost:5173/";
const OUT = process.env.SHOOT_OUT ?? "./shots";
const ENGINE = process.env.SHOOT_ENGINE ?? "webkit";
const PROFILE = process.env.SHOOT_PROFILE ?? "mobile";

const PROFILES = {
  mobile: { ...devices["iPhone 14"] },
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
};

const SECTIONS = [
  "top",
  "snapshot",
  "skills",
  "tech",
  "certificates",
  "experience",
  "education",
  "projects",
  "blogs",
  "contact",
];

const engine = ENGINE === "chromium" ? chromium : webkit;

const browser = await engine.launch();
const context = await browser.newContext(PROFILES[PROFILE]);
const page = await context.newPage();

await page.goto(URL, { waitUntil: "networkidle" });

await page.addStyleTag({
  content: `
    .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    .hero-role-cursor { visibility: hidden !important; }
  `,
});

const HIDE_FIXED = `.site-nav, .back-to-top { visibility: hidden !important; }`;

await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});

await page.waitForTimeout(600);

const dir = path.resolve(OUT, `${PROFILE}-${ENGINE}`);
await rm(dir, { recursive: true, force: true });
await mkdir(dir, { recursive: true });

await page.screenshot({ path: path.join(dir, "00-viewport-with-nav.png") });

const hider = await page.addStyleTag({ content: HIDE_FIXED });

for (const [i, id] of SECTIONS.entries()) {
  const el = page.locator(`#${id}`).first();
  if ((await el.count()) === 0) {
    console.log(`skip  #${id} (not found)`);
    continue;
  }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const name = `${String(i + 1).padStart(2, "0")}-${id}.png`;
  await el.screenshot({ path: path.join(dir, name) });
  console.log(`shot  ${name}`);
}

await hider.evaluate((el) => el.remove());

const card = page.locator(".project-card-media").first();
if ((await card.count()) > 0) {
  await card.scrollIntoViewIfNeeded();
  await card.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(dir, "90-lightbox.png") });
  console.log("shot  90-lightbox.png");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
}

const k8s = page.getByRole("button", { name: /open a larger preview of Multi-node/i }).first();
if ((await k8s.count()) > 0) {
  await k8s.scrollIntoViewIfNeeded();
  await k8s.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(dir, "91-lightbox-wide-image.png") });
  console.log("shot  91-lightbox-wide-image.png");
  await page.keyboard.press("Escape");
}

const tall = page.getByRole("button", { name: /open a larger preview of Prescription/i }).first();
if ((await tall.count()) > 0) {
  await tall.scrollIntoViewIfNeeded();
  await tall.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(dir, "92-lightbox-tall-image.png") });
  console.log("shot  92-lightbox-tall-image.png");
  await page.keyboard.press("Escape");
}

const overflow = await page.evaluate(() => {
  const bad = [];
  const docWidth = document.documentElement.clientWidth;
  document.querySelectorAll("*").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    if (r.right > docWidth + 1 || r.left < -1) {
      bad.push({
        tag: el.tagName.toLowerCase(),
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 60),
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  });
  return { docWidth, scrollWidth: document.documentElement.scrollWidth, bad: bad.slice(0, 25) };
});

console.log("\n=== horizontal overflow ===");
console.log(`clientWidth=${overflow.docWidth} scrollWidth=${overflow.scrollWidth}`);
console.log(JSON.stringify(overflow.bad, null, 2));

await browser.close();
