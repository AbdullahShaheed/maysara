import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav style={{ margin: 0 }}>
      <ul className="pagination" style={{ display: "inline" }}>
        <li
          className={
            currentPage === 1 ? "page-item disabled" : "page-item clickable"
          }
        >
          <a
            className="page-link"
            tabIndex="-1"
            aria-disabled="true"
            onClick={() => onPageChange(currentPage - 1)}
          >
            السابق
          </a>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className="page-link clickable"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={
            currentPage === pagesCount
              ? "page-item disabled"
              : "page-item clickable"
          }
        >
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            التالي
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
