// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
// import { useEffect } from "react";
// import { useCart } from "../context/CartContext";

// const Cart = () => {
//   const { cartList, setCartList, setItemToLocalStorage } = useCart();

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartList));
//   }, [cartList]);

//   const removeFromCart = (uniqueId) => {
//     setCartList((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
//     setItemToLocalStorage("cart", cartList);
//   };


//   const total = cartList.reduce((sum, item) => sum + parseFloat(item.price), 0);

//   return (
//     <>
//       <Header />
//       <main className="w-5/6 m-auto">
//         <div >
//           <h1 className="text-2xl text-center">Your Cart</h1>

//           {cartList.length > 0 ? (
//             <>
//             <div className="flex flex-wrap gap-2  w-5/6 auto cart-wrapper">
//             {cartList.map((item, index) => (
//                 <div key={item.id + index} className="flex flex-col items-center gap-4 border p-4 m-2 w-3xs  rounded-lg ">
//                   <div className="product-image-container">
//                     <img src={item.img} alt={item.name} className="product-image" />
//                   </div>
//                   <p className="mb-4 text-2xl">{item.name}</p>
//                   <p className="mb-4">${item.price}</p>
//                   <button onClick={() => removeFromCart(item.uniqueId)} className="cursor-pointer border rounded-lg p-4 mb-4 buy-btn">
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
             
              
//               <p className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</p>
//             </>
//           ) : (
//             <p>Cart is empty</p>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Cart;


import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Cart = () => {
  const { cartList, setCartList, setItemToLocalStorage } = useCart();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const removeFromCart = (uniqueId) => {
    setCartList((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
    setItemToLocalStorage("cart", cartList);
  };

  // Загальна сума
  const total = cartList.reduce((sum, item) => sum + Number(item.price.replace(" UAH", "")), 0);

  return (
    <>
   
    <Header/>
    <main>
      <div className="w-5/6 m-auto">
        <h1 className="text-2xl text-center">Your Cart</h1>

        {cartList.length > 0 ? (
          cartList.map((item, index) => (
            <div key={item.id + index} className="flex flex-col items-center gap-4 border p-4 m-2 w-3xs">
              <div className="product-image-container">
                <img src={item.img} alt={item.name} className="product-image" />
              </div>
              <p className="mb-4 text-2xl">{item.name}</p>
              <p className="mb-4">{item.price}</p>
              <button
                onClick={() => removeFromCart(item.uniqueId)}
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
    <Footer/>
    </>
  );
};

export default Cart;
