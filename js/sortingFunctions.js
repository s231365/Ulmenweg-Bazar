function reloadPageForSorting(sortingString) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set('sorting', sortingString);
    url.search = params.toString();
    window.location.href = url.toString();
}