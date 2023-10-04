import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Header from '../header/header';
import axios from 'axios';

const HOST = 'http://localhost:5248';

const DEFAULT_PIZZA = {
  special: null,
  specialId: null,
  size: 'Medium',
  toppings: [],
};

export default function PizzaMenu() {
  const [showModal, setShowModal] = useState(false);
  // const [order, setOrder] = useState({ pizzas: [] });
  const [pizzaSpecials, setPizzaSpecials] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [pizza, setPizza] = useState(DEFAULT_PIZZA);
  const [price, setPrice] = useState(0);

  async function getPizzaSpecials() {
    try {
      const pizzaSpecialsResponse = await axios.get(
        HOST + '/api/pizzaspecials'
      );
      setPizzaSpecials(pizzaSpecialsResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getToppings() {
    try {
      const toppingsResponse = await axios.get(HOST + '/api/toppings');
      setToppings(toppingsResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPrice() {
    try {
      const priceResponse = await axios.post(HOST + '/api/pizza/price', {
        ...pizza,
      });
      setPrice(priceResponse.data.price);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPizzaSpecials();
    getToppings();
  }, []);

  useEffect(() => {
    if (pizza.special !== null) {
      getPrice();
    }
  }, [pizza]);

  const openModal = (specialId) => {
    setShowModal(true);
    const special = pizzaSpecials.find((x) => x.id === specialId);
    setPizza({ ...pizza, special, specialId });
  };

  const closeModal = () => {
    setShowModal(false);
    setPizza(DEFAULT_PIZZA);
  };

  const addToCart = async () => {
    try {
      const orderData = {
        name: pizza.special?.name,
        total: price,
        toppings: pizza.toppings.map((topping) => topping.name),
        size: pizza.size,
      };

      console.log('Request Data:', orderData);

      const response = await axios.post(`${HOST}/api/pizzaorder`, orderData);

      console.log('Response Data:', response.data);

      if (response.status === 200) {
        closeModal();
      } else {
        console.error('Error creating the order:', response.data);
      }
    } catch (error) {
      console.error('Error creating the order:', error);
    }
  };

  const addTopping = (toppingId) => {
    const topping = toppings.find((topping) => topping.id === +toppingId);
    const updatedToppings = [...pizza.toppings, topping];
    setPizza({ ...pizza, toppings: updatedToppings });
  };
  const removeTopping = (indexToRemove) => {
    const updatedToppings = [...pizza.toppings];
    updatedToppings.splice(indexToRemove, 1);
    setPizza({ ...pizza, toppings: updatedToppings });
  };

  return (
    <div className="page-container">
      <Header />
      <Container className="mt-3">
        <Row xs={1} md={2} lg={4}>
          {' '}
          {pizzaSpecials.map((pizzaSpecial) => (
            <Col
              key={pizzaSpecial.id}
              variant="primary"
              className="hover-effect"
              onClick={() => openModal(pizzaSpecial.id)}
            >
              <Card style={{ width: '100%' }}>
                <Card.Img
                  variant="top"
                  src={pizzaSpecial.imageUrl}
                  style={{ aspectRatio: '1/1' }}
                />
                <Card.Body>
                  <Card.Title>{pizzaSpecial.name}</Card.Title>
                  <Card.Text>{pizzaSpecial.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={showModal} onHide={closeModal} className="custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{pizza.special?.name}</h5>
          </div>
          <div className="modal-body">
            <p>{pizza.special?.description}</p>

            <div className="mb-3">
              <label htmlFor="pizzaToppings" className="form-label">
                Select Toppings:
              </label>
              <select
                multiple={false}
                id="pizzaToppings"
                className="form-select"
                onChange={(e) => addTopping(e.target.value)}
              >
                <option value={''}>Select toppings</option>
                {toppings.map((topping) => (
                  <option key={topping.id} value={topping.id}>
                    {topping.name}
                  </option>
                ))}
              </select>
            </div>

            {pizza.toppings.map((topping, index) => (
              <div className="topping-button" key={index}>
                <Button>{topping.name}</Button>
                <button
                  onClick={() => removeTopping(index)}
                  className="btn btn-danger rounded-circle"
                  style={{ marginLeft: '5px' }}
                >
                  &times;
                </button>
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Select Pizza size:</label>
              <div>
                <input
                  type="radio"
                  id="small"
                  checked={pizza.size === 'Small'}
                  value={'Small'}
                  onChange={(e) => setPizza({ ...pizza, size: e.target.value })}
                />
                <label htmlFor="small" className="mr-2">
                  Small
                </label>
                <br />
                <input
                  type="radio"
                  id="medium"
                  checked={pizza.size === 'Medium'}
                  value={'Medium'}
                  onChange={(e) => setPizza({ ...pizza, size: e.target.value })}
                />
                <label htmlFor="medium" className="mr-2">
                  Medium
                </label>
                <br />
                <input
                  type="radio"
                  id="large"
                  checked={pizza.size === 'Large'}
                  value={'Large'}
                  onChange={(e) => setPizza({ ...pizza, size: e.target.value })}
                />
                <label htmlFor="large">Large</label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">total price: {price}€</label>
              <br />
              <Button type="submit" variant="primary" onClick={addToCart}>
                Add Order
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
