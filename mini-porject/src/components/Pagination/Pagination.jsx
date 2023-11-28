import React,{useState,useEffect} from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, currentPage + 5);
    const newVisiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
    setVisiblePages(newVisiblePages);
  }, [currentPage]);

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

            {visiblePages.map((page) => (
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