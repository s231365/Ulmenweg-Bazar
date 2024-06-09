/**
 * Retrieves the product data from local storage that matches the given product ID from the URL.
 * @returns {Object} An object containing the filtered product data.
 */
function getProductDataFromUrl() {
    // Get the product ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Retrieve all product data from local storage
    const allData = JSON.parse(localStorage.getItem('products'));
    const products = {};

    // Filter the product data to find the product with the matching ID
    for (const key in allData) {
        const element = allData[key];
        const elementId = element.id;
        if (elementId === productId) { // Checking if the key is equal to productId
            products[key] = element;
        }
    }

    // Return the filtered product data
    return { products: products };
}

// Example usage
const filteredData = getProductDataFromUrl();
