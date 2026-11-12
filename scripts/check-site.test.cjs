const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { test } = require("node:test");

const checker = path.join(__dirname, "check-site.cjs");

test("rejects external assets but allows external navigation and inline data", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "site-check-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const run = () => spawnSync(process.execPath, [checker, root], { encoding: "utf8" });
  fs.writeFileSync(path.join(root, "index.html"), `
    <a href="https://example.com/">External link</a>
    <img src="data:image/png;base64,AA==">
    <link rel="stylesheet" href="//cdn.example.com/style.css">
    <script src="https://cdn.example.com/app.js"></script>
    <img src="https://images.example.com/portrait.png">
    <style>@import "https://fonts.example.com/inline.css";</style>
  `);
  fs.writeFileSync(path.join(root, "style.css"), `
    @import "https://fonts.example.com/font.css";
    body { background: url(https://images.example.com/background.png); }
  `);
  const result = run();
  assert.equal(result.status, 1);
  assert.equal((result.stderr.match(/external resource/g) || []).length, 6);
  fs.writeFileSync(path.join(root, "index.html"), `
    <a href="https://example.com/">External link</a>
    <img src="data:image/png;base64,AA==">
    <link rel="stylesheet" href="style.css">
  `);
  fs.writeFileSync(path.join(root, "style.css"), "body { color: black; }");
  assert.equal(run().status, 0);
});
