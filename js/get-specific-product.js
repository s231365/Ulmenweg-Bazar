// get the id given in the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// get the string value from local storage and filter for a key
const all_data = JSON.parse(localStorage.getItem('products'));
const products = {};

for (const key in all_data) {
    const element = all_data[key];
    const element_id = element.id;
    if (element_id === productId) { // Checking if the key is equal to productId
        products[key] = element;
    }
}
const filtered_data = {products: products}