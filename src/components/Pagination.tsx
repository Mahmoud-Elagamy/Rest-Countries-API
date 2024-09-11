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
          className="pagination-button mr-[2.8rem] cursor-pointer rounded-md border border-[#ddd] px-2 py-1 duration-300 ease-in-out active:scale-95 dark:border-[#333] md:active:scale-50"
          title={
            currentPage === 1 ? "No Previous Pages Available" : "Previous Page"
          }
          aria-label={
            currentPage === 1 ? "No Previous Pages Available" : "Previous Page"
          }
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>
        <button
          className="pagination-button cursor-pointer rounded border border-[#ddd] px-2 py-1 duration-300 ease-in-out active:scale-95 dark:border-[#333] md:active:scale-50"
          title={
            currentPage === totalPages ? "No More Pages Available" : "Next Page"
          }
          aria-label={
            currentPage === totalPages ? "No More Pages Available" : "Next Page"
          }
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
