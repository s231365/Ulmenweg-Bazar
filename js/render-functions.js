/**
 * Renders the product site using a Handlebars template.
 */
function renderProductsite() {
    const source = document.getElementById('product-template').innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById('product-list').innerHTML = template(filteredData);
}

/**
 * Initializes the page with products, applying pagination and filtering by type.
 *
 * @param {number} [page=1] - The current page number.
 * @param {number} [itemsPerPage=20] - The number of items to display per page.
 */
function initPage(page = 1, itemsPerPage = 20) {
    const filteredData = dataArray.filter(product => {
        return (product.tags && product.tags.indexOf(type_filter) !== -1) || type_filter === "all";
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const templateSource = document.getElementById("show-products").innerHTML;
    const template = Handlebars.compile(templateSource);
    document.getElementById("product-list").innerHTML = template({value: paginatedData});

    updatePaginationControls(page, totalPages);
}

/**
 * Renders all products from local storage using a Handlebars template.
 */
function renderAllProducts() {
    let itemsString = localStorage.getItem('products');
    let products = JSON.parse(itemsString);
    let templateSource = document.getElementById('products').innerHTML;
    let template = Handlebars.compile(templateSource);
    document.querySelector('.container').innerHTML += template({ products: products });
}
