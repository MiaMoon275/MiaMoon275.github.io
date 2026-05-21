// async function fetchWithCache({
//     cacheKey,
//     url,
//     useCache,
//     transform = (x) => x,
// }) {
//     const cached = localStorage.getItem(cacheKey);

//     if (useCache && cached) {
//         try {
//             return JSON.parse(cached);
//         } catch {
//             localStorage.removeItem(cacheKey);
//         }
//     }

//     const res = await fetch(url);

//     if (!res.ok) {
//         throw new Error(`HTTP error ${res.status}`);
//     }

//     const data = await res.json();
//     const finalData = transform(data);

//     localStorage.setItem(cacheKey, JSON.stringify(finalData));

//     return finalData;
// }
