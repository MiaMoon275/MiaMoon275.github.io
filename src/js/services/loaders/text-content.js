import { TEXT_CONTENT } from "../../../../config/user.config.js";

export function loadTextContent() {
    Object.entries(TEXT_CONTENT).forEach(([elementId, content]) => {
        const container = document.getElementById(elementId);
        container.innerHTML = content;
    });
};
