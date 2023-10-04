import { Container, Button } from 'react-bootstrap';
import Header from '../header/header';

export default function OrderList() {
  const orderDetails = {
    name: 'Pizza Name',
    total: '13.00',
    toppings: ['Agurkai', 'suris', 'jelapenas'],
  };

  return (
    <div className="page-container">
      <Header />
      <Container>
        <div className="order-details">
          <h4>Peržiureti užsakymą</h4>
          <p>
            {orderDetails.name} ({orderDetails.total}€)
          </p>
          <ul>
            {orderDetails.toppings.map((topping, index) => (
              <li key={index}>+ {topping}</li>
            ))}
          </ul>
          <p>Bendra suma: {orderDetails.total}€</p>
        </div>
        <Button href="/orders" className="submit-button">
          Pateikite užsakymą
        </Button>
      </Container>
    </div>
  );
}
