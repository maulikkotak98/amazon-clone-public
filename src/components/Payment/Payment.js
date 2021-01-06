import "./Payment.scss";
import { useState, useEffect } from "react";
import { useStateValue } from "../../store/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "../../store/reducer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPayment } from "../../api-service/api-service";
import { db } from "../../firebase";

function Payment() {
  const cssPrefix = "payment";
  const [{ cart, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe(),
    elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await createPayment(getCartTotal(cart) * 100);
      // instance({
      //   method: "post",
      //   url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      // });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
    // eslint-disable-next-line
  }, []);

  console.log("the secret is >>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_CART",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className={cssPrefix}>
      <div className={`${cssPrefix}__container`}>
        <h1>
          Checkout (<Link to="/checkout">{cart?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className={`${cssPrefix}__section`}>
          <div className={`${cssPrefix}__title`}>
            <h3>Delivery Address</h3>
          </div>
          <div className={`${cssPrefix}__address`}>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Ahmedabad, IN</p>
          </div>
        </div>

        {/* Payment section - review items */}
        <div className={`${cssPrefix}__section`}>
          <div className={`${cssPrefix}__title`}>
            <h3>Review items and delivery</h3>
          </div>
          <div className={`${cssPrefix}__items`}>
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
        </div>

        {/* Payment section - payment method */}
        <div className={`${cssPrefix}__section`}>
          <div className={`${cssPrefix}__title`}>
            <h3>Payment Method</h3>
          </div>
          <div className={`${cssPrefix}__details`}>
            {/* stripe */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className={`${cssPrefix}__priceContainer`}>
                <CurrencyFormat
                  renderText={(value) => <h4>Order Total: {value}</h4>}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rs."}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
