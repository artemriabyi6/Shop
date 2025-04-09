import { Link } from "react-router-dom";
import CartCounter from "../CartCounter";
import { useSearch } from "../../context/SearchContext";


const Header = () => {
  const { searchQuery, setSearchQuery,  setIsFocused } = useSearch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="w-full bg-white p-4 mb-10 flex justify-between items-center">
      <div>
        <Link to="/" className="text-black w-[20px]">Home</Link>
      </div>
      <input

        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="p-2 rounded  text-black border border-black"
      />
      <CartCounter />
    </header>
  );
};

export default Header;
