import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Cart = () => {
  const { cartList, setCartList, setItemToLocalStorage } = useCart();
  const [removingItemId, setRemovingItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const handleRemove = (uniqueId) => {
    setRemovingItemId(uniqueId);

    setTimeout(() => {
      setCartList((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
      setItemToLocalStorage("cart", cartList);
      setRemovingItemId(null);
    }, 400);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCart = cartList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(cartList.length / itemsPerPage);

  const total = cartList.reduce(
    (sum, item) => sum + Number(item.price.replace(" UAH", "")),
    0
  );

  return (
    <>
      <Header />
      <main className="relative">
        <h1 className="text-2xl text-center">Your Cart</h1>
        <div className="w-5/6 m-auto flex flex-wrap cart-container">
          {cartList.length > 0 ? (
            displayedCart.map((item) => (
              <div
                key={item.uniqueId}
                className={`cart-item flex flex-col items-center gap-4 border p-4 m-2 w-3xs rounded-lg ${
                  removingItemId === item.uniqueId ? "removing" : ""
                }`}
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
            <p className="empty-cart-text">Cart is empty</p>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 border rounded transition-all duration-200 ${
                  currentPage === index + 1
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white hover:bg-red-100"
                }`}
                
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        <p className="text-xl font-bold total">Total: {total} UAH</p>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
