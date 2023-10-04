import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../header/header';
import axios from 'axios';

const HOST = 'http://localhost:5248/api/pizzaorder';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading] = useState(true);

  async function getOrders() {
    try {
      const ordersResponse = await axios.get(HOST);
      setOrders(ordersResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="page-container">
      <Header />
      <Container>
        <div className="order-details">
          <h4>Peržiureti užsakymą</h4>
          {loading ? (
            <p>Loading...</p>
          ) : orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id}>
                <h5>{order.name}</h5>
                <p>Total: {order.total}€</p>
                <ul>
                  {order.toppings.map((topping, index) => (
                    <li key={index}>+ {topping}</li>
                  ))}
                </ul>
                <p>Bendra suma: {order.total}€</p>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}
