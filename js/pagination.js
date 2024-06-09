/**
 * Updates the pagination controls based on the current page and total pages.
 *
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 */
function updatePaginationControls(currentPage, totalPages) {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Previous" onclick="changePage('prev', ${currentPage})">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i}, ${currentPage})">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Next" onclick="changePage('next', ${currentPage})">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
}

/**
 * Changes the current page based on the action ('prev', 'next', or a specific page number).
 *
 * @param {string|number} action - The action to take ('prev' for previous page, 'next' for next page, or a specific page number).
 * @param {number} currentPage - The current page number.
 */
function changePage(action, currentPage) {
    if (action === 'prev') {
        currentPage--;
    } else if (action === 'next') {
        currentPage++;
    } else {
        currentPage = action;
    }

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', currentPage);
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
    initPage(currentPage);
}
