"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-40">

      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="border px-4 py-2 rounded"
      >
        Previous
      </button>

      <span className="flex items-center">
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="border px-4 py-2 rounded"
      >
        Next
      </button>

    </div>
  );
}