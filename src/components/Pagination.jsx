export default function Pagination({ meta, page, setPage }) {
  const total = meta.count || 0;
  const prev = !!meta.prev;
  const next = !!meta.next;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
      {/* Previous Button */}
      <button
        disabled={!prev}
        onClick={() => setPage(page - 1)}
        className={`px-6 py-2 rounded-xl font-semibold transition transform
          ${prev 
            ? 'bg-gradient-to-r from-purple-500 cursor-pointer to-indigo-500 text-white hover:scale-105 hover:shadow-lg' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        ← Previous
      </button>

      {/* Page Info */}
      <div className="text-gray-700 font-medium">
        Page <span className="font-bold">{page}</span> — Total <span className="font-bold">{total}</span>
      </div>

      {/* Next Button */}
      <button
        disabled={!next}
        onClick={() => setPage(page + 1)}
        className={`px-6 py-2 rounded-xl font-semibold transition transform
          ${next 
            ? 'bg-gradient-to-r from-green-400 cursor-pointer to-blue-500 text-white hover:scale-105 hover:shadow-lg' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        Next →
      </button>
    </div>
  );
}
