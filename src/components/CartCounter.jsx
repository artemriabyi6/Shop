// src/components/CartCounter.jsx
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartCounter = () => {
  const { cartList } = useCart(); // Використовуємо контекст для отримання cartList
    
  return (
    <NavLink to='/cart'  className={({ isActive }) => (isActive ? "text-red-300" : "text-white")}>
      Cart({cartList.length}) {/* Відображаємо кількість продуктів в корзині */}
    </NavLink>
  );
}

export default CartCounter;

