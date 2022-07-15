import { FaUniversalAccess, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.module.css";

const Header = () => {
  const greet = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  let username = localStorage.getItem("username");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <header>
      <FaUniversalAccess />
      <article>
        <h6>{greet() ? `${greet()},` : "Hello,"}</h6>
        <h3>{username.split(" ")[0]}</h3>
      </article>
      <h5 onClick={handleLogout}>
        Log Out
        <FaSignOutAlt />
      </h5>
    </header>
  );
};

export default Header;
