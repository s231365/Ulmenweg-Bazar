function loadNavbarAndFooter() {
    // Load navbar
    var navbarXhr = new XMLHttpRequest();
    navbarXhr.onreadystatechange = function() {
        if (navbarXhr.readyState === XMLHttpRequest.DONE) {
            if (navbarXhr.status === 200) {
                document.getElementById("navbar-placeholder").innerHTML = navbarXhr.responseText;

                updateCartItemCount(); // Call function to update cart item count after loading navbar
            } else {
                console.error('Error loading navbar:', navbarXhr.status);
            }
        }
    };
    navbarXhr.open("GET", "navbar.html", true);
    navbarXhr.send();

    // Load footer
    var footerXhr = new XMLHttpRequest();
    footerXhr.onreadystatechange = function() {
        if (footerXhr.readyState === XMLHttpRequest.DONE) {
            if (footerXhr.status === 200) {
                document.getElementById("footer-placeholder").innerHTML = footerXhr.responseText;
            } else {
                console.error('Error loading footer:', footerXhr.status);
            }
        }
    };
    footerXhr.open("GET", "footer.html", true);
    footerXhr.send();
}
function updateCartItemCount() {
    // Retrieve the cart items from local storage
    let cartItemsString = localStorage.getItem('cartItems');

    // Parse the JSON string back into a JavaScript object
    let cartItems = JSON.parse(cartItemsString);

    // Initialize item count
    let itemCount = 0;

    // Check if cartItems exists and get its length
    if (cartItems) {
        itemCount = Object.keys(cartItems).length;

        // Update the item count displayed in the badge
        document.getElementById('itemCount').textContent = itemCount;
    }
}


// Call the function to load navbar and footer
loadNavbarAndFooter();
