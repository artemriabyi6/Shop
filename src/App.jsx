
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import { useState } from "react";
import "./App.css";

function App() {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <Outlet context={{ searchQuery }} />
    </>
  );
}

export default App;
