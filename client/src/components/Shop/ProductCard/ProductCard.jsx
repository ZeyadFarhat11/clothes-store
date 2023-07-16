import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./product-card.scss";
import { faCodeCompare, faHeart } from "@fortawesome/free-solid-svg-icons";

function ProductCard({
  image,

  title,
  price,
  oldPrice,
  colors,
  currency = { name: "USD", symbol: "$" },
}) {
  return (
    <div className="product-card">
      <div className="media">
        {!!oldPrice && (
          <span className="discount">
            OFF {((oldPrice - price) / oldPrice) * 100}%
          </span>
        )}
        <button className="add-to-compare" type="button" title="add to compare">
          <FontAwesomeIcon icon={faCodeCompare} />
        </button>
        <button
          className="add-to-wishlist"
          type="button"
          title="add to wishlist"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button type="button" className="add-to-cart main-button">
          add to cart
        </button>

        <img className="product-image" src={image} alt={title} />
      </div>
      <div className="content">
        <h4 className="title">{title}</h4>
        <div className="price-wrapper">
          <span className="price">
            {currency.symbol}
            {price.toFixed(2)}
          </span>
          {!!oldPrice && (
            <span className="old-price">
              {currency.symbol}
              {oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="colors">
          {colors
            .slice(0, 4)
            .map(
              (color, i) =>
                !!color.rgb && (
                  <button
                    className="color"
                    style={{ background: color.rgb, outlineColor: color.rgb }}
                    key={i}
                    title={color.color}
                  />
                )
            )}
          {colors.length > 4 && (
            <span className="colors-rest">+{colors.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
