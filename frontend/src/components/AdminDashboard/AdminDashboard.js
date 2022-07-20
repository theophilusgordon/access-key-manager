import { useState } from "react";
import AccessKeys from "../AccessKeys/AccessKeys";
import Header from "../Header/Header";
import PurchaseForm from "../PurchaseForm/PurchaseForm";
import "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [confirmRevokeWindow, setConfirmRevokeWindow] = useState(false);

  const handleCancel = () => {
    setConfirmRevokeWindow(false);
  };

  return (
    <>
      {confirmRevokeWindow && <PurchaseForm handleClose={handleCancel} />}
      <div style={confirmRevokeWindow ? { opacity: "0.25" } : { opacity: "1" }}>
        <Header />
        <AccessKeys />
      </div>
    </>
  );
};

export default AdminDashboard;
