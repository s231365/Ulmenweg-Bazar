function render_filteredProducts(page = 1, itemsPerPage = 10) {
    const filteredData = dataArray.filter(product => {
        return (product.tags && product.tags.indexOf(type_filter) !== -1) || type_filter === "all";
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

function updatePaginationControls(currentPage, totalPages) {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Previous" onclick="changePage('prev')">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Next" onclick="changePage('next')">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
}

function changePage(action) {
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('page')) || 1;

    if (action === 'prev') {
        currentPage--;
    } else if (action === 'next') {
        currentPage++;
    } else {
        currentPage = action;
    }

    urlParams.set('page', currentPage);
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
    render_filteredProducts(currentPage);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = parseInt(urlParams.get('page')) || 1;
    const itemsPerPage = 10;
    render_filteredProducts(currentPage, itemsPerPage);
});
