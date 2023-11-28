import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="flex items-center justify-between">
        {totalPages > 1 && (
          <>
            <li>
              <button
                className="px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={page === currentPage ? 'bg-gray-200' : ''}>
                <button
                  className="px-4 py-2 text-gray-700 hover:bg-gray-300"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li>
              <button
                className="px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;