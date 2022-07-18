import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import "./ResetPassword.module.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    otp: "",
    email: "",
    password: "",
  });

  const { email, password, confirmPassword, otp } = formData;
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
      return;
    }

    const userData = {
      otp,
      email,
      password,
    };

    const changePassword = async () => {
      try {
        const response = await axios.patch(
          "http://localhost:5000/api/users/reset",
          userData
        );

        if (response) {
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    changePassword();
  };

  return (
    <main>
      <form>
        <h1>
          <FaUserAlt /> Reset Password
        </h1>
        <p>Use OTP sent to your mail to reset password</p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />
        <input
          type="text"
          name="otp"
          id="otp"
          placeholder="Enter OTP"
          onChange={handleChange}
          value={otp}
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
        <button onClick={(e) => handleSubmit(e)}>Reset Password</button>
      </form>
    </main>
  );
};

export default ResetPassword;
