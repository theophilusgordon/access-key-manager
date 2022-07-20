import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserAlt, FaKey } from "react-icons/fa";
import GetOtp from "../../components/GetOtp/GetOtp";
import "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [displayGetOtp, setDisplayGetOtp] = useState(false);

  const handleClose = () => {
    setDisplayGetOtp(false);
  };

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    const postData = async () => {
      try {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? "https://access-key-manager.herokuapp.com/"
            : "http://localhost:5000";
        const response = await axios.post(
          `${baseUrl}/api/users/login`,
          userData
        );
        if (response) {
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("username", response.data.name);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    postData();
  };

  return (
    <main>
      {displayGetOtp && <GetOtp handleClose={handleClose} />}
      <section style={displayGetOtp ? { opacity: "0.25" } : { opacity: "1" }}>
        <article>
          <FaKey />
          <h1>Welcome Back!</h1>
          <p>
            Login to see Access Keys to activate your school account or purchase
            new ones.
          </p>
          <p>Don't have an account? Register now.</p>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </article>

        <form>
          <h1>
            <FaUserAlt /> Log In
          </h1>
          <p>Login with your email and password</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button onClick={(e) => handleSubmit(e)}>Log In</button>
          <p
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setDisplayGetOtp(true)}
          >
            Forgot password? Reset here
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
