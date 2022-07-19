import { FaWindowClose } from "react-icons/fa";
import moment from "moment";
import "./ActiveKeyModal.module.css";

const ActiveKeyModal = ({ activeKey, handleCloseModal }) => {
  return (
    <pre key={activeKey._id}>
      <h2>
        <FaWindowClose onClick={handleCloseModal} />
      </h2>
      <p>
        <p>ACTIVE KEY:</p>
        <p>{activeKey.key}</p>
      </p>
      <p>
        <p>STATUS:</p>
        <p>{activeKey.condition}</p>
      </p>
      <p>
        <p>PROCUREMENT DATE:</p>
        <p>{moment(activeKey.procurementDate).format("MMM Do, yyyy")}</p>
      </p>
      <p>
        <p>DATE OF EXPIRY :</p>
        <p>{moment(activeKey.expiryDate).format("MMMM Do, yyyy")}</p>
      </p>
    </pre>
  );
};

export default ActiveKeyModal;
