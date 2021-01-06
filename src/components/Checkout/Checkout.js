import "./Checkout.scss";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../../store/StateProvider";

function Checkout() {
  const cssPrefix = "checkout";
  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  return (
    <div className={cssPrefix}>
      <div className={`${cssPrefix}__left`}>
        <img
          className={`${cssPrefix}__ad`}
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h2 className={`${cssPrefix}__title`}>Your shopping cart</h2>
        </div>

        {cart.map((item, i) => (
          <CheckoutProduct
            key={item.id + i}
            id={item.id}
            title={item.title}
            image={item.image}
            rating={item.rating}
            price={item.price}
          />
        ))}
      </div>

      <div className={`${cssPrefix}__right`}>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
