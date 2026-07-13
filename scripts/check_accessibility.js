const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

let AxeBuilder;
let chromium;
try {
  ({ AxeBuilder } = require("@axe-core/playwright"));
  ({ chromium } = require("playwright"));
} catch {
  console.error("Accessibility dependencies are not installed. Run: npm install && npx playwright install chromium");
  process.exit(1);
}

const root = path.resolve(__dirname, "..");
const pages = ["/", "/en/", "/links/"];
const widths = [390, 1280];
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function resolveRequest(url) {
  const parsed = new URL(url, "http://localhost");
  const cleanPath = decodeURIComponent(parsed.pathname);
  const target = path.normalize(path.join(root, cleanPath));
  const relativeTarget = path.relative(root, target);

  if (relativeTarget.startsWith("..") || path.isAbsolute(relativeTarget)) {
    return null;
  }

  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    return path.join(target, "index.html");
  }

  return target;
}

function createServer() {
  return http.createServer((request, response) => {
    const filePath = resolveRequest(request.url || "/");
    if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

async function run() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch({ headless: true });
  const failures = [];

  try {
    for (const pagePath of pages) {
      for (const width of widths) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
        const page = await context.newPage();
        await page.goto(`${baseUrl}${pagePath}`, { waitUntil: "networkidle" });

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();

        console.log(`${pagePath.padEnd(8)} ${String(width).padStart(4)}px violations=${results.violations.length}`);

        if (results.violations.length) {
          failures.push({
            page: pagePath,
            width,
            violations: results.violations.map((violation) => ({
              id: violation.id,
              impact: violation.impact,
              help: violation.help,
              nodes: violation.nodes.slice(0, 5).map((node) => node.target),
            })),
          });
        }

        await context.close();
      }
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
