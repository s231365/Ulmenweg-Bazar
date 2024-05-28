// Add event listener to the button
function addToCart(key) {
    // Retrieve the existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    // Add the new item to the cart items array
    if (!cartItems.includes(key)) {
        cartItems.push(key);
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Item added to cart!');
    } else {
        alert('item already in cart!');
    }
}
