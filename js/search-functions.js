// Function to get query parameter value by name
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch products from local storage
function fetchProducts() {
    let itemsString = localStorage.getItem('products');
    if (!itemsString) {
        console.error('No product data found in local storage.');
        return {};
    }
    let parsedData = JSON.parse(itemsString);
    if (!parsedData || !parsedData.products) {
        console.error('No product data found in local storage.');
        return {};
    }
    return parsedData.products; // Access the products directly
}

// Function to filter product IDs based on search query
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

// Function to get products by IDs
function getProductsByIds(ids, products) {
    return ids.map(id => products[id]);
}

// Function to display search results using Handlebars
function displaySearchResults(products) {
    const templateSource = document.getElementById('search-results-template').innerHTML;
    const template = Handlebars.compile(templateSource);
    document.getElementById('search-results').innerHTML = template({products: products});
}

// Get search query from URL parameters
const query = getQueryParameter('query');
if (query) {
    const products = fetchProducts();
    const filteredProductIds = filterProductIds(query, products);
    const filteredProducts =  getProductsByIds(filteredProductIds, products);
    displaySearchResults(filteredProducts);
}