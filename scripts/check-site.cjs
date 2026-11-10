const fs = require("node:fs");
const path = require("node:path");
const { parseDocument } = require("htmlparser2");
const postcss = require("postcss");
const valueParser = require("postcss-value-parser");

const root = path.resolve(__dirname, "..", "site");
const origin = "https://mia-sophie.dev";
const errors = [];
const htmlDocuments = new Map();
let referenceCount = 0;

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

function visit(node, callback) {
  callback(node);
  for (const child of node.children || []) visit(child, callback);
}

function htmlDocument(file) {
  if (!htmlDocuments.has(file)) {
    htmlDocuments.set(file, parseDocument(fs.readFileSync(file, "utf8")));
  }
  return htmlDocuments.get(file);
}

function checkReference(file, reference) {
  if (!reference || reference === "#") return;
  const source = path.relative(root, file).split(path.sep).join("/");
  let url;
  try {
    url = new URL(reference, `${origin}/${source}`);
  } catch (error) {
    errors.push(`${source}: invalid URL ${reference}: ${error.message}`);
    return;
  }
  if (url.origin !== origin || !["http:", "https:"].includes(url.protocol)) return;

  referenceCount++;
  let pathname;
  let fragment;
  try {
    pathname = decodeURIComponent(url.pathname);
    fragment = decodeURIComponent(url.hash.slice(1));
  } catch (error) {
    errors.push(`${source}: invalid URL encoding ${reference}: ${error.message}`);
    return;
  }

  let target = path.resolve(root, `.${pathname}`);
  if (target !== root && !target.startsWith(root + path.sep)) {
    errors.push(`${source}: reference outside site: ${reference}`);
    return;
  }
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, "index.html");
  }
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    errors.push(`${source}: missing target ${reference}`);
    return;
  }
  if (fragment && path.extname(target).toLowerCase() === ".html") {
    let found = false;
    visit(htmlDocument(target), (node) => {
      if (node.attribs && (node.attribs.id === fragment || node.attribs.name === fragment)) {
        found = true;
      }
    });
    if (!found) errors.push(`${source}: missing anchor ${reference}`);
  }
}

function checkCssValue(file, value) {
  valueParser(value).walk((node) => {
    if (node.type === "function" && node.value.toLowerCase() === "url") {
      checkReference(file, valueParser.stringify(node.nodes).trim().replace(/^(['"])(.*)\1$/, "$2"));
      return false;
    }
  });
}

const files = filesIn(root);
if (!files.includes(path.join(root, "index.html"))) {
  errors.push("site/index.html is missing");
}

for (const file of files) {
  const extension = path.extname(file).toLowerCase();
  if (extension === ".html") {
    visit(htmlDocument(file), (node) => {
      if (!node.attribs) return;
      for (const attribute of ["href", "src", "poster"]) {
        if (node.attribs[attribute]) checkReference(file, node.attribs[attribute]);
      }
      if (node.attribs.property === "og:image" || node.attribs.property === "og:url") {
        checkReference(file, node.attribs.content);
      }
      if (node.attribs.style) checkCssValue(file, node.attribs.style);
      if (node.name === "style") {
        const css = (node.children || []).map((child) => child.data || "").join("");
        const stylesheet = postcss.parse(css, { from: file });
        stylesheet.walkDecls((decl) => checkCssValue(file, decl.value));
      }
    });
  } else if (extension === ".css") {
    const stylesheet = postcss.parse(fs.readFileSync(file, "utf8"), { from: file });
    stylesheet.walkDecls((decl) => checkCssValue(file, decl.value));
    stylesheet.walkAtRules("import", (rule) => {
      const first = valueParser(rule.params).nodes.find((node) => node.type !== "space");
      if (first && first.type === "string") checkReference(file, first.value);
      else checkCssValue(file, rule.params);
    });
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${referenceCount} local references in ${files.length} site files.`);
}
