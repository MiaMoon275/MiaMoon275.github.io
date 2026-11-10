const test = require("node:test");
const assert = require("node:assert/strict");
const { buildGallery, renderGallery } = require("./build-gallery.cjs");

function entry(name, isFile = true) {
  return { name, isFile: () => isFile };
}

test("renders supported image files in deterministic order with safe URLs and text", () => {
  const html = renderGallery([
    entry("z_photo.JPG"),
    entry('a & "view".png'),
    entry("ignored.txt"),
    entry("directory.png", false),
  ]);
  assert.ok(html.indexOf("a%20%26%20%22view%22.png") < html.indexOf("z_photo.JPG"));
  assert.match(html, /alt="a &amp; &quot;view&quot;"/);
  assert.doesNotMatch(html, /ignored\.txt|directory\.png/);
});

test("reports an empty gallery", () => {
  assert.match(renderGallery([entry("notes.txt")]), /No screenshots are available yet/);
});

test("rebuilds the marked section idempotently and validates markers", () => {
  const template = "<div>\n            <!-- Gallery images start -->\n            <!-- Gallery images end -->\n</div>";
  const entries = [entry("application_overview.png")];
  const built = buildGallery(template, entries);
  assert.equal(buildGallery(built, entries), built);
  assert.throws(() => buildGallery("no markers", entries), /exactly one ordered pair/);
  assert.throws(() => buildGallery(template + "<!-- Gallery images start -->", entries), /exactly one ordered pair/);
});
