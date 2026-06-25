import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchAllProductsForFilters, fetchCategories } from '../../api.js'
import FilterPanel from '../../components/FilterPanel/FilterPanel.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import Pagination from '../../components/Pagination/Pagination.jsx'
import './ListingPage.css'
const PAGE_SIZE = 12

export default function ListingPage() {


  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const page = Number(searchParams.get('page') || 1)

  const filters = {
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    selectedBrands: searchParams.get('brands') ? searchParams.get('brands').split(',') : [],
  }
 

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([fetchAllProductsForFilters(), fetchCategories()])
      .then(([productsRes, categoriesRes]) => {
        setAllProducts(productsRes.products || [])
        setCategories(categoriesRes || [])
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const brands = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.brand).filter(Boolean))
    return Array.from(set).sort()
  }, [allProducts])

  const filteredProducts = useMemo(() => {
  return allProducts.filter((p) => {

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase()

      const matchesSearch =
        p.title?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)

      if (!matchesSearch) return false
    }

    if (
      filters.category &&
      p.category !== filters.category
    ) {
      return false
    }

    if (
      filters.minPrice &&
      p.price < Number(filters.minPrice)
    ) {
      return false
    }

    if (
      filters.maxPrice &&
      p.price > Number(filters.maxPrice)
    ) {
      return false
    }

    if (
      filters.selectedBrands.length &&
      !filters.selectedBrands.includes(p.brand)
    ) {
      return false
    }

    return true
  })
}, [
  allProducts,
  searchTerm,
  filters.category,
  filters.minPrice,
  filters.maxPrice,
  filters.selectedBrands,
])


  const updateFilters = (next) => {
    const params = new URLSearchParams()
    if (next.category) params.set('category', next.category)
    if (next.minPrice) params.set('minPrice', next.minPrice)
    if (next.maxPrice) params.set('maxPrice', next.maxPrice)
    if (next.selectedBrands.length) params.set('brands', next.selectedBrands.join(','))
    params.set('page', '1') // reset pagination on filter change
    setSearchParams(params)
  }

  const resetFilters = () => {
    setSearchParams({})
  }
  useEffect(() => {
  const params = new URLSearchParams(searchParams)

  if (page !== 1) {
    params.set('page', '1')
    setSearchParams(params, { replace: true })
  }
}, [searchTerm])

  const sortedProducts = useMemo(() => {
  const items = [...filteredProducts]

  switch (sortBy) {
    case 'low-high':
      return items.sort((a, b) => a.price - b.price)

    case 'high-low':
      return items.sort((a, b) => b.price - a.price)

    case 'rating':
      return items.sort((a, b) => b.rating - a.rating)

    default:
      return items
  }
}, [filteredProducts, sortBy])


  const goToPage = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))
    setSearchParams(params)
  }

 const totalPages = Math.max(
  1,
  Math.ceil(sortedProducts.length / PAGE_SIZE)
)
  const currentPage = Math.min(page, totalPages)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  return (
  <div className="amazon-page">
  <header className="amazon-header">
    <div className="amazon-header__logo">
      Shopline
    </div>

  <div className="amazon-header__search">
  <input
    type="text"
    placeholder="Search products, brands, categories..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button type="button">🔍</button>
</div>

    <div className="amazon-header__actions">
      <span>Account</span>
      <span>Orders</span>
      <span>🛒 Cart</span>
    </div>
  </header>

  {/* Toolbar Full Width */}
  <div className="amazon-toolbar">
    <span>
  {loading
    ? "Loading products..."
    : `${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''}${
        searchTerm ? ` for "${searchTerm}"` : ''
      }`}
</span>
<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
>
  <option value="featured">Featured</option>
  <option value="low-high">Price: Low to High</option>
  <option value="high-low">Price: High to Low</option>
  <option value="rating">Highest Rating</option>
</select>
  </div>

  <div className="amazon-content">

    <aside className="amazon-sidebar">
      <FilterPanel
        categories={categories}
        brands={brands}
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
      />
    </aside>

    <main className="amazon-products">

      {error && (
        <div className="state-banner state-banner--error">
          Couldn't load products: {error}
        </div>
      )}

      {!error && loading && (
        <div className="product-grid">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="product-skeleton">
              <div className="product-skeleton__image" />
              <div className="product-skeleton__title" />
              <div className="product-skeleton__title short" />
              <div className="product-skeleton__rating" />
              <div className="product-skeleton__price" />
              <div className="product-skeleton__button" />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="state-banner">
          No products found
        </div>
      )}

      {!loading &&
        !error &&
        filteredProducts.length > 0 && (
          <>
            <div className="product-grid">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  search={searchParams.toString()}
                />
              ))}
            </div>

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </>
        )}
    </main>
  </div>
</div>
  )
}
