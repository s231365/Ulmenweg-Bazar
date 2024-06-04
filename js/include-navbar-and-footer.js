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

// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');

    // Toggle the hamburger icon to X
    const toggleButton = document.getElementById('sidebarCollapse');
    toggleButton.classList.toggle('open');
}

// Function to close the sidebar
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebarCollapse');
    if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        toggleButton.classList.remove('open');
    }
}

// Event listener to close the sidebar when clicking outside of it
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const navbar = document.querySelector('.navbar');
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickInsideNavbar = navbar.contains(event.target);

    if (!isClickInsideSidebar && !isClickInsideNavbar) {
        closeSidebar();
    }
});

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

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query) {
        window.location.href = `searchResults.html?query=${encodeURIComponent(query)}`;
    }
}

// Call the function to load navbar and footer
loadNavbarAndFooter();
