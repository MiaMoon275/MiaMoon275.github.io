import { MY_TOOLS } from "../../../../config/user.config.js";

export function loadTools() {
    const container = document.getElementById("my-tools");

    let html = "";

    Object.entries(MY_TOOLS).forEach(([tool, label]) => {
        const baseUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool}/`;

        let extraClass = ""

        if(tool == "django") {
            extraClass = "django-badge";
        }
        
        html += `
            <span class="badge my-tool-badge ${extraClass} text-secondary m-1 d-inline-flex align-items-center gap-1 p-2" title="${label}">
                <img src="${baseUrl}${tool}-original.svg"
                    alt="${label}"
                    width="32"
                    height="32"
                    onerror="this.onerror=null; this.src='${baseUrl}${tool}-plain.svg'">
            </span>
        `;
    });

    container.innerHTML = html;
}
