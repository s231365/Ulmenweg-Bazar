function reloadPageForSorting(sortingString) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set('sorting', sortingString);
    url.search = params.toString();
    window.location.href = url.toString();
}

function sortProducts(sorting) {
    const data = JSON.parse(localStorage.getItem('products')).products;

    let dataArray = Object.values(data);

    switch (sorting) {
        case "standard":
        default:
            dataArray.sort((a, b) => a.id.localeCompare(b.id));
            break
        case "name-a-z":
            dataArray.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
            break
        case "name-z-a":
            dataArray.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
            break
        case "low-high":
            dataArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break
        case "high-low":
            dataArray.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break
    }
    return dataArray;
}