import { useState, useEffect } from "react";
import axios from "axios";
import AccessKey from "./AccessKey";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AccessKey.module.css";

const AccessKeys = () => {
  const [accessKeys, setAccessKeys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessKeys = async () => {
      try {
        let token = localStorage.getItem("auth");
        console.log(token);
        const response = await axios.get(
          "http://localhost:5000/api/keys/user",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setAccessKeys(response.data);

        console.log(accessKeys);
      } catch (error) {
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
            <AccessKey key={accessKey._id} acesskey={accessKey} />
          ))}
        </main>
      ) : (
        <h4>You do not have any Access Keys at the moment</h4>
      )}
    </>
  );
};

export default AccessKeys;
