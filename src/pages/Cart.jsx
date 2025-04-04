import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Pagination from "../components/pagination/Pagination";

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

  const total = cartList.reduce(
    (sum, item) => sum + Number(item.price.replace(" UAH", "")),
    0
  );

  const totalPages = Math.ceil(cartList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = cartList.slice(startIndex, endIndex);

  return (
    <>
      <Header />
      <main className="relative">
        <h1 className="text-2xl text-center">Your Cart</h1>
        <div className="w-5/6 m-auto flex flex-wrap cart-container">
          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
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
            <p className="empty-cart-text">Cart is empty</p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        <p className="text-xl font-bold total">Total: {total} UAH</p>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
