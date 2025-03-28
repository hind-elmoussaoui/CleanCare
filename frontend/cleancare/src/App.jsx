import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import BookingForm from "./pages/BookingForm";
import Navbar from "./components/Navbar";
import ContactForm from "./pages/ContactForm";
import Footer from "./components/Footer";
import PricingSection from "./components/PricingSection";
import Avis from "./pages/Avis";
import Dash from "./pages/Dash";
import Login from "./components/Login";
import ServicesPage from "./pages/ServicesPage";
import PrivateRoute from "./components/PrivateRoute";
import Messages from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./pages/OrderForm";
import ConfirmationPage from "./pages/ConfirmationPage";
import OrderDashboard from "./components/OrderDashboard";
import Users from "./components/Users";
import AdminProviders from "./components/AdminProviders";
import SignIn from "./pages/SignIn";
import LoginProvider from "./components/LoginProvider";
import ProviderDashboard from "./components/ProviderDashboard";
import ClientDashboard from "./components/ClientDashboard";
import SignUp from "./components/SignUp";
import Interface from "./components/LoginPage";
import ProviderInterface from "./pages/ProviderInterface";
import ClientInterface from "./pages/ClientInterface";
// import SignUp from "./components/SignUp";

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
    "/login/admin",
    "/admin/services",
    "/admin/messages",
    "/admin/profile",
    "/admin/orders",
    "/admin/add",
    "/",
    "/register",
    "/services/:id",
    "/login",
    "/admin/users"
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
          <Route path="/services" element={<><Services /><PricingSection /></>} />
          <Route path="/commande" element={<OrderPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/reservation" element={<BookingForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/avis" element={<Avis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/ClientInterface" element={<ClientInterface />} />
          <Route path="/ProviderInterface" element={<ProviderInterface />} />
          <Route 
  path="/Interface" 
  element={
    localStorage.getItem('token') ? (
      // Vérifier le type d'utilisateur
      JSON.parse(localStorage.getItem('userData'))?.role === 'provider' ? (
        <ProviderInterface 
          userData={location.state?.userData || JSON.parse(localStorage.getItem('userData'))} 
        />
      ) : (
        <ClientInterface 
          userData={location.state?.userData || JSON.parse(localStorage.getItem('userData'))} 
        />
      )
    ) : (
      <Navigate to="/LoginPage" />
    )
  } 
/>
          {/* <Route path="/interface" element={ isAuthenticated ? <Interface userType={userType} /> : <Navigate to="/signin" /> } />
          <Route path="/" element={ isAuthenticated ? <Navigate to="/interface" /> : <Navigate to="/signin" /> } /> */}

{/* <Route path="/signup-prestataire" element={<SignUpPrestataire />} /> */}
          {/* <Route path="/signup" element={<SignUp />} /> */}

          {/* Routes du tableau de bord */}
          <Route path="/login/admin" element={<PrivateRoute><Dash /></PrivateRoute>} />
          <Route path="/admin/services" element={<PrivateRoute><ServicesPage /></PrivateRoute>} />
          <Route path="/admin/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/admin/profile" element={<ProfilePage />} />
          <Route path="/admin/orders" element={<OrderDashboard />} />
          <Route path="/admin/add" element={<AdminProviders />} />
          <Route path="/loginProvider" element={<LoginProvider />} />
          <Route path="/dashboard" element={<ProviderDashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;