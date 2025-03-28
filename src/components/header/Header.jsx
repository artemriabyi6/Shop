// import { Link } from 'react-router-dom'
// import CartCounter from '../CartCounter';
// const Header = () => {
//     return ( 
//     <>
//     <header className="w-full bg-black p-4 mb-10 flex ">
//         <div>
//         <Link to='/' className='text-white'>Title</Link>
//         </div>

//        <div>
//             <CartCounter/>

//        </div>
        
//     </header>
  
//     </> 
// );
// }
 
// export default Header;

import { Link } from "react-router-dom";
import CartCounter from "../CartCounter";
import { useSearch } from "../../context/SearchContext";

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="w-full bg-black p-4 mb-10 flex justify-between">
      <div>
        <Link to="/" className="text-white">Title</Link>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="p-2 rounded"
      />
      <CartCounter />
    </header>
  );
};

export default Header;

