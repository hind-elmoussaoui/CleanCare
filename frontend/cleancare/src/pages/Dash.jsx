import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterDash from "../components/FooterDash";
import NavDash from "../components/NavDash";
import StatistiqueDash from "../components/StatistiqueDash";
// Import des icônes

function Dash() {
  const navigate = useNavigate();

  useEffect(() => {
    const password = localStorage.getItem("adminPassword");
    if (!password || password !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col">
      
      <div className="sticky flex">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-100 z-10">
        <NavDash />
        <StatistiqueDash />
        </div>
        
      </div>
      <FooterDash />
    </div>
  );
}

export default Dash;