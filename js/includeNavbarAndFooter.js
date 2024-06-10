/**
 * Loads the navbar and footer content into the placeholders in the current document.
 * Attaches event listeners to search button and sidebar toggle button after loading the navbar.
 * Updates the cart item count displayed in the navbar.
 */
function loadNavbarAndFooter() {
    // Load navbar
    const navbarXhr = new XMLHttpRequest();
    navbarXhr.onreadystatechange = function () {
        if (navbarXhr.readyState === XMLHttpRequest.DONE) {
            if (navbarXhr.status === 200) {
                document.getElementById("navbar-placeholder").innerHTML = navbarXhr.responseText;
                // Attach event listener to search button
                document.querySelector('.btn[type="submit"]').addEventListener('click', function (event) {
                    event.preventDefault(); // Prevent form submission
                    handleSearch();
                });
                // Event listener for toggling the sidebar
                document.getElementById('sidebarCollapse').addEventListener('click', toggleSidebar);
                updateCartItemCount(); // Call function to update cart item count after loading navbar
            } else {
                console.error('Error loading navbar:', navbarXhr.status);
            }
        }
    };
    navbarXhr.open("GET", "navbar.html", true);
    navbarXhr.send();

    // Load footer
    const footerXhr = new XMLHttpRequest();
    footerXhr.onreadystatechange = function () {
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

/**
 * Toggles the visibility of the sidebar.
 * Toggles the hamburger icon to an X icon when the sidebar is shown.
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');

    // Toggle the hamburger icon to X
    const toggleButton = document.getElementById('sidebarCollapse');
    toggleButton.classList.toggle('open');
}

/**
 * Closes the sidebar if it is currently open.
 * Removes the 'show' class from the sidebar and 'open' class from the toggle button.
 */
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebarCollapse');
    if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        toggleButton.classList.remove('open');
    }
}

/**
 * Event listener to close the sidebar when clicking outside of it.
 * @param {Event} event - The event object representing the click event.
 */
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const navbar = document.querySelector('.navbar');
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickInsideNavbar = navbar.contains(event.target);

    if (!isClickInsideSidebar && !isClickInsideNavbar) {
        closeSidebar();
    }
});

/**
 * Updates the cart item count displayed in the navbar.
 * Retrieves the cart items from session storage and updates the item count in all badges.
 */
function updateCartItemCount() {
    // Retrieve the cart items from session storage
    let cartItemsString = sessionStorage.getItem('cartItems');

    // Parse the JSON string back into a JavaScript object
    let cartItems = JSON.parse(cartItemsString);

    let itemCount = 0;
    // Check if cartItems exists and get its length
    if (cartItems) {
        itemCount = Object.keys(cartItems).length;
    }

    // Update the item count displayed in all badges
    document.querySelectorAll('#itemCount').forEach(itemCountElement => {
        itemCountElement.textContent = itemCount;
    });
}

/**
 * Handles the search functionality.
 * Redirects the user to the search results page with the search query as a URL parameter.
 */
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query) {
        window.location.href = `searchResults.html?query=${encodeURIComponent(query)}`;
    }
}

// Call the function to load navbar and footer
loadNavbarAndFooter();
location.reload();
