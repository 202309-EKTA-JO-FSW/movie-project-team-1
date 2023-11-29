import React,{useState,useEffect} from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange}) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const newVisiblePages = Array.from({ length: 10 }, (_, i) => i + currentPage);
    setVisiblePages(newVisiblePages);
  }, [currentPage]);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
  <div className="flex flex-1 justify-between sm:hidden">
    <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
    <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
  </div>
  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
    <div>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white" aria-label="Pagination">
        <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <button className="px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
          </svg>
          </button>
        </a>
        {visiblePages.map((page) => (
              <li key={page} className={page === currentPage ? 'relative z-10 inline-flex items-center bg-sky-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600' : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}>
                <button
                  className="px-4 py-2 text-gray-700 hover:bg-gray-300"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}   
        <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <button className="px-4 py-2 text-gray-700 hover:bg-gray-200"  onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"/>
          </svg>
          </button>
        </a>
      </nav>
    </div>
  </div>
</div>






    // <nav aria-label="Page navigation">
    //   <ul className="flex items-center justify-between">
    //     {totalPages > 1 && (
    //       <>
    //         <li>
    //           <button
    //             className="px-4 py-2 text-gray-700 hover:bg-gray-200"
    //             onClick={() => onPageChange(currentPage - 1)}
    //             disabled={currentPage === 1}
    //           >
    //             Previous
    //           </button>
    //         </li>

    //         {visiblePages.map((page) => (
    //           <li key={page} className={page === currentPage ? 'bg-gray-200' : ''}>
    //             <button
    //               className="px-4 py-2 text-gray-700 hover:bg-gray-300"
    //               onClick={() => onPageChange(page)}
    //             >
    //               {page}
    //             </button>
    //           </li>
    //         ))}

    //         <li>
    //           <button
    //             className="px-4 py-2 text-gray-700 hover:bg-gray-200"
    //             onClick={() => onPageChange(currentPage + 1)}
    //             disabled={currentPage === totalPages}
    //           >
    //             Next
    //           </button>
    //         </li>
    //       </>
    //     )}
    //   </ul>
    // </nav>
  );
};

export default Pagination;