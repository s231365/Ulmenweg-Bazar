// Example starter JavaScript for disabling form submissions if there are invalid fields
function validation(form, event) {
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();
        copy();
        window.location.href = 'danke.html';
    }
}

function copy() {
    // Retrieve the existing purchases from localStorage, or initialize as an empty object (map)
    let allpurchases = JSON.parse(localStorage.getItem('allpurchases')) || {};

    // Retrieve the cart items from sessionStorage and products from localStorage
    let cartItemKeysString = sessionStorage.getItem('cartItems');
    let allProductsString = localStorage.getItem('products');

    if (cartItemKeysString && allProductsString) {
        // Parse the JSON strings back into JavaScript objects
        let cartItemKeys = JSON.parse(cartItemKeysString);
        let allProducts = JSON.parse(allProductsString).products;

        let cartItems = {};

        // Fill in title and price of products contained in the cartItemKeys array into cartItems map
        cartItemKeys.forEach(itemKey => {
            if (allProducts[itemKey]) {
                let product = allProducts[itemKey];
                cartItems[itemKey] = { title: product.title, price: parseFloat(product.price) };
            }
        });

        // Calculate total price
        let totalPrice = Object.values(cartItems).reduce((sum, item) => sum + item.price, 0);

        // Get the current timestamp as a key
        const timestamp = new Date().toISOString();

        // Add the cartItems to the allpurchases map with the timestamp as the key
        allpurchases[timestamp] = {
            items: cartItems,
            totalPrice: totalPrice
        };

        // Save the updated allpurchases map back to localStorage
        localStorage.setItem('allpurchases', JSON.stringify(allpurchases));

        // Clear the sessionStorage
        sessionStorage.removeItem("cartItems");
    } else {
        console.log('No items found in sessionStorage with the key: cartItems or no products found in localStorage');
    }
}

function displayAllPurchases() {
    // Retrieve all purchases from localStorage
    let allPurchases = JSON.parse(localStorage.getItem('allpurchases')) || {};

    // Get the container element where purchases will be displayed
    const container = document.getElementById('purchases-container');

    // Check if there are any purchases stored
    if (Object.keys(allPurchases).length === 0) {
        container.innerHTML = "<p>No purchases found.</p>";
        return;
    }

    // Compile the Handlebars template
    const source = document.getElementById('purchase-template').innerHTML;
    const template = Handlebars.compile(source);

    // Convert all purchases into an array for easier handling in Handlebars
    const purchasesArray = Object.entries(allPurchases).map(([timestamp, data]) => ({
        timestamp,
        items: data.items,
        totalPrice: data.totalPrice ? data.totalPrice.toFixed(2) : 0  // Check if totalPrice exists
    }));

    // Render the template with the purchases data
    container.innerHTML = template({ allpurchases: purchasesArray });
}

