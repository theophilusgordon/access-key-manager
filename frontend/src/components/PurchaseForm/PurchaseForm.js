import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner, FaWindowClose } from "react-icons/fa";
import "./PurchaseForm.module.css";

const PurchaseForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    number: "",
    holderName: "",
    ccv: "",
    expiry: "",
  });

  const { number, holderName, ccv, expiry } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("auth");

    const postData = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://access-key-manager.herokuapp.com/"
          : "http://localhost:5000";

      try {
        const response = await axios.post(
          `${baseUrl}/api/keys/create`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          handleClose();
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
          <FaSpinner /> Purchase Access Key
          <FaWindowClose onClick={handleClose} />
        </h1>
        <p>Enter Credit Card details to purchase Access Key</p>
        <input
          type="text"
          name="holderName"
          id="holderName"
          placeholder="Credit Card Holder Name"
          onChange={handleChange}
          value={holderName}
        />

        <input
          type="text"
          name="number"
          id="number"
          placeholder="Credit Card Number"
          onChange={handleChange}
          value={number}
        />

        <input
          type="text"
          name="ccv"
          id="ccv"
          placeholder="CCV"
          onChange={handleChange}
          value={ccv}
        />

        <input
          type="text"
          name="expiry"
          id="expiry"
          placeholder="Expiry Date"
          onChange={handleChange}
          value={expiry}
        />

        <button onClick={(e) => handleSubmit(e)}>Purchase</button>
      </form>
    </aside>
  );
};

export default PurchaseForm;
