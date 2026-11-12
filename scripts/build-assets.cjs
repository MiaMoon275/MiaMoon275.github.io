const fs = require("node:fs");
const path = require("node:path");

const modules = path.resolve(__dirname, "..", "node_modules");
const vendor = path.resolve(__dirname, "..", "site", "vendor");

function copy(source, destination) {
  const target = path.join(vendor, destination);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(modules, source), target);
}

for (const [source, destination] of [
  ["bootstrap/dist/js/bootstrap.bundle.min.js", "bootstrap/bootstrap.bundle.min.js"],
  ["bootstrap/LICENSE", "bootstrap/LICENSE"],
  ["bootstrap4/dist/css/bootstrap.min.css", "bootstrap4/bootstrap.min.css"],
  ["bootstrap4/LICENSE", "bootstrap4/LICENSE"],
  ["bootstrap-icons/font/bootstrap-icons.min.css", "bootstrap-icons/bootstrap-icons.min.css"],
  ["bootstrap-icons/font/fonts/bootstrap-icons.woff", "bootstrap-icons/fonts/bootstrap-icons.woff"],
  ["bootstrap-icons/font/fonts/bootstrap-icons.woff2", "bootstrap-icons/fonts/bootstrap-icons.woff2"],
  ["bootstrap-icons/LICENSE", "bootstrap-icons/LICENSE"],
]) copy(source, destination);

for (const [font, weights] of [
  ["dm-sans", [400, 500, 600, 700]],
  ["space-grotesk", [500, 600, 700]],
]) {
  const source = path.join("@fontsource", font);
  const destination = path.join("fonts", font);
  copy(path.join(source, "LICENSE"), path.join(destination, "LICENSE"));
  for (const weight of weights) {
    const stylesheet = `${weight}.css`;
    copy(path.join(source, stylesheet), path.join(destination, stylesheet));
    const css = fs.readFileSync(path.join(modules, source, stylesheet), "utf8");
    for (const match of css.matchAll(/url\(\.\/files\/([^)]+)\)/g)) {
      copy(path.join(source, "files", match[1]), path.join(destination, "files", match[1]));
    }
  }
}
