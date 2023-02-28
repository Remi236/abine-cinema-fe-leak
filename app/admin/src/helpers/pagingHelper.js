import range from 'lodash.range';

const getPager = (totalItems, curPage, pSize) => {
  // default to first page
  const currentPage = curPage || 1;

  // default page size is 10
  const pageSize = pSize || 10;

  // calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  let startPage;
  let endPage;
  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= 6) {
    // more than 10 total pages so calculate start and end pages
    startPage = 1;
    endPage = 10;
  } else if (currentPage + 4 >= totalPages) {
    startPage = totalPages - 9;
    endPage = totalPages;
  } else {
    startPage = currentPage - 5;
    endPage = currentPage + 4;
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min((startIndex + pageSize) - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  const pages = range(startPage, endPage + 1);

  return {
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  };
};

const setPage = (page, itemsCount, itemsToShow, onChangePage) => {
  const totalPages = Math.ceil(itemsCount / itemsToShow);

  if (page < 1 || page > totalPages) {
    return;
  }
  
  onChangePage(page);
}

export { getPager, setPage }