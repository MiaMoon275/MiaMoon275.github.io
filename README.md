# 👩🏻‍💻 Mia Sophie Emerick Schober – Developer Portfolio

Welcome to my personal portfolio website 👋  
This project showcases my understanding, work, and passion for modern web development.  

Please feel free to take a look at my code.  
I will update this project regulary.

---

## 🌐 Live Demo

🔗 [View Portfolio](https://mia-sophie.dev)

---

## ✨ About This Project

This portfolio was built to present my journey as a software developer and highlight real-world projects, experiments, and UI concepts.

It focuses on:

- Clean and modern UI design
- Responsive layout
- Responsive project and case-study pages

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3 / Bootstrap**
- **Bootstrap JavaScript** for the mobile navigation
- **Custom UI components**
- **Responsive design principles**

---

## 🚀 Features

- Custom styled components with grids and cards
- Fully responsive design (mobile-first approach)
- Static project and skill content

---

## 📦 Project Structure

```txt
mia-sophie.dev/
├── site/                   # public website and deployment root
│   ├── index.html
│   ├── project-*.html
│   ├── content/            # images used by the site
│   ├── css/                # compiled Bootstrap and custom styles
│   ├── src/css/            # additional styles used by the site
│   ├── datenschutz/
│   └── impressum/
├── scss/                   # Sass source, not deployed
├── scripts/                # site checks, not deployed
├── package.json
└── README.md
```

Files outside `site/` are not deployed.

## Development and deployment

Install the locked dependencies with `npm ci`. After changing
`scss/custom.scss`, run `npm run build:css` and commit the resulting
`site/css/custom.css`. The build does not generate a source map.

Run `npm test` to check local HTML links, image and stylesheet references,
CSS URLs, and HTML anchors. External URLs are not checked. To preview the
website, serve `site/` as the web server's document root rather than opening
the HTML files directly.

The FTPS workflow runs the checks and deploys from `site/` when changes are
pushed to `main`. It can also be started manually from the Actions tab. Configure
the repository secrets `FTPS_SERVER`, `FTPS_USERNAME`, and `FTPS_PASSWORD`,
and the repository variable `FTPS_DEPLOY_DIR` under **Settings → Secrets and
variables → Actions**. The target directory must end with `/` and must be the
website's document root on the FTPS server.

The workflow currently uses `dry-run: true`, so it connects to the server and
reports planned changes without uploading or deleting files. Commit and push
the workflow and website files, then review a successful dry-run log and verify
the target directory and planned changes. Only then change `dry-run` to
`false` and push again to enable the real deployment. Previously synchronized
files may be deleted when they are removed from `site/`.

### Membership management gallery

Add or remove images in `site/content/projects/club_management_gallery/`.
The gallery supports PNG, JPEG, WebP, AVIF, and GIF files and orders them by
filename. Filenames become the visible captions and alternative text; use
descriptive names with underscores or hyphens between words. Only publish
images approved for public use and containing no sensitive information.

Run `npm run build:gallery` before previewing or committing the generated
gallery page. The FTPS workflow runs this build automatically before its
checks and deployment, so adding an image requires no HTML changes. For
GitHub Pages or any other deployment that publishes `site/` directly without
running the build, regenerate and commit the gallery page along with the images.

GitHub Pages is configured separately from this workflow. After confirming the
FTPS deployment and the domain's server configuration, disable Pages in the
repository's **Settings → Pages** if it is no longer needed.
