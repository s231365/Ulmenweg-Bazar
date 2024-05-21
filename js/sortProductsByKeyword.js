function sortProductsByKeyword(productMapString, keyword) {

    let sortedProductMap = {};
    let productsObj = JSON.parse(productMapString);
    let products = productsObj.products; //productMap has to be an javaScript Object
    let sortedKeys = {};

    if(keyword === "name-a-z") {
        // Sort the keys based on the title
        sortedKeys = Object.keys(products).sort((a, b) =>
            products[a].title.localeCompare(products[b].title));
    } else if(keyword === "name-z-a") {
        sortedKeys = Object.keys(products).sort((a, b) =>
            products[b].title.localeCompare(products[a].title));
    } else {
        console.log("No correct keyword given in sortProductsByKeyword(). Given: ", keyword);
    }

    // Create a new object with the sorted keys
    for (let key of sortedKeys) {
        sortedProductMap[key] = products[key];
    }

    console.log("newly sorted map: ", sortedProductMap);
}
// Sortiert nicht, wird nicht genutzt