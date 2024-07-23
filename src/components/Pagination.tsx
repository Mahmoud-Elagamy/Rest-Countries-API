// Lucide Library
import { ChevronRight, ChevronLeft } from "lucide-react";

// Types
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
};

function Pagination({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
}: PaginationProps) {
  return (
    <div className="pagination flex flex-col-reverse items-center gap-3">
      <h3>
        {currentPage} of {totalPages}
      </h3>
      <div>
        <button
          className="pagination-button py-1 px-2 mr-[2.8rem] border border-[#ddd] dark:border-[#333] rounded cursor-pointer duration-300 ease-in-out active:scale-95 md:active:scale-50"
          title={
            currentPage === 1 ? "No Previous Pages Available" : "Previous Page"
          }
          aria-label={
            currentPage === 1 ? "No Previous Pages Available" : "Previous Page"
          }
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft name="previous" />
        </button>
        <button
          className="pagination-button py-1 px-2 border border-[#ddd] dark:border-[#333] rounded cursor-pointer duration-300 ease-in-out active:scale-95 md:active:scale-50"
          title={
            currentPage === totalPages ? "No More Pages Available" : "Next Page"
          }
          aria-label={
            currentPage === totalPages ? "No More Pages Available" : "Next Page"
          }
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ChevronRight name="next" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
