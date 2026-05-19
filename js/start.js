var isDesktopDevice = false;

function loadAll() {
    const cacheExpiration = localStorage.getItem("next_fetch");
    const useCache = cacheExpiration && Date.now() < cacheExpiration;
    loadTextContent();
    loadTools(useCache);
    loadCertificates();
    loadProjects();
    localStorage.setItem("next_fetch", Date.now() + CACHE_LIFETIME);
}

document.addEventListener("DOMContentLoaded", (event) => {
    isDesktopDevice = window.innerWidth >= 768;
    loadAll();
})
