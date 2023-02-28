import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { setPage } from '../../helpers/pagingHelper'; 

const CustomPagination = ({itemsCount, onChangePage, itemsToShow, pageOfItems}) => {

  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getPages = () => {
      var pagesItems = [];
      for (let i = 1; i <= Math.ceil(itemsCount / itemsToShow); i++) {
        pagesItems.push(i);
      }
      return pagesItems;
    }
    const newPages = getPages();
    setPages(newPages);
  }, [itemsCount, itemsToShow] );

  return itemsCount ? (
      <div className="pagination__wrap">
        {(itemsCount <= 1) ? ''
          : (
            <Pagination className="pagination flex-wrap" dir="ltr">
              <PaginationItem className="pagination__item" disabled={pageOfItems === 1}>
                <PaginationLink
                  className="pagination__link pagination__link--arrow"
                  type="button"
                  onClick={() => setPage(1, itemsCount, itemsToShow, onChangePage)}
                >
                  <span className="pagination__link-icon mdi mdi-chevron-double-left"></span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="pagination__item ms-1" disabled={pageOfItems === 1}>
                <PaginationLink
                  className="pagination__link pagination__link--arrow"
                  type="button"
                  onClick={() => setPage(pageOfItems - 1, itemsCount, itemsToShow, onChangePage)}
                >
                  <span className="pagination__link-icon mdi mdi-chevron-left"></span>
                </PaginationLink>
              </PaginationItem>
              {pages.map(page => (
                <PaginationItem
                  className="pagination__item"
                  key={page}
                  active={pageOfItems === page}
                >
                  <PaginationLink
                    className="pagination__link"
                    type="button"
                    onClick={() => setPage(page, itemsCount, itemsToShow, onChangePage)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))
              }
              <PaginationItem className="pagination__item  me-1" disabled={pageOfItems === pages.length}>
                <PaginationLink
                  className="pagination__link pagination__link--arrow"
                  type="button"
                  onClick={() => setPage(pageOfItems + 1, itemsCount, itemsToShow, onChangePage)}
                >
                  <span className="pagination__link-icon mdi mdi-chevron-right"></span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="pagination__item" disabled={pageOfItems === pages.length}>
                <PaginationLink
                  className="pagination__link pagination__link--arrow"
                  type="button"
                  onClick={() => setPage(pages.length, itemsCount, itemsToShow, onChangePage)}
                >
                  <span className="pagination__link-icon mdi mdi-chevron-double-right"></span>

                </PaginationLink>
              </PaginationItem>
            </Pagination>
          )
          }
        <div className="pagination-info">
          <span>Showing {`${(itemsToShow * (pageOfItems - 1)) + 1} `}
              to {itemsToShow * pageOfItems > itemsCount ? itemsCount
            : itemsToShow * pageOfItems} of {itemsCount}
          </span>
        </div>
      </div>
    ) : <div />;
}

CustomPagination.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired,
  itemsToShow: PropTypes.number.isRequired,
  pageOfItems: PropTypes.number.isRequired,
};

CustomPagination.defaultProps = {
  pageSize: 1,
};

export default CustomPagination;
