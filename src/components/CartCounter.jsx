// src/components/CartCounter.jsx
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import cart from '../assets/images/shopping-cart.svg'
const CartCounter = () => {
  const { cartList } = useCart(); // Використовуємо контекст для отримання cartList
    
  return (
    <NavLink to='/cart'  className={({ isActive }) => (isActive ? "flex items-center" : "flex items-center")} id='cart-icon'>
      <img src={cart} alt="" className='w-8' /> {/* Відображаємо кількість продуктів в корзині */}
    </NavLink>
  );
}

export default CartCounter;

