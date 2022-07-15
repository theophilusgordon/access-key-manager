import { useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import AccessKeys from "../AccessKeys/AccessKeys";
import Header from "../Header/Header";
import PurchaseForm from "../PurchaseForm/PurchaseForm";
import "./UserDashboard.module.css";

const UserDashboard = () => {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin");

  const handleClose = () => {
    setShowPurchaseForm(false);
  };

  return (
    <>
      {showPurchaseForm && <PurchaseForm handleClose={handleClose} />}
      <div style={showPurchaseForm ? { opacity: "0.25" } : { opacity: "1" }}>
        <Header />
        <span
          style={
            isAdmin === "true" ? { display: "hidden" } : { display: "block" }
          }
          onClick={() => setShowPurchaseForm(true)}
        >
          <FaMoneyBillAlt /> Purchase Access Key
        </span>
        <AccessKeys />
      </div>
    </>
  );
};

export default UserDashboard;
