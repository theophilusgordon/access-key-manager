import { FaRegCreditCard, FaTimesCircle } from "react-icons/fa";
import "./AccessKey.module.css";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AccessKey = ({ keys }) => {
  const isAdmin = localStorage.getItem("isAdmin");

  const handleRevoke = async (e) => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://access-key-manager.herokuapp.com/"
        : "http://localhost:5000";
    try {
      const token = localStorage.getItem("auth");
      await axios.patch(
        `${baseUrl}/api/keys/${e.currentTarget.id}`,
        { revoke: "Revoked" },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Access Key Revoked");
      console.log(e.currentTarget.id);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <h5>
      <FaRegCreditCard
        style={{ fontSize: "3rem", color: "#00474B" } || <Skeleton />}
      />
      <p>{keys.key}</p>
      <p>
        <p>Status:</p>
        <p>{keys.condition || <Skeleton />}</p>
      </p>
      <p>
        <p>Date of Procurement:</p>
        <p>
          {moment(keys.procurementDate).format("MMM Do, yyyy") || <Skeleton />}
        </p>
      </p>
      <p>
        <p>Date of Expiry:</p>
        <p>{moment(keys.expiryDate).format("MMMM Do, yyyy") || <Skeleton />}</p>
      </p>
      <p
        id={keys._id}
        style={isAdmin === "false" ? { display: "none" } : { display: "block" }}
        onClick={handleRevoke}
      >
        <FaTimesCircle />
        <p>Revoke</p>
      </p>
    </h5>
  );
};

export default AccessKey;
