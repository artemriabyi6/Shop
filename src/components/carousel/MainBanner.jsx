import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import megane from "../../assets/images/Megane.png";
import roses from "../../assets/images/roses.png";
import bunny from "../../assets/images/bunny.png";
import tesla from "../../assets/images/tesla.png";
import sunflower from "../../assets/images/sunflower.png";
import robot from "../../assets/images/robot.png";

const products = [
  { img: roses, category: "flowers", name: "Rose", price: "100 UAH", id: 1, },
  { img: sunflower, category: "flowers", name: "Sunflower", price: "80 UAH", id: 4, },
  { img: tesla, category: "cars", name: "Tesla", price: "10000 UAH", id: 5,  },
  { img: robot, category: "toys", name: "Robot", price: "1000 UAH", id: 6,  },
  { img: megane, category: "cars", name: "Megane", price: "7000 UAH", id: 2,  },
  { img: bunny, category: "toys", name: "Bunny", price: "300 UAH", id: 3, },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-[300px] mx-auto">
        <Slider {...settings}>
      {products.map((item, index) => (
        <div key={index}  className="flex flex-col  items-center justify-center w-[500px] ">
            <div className="slide-img-box">
                <img src={item.img} alt={`Slide ${index}`} className="w-full h-full" />
            </div>
            <p className="mb-4 text-2xl text-center">{item.name}</p>
            <p className="mb-4 text-center">{item.price}</p>
        <button className="cursor-pointer border rounded-lg p-4 mb-4 buy-btn">
          Buy
        </button>
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default Carousel;
