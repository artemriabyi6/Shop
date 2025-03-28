import { useParams, useOutletContext } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

const Product = () => {
  const context = useOutletContext();
  const { cartList,  setCartList, setItemToLocalStorage } = useCart()
  const {  productId } = useParams();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  },[cartList])



  if (!context) {
    return <p>Loading...</p>; // Запобігає краху, якщо контекст ще не передався
  }

  const { categoriesList } = context;

  const product = categoriesList?.find((p) => p.id === Number(productId));

 

  if (!product) {
    return <p>Product not found</p>;
  }

  const addToCart = () => {
    const newItem = { ...product, uniqueId: Date.now() };
    setCartList((prev) => [...prev, newItem]);
    setItemToLocalStorage('cart', cartList)
  };

  


  return (
    <div className="flex justify-center items-center">
      <div className="rounded-lg px-4 w-3xs border border-red mt-6 flex flex-col items-center justify-center">
        <div className="product-image-container">
          <img src={product.img} alt={product.name} className="product-image" />
        </div>
        <p className="mb-4 text-2xl">{product.name}</p>
        <p className="mb-4">{product.price}</p>
        <button className="cursor-pointer border rounded-lg p-4 mb-4 buy-btn" onClick={addToCart}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default Product;
