import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserAlt, FaKey } from "react-icons/fa";
import axios from "axios";
import "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, confirmPassword, name } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };

    const postData = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://access-key-manager.herokuapp.com/"
          : "http://localhost:5000";
      try {
        const response = await axios.post(
          `${baseUrl}/api/users/register`,
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
      <section>
        <article>
          <FaKey />
          <h1>Register!</h1>
          <p>
            Register to purchase Access Keys to activate your school platform.
          </p>
          <p>Already have an account? Login instead.</p>
          <Link to="/">
            <button>Log In</button>
          </Link>
        </article>

        <form>
          <h1>
            <FaUserAlt /> Create Account
          </h1>
          <p>Create account with your name, email and password</p>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={handleChange}
            value={name}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Password"
            onChange={handleChange}
            value={confirmPassword}
          />
          <button onClick={(e) => handleSubmit(e)}>Sign Up</button>
        </form>
      </section>
    </main>
  );
};

export default Register;
