// Function to load cart items
function loadCart() {
    // Retrieve the cart items from sessionStorage and products from localStorage
    let cartItemKeysString = sessionStorage.getItem('cartItems') || [];
    let allProductsString = localStorage.getItem('products');

    // Parse the JSON string back into a JavaScript object
    let cartItemKeys = JSON.parse(cartItemKeysString);
    let allProducts = JSON.parse(allProductsString);
    let cartItems = {};

    // Fill in all product data of products contained in the cartItemKeys array into cartItems map
    for (let itemKey of cartItemKeys) {
        console.log("Checking itemKey: ", itemKey);
        if (itemKey in allProducts.products) {
            cartItems[itemKey] = allProducts.products[itemKey];
        }
    }


    // Get the Handlebars template script
    let templateSource = document.getElementById('product-template').innerHTML;

    // Compile the Handlebars template
    let template = Handlebars.compile(templateSource);

    // Render the template with the cartItems data and insert it into the HTML
    document.getElementById('cart-items').innerHTML += template({cartItems: cartItems});

    // Calculate total price and display it
    let totalPrice = 0;


    for (let key in cartItems) {
        totalPrice += parseFloat(cartItems[key].price);
    }

    styleCart(cartItemKeys,totalPrice);

}

function styleCart(cartItemKeys,totalPrice) {

    // Display the total price in the HTML
    let totalPriceElement = document.getElementById('total-price');
    let checkoutButton = document.getElementById('checkout');
    let emptyCartMessage = document.getElementById('empty-cart');

    if (cartItemKeys.length > 0) {
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
    // Retrieve the cart items from sessionStorage
    let cartItemsString = sessionStorage.getItem('cartItems');

    // Parse the JSON string back into a JavaScript object
    let cartItems = JSON.parse(cartItemsString);

    // Filter out the item to delete
    let updatedCartItems = cartItems.filter((item, index) => index !== parseInt(indexToDelete));

    // Update the cartItems in sessionStorage
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Reload the cart section to reflect the changes
    loadCart();
    location.reload();
}
