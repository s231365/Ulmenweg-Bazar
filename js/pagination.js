const urlParams = new URLSearchParams(window.location.search);
const currentPage = parseInt(urlParams.get('page')) || 1;

function updatePaginationControls(currentPage, totalPages) {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Previous" onclick="changePage('prev',currentPage)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i},currentPage)">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Next" onclick="changePage('next',currentPage)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
}

function changePage(action, currentPage) {

    if (action === 'prev') {
        currentPage--;
    } else if (action === 'next') {
        currentPage++;
    } else {
        currentPage = action;
    }

    urlParams.set('page', currentPage);
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
    initPage(currentPage);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    initPage(currentPage);
});
