/**
 * Creates a new product item from form inputs and stores it in local storage.
 * @param {HTMLFormElement} form - The form element containing the product details.
 */
function createItem(form) {
    // Retrieve the existing products from local storage or initialize an empty object
    let products = JSON.parse(localStorage.getItem('products')) || {};

    // Retrieve form inputs
    const title = form.elements.name.value;
    const price = form.elements.price.value;
    const description = form.elements.description.value;
    const shipping = document.querySelector('input[name="shipping"]:checked').value;
    const condition = document.querySelector('input[name="condition"]:checked').value;
    const tag = document.querySelector('input[name="category"]:checked').value;
    const image = form.elements.image.value;

    // Generate a unique ID (UUID) for the new product
    let newProductId = 1; // Default to 1 if no products exist
    let newProductIdS;
    if (Object.keys(products).length > 0) {
        // Get the last given ID and increment it by 1
        newProductId = parseInt(Object.keys(products).pop()) + 1;
        newProductIdS = newProductId.toString();
    }

    // Add the new product to the products object
    products[newProductId] = {
        id: newProductIdS,
        title: title,
        price: price,
        description: description,
        shipping: shipping,
        condition: condition,
        tags: tag,
        image: image
    };

    // Store the updated products object back to local storage
    localStorage.setItem('products', JSON.stringify(products));
}

/**
 * Validates a form and creates a new product item if the form is valid.
 * @param {HTMLFormElement} form - The form element to validate.
 * @param {Event} event - The event object associated with the form submission.
 */
function validateInput(form, event) {
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault(); // Prevent default form submission behavior
        createItem(form);
        window.location.href = 'admin.html';
    }
}

/**
 * Deletes a product item from local storage based on its ID.
 * @param {string} itemId - The ID of the product item to delete.
 */
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
