import { FaRegCreditCard } from "react-icons/fa";
import "./AccessKey.module.css";

const AccessKey = ({ accesskey }) => {
  return (
    <h5>
      <FaRegCreditCard style={{ fontSize: "3rem", color: "#00474B" }} />
      <p>{accesskey}</p>
      <p>
        <p>Status:</p>
        <p>{accesskey.condition}</p>
      </p>
      <p>
        <p>Date of Procurement:</p>
        <p>{accesskey.procurementDate}</p>
      </p>
      <p>
        <p>Date of Expiry:</p>
        <p>{accesskey.expiryDate}</p>
      </p>
    </h5>
  );
};

export default AccessKey;
