import React from 'react'
import ReactPaginate from 'react-paginate';
import '../pagination/AppPage.css';

function AppPage({previousLabel,nextLabel,breakLabel,pageCount,pageRangeDisplayed,containerClassName,onPageChange}) {
    // console.log("Abine ne:",previousLabel,nextLabel,breakLabel,pageCount,pageRangeDisplayed,containerClassName);
    return (
        <ReactPaginate
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            breakLabel={breakLabel}
            breakClassName={'custom-break'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={pageRangeDisplayed}
            onPageChange={onPageChange}
            containerClassName={containerClassName}
            activeClassName={'page-item active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            disabledClassName={'disabled'}
            previousClassName={'page-link'}
            nextLinkClassName={'page-link'}
        />
    )
}

export default AppPage
