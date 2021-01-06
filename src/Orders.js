import { useState, useEffect } from "react";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import "./Orders.scss";

function Orders() {
  const cssPrefix = "orders";
  const [orders, setOrders] = useState([]);
  const [{ cart, user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className={cssPrefix}>
      <h1>Your Orders</h1>

      <div className={`${cssPrefix}__order`}>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
