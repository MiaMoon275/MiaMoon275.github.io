const username = 'MiaMoon275'; 
const url = `https://api.github.com/users/${username}`;

// const lastFetch = localStorage.getItem("github_cache_time");

const toolsNames = [
    // Backend / Programming
    "python",
    "django",

    // Core Web
    "html5",
    "css3",
    "javascript",

    // UI / Framework
    "bootstrap",

    // Version Control / Workflow
    "git",

    // IDEs
    "vscode",
    "visualstudio",
    "intellij",

    // Game Dev
    "csharp",
    "unity",
];

function loadData() {
    const cached = localStorage.getItem("github-data");
    if (cached){
        const data = JSON.parse(cached)
        console.log("Data loaded from cache:")
        console.log(data);
        applyData(data);
        return;
    }

    console.log("Fetching data from github")
    fetch(url)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("github-data", JSON.stringify(data));
            applyData(data);
        });
    }

function applyData(data) {
    // Personal Data
    document.getElementById('github-name').textContent = data.name || data.login;
    document.getElementById('github-avatar').src = data.avatar_url;

    // Other
    document.getElementById('github-company').textContent = data.company;
    document.getElementById('github-location').textContent = data.location;
}

function loadTools() {
    const container = document.getElementById("familiar-tools");

    const cached = localStorage.getItem("tool-icons");

    if (cached) {
        console.log("Loaded Tools from cache.")
        container.innerHTML = cached;
        return;
    }

    let html = "";

    toolsNames.forEach(tool => {
        const baseUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool}/`;

        html += `
            <span class="badge bg-dark m-1 d-inline-flex align-items-center gap-1 p-2">
                <img src="${baseUrl}${tool}-original.svg"
                     alt="${tool}"
                     width="24"
                     height="24"
                     onerror="this.onerror=null; this.src='${baseUrl}${tool}-plain.svg'">
                ${tool}
            </span>
        `;
    });

    container.innerHTML = html;
    localStorage.setItem("tool-icons", html);
}

document.addEventListener("DOMContentLoaded", (event) => {
    loadData();
    loadTools();
})
