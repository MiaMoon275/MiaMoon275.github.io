import { MY_TOOLS } from "../../../../config/user.config.js";

export function loadTools(useCache) {
    const container = document.getElementById("my-tools");
    const cached = localStorage.getItem("tool-badges");

    if (cached && useCache) {
        container.innerHTML = cached;
        console.log("Loaded Tool-Badges from cache")
        return;
    }

    let html = "";

    Object.entries(MY_TOOLS).forEach(([tool, label]) => {
        const baseUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool}/`;

        let extraClass = ""

        if(tool == "django") {
            extraClass = "django-badge";
        }
        
        html += `
            <span class="badge my-tool-badge ${extraClass} text-secondary m-1 d-inline-flex align-items-center gap-1 p-2 ">
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
    console.log("Fetched Tool-Badges")
    localStorage.setItem("tool-badges", html);
}
