const BASE = 'https://dummyjson.com'

async function handle(res) {
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`)
  }
  return res.json()
}

export function fetchProducts({ limit = 12, skip = 0 } = {}) {
  return fetch(`${BASE}/products?limit=${limit}&skip=${skip}`).then(handle)
}

export function fetchProductsByCategory(category, { limit = 100, skip = 0 } = {}) {
  return fetch(`${BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`).then(handle)
}

export function fetchAllProductsForFilters() {
  // Used to build brand list / client-side filter pool
  return fetch(`${BASE}/products?limit=194`).then(handle)
}

export function fetchCategories() {
  return fetch(`${BASE}/products/categories`).then(handle)
}

export function fetchProductById(id) {
  return fetch(`${BASE}/products/${id}`).then(handle)
}
