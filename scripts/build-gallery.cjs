const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "site");
const imageDirectory = path.join(root, "content", "projects", "club_management_gallery");
const galleryPage = path.join(root, "gallery-membership-management.html");
const startMarker = "<!-- Gallery images start -->";
const endMarker = "<!-- Gallery images end -->";
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderGallery(entries) {
  const images = entries
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort();

  if (images.length === 0) {
    return '                <p class="text-secondary mb-0">No screenshots are available yet.</p>';
  }

  return images.map((name) => {
    const title = path.basename(name, path.extname(name)).replace(/[_-]+/g, " ").trim() || name;
    const safeTitle = escapeHtml(title);
    const url = `content/projects/club_management_gallery/${encodeURIComponent(name)}`;
    return `                <div class="col">
                    <figure class="card gallery-card h-100 mb-0">
                        <a href="${url}" aria-label="View full-size screenshot: ${safeTitle}">
                            <img src="${url}" class="card-img-top" alt="${safeTitle}" loading="lazy">
                        </a>
                        <figcaption class="card-body">
                            <h2 class="h5 card-title mb-0">${safeTitle}</h2>
                        </figcaption>
                    </figure>
                </div>`;
  }).join("\n");
}

function buildGallery(html, entries) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1 || end <= start ||
      html.indexOf(startMarker, start + startMarker.length) !== -1 ||
      html.indexOf(endMarker, end + endMarker.length) !== -1) {
    throw new Error("Gallery page must contain exactly one ordered pair of gallery markers.");
  }
  return `${html.slice(0, start + startMarker.length)}\n${renderGallery(entries)}\n            ${html.slice(end)}`;
}

if (require.main === module) {
  const html = fs.readFileSync(galleryPage, "utf8");
  const entries = fs.readdirSync(imageDirectory, { withFileTypes: true });
  const output = buildGallery(html, entries);
  if (output !== html) fs.writeFileSync(galleryPage, output);
  console.log(`Built membership gallery from ${imageDirectory}.`);
}

module.exports = { buildGallery, renderGallery };
