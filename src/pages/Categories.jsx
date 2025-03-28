import { NavLink, useLocation, Link, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import megane from "../assets/images/Megane.png";
import roses from "../assets/images/roses.png";
import bunny from "../assets/images/bunny.png";
import tesla from "../assets/images/tesla.png";
import sunflower from "../assets/images/sunflower.png";
import robot from "../assets/images/robot.png";

const categoriesList = [
  { img: roses, category: "flowers", name: "Rose", price: "100 UAH", id: 1 },
  { img: sunflower, category: "flowers", name: "Sunflower", price: "80 UAH", id: 4 },
  { img: tesla, category: "cars", name: "Tesla", price: "10000 UAH", id: 5 },
  { img: robot, category: "toys", name: "Robot", price: "1000 UAH", id: 6 },
  { img: megane, category: "cars", name: "Megane", price: "7000 UAH", id: 2 },
  { img: bunny, category: "toys", name: "Bunny", price: "300 UAH", id: 3 },
];

// Перевіряємо, чи є `categoriesList` перед обробкою
const uniqueCategories = categoriesList ? [...new Set(categoriesList.map((obj) => obj.category))] : [];

const Categories = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace("/", "");

  // Перевіряємо, чи завантажився `categoriesList`
  if (!categoriesList.length) {
    return <p>Loading categories...</p>;
  }

  const filteredArray = categoriesList.filter((obj) => obj.category === currentPath);

  return (
    <>
      <Header />
      <main>
        <div className="w-5/6 m-auto">
          {/* Навігація між категоріями */}
          {uniqueCategories.map((category) => (
            <NavLink
              key={category}
              to={`/${category}`}
              className={({ isActive }) => (isActive ? "text-red-300 mr-4" : "mr-4")}
            >
              {category}
            </NavLink>
          ))}
          <div className="flex justify-around">
            {/* Відображення товарів у категорії */}
            {filteredArray.length > 0 ? (
              filteredArray.map((obj) => (
                <Link key={obj.id} to={`/${obj.category}/${obj.id}`}>
                  <div className="rounded-lg px-4 w-3xs border border-red mt-6 flex flex-col items-center justify-center cursor-pointer">
                    <div className="product-image-container">
                      <img src={obj.img} alt={obj.name} className="product-image" />
                    </div>
                    <p className="mb-4 text-2xl">{obj.name}</p>
                    <p className="mb-4">{obj.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              null
            )}
          </div>
        </div>
        {/* Передаємо categoriesList у Outlet для дочірніх маршрутів */}
        <Outlet context={{ categoriesList }} />
      </main>
      <Footer />
    </>
  );
};

export default Categories;










































// import { NavLink, useLocation } from "react-router-dom";

// const Categories = () => {
//     const categoriesList = [
//         { category: 'flowers', name: 'rose', price: '100', id: 1 },
//         { category: 'cars', name: 'renault', price: '7000', id: 2 },
//         { category: 'toys', name: 'bunny', price: '300', id: 3 }
//     ];

//     const location = useLocation();
//     const currentPath = location.pathname.replace("/", ""); // Видаляємо `/`, щоб отримати тільки ім'я категорії

//     const filtredArray = categoriesList.filter(obj => obj.category === currentPath);

//     return (
//         <>
//             {categoriesList.map(obj => (
//                 <NavLink
//                     key={obj.id}
//                     to={`/${obj.category}`}
//                     className={({ isActive }) => (isActive ? 'text-red-300 mr-4' : 'mr-4')}
//                 >
//                     {obj.category}
//                 </NavLink>
//             ))}

//             {filtredArray.map(obj => (
//                 <div key={obj.id}>
//                     <p>{obj.name}</p>
//                     <p>{obj.price}</p>
//                     <button>Buy</button>
//                 </div>
//             ))}
//         </>
//     );
// }

// export default Categories;
