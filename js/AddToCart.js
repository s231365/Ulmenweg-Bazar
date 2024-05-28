function addToCart(key) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    if (!cartItems.includes(key)) {
        cartItems.push(key);
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Item added to cart!');
    } else {
        alert('item already in cart!');
    }
}
