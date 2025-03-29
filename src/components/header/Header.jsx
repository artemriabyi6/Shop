import { Link } from "react-router-dom";
import CartCounter from "../CartCounter";
import { useSearch } from "../../context/SearchContext";

const Header = () => {
  const { searchQuery, setSearchQuery,  setIsFocused } = useSearch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="w-full bg-black p-4 mb-10 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white">Title</Link>
      </div>
      <input

        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="p-2 rounded  text-white border-white border"
      />
      <CartCounter />
    </header>
  );
};

export default Header;
