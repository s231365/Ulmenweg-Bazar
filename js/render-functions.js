function render_productsite() {
    const source = document.getElementById('product-template').innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById('product-list').innerHTML = template(filtered_data);
}

function render_filteredProducts() {
    const source = document.getElementById('show-products').innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById('product-list').innerHTML = template({value: dataArray});
}

function render_allProducts() {
    let itemsString = localStorage.getItem('products');
    let products = JSON.parse(itemsString);
    let templateSource = document.getElementById('products').innerHTML;
    let template = Handlebars.compile(templateSource);
    document.querySelector('.container').innerHTML += template({ products: products });
}