import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { fetchProductById } from '../../api.js'
import './DetailPage.css'
export default function DetailPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const goBack = () => {
    navigate(`/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`)
  }

  if (loading) {
    return (
      <div className="detail-page">
        <div className="state-banner">Loading product…</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="detail-page">
        <div className="state-banner state-banner--error">
          Couldn't load this product{error ? `: ${error}` : ''}.
        </div>
        <button className="back-button" onClick={goBack}>← Back to listing</button>
      </div>
    )
  }

  return (
    <div className="amazon-detail-page">

        <nav className="amazon-breadcrumb">
    <span>Home</span>

    <span className="amazon-breadcrumb__separator">›</span>

    <span>
      {product.category
        ?.replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())}
    </span>

    <span className="amazon-breadcrumb__separator">›</span>

    <span className="amazon-breadcrumb__current">
      {product.title}
    </span>
  </nav>

  {/* Back Button */}
  <button
    className="amazon-back-button"
    onClick={goBack}
  >
    ← Back to Products
  </button>

      <div className="amazon-detail">

        {/* Product Image */}
        <div className="amazon-detail__gallery">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
          />
        </div>

        {/* Product Info */}
        <div className="amazon-detail__info">

          <h1>{product.title}</h1>

          <div className="amazon-detail__rating">
            ⭐ {product.rating}
          </div>

          <div className="amazon-detail__brand">
            Brand: {product.brand || "Unbranded"}
          </div>

          <hr />

          <div className="amazon-detail__price">
            ₹{product.price}
          </div>

          <p className="amazon-detail__description">
            {product.description}
          </p>

          <div className="amazon-detail__features">
            <h3>About this item</h3>

            <ul>
              <li>Premium quality product</li>
              <li>Fast delivery available</li>
              <li>Easy returns</li>
              <li>Secure checkout</li>
            </ul>
          </div>

        </div>

        {/* Buy Box */}
        <div className="amazon-buy-box">

          <div className="amazon-buy-box__price">
            ₹{product.price}
          </div>

          <div className="amazon-buy-box__delivery">
            FREE Delivery
          </div>

          <div className="amazon-buy-box__stock">
            In Stock
          </div>

          <button className="amazon-btn amazon-btn--cart">
            Add to Cart
          </button>

          <button className="amazon-btn amazon-btn--buy">
            Buy Now
          </button>

        </div>

      </div>

    </div>
  )
}
