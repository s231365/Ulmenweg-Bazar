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