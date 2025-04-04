
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 gap-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-4 py-2 border rounded transition-all duration-200 ${
            currentPage === index + 1
              ? "bg-red-500 text-white border-red-500 cursor-pointer"
              : "bg-white hover:bg-red-100 cursor-pointer"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
