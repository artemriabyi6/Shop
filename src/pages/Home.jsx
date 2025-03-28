
// import Categories from "./Categories";

// const Home = () => {
//     return ( 
//         <>
//         <Categories/>
       
//         </>
        
//      );
// }
 
// export default Home;

// import { useState } from "react";
// import Categories from "./Categories";
// import Header from "../components/header/Header";

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState(""); // Додаємо стан для пошуку

//   return (
//     <>
//       <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <Categories searchTerm={searchTerm} />
//     </>
//   );
// };

// export default Home;


import Categories from "./Categories";

const Home = () => {
  return (
    <main>
      <Categories />
    </main>
  );
};

export default Home;
