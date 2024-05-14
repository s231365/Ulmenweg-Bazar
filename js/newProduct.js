function createItem(form) {
    // Retrieve the existing products from local storage or initialize an empty object
    let products = JSON.parse(localStorage.getItem('products')) || {};

    // Retrieve form inputs
    var title = form.elements.name.value;
    var price = form.elements.price.value;
    var description = form.elements.description.value;
    var shipping = document.querySelector('input[name="shipping"]:checked').value;
    var condition = document.querySelector('input[name="condition"]:checked').value;
    var tag = document.querySelector('input[name="category"]:checked').value;
    var image = form.elements.image.value;

    // Generate a unique ID (UUID) for the new product
    let newProductId = 1; // Default to 1 if no products exist
    if (Object.keys(products).length > 0) {
        // Get the last given ID and increment it by 1
        newProductId = parseInt(Object.keys(products).pop()) + 1;
    }

    // Add the new product to the products object
    products[newProductId] = {

        name: title,
        price: price,
        description: description,
        shipping: shipping,
        condition: condition,
        tags: tag,
        image: image
    };

    // Store the updated products object back to local storage
    localStorage.setItem('products', JSON.stringify(products));

    // Optionally, provide feedback to the user
    alert('Item added successfully!');
}


function validate(form, event) {
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        createItem(form);
    }
}