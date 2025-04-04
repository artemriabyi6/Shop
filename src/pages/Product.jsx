import { useParams, useOutletContext } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useRef } from "react";

const Product = () => {
  const context = useOutletContext();
  const { cartList, setCartList, setItemToLocalStorage } = useCart();
  const { productId } = useParams();
  const imgRef = useRef(null); // посилання на зображення

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  if (!context) {
    return <p>Loading...</p>;
  }

  const { categoriesList } = context;
  const product = categoriesList?.find((p) => p.id === Number(productId));

  if (!product) {
    return <p>Product not found</p>;
  }

  const animateImageToCart = () => {
    const img = imgRef.current;
    const cart = document.querySelector("#cart-icon");

    

    if (img && cart) {
      const imgRect = img.getBoundingClientRect();
      const cartRect = cart.getBoundingClientRect();

      console.log(imgRect)
      console.log(cartRect)


      const flyImage = img.cloneNode(true);
      flyImage.style.position = "fixed";
      flyImage.style.left = imgRect.left + "px";
      flyImage.style.top = imgRect.top + "px";
      flyImage.style.width = imgRect.width + "px";
      flyImage.style.height = imgRect.height + "px";
      flyImage.style.transition = "all 0.7s ease-in-out";
      flyImage.style.zIndex = 999;

      document.body.appendChild(flyImage);

      

      requestAnimationFrame(() => {
        flyImage.style.left = cartRect.left + "px";
        flyImage.style.top = cartRect.top + "px";
        flyImage.style.width = "0px";
        flyImage.style.height = "0px";
        flyImage.style.opacity = 0;
      });

      setTimeout(() => {
        flyImage.remove();
      }, 800);
    }
    
  };

  const addToCart = () => {
    animateImageToCart();

    const newItem = { ...product, uniqueId: Date.now() };
    setCartList((prev) => [...prev, newItem]);
    setItemToLocalStorage("cart", cartList);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-lg px-4 w-3xs border border-red mt-6 flex flex-col items-center justify-center">
        <div className="product-image-container">
          <img
            ref={imgRef}
            src={product.img}
            alt={product.name}
            className="product-image"
          />
        </div>
        <p className="mb-4 text-2xl">{product.name}</p>
        <p className="mb-4">{product.price}</p>
        <button
          className="cursor-pointer border rounded-lg p-4 mb-4 buy-btn"
          onClick={addToCart}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Product;
