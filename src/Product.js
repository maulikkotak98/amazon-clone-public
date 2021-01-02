import React from "react";
import "./Product.scss";

function Product({ title, image, price, rating }) {
  const cssPrefix = "product";
  return (
    <div className={cssPrefix}>
      <div className={`${cssPrefix}__info`}>
        <p>{title}</p>
        <p className={`${cssPrefix}__price`}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className={`${cssPrefix}__rating`}>
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <p key={i}>⭐️</p>;
            })}
        </div>
      </div>

      <img src={image} alt="" />
      <button>Add to Cart</button>
    </div>
  );
}

export default Product;
