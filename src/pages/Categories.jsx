import { NavLink, useLocation,  Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useSearch } from "../context/SearchContext";
import Pagination from "../components/pagination/Pagination";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import HeroSlider from "../components/slider/HeroSlider"; // Імпортуємо слайдер
import images from "../utils/utils";

const categoriesList = [
  { img: images.rose, category: "flowers", name: "Rose", price: "100 UAH", id: 1 },
  { img: images.sunflower, category: "flowers", name: "Sunflower", price: "80 UAH", id: 4 },
  { img: null, category: "flowers", name: "tulpan", price: "80 UAH", id: 7 },
  { img: null, category: "flowers", name: "archi", price: "80 UAH", id: 8 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 9 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 10 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 11 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 12 },
  { img: null, category: "flowers", name: "denchi", price: "80 UAH", id: 13 },
  { img: images.tesla, category: "cars", name: "Tesla", price: "10000 UAH", id: 5 },
  { img: images.robot, category: "toys", name: "Robot", price: "1000 UAH", id: 6 },
  { img: images.megane, category: "cars", name: "Megane", price: "7000 UAH", id: 2 },
  { img: images.bunny, category: "toys", name: "Bunny", price: "300 UAH", id: 3 },
];

const uniqueCategories = [...new Set(categoriesList.map((obj) => obj.category))];

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

  // Перевірка на наявність ID продукту в URL
  const isProductPage = location.pathname.split("/").length === 3;

  return (
    <>
      <Header />
      {/* Умовно рендеримо слайдер тільки, якщо це не сторінка продукту */}
     
      <main>
        <div className="w-5/6 m-auto">
          {uniqueCategories.map((category) => (
            <NavLink
              key={category}
              to={`/${category}`}
              className={({ isActive }) => (isActive ? "text-red-300 mr-4" : " text-white mr-4")}
            >
              {category}
            </NavLink>
          ))}
          <div className="flex justify-around flex-wrap">
            {currentPath ? (
              filteredArray.length > 0 ? (
                displayedArray.map((obj) => (
                  <ProductCard key={obj.id}  obj={obj}/>
                ))
              ) : isFocused ? (
                <p>No products found</p>
              ) : null
            ) : searchQuery ? (
              homeFilteredArray.length > 0 ? (
                displayedArray.map((obj) => (
                  <ProductCard key={obj.id}  obj={obj}/>
                ))
              ) : isFocused ? (
                <p>No products found</p>
              ) : null
            ) : null}
          </div>

          {shouldShowPagination && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
        <Outlet context={{ categoriesList }} />
        {!isProductPage && <HeroSlider allProducts={categoriesList} />}
      </main>
      <Footer />
    </>
  );
};

export default Categories;


