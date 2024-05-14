function loadItems() {
    // Retrieve the product items from local storage
    let itemsString = localStorage.getItem('products');

    if (!itemsString) {
        console.error('No product data found in local storage.');
        return;
    }

    // Parse the JSON string back into a JavaScript object
    let products = JSON.parse(itemsString);

    // Check if products is null or empty
    if (!products || Object.keys(products).length === 0) {
        console.error('No product data found in local storage.');
        return;
    }

    // Get the Handlebars template script
    let templateSource = document.getElementById('products').innerHTML;

    // Compile the Handlebars template
    let template = Handlebars.compile(templateSource);

    // Render the template with the product data and insert it into the HTML
    document.querySelector('.container').innerHTML += template({ products: products });
}


function deleteItem(itemId) {
    let productsString = localStorage.getItem('products');

    // Parse the JSON string back into a JavaScript object
    let products = JSON.parse(productsString);

    // Convert the products object into an array of key-value pairs
    let productsArray = Object.entries(products);

    // Filter out the item to delete
    let updatedProductsArray = productsArray.filter((item, index) => index !== parseInt(itemId));

    // Convert the updated array back into an object
    let updatedProducts = Object.fromEntries(updatedProductsArray);

    // Update the products in local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Reload the cart section to reflect the changes

    location.reload();

}