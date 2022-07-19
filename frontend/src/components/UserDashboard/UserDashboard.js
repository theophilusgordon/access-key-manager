import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMoneyBillAlt, FaSearch } from "react-icons/fa";
import AccessKeys from "../AccessKeys/AccessKeys";
import Header from "../Header/Header";
import PurchaseForm from "../PurchaseForm/PurchaseForm";
import ActiveKeyModal from "../ActiveKeyModal/ActiveKeyModal";
import "./UserDashboard.module.css";

const UserDashboard = () => {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showActiveKeyModal, setShowActiveKeyModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [activeKey, setActiveKey] = useState([]);
  const isAdmin = localStorage.getItem("isAdmin");

  const handleClose = () => {
    setShowPurchaseForm(false);
  };

  const handleCloseModal = () => {
    setShowActiveKeyModal(false);
  };

  const { email } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("auth");

    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/keys/${email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          setFormData({
            email: "",
          });
          const data = response.data;
          setActiveKey(data);
          setShowActiveKeyModal(true);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getData();
  };

  return (
    <>
      {showActiveKeyModal && activeKey.length > 0 && (
        <pre>
          {activeKey.length > 0 &&
            activeKey.map((actKey) => (
              <ActiveKeyModal
                key={actKey._id}
                activeKey={actKey}
                handleCloseModal={handleCloseModal}
              />
            ))}
        </pre>
      )}
      {showPurchaseForm && <PurchaseForm handleClose={handleClose} />}
      <div
        style={
          showPurchaseForm || showActiveKeyModal
            ? { opacity: "0.25" }
            : { opacity: "1" }
        }
      >
        <Header />
        {isAdmin === "false" ? (
          <span onClick={() => setShowPurchaseForm(true)}>
            <FaMoneyBillAlt /> Purchase Access Key
          </span>
        ) : (
          <nav>
            <p>Enter email to see active key (if any)</p>
            <form action="">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="School email"
                onChange={handleChange}
                value={email}
              />
              <button onClick={(e) => handleSubmit(e)}>
                <FaSearch />
              </button>
            </form>
          </nav>
        )}
        <AccessKeys />
      </div>
    </>
  );
};

export default UserDashboard;
