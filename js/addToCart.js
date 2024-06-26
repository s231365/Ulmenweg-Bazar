/**
 * Adds a product to the cart and updates session storage.
 * @param {string} key - The key of the product to add to the cart.
 * @param {boolean} singleProductPageBool - Indicates if the function is called from a single product page.
 */
function addToCart(key, singleProductPageBool) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    let addModal = new bootstrap.Modal(document.getElementById('cartModal'));
    let modalHeader = document.querySelector('#cartModal .modal-header');

    if (!cartItems.includes(key)) {
        cartItems.push(key);
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        modalHeader.innerHTML = 'Added to Cart';
        modalHeader.style.backgroundColor = '#42FF27'; // Green
        modalHeader.style.color = 'black';
    } else {
        modalHeader.innerHTML = 'Item already in Cart';
        modalHeader.style.backgroundColor = 'red';
        modalHeader.style.color = 'white';
    }

    if (singleProductPageBool) {
        window.location.href = "cart.html";
    } else {
        addModal.show();

        setTimeout(() => {
            addModal.hide();
            reloadPage();
        }, 1500);
    }
}

/**
 * Reloads the current page.
 */
function reloadPage() {
    location.reload();
}
