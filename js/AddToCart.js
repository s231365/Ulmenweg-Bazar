// Add event listener to the button
document.getElementById('addToCartBtn').addEventListener('click', function () {
    // Retrieve the existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Push the new item to the cart items array (you can customize this to include item details)
    cartItems.push({name: 'Product 1', price: 10.99});

    // Store the updated cart items array back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Optionally, provide feedback to the user
    alert('Item added to cart!');
});


