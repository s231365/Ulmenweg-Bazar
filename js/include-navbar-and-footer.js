function loadNavbarAndFooter() {
    // Load navbar
    var navbarXhr = new XMLHttpRequest();
    navbarXhr.onreadystatechange = function() {
        if (navbarXhr.readyState === XMLHttpRequest.DONE) {
            if (navbarXhr.status === 200) {
                document.getElementById("navbar-placeholder").innerHTML = navbarXhr.responseText;
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

// Call the function to load navbar and footer
loadNavbarAndFooter();
