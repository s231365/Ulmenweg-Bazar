function loadDataFromJSON() {
    fetch("data/products.json")
        .then(response => response.json())
        .then(data => {
            // Konvertiere das JSON-Datenobjekt in einen String
            const jsonDataString = JSON.stringify(data);

            // Speichere den JSON-String im Local Storage unter dem Schlüssel 'products'
            localStorage.setItem('products', jsonDataString);

            console.log('Daten erfolgreich im Local Storage gespeichert:', data);
        })
        .catch(error => console.error('Fehler beim Laden der JSON-Datei:', error));

}
