import Sidebar from "../../components/Dashboard/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterDash from "../../components/Dashboard/FooterDash";
import NavDash from "../../components/Dashboard/NavDash";
import StatistiqueDash from "../../components/Dashboard/StatistiqueDash";
// Import des icônes

function Dash() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    console.log("Token:", token);
    console.log("User Type:", userType);

    if (!token || !userType) {
      navigate("/signin");
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