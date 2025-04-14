import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; 
import Navbar from "./NavDash";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Fixe */}
      <Sidebar />

      {/* Contenu Principal */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Contenu Dynamique */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}