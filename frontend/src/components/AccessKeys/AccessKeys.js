import { useState, useEffect } from "react";
import axios from "axios";
import AccessKey from "./AccessKey";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AccessKey.module.css";
import { base } from "../../../../backend/models/userModel";

const AccessKeys = () => {
  const initialValue = [];
  const [accessKeys, setAccessKeys] = useState(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessKeys = async () => {
      try {
        const token = localStorage.getItem("auth");
        const isAdmin = localStorage.getItem("isAdmin");

        const adminCheck = isAdmin === "true" ? "admin" : "user";

        const baseUrl =
          process.env.NODE_ENV === "production"
            ? "https://access-key-manager.herokuapp.com/"
            : "http://localhost:5000";

        const response = await axios.get(`${baseUrl}/api/keys/${adminCheck}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setAccessKeys(data);
      } catch (error) {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");
        localStorage.removeItem("isAdmin");
        navigate("/");
        toast.error(error.response.data.message);
      }
    };
    getAccessKeys();
  }, [navigate, accessKeys]);

  return (
    <>
      {accessKeys.length > 0 ? (
        <main>
          {accessKeys.map((accessKey) => (
            <AccessKey key={accessKey._id} keys={accessKey} />
          ))}
        </main>
      ) : (
        <h4>You do not have any Access Keys at the moment</h4>
      )}
    </>
  );
};

export default AccessKeys;
