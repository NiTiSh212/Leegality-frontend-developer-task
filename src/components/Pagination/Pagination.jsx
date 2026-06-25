import './Pagination.css'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) pages.push(i)

  return (
    <nav className="amazon-pagination">

  <button
    className="amazon-pagination__nav"
    disabled={page === 1}
    onClick={() => onPageChange(page - 1)}
    aria-label="Previous page"
  >
    ← Previous
  </button>

  <div className="amazon-pagination__pages">
    {pages.map((p) => (
      <button
        key={p}
        className={`amazon-pagination__page ${
          p === page ? 'amazon-pagination__page--active' : ''
        }`}
        onClick={() => onPageChange(p)}
      >
        {p}
      </button>
    ))}
  </div>

  <button
    className="amazon-pagination__nav"
    disabled={page === totalPages}
    onClick={() => onPageChange(page + 1)}
    aria-label="Next page"
  >
    Next →
  </button>

</nav>
  )
}
