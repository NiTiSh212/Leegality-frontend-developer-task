import { useNavigate } from 'react-router-dom'
import './ProductCard.css'
export default function ProductCard({ product, search }) {
  const navigate = useNavigate()

  const goToDetail = () => {
    navigate(`/product/${product.id}${search ? `?${search}` : ''}`)
  }

  return (
   <button className="amazon-card" onClick={goToDetail}>

  <div className="amazon-card__image">
    <img
      src={product.thumbnail}
      alt={product.title}
      loading="lazy"
    />
  </div>

  <div className="amazon-card__body">

    <p className="amazon-card__brand">
      {product.brand || product.category}
    </p>

    <h3 className="amazon-card__title">
      {product.title}
    </h3>

    <div className="amazon-card__rating">
      <span className="stars">★★★★☆</span>
      <span className="rating-value">
        {product.rating}
      </span>
    </div>

    <div className="amazon-card__price-block">

      <div className="amazon-card__price">
        ₹{product.price}
      </div>

      {product.discountPercentage && (
        <div className="amazon-card__discount">
          {Math.round(product.discountPercentage)}% off
        </div>
      )}

    </div>

    <div className="amazon-card__delivery">
      FREE Delivery
    </div>

    <button
      className="amazon-card__cart-btn"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      Add to Cart
    </button>

  </div>

</button>
  )
}
