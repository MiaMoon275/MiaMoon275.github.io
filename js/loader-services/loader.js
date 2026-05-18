const USERNAME = 'MiaMoon275';
const CACHE_LIFETIME = 30 * 60 * 1000;


function loadAll() {
    const cacheExpiration = localStorage.getItem("next_fetch");
    const useCache = cacheExpiration && Date.now() < cacheExpiration;
    loadUserData(useCache);
    loadRepoData(useCache);
    loadTools(useCache);
    localStorage.setItem("next_fetch", Date.now() + CACHE_LIFETIME);
}


document.addEventListener("DOMContentLoaded", (event) => {
    loadAll();
})
