
import { loadTextContent } from "./services/loaders/text-content.js";
import { loadCertificates } from "./services/loaders/certificates.js";
import { loadProjects } from "./services/loaders/projects.js";
import { loadTools } from "./services/loaders/tool-badges.js";
import { loadExperience } from "./services/loaders/experience.js";

// currently only caching tool-badges
const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
const CACHE_LIFETIME = 24 * MILLISECONDS_PER_HOUR

function loadAll() {
    // const cacheExpiration = Number(localStorage.getItem("next_fetch")); Disabled: Not needed yet.
    // const useCache = cacheExpiration && Date.now() < cacheExpiration;
    const screenMdUp = window.innerWidth >= 768;
    
    loadTools();
    loadTextContent();
    loadCertificates();
    loadProjects();
    loadExperience();
    // localStorage.setItem("next_fetch", Date.now() + CACHE_LIFETIME);
}

document.addEventListener("DOMContentLoaded", (event) => {
    loadAll();
})
