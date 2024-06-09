/**
 * Retrieves the value of a specified query parameter from the URL.
 *
 * @param {string} name - The name of the query parameter to retrieve.
 * @returns {string|null} The value of the query parameter, or null if not found.
 */
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Fetches the products stored in local storage.
 *
 * @returns {Object} The products stored in local storage, or an empty object if no data is found.
 */
function fetchProducts() {
    let parsedData = JSON.parse(localStorage.getItem('products'));
    if (!parsedData) {
        console.error('No product data found in local storage.');
        return {};
    }
    return parsedData;
}

/**
 * Filters product IDs based on a search query.
 *
 * @param {string} query - The search query to filter products by.
 * @param {Object} products - The products to filter.
 * @returns {string[]} An array of filtered product IDs.
 */
function filterProductIds(query, products) {
    if (!products || Object.keys(products).length === 0) {
        console.error('No products found.');
        return [];
    }

    const lowerCaseQuery = query.toLowerCase();
    return Object.keys(products)
        .filter(id => {
            const product = products[id];
            const productTitle = product.title ? product.title.toLowerCase() : '';
            const productDescription = product.description ? product.description.toLowerCase() : '';
            return productTitle.includes(lowerCaseQuery) || productDescription.includes(lowerCaseQuery);
        })
        .sort((id1, id2) => {
            const product1 = products[id1];
            const product2 = products[id2];
            const title1 = product1.title.toLowerCase();
            const title2 = product2.title.toLowerCase();
            const description1 = product1.description.toLowerCase();
            const description2 = product2.description.toLowerCase();

            const indexTitle1 = title1.indexOf(lowerCaseQuery);
            const indexTitle2 = title2.indexOf(lowerCaseQuery);
            const indexDescription1 = description1.indexOf(lowerCaseQuery);
            const indexDescription2 = description2.indexOf(lowerCaseQuery);

            // Determine the smallest index of query occurrence in title or description
            const minIndex1 = Math.min(
                indexTitle1 !== -1 ? indexTitle1 : Number.MAX_VALUE,
                indexDescription1 !== -1 ? indexDescription1 : Number.MAX_VALUE
            );
            const minIndex2 = Math.min(
                indexTitle2 !== -1 ? indexTitle2 : Number.MAX_VALUE,
                indexDescription2 !== -1 ? indexDescription2 : Number.MAX_VALUE
            );

            if (minIndex1 !== minIndex2) {
                return minIndex1 - minIndex2;
            } else {
                // If both have the query at the same index, sort alphabetically by title
                return title1.localeCompare(title2);
            }
        });
}

/**
 * Retrieves products by their IDs.
 *
 * @param {string[]} ids - The IDs of the products to retrieve.
 * @param {Object} products - The products to retrieve from.
 * @returns {Object[]} An array of products corresponding to the provided IDs.
 */
function getProductsByIds(ids, products) {
    return ids.map(id => products[id]);
}

/**
 * Displays the search results using a Handlebars template.
 *
 * @param {Object[]} products - The products to display.
 */
function displaySearchResults(products) {
    const templateSource = document.getElementById('search-results-template').innerHTML;
    const template = Handlebars.compile(templateSource);
    document.getElementById('search-results').innerHTML = template({ products: products });
}

/**
 * Initializes the page, applying pagination and displaying search results.
 *
 * @param {number} [page=1] - The current page number.
 * @param {number} [itemsPerPage=20] - The number of items to display per page.
 */
function initPage(page = 1, itemsPerPage = 20) {
    // Get search query from URL parameters
    const query = getQueryParameter('query');
    if (query) {
        const products = fetchProducts();
        const filteredProductIds = filterProductIds(query, products);
        const totalPages = Math.ceil(filteredProductIds.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProductIds = filteredProductIds.slice(startIndex, endIndex);
        const paginatedProducts = getProductsByIds(paginatedProductIds, products);
        displaySearchResults(paginatedProducts);
        updatePaginationControls(page, totalPages);
    }
}
