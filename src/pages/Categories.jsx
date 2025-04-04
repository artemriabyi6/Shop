import { NavLink, useLocation, Link, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useSearch } from "../context/SearchContext";
import { useState } from "react";
import megane from "../assets/images/Megane.png";
import roses from "../assets/images/roses.png";
import bunny from "../assets/images/bunny.png";
import tesla from "../assets/images/tesla.png";
import sunflower from "../assets/images/sunflower.png";
import robot from "../assets/images/robot.png";

const categoriesList = [
  { img: roses, category: "flowers", name: "Rose", price: "100 UAH", id: 1 },
  { img: sunflower, category: "flowers", name: "Sunflower", price: "80 UAH", id: 4 },
  { img: null, category: "flowers", name: "tulpan", price: "80 UAH", id: 7 },
  { img: null, category: "flowers", name: "archi", price: "80 UAH", id: 8 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 9 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 10 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 11 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 12 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 13 },
  { img: tesla, category: "cars", name: "Tesla", price: "10000 UAH", id: 5 },
  { img: robot, category: "toys", name: "Robot", price: "1000 UAH", id: 6 },
  { img: megane, category: "cars", name: "Megane", price: "7000 UAH", id: 2 },
  { img: bunny, category: "toys", name: "Bunny", price: "300 UAH", id: 3 },
];

const uniqueCategories = [...new Set(categoriesList.map((obj) => obj.category))];

// ... імпорти залишаються без змін

const Categories = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace("/", "");
  const { searchQuery, isFocused } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredArray = categoriesList
    .filter((obj) => (currentPath ? obj.category === currentPath : false))
    .filter((obj) => obj.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const homeFilteredArray = categoriesList.filter((obj) =>
    obj.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedArray = currentPath
    ? filteredArray.slice(startIndex, endIndex)
    : homeFilteredArray.slice(startIndex, endIndex);

  const totalPages = currentPath
    ? Math.ceil(filteredArray.length / itemsPerPage)
    : Math.ceil(homeFilteredArray.length / itemsPerPage);

  const shouldShowPagination =
    totalPages > 1 && (currentPath || (searchQuery && isFocused));

  return (
    <>
      <Header />
      <main>
        <div className="w-5/6 m-auto">
          {uniqueCategories.map((category) => (
            <NavLink
              key={category}
              to={`/${category}`}
              className={({ isActive }) => (isActive ? "text-red-300 mr-4" : "mr-4")}
            >
              {category}
            </NavLink>
          ))}
          <div className="flex justify-around flex-wrap">
            {currentPath ? (
              filteredArray.length > 0 ? (
                displayedArray.map((obj) => (
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
              ) : isFocused ? (
                <p>No products found</p>
              ) : null
            ) : searchQuery ? (
              homeFilteredArray.length > 0 ? (
                displayedArray.map((obj) => (
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
              ) : isFocused ? (
                <p>No products found</p>
              ) : null
            ) : null}
          </div>

          {/* PAGINATION - only if category selected OR search in focus */}
          {shouldShowPagination && (
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
        </div>
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
