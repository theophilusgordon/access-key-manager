import { useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import AccessKeys from "../AccessKeys/AccessKeys";
import Header from "../Header/Header";
import PurchaseForm from "../PurchaseForm/PurchaseForm";
import "./UserDashboard.module.css";

const UserDashboard = () => {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);

  const handleClose = () => {
    setShowPurchaseForm(false);
  };

  return (
    <>
      {showPurchaseForm && <PurchaseForm handleClose={handleClose} />}
      <Header />
      <span onClick={() => setShowPurchaseForm(true)}>
        <FaMoneyBillAlt /> Purchase Access Key
      </span>
      <AccessKeys />
    </>
  );
};

export default UserDashboard;
