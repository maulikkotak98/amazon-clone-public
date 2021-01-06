import React from "react";
import { useStateValue } from "./StateProvider";
import "./CheckoutProduct.scss";

function CheckoutProduct({ id, image, title, rating, price, hideButton }) {
  const cssPrefix = "checkout-product";

  const [state, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };
  return (
    <div className={cssPrefix}>
      <img className={`${cssPrefix}__image`} src={image} alt="" />

      <div className={`${cssPrefix}__info`}>
        <p className={`${cssPrefix}__title`}>{title}</p>
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

        {!hideButton && (
          <button onClick={removeFromCart}>Remove from cart</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
