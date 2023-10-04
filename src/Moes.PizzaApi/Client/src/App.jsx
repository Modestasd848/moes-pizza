import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PizzaMenu from './components/pizzaMeniu/PizzaMenu.jsx';
import OrderList from './components/orderList/orderList';
import Orders from './components/orders/orders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PizzaMenu />} />
        <Route path="/orderList" element={<OrderList />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
