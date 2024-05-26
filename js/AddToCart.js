// Add event listener to the button
function addToCart(key) {
    // Retrieve the existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    // Add the new item to the cart items array
    cartItems.push(key);

    // Store the updated cart items array back to local storage
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

    location.reload();

    // Optionally, provide feedback to the user
    alert('Item added to cart!');
}
