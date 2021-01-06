import React from "react";
import "./Product.scss";
import { useStateValue } from "../../store/StateProvider";

function Product({ id, title, image, price, rating }) {
  const cssPrefix = "product";
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className={cssPrefix}>
      <div className={`${cssPrefix}__info`}>
        <p>{title}</p>
        <p className={`${cssPrefix}__price`}>
          <small>Rs.</small>
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
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
