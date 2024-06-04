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
        if (itemKey in allProducts) {
            cartItems[itemKey] = allProducts[itemKey];
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

    // Display the total price in the HTML
    let totalPriceElement = document.getElementById('total-price');
    let checkoutButton = document.getElementById('checkout');
    let emptyCartMessage = document.getElementById('empty-cart');
    if (window.location.pathname.endsWith('cart.html') && cartItemKeys.length > 0) {
        totalPriceElement.innerText = totalPrice.toFixed(2);
        checkoutButton.style.display = 'block';
        emptyCartMessage.style.display = 'none';
        //styleCart(cartItemKeys, totalPrice);
    } else if (window.location.pathname.endsWith('checkout.html')) {
        totalPriceElement.innerText = totalPrice.toFixed(2);
    } else {
        // If cart is empty
        checkoutButton.style.display = 'none';
        emptyCartMessage.style.display = 'block';
    }

}

function askForDeletion(itemToDelete) {
    // Show Pop-Up Modal
    let delModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    let modalHeader = document.querySelector('#deleteModal .modal-header');
    modalHeader.style.backgroundColor = 'red';
    modalHeader.style.color = 'white';

    // Get the buttons
    let abortButton = document.querySelector('#deleteModal .btn-secondary');
    let yesButton = document.querySelector('#deleteModal .btn-primary');

    // Add event listeners
    abortButton.addEventListener('click', function() {
        delModal.hide();
    });

    // Yes Button
    yesButton.addEventListener('click', function() {
        delModal.hide();
        deleteItem(itemToDelete);
    });

    delModal.show();
}


function deleteItem(itemToDelete) {
    // Retrieve the cart items from sessionStorage
    let cartItemsString = sessionStorage.getItem('cartItems');

    // Parse the JSON string back into a JavaScript object
    let cartItems = JSON.parse(cartItemsString);

    // Filter out the item to delete
    let updatedCartItems = cartItems.filter(item => item !== itemToDelete);;

    // Update the cartItems in sessionStorage
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    loadCart();
    location.reload();
}
