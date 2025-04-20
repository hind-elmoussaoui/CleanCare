import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/CleanCare/Home";
import Services from "./pages/CleanCare/Services";
import ServiceDetails from "./pages/CleanCare/ServiceDetails";
import BookingForm from "./pages/CleanCare/BookingForm";
import Navbar from "./components/CleanCare/Navbar";
import ContactForm from "./pages/CleanCare/ContactForm";
import Footer from "./components/CleanCare/Footer";
import PricingSection from "./components/CleanCare/PricingSection";
import Avis from "./pages/CleanCare/Avis";
import Dash from "./pages/Dashboard/Dash";
import ServicesPage from "./pages/Dashboard/ServicesPageDash";
import Messages from "./pages/Dashboard/MessagesPage";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import OrderPage from "./pages/CleanCare/OrderForm";
import ConfirmationPage from "./pages/CleanCare/ConfirmationPage";
import OrderDashboard from "./components/Dashboard/OrderDashboard";
import Users from "./components/Dashboard/Users";
import GestionAvis from "./components/Dashboard/GestionAvis";
import SignIn from "./components/SignIn";
import ProviderDashboard from "./components/Dashboard/ProviderDashboard";
import ClientDashboard from "./components/Dashboard/ClientDashboard";
import SignUp from "./components/SignUp";
import UserInterface from "./pages/CleanCare/UserInterface";
import MoreInfo from './components/CleanCare/MoreInfo';
import AboutDetails from "./components/CleanCare/AboutDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import ServiceDetail from "./components/CleanCare/ServicesDetails";
import ServicesCarousel from "./components/CleanCare/ServicesCarousel";


function App() {

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Liste des routes où la Navbar et le Footer ne doivent pas être affichés
  const noNavbarFooterRoutes = [
    "/admin/dashboard/services",
    "/admin/dashboard/messages",
    "/admin/dashboard/profile",
    "/admin/dashboard/orders",
    "/admin/dashboard/avis",
    "/admin/dashboard/provider-dashboard",
    "/",
    "/services/:id",
    "/admin/dashboard/users",
    "/admin/dashboard",
    "/user/dashboard"
  ];

  // Vérifie si la route actuelle est dans la liste des routes sans Navbar et Footer
  const shouldShowNavbar = !noNavbarFooterRoutes.includes(location.pathname);
  const shouldShowFooter = !noNavbarFooterRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<><Home /><Footer/></>} />
          <Route path="/en-savoir-plus" element={<MoreInfo />} />
          <Route path="/details" element={<AboutDetails />} />
          <Route path="/services" element={<><Services /><PricingSection /></>} />
          <Route path="/commande" element={<OrderPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/reservation" element={<BookingForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/avis" element={<Avis />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/dashboard" element={ <ProtectedRoute allowedRoles={['client', 'provider']}> <UserInterface /> </ProtectedRoute> } />
          <Route path="/service" element={<ServicesCarousel />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          

          {/* Routes du tableau de bord */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dash /></ProtectedRoute>} />
          <Route path="/admin/dashboard/services" element={<ServicesPage />} />
          <Route path="/admin/dashboard/messages" element={<Messages />} />
          <Route path="/admin/dashboard/profile" element={<ProfilePage />} />
          <Route path="/admin/dashboard/orders" element={<OrderDashboard />} />
          <Route path="/admin/dashboard/avis" element={<GestionAvis />} />
          <Route path="/admin/dashboard/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/admin/dashboard/client-dashboard" element={<ClientDashboard />} />
          <Route path="/admin/dashboard/users" element={<Users />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;