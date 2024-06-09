/**
 * Loads product data from a JSON file and stores it in local storage if not already present.
 *
 * Fetches data from 'data/products.json' and converts it to a string before storing it in local storage.
 * If the 'products' key does not already exist in local storage, it sets the 'products' key with the fetched data.
 * Logs an error message to the console if there is an issue with fetching the JSON file.
 */
function loadDataFromJSON() {
    fetch("data/products.json")
        .then(response => response.json())
        .then(data => {
            const jsonDataString = JSON.stringify(data);
            const emptySessionStorage = JSON.stringify("");

            if (localStorage.getItem('products') === null) {
                localStorage.setItem('products', jsonDataString);
            }

            if (sessionStorage.getItem("cartItems") === null) {
                sessionStorage.setItem("cartItems", emptySessionStorage);
            }
        })
        .catch(error => console.error('Fehler beim Laden der JSON-Datei:', error));
}
