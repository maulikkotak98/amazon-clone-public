import "./Order.scss";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  const cssPrefix = "order";

  return (
    <div className={cssPrefix}>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className={`${cssPrefix}__id`}>
        <small>{order.id}</small>
      </p>
      {order.data.cart?.map((item, i) => (
        <CheckoutProduct
          key={item.id + i}
          id={item.id}
          title={item.title}
          image={item.image}
          rating={item.rating}
          price={item.price}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className={`${cssPrefix}__total`}>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs."}
      />
    </div>
  );
}

export default Order;
