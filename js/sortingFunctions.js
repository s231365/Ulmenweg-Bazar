/**
 * Reloads the current page with the specified sorting parameter.
 *
 * @param {string} sortingString - The sorting criteria to be applied, e.g., "name-a-z", "high-low".
 */
function reloadPageForSorting(sortingString) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set('sorting', sortingString);
    url.search = params.toString();
    window.location.href = url.toString();
}

/**
 * Sorts products based on the specified sorting criteria.
 *
 * @param {string} sorting - The sorting criteria to be applied. Possible values: "standard" (default), "name-a-z", "name-z-a", "low-high", "high-low".
 * @returns {Array} The sorted array of products.
 */
function sortProducts(sorting) {
    const data = JSON.parse(localStorage.getItem('products'));

    let dataArray = Object.values(data);

    switch (sorting) {
        case "standard":
        default:
            dataArray.sort((a, b) => a.id.localeCompare(b.id));
            break;
        case "name-a-z":
            dataArray.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
            break;
        case "name-z-a":
            dataArray.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
            break;
        case "low-high":
            dataArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case "high-low":
            dataArray.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
    }
    return dataArray;
}
