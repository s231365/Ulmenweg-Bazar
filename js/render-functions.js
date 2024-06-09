function render_productsite() {
    const source = document.getElementById('product-template').innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById('product-list').innerHTML = template(filtered_data);
}

function initPage(page = 1, itemsPerPage = 20) {
    const filteredData = dataArray.filter(product => {
        return (product.tags && product.tags.indexOf(typeFilter) !== -1) || typeFilter === "all";
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const templateSource = document.getElementById("show-products").innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template({ value: paginatedData });
    document.getElementById("product-list").innerHTML = html;

    updatePaginationControls(page, totalPages);
}
function render_allProducts() {
    let itemsString = localStorage.getItem('products');
    let products = JSON.parse(itemsString);
    let templateSource = document.getElementById('products').innerHTML;
    let template = Handlebars.compile(templateSource);
    document.querySelector('.container').innerHTML += template({ products: products });
}