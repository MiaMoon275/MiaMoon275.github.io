
const myTools = {
    python: "Python",
    django: "Django",
    html5: "HTML5",
    css3: "CSS3",
    javascript: "JavaScript",
    bootstrap: "Bootstrap",
    git: "Git",
    vscode: "Visual Studio Code",
    visualstudio: "Visual Studio",
};

function loadTools(useCache) {
    const container = document.getElementById("my-tools");
    const cached = localStorage.getItem("tool-badges");

    if (cached && useCache) {
        container.innerHTML = cached;
        return;
    }

    let html = "";

    Object.entries(myTools).forEach(([tool, label]) => {
        const baseUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool}/`;

        html += `
            <span class="badge bg-dark m-1 d-inline-flex align-items-center gap-1 p-2">
                <img src="${baseUrl}${tool}-original.svg"
                    alt="${label}"
                    width="24"
                    height="24"
                    onerror="this.onerror=null; this.src='${baseUrl}${tool}-plain.svg'">
                ${label}
            </span>
        `;
    });

    container.innerHTML = html;
    localStorage.setItem("tool-badges", html);
}
