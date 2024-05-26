// Example starter JavaScript for disabling form submissions if there are invalid fields
function validation(form, event) {
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();
        
        window.location.href = 'danke.html';
        copy();
    }
}

function copy() {

    // Retrieve the existing purchases from localStorage, or initialize as an empty object (map)
    let allpurchases = JSON.parse(localStorage.getItem('allpurchases')) || {};

    // Retrieve the cartItems from sessionStorage
    const object = sessionStorage.getItem("cartItems");

    if (object) {
        // Parse the cartItems from sessionStorage
        const cartItems = JSON.parse(object);

        // Get the current timestamp as a key
        const timestamp = new Date().toISOString();

        // Add the cartItems to the allpurchases map with the timestamp as the key
        allpurchases[timestamp] = cartItems;

        // Save the updated allpurchases map back to localStorage
        localStorage.setItem('allpurchases', JSON.stringify(allpurchases));

        // Clear the sessionStorage
        sessionStorage.removeItem("cartItems");
    } else {
        console.log('No items found in sessionStorage with the key: cartItems');
    }


}
function displayAllPurchases() {
    // Retrieve the allpurchases map from localStorage
    let allpurchases = JSON.parse(localStorage.getItem('allpurchases'));

    // Get the container element where purchases will be displayed
    const container = document.getElementById('purchases-container');

    // Check if there are any purchases stored
    if (!allpurchases) {
        container.innerHTML = "<p>No purchases found.</p>";
        return;
    }

    // Compile the Handlebars template
    const source = document.getElementById('purchase-template').innerHTML;
    const template = Handlebars.compile(source);

    // Convert allpurchases map into an array for easier handling in Handlebars
    const purchasesArray = Object.entries(allpurchases).map(([timestamp, items]) => ({
        timestamp,
        items
    }));

    // Render the template with the purchases data
    container.innerHTML = template({ purchases: purchasesArray });
}