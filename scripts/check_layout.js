const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("Playwright is not installed. Run: npm install && npx playwright install chromium");
  process.exit(1);
}

const root = path.resolve(__dirname, "..");
const pages = ["/", "/en/", "/links/"];
const widths = [320, 360, 390, 768, 1040, 1280];
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
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
        const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
        const consoleErrors = [];
        const localRequestFailures = [];

        page.on("console", (message) => {
          if (message.type() === "error") {
            consoleErrors.push(message.text());
          }
        });

        page.on("requestfailed", (request) => {
          const requestUrl = request.url();
          if (requestUrl.startsWith(baseUrl)) {
            localRequestFailures.push(`${request.failure()?.errorText || "failed"} ${requestUrl}`);
          }
        });

        const response = await page.goto(`${baseUrl}${pagePath}`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(500);

        const metrics = await page.evaluate(() => {
          const overflow = document.documentElement.scrollWidth - window.innerWidth;
          const offenders = Array.from(document.body.querySelectorAll("*"))
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                tag: element.tagName.toLowerCase(),
                id: element.id,
                className: typeof element.className === "string" ? element.className : "",
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              };
            })
            .filter((item) => item.right > window.innerWidth + 1)
            .slice(0, 5);

          return { overflow, offenders };
        });

        if (!response || response.status() >= 400 || metrics.overflow > 0 || consoleErrors.length || localRequestFailures.length) {
          failures.push({
            page: pagePath,
            width,
            status: response ? response.status() : "no-response",
            overflow: metrics.overflow,
            offenders: metrics.offenders,
            consoleErrors,
            localRequestFailures,
          });
        }

        console.log(`${pagePath.padEnd(8)} ${String(width).padStart(4)}px overflow=${metrics.overflow}`);
        await page.close();
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
