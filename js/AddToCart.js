// Add event listener to the button
function addToCart() {
    // Retrieve the existing cart items from local storage or initialize an empty object
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

    // Generate a unique key for the new item
    let newItemKey = Object.keys(cartItems).length + 1;

    // Add the new item to the cart items object
    cartItems[newItemKey] = { name: "hel", price: "10" };

    // Store the updated cart items object back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Optionally, provide feedback to the user
    alert('Item added to cart!');
}