import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import leftArrow from '../../assets/images/leftArrow.svg'
import rightArrow from '../../assets/images/rightArrow.svg'


const HeroSlider = ({ allProducts }) => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;

    const shuffled = [...allProducts].sort(() => Math.random() - 0.5);

    const grouped = [];
    for (let i = 0; i < shuffled.length; i += 3) {
      grouped.push(shuffled.slice(i, i + 3));
    }

    console.log(grouped)

    setSlides(grouped);
    setCurrentSlide(0);
  }, [allProducts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) return null;

  return (
    <div className="w-5/6 m-auto my-8 overflow-hidden rounded-2xl shadow-lg bg-white relative p-6">
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-700 hover:text-black transition z-10"
      >
        <img src={rightArrow} alt="" className="w-9 cursor-pointer"/>
      </button>

      <div className="flex gap-6 justify-center transition-all duration-500">
        {slides[currentSlide].map((product) => (
          <div
            key={product.id}
            className="w-1/4 bg-black rounded-xl shadow p-4 flex flex-col items-center justify-center"
          >
            <Link to={`/${product.category}/${product.id}`}>
              <div className="w-[300px] h-[300px] flex items-center justify-center overflow-hidden rounded-lg">
                {product.img ? (
                  <img src={product.img} alt={product.name} className="object-contain w-full h-full" />
                ) : (
                  <div className="text-gray-400 text-center">No image</div>
                )}
              </div>
            </Link>
            <h3 className="text-lg font-semibold text-center mt-4 text-white">{product.name}</h3>
            <p className="text-green-600 font-bold mt-2">{product.price}</p>
          </div>
        ))}
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-700 hover:text-black transition z-10"
      >
        <img src={leftArrow} alt="" className="w-9 cursor-pointer" />
      </button>
    </div>
  );
};

export default HeroSlider;
