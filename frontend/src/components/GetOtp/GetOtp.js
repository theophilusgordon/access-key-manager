import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner, FaWindowClose } from "react-icons/fa";
import "./GetOtp.module.css";

const GetOtp = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://access-key-manager.herokuapp.com"
          : "http://localhost:5000";
      try {
        const response = await axios.post(`${baseUrl}/api/users/otp`, formData);

        if (email === "") {
          toast.error("Enter email to get OTP");
          return;
        }

        if (response) {
          navigate("/reset");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    postData();
  };

  return (
    <aside>
      <form>
        <h1>
          <FaSpinner /> Get OTP <FaWindowClose onClick={handleClose} />
        </h1>
        <p>Enter your email to get a code to change your password</p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />

        <button onClick={(e) => handleSubmit(e)}>Get OTP</button>
      </form>
    </aside>
  );
};

export default GetOtp;
