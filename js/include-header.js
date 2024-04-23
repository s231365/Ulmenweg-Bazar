document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById("header-placeholder").innerHTML = xhr.responseText;
            } else {
                console.error('Error loading header:', xhr.status);
            }
        }
    };
    xhr.open("GET", "header.html", true);
    xhr.send();
});