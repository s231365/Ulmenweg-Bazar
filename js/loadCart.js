// loadCart.js

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
    document.querySelector('.container').innerHTML += template({cartItems: cartItems});

    // Display a message if the cart is empty
    if (!cartItems || cartItems.length === 0) {
        document.querySelector('.container').innerHTML += '<p>Your cart is empty.</p>';
    }

    let totalPrice = 0;


    // Iterate through each item in the cart and calculate total price
    Object.values(cartItems).forEach(item => {
        totalPrice += parseFloat(item.price);
    });


    // Display the total price in the HTML
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);

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