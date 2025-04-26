// components/Toast.js
import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
      type === "success" 
        ? "bg-green-100 text-green-800 border-l-4 border-green-500" 
        : "bg-red-100 text-red-800 border-l-4 border-red-500"
    }`}>
      <div className="mr-3">
        {type === "success" ? (
          <FaCheckCircle className="text-xl" />
        ) : (
          <FaTimesCircle className="text-xl" />
        )}
      </div>
      <div>
        <p className="font-semibold">{type === "success" ? "Succès" : "Erreur"}</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;