function loadDataFromJSON() {
    fetch("data/products.json")
        .then(response => response.json())
        .then(data => {

            const jsonDataString = JSON.stringify(data);

            if (localStorage.getItem('products') === null) {
                localStorage.setItem('products', jsonDataString);
                console.log('Daten erfolgreich im Local Storage gespeichert:', data);
            }
        })
        .catch(error => console.error('Fehler beim Laden der JSON-Datei:', error));

}
