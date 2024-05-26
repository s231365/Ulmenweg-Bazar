function render_productsite() {
    const source = document.getElementById('product-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(filtered_data);
    document.getElementById('product-list').innerHTML = html;
}

function render_filteredProducts() {
    const source = document.getElementById('show-products').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({value: dataArray});
    document.getElementById('product-list').innerHTML = html;
}