
import './FilterPanel.css'
export default function FilterPanel({
  categories,
  brands,
  filters,
  onChange,
  onReset,
}) {
  const { category, minPrice, maxPrice, selectedBrands } = filters

  const toggleBrand = (brand) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]
    onChange({ ...filters, selectedBrands: next })
  }

  return (
    <aside className="filter-panel">
  <div className="filter-panel__header">
    <h2>Filters</h2>
    <button
      type="button"
      className="filter-panel__reset"
      onClick={onReset}
    >
      Clear All
    </button>
  </div>

  {/* Category */}
  <section className="filter-group">
    <h3 className="filter-group__title">Category</h3>

    <div className="filter-group__list">
      <label className="filter-option">
        <input
          type="radio"
          name="category"
          checked={category === ''}
          onChange={() => onChange({ ...filters, category: '' })}
        />
        <span>All Categories</span>
      </label>

      {categories.map((cat) => {
        const slug = typeof cat === 'string' ? cat : cat.slug
        const name = typeof cat === 'string' ? cat : cat.name

        return (
          <label className="filter-option" key={slug}>
            <input
              type="radio"
              name="category"
              checked={category === slug}
              onChange={() =>
                onChange({
                  ...filters,
                  category: slug,
                })
              }
            />
            <span>{name}</span>
          </label>
        )
      })}
    </div>
  </section>

  {/* Price */}
  <section className="filter-group">
    <h3 className="filter-group__title">Price</h3>

    <div className="filter-group__price">
      <input
        type="number"
        placeholder="₹ Min"
        min="0"
        value={minPrice}
        onChange={(e) =>
          onChange({
            ...filters,
            minPrice: e.target.value,
          })
        }
      />

      <span className="price-separator">–</span>

      <input
        type="number"
        placeholder="₹ Max"
        min="0"
        value={maxPrice}
        onChange={(e) =>
          onChange({
            ...filters,
            maxPrice: e.target.value,
          })
        }
      />
    </div>
  </section>

  {/* Brand */}
  <section className="filter-group">
    <h3 className="filter-group__title">Brand</h3>

    <div className="filter-group__list filter-group__list--scroll">
      {brands.map((brand) => (
        <label className="filter-option" key={brand}>
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand)}
            onChange={() => toggleBrand(brand)}
          />

          <span>{brand}</span>
        </label>
      ))}
    </div>
  </section>
</aside>
  )
}
