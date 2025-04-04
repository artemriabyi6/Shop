import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Cart = () => {
  const { cartList, setCartList, setItemToLocalStorage } = useCart();
  const [removingItemId, setRemovingItemId] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const handleRemove = (uniqueId) => {
    setRemovingItemId(uniqueId); // Запускаємо анімацію

    // Додаємо затримку перед реальним видаленням
    setTimeout(() => {
      // Видаляємо товар з корзини
      setCartList((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
      setItemToLocalStorage("cart", cartList);
      setRemovingItemId(null); // Очищаємо після видалення
    }, 400); // 500ms = тривалість анімації
  };

  // Загальна сума
  const total = cartList.reduce(
    (sum, item) => sum + Number(item.price.replace(" UAH", "")),
    0
  );

  return (
    <>
      <Header />
      <main>
        <div className="w-5/6 m-auto">
          <h1 className="text-2xl text-center">Your Cart</h1>

          {cartList.length > 0 ? (
            cartList.map((item) => (
              <div
                key={item.uniqueId}
                className={`cart-item flex flex-col items-center gap-4 border p-4 m-2 w-3xs rounded-lg
                  ${removingItemId === item.uniqueId ? "removing" : ""}`}
              >
                <div className="product-image-container">
                  <img src={item.img} alt={item.name} className="product-image" />
                </div>
                <p className="mb-4 text-2xl">{item.name}</p>
                <p className="mb-4">{item.price}</p>
                <button
                  onClick={() => handleRemove(item.uniqueId)}
                  className="cursor-pointer border rounded-lg p-4 mb-4 buy-btn"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>Cart is empty</p>
          )}

          <p className="text-xl font-bold">Total: {total} UAH</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
