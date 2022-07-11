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

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header>
      <FaUniversalAccess />
      <h3>{greet() ? `${greet()}` : "Hello"}</h3>
      <FaSignOutAlt onClick={handleLogout} />
    </header>
  );
};

export default Header;
