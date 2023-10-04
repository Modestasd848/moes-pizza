import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PizzaMenu from './components/pizzaMeniu/PizzaMenu.jsx';
import OrderList from './components/orderList/orderList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PizzaMenu />} />
        <Route path="/orderList" element={<OrderList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
