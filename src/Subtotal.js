import "./Subtotal.scss";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";
function Subtotal() {
  const cssPrefix = "subtotal";

  const [{ cart }, dispatch] = useStateValue();

  return (
    <div className={cssPrefix}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cart?.length} items): <strong>{value}</strong>
            </p>
            <small className={`${cssPrefix}__gift`}>
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)} // homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs."}
      />

      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
