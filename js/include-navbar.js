document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById("nav-placeholder").innerHTML = xhr.responseText;
            } else {
                console.error('Error loading header:', xhr.status);
            }
        }
    };
    xhr.open("GET", "navbar.html", true);
    xhr.send();
});
