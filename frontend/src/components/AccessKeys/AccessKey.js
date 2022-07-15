import { FaRegCreditCard } from "react-icons/fa";
import "./AccessKey.module.css";
import moment from "moment";

const AccessKey = ({ keys }) => {
  return (
    <h5>
      <FaRegCreditCard style={{ fontSize: "3rem", color: "#00474B" }} />
      <p>{keys.key}</p>
      <p>
        <p>Status:</p>
        <p>{keys.condition}</p>
      </p>
      <p>
        <p>Date of Procurement:</p>
        <p>{moment(keys.procurementDate).format("MMM Do, yyyy")}</p>
      </p>
      <p>
        <p>Date of Expiry:</p>
        <p>{moment(keys.expiryDate).format("MMMM Do, yyyy")}</p>
      </p>
    </h5>
  );
};

export default AccessKey;
