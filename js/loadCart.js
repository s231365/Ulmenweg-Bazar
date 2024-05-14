// Function to load cart items
function loadCart() {
    // Retrieve the cart items from local storage
    let cartItemsString = localStorage.getItem('cartItems');

    // Parse the JSON string back into a JavaScript object
    let cartItems = JSON.parse(cartItemsString);

    // Get the Handlebars template script
    let templateSource = document.getElementById('product-template').innerHTML;

    // Compile the Handlebars template
    let template = Handlebars.compile(templateSource);

    // Render the template with the cartItems data and insert it into the HTML
    document.getElementById('cart-items').innerHTML += template({cartItems: cartItems});

    // Calculate total price and display it
    let totalPrice = 0;

    // Iterate through each item in the cart and calculate total price
    if (cartItems && Object.keys(cartItems).length) {
        Object.values(cartItems).forEach(item => {
            totalPrice += parseFloat(item.price);
        });
    }

    // Display the total price in the HTML
    let totalPriceElement = document.getElementById('total-price');
    let checkoutButton = document.getElementById('checkout');
    let emptyCartMessage = document.getElementById('empty-cart');

    if (cartItems && Object.keys(cartItems).length > 0) {
        // If cart is not empty
        totalPriceElement.innerText = totalPrice.toFixed(2);
        checkoutButton.style.display = 'block';
        emptyCartMessage.style.display = 'none';
    } else {
        // If cart is empty
        checkoutButton.style.display = 'none';
        emptyCartMessage.style.display = 'block';
    }
}


// Function to delete an item from the cart
function deleteItem(indexToDelete) {
    // Retrieve the cart items from local storage
    let cartItemsString = localStorage.getItem('cartItems');

    // Parse the JSON string back into a JavaScript object
    let cartItems = JSON.parse(cartItemsString);

    // Convert the cartItems object into an array of key-value pairs
    let cartItemsArray = Object.entries(cartItems);

    // Filter out the item to delete
    let updatedCartItemsArray = cartItemsArray.filter((item, index) => index !== parseInt(indexToDelete));

    // Convert the updated array back into an object
    let updatedCartItems = Object.fromEntries(updatedCartItemsArray);

    // Update the cartItems in local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Reload the cart section to reflect the changes
    loadCart();
    location.reload();
}


