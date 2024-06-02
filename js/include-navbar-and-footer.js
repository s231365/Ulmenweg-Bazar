function loadNavbarAndFooter() {
    // Load navbar
    var navbarXhr = new XMLHttpRequest();
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
    var footerXhr = new XMLHttpRequest();
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

// Function to toggle the sidebar
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');

    // Toggle the hamburger icon to X
    var toggleButton = document.getElementById('sidebarCollapse');
    toggleButton.classList.toggle('open');
}

function updateCartItemCount() {
    // Retrieve the cart items from local storage
    let cartItemsString = sessionStorage.getItem('cartItems');

    // Parse the JSON string back into a JavaScript object
    let cartItems = JSON.parse(cartItemsString);

    let itemCount = 0;
    // Check if cartItems exists and get its length
    if (cartItems) {
        itemCount = Object.keys(cartItems).length;

        // Update the item count displayed in the badge
        document.getElementById('itemCount').textContent = itemCount;
    } else {
        // Initialize item count
        document.getElementById('itemCount').textContent = itemCount;
    }
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query) {
        window.location.href = `searchResults.html?query=${encodeURIComponent(query)}`;
    }
}

// Call the function to load navbar and footer
loadNavbarAndFooter();
