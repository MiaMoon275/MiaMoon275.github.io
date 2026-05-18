const GITHUB_USER_API = `https://api.github.com/users/${USERNAME}`;

// https://api.github.com/users/MiaMoon275
// https://api.github.com/users/MiaMoon275/social_accounts

async function fetchWithCache({
    cacheKey,
    url,
    useCache,
    transform = (x) => x,
}) {
    const cached = localStorage.getItem(cacheKey);

    if (useCache && cached) {
        try {
            return JSON.parse(cached);
        } catch {
            localStorage.removeItem(cacheKey);
        }
    }

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    const finalData = transform(data);

    localStorage.setItem(cacheKey, JSON.stringify(finalData));

    return finalData;
}
/* =========== */
/* USER Loader */
/* =========== */

async function loadUserData(useCache) {
    const data = await fetchWithCache({
        cacheKey: "github-user-data",
        url: GITHUB_USER_API,
        useCache,
    });

    applyUserData(data);
}
function applyUserData(data) {
    // Personal Data
    document.getElementById('github-name').textContent = data.name || data.login;
    document.getElementById('github-avatar').src = data.avatar_url;

    // Other
    document.getElementById('github-company').textContent = data.company;
    document.getElementById('github-location').textContent = data.location;
}

/* =========== */
/* REPO Loader */
/* =========== */
const GITHUB_REPO_API = `https://api.github.com/users/${USERNAME}/repos`;
const MAX_LISTED_REPOS = 3;
const SKIP_REPOS = [
    "MiaMoon275",
]

async function loadRepoData(useCache) {
    const data = await fetchWithCache({
        cacheKey: "github-repo-data",
        url: GITHUB_REPO_API,
        useCache,
    });

    applyRepoData(data);
}
function applyRepoData(data) {
    const container = document.getElementById("projects");
    let repoCounter = 0;

    for (const repo of data) {
        if (repoCounter >= Math.min(MAX_LISTED_REPOS, MAX_LISTED_PROJECTS)) break;

        if (SKIP_REPOS.includes(repo.name)) {
            continue;
        }

        const card = new ProjectCard(repo);

        container.insertAdjacentHTML(
            "beforeend",
            `
            <div class="col-12 col-md-4">
                ${card.html()}
            </div>
            `
        );

        repoCounter++;
    }

    for (const project of Object.values(PRIVATE_PROJECTS)) {
        if (repoCounter >= MAX_LISTED_PROJECTS) break;

        const card = new ProjectCard(project);

        container.insertAdjacentHTML("beforeend", `
            <div class="col-12 col-md-4">
                ${card.html()}
            </div>
        `);

        repoCounter++;
    }
}
