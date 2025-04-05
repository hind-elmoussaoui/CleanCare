import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import Login from "./components/Login";
import ServicesPage from "./pages/Dashboard/ServicesPageDash";
import PrivateRoute from "./components/Dashboard/PrivateRoute";
import Messages from "./pages/Dashboard/MessagesPage";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import OrderPage from "./pages/CleanCare/OrderForm";
import ConfirmationPage from "./pages/CleanCare/ConfirmationPage";
import OrderDashboard from "./components/Dashboard/OrderDashboard";
import Users from "./components/Dashboard/Users";
import AdminProviders from "./components/Dashboard/AdminProviders";
import SignIn from "./pages/SignIn";
import LoginProvider from "./components/LoginProvider";
import ProviderDashboard from "./components/Dashboard/ProviderDashboard";
import ClientDashboard from "./components/Dashboard/ClientDashboard";
import SignUp from "./components/SignUp";
import Interface from "./components/LoginPage";
import ProviderInterface from "./pages/CleanCare/ProviderInterface";
import ClientInterface from "./pages/CleanCare/ClientInterface";
import MoreInfo from './components/CleanCare/MoreInfo';
import AboutDetails from "./components/CleanCare/AboutDetails";
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
    "/admin/users",
    "/admin"
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
          <Route path="/login" element={<Login />} />
          <Route path="/login/admin" element={<PrivateRoute><Dash /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><Dash /></PrivateRoute>} />
          <Route path="/admin/services" element={<PrivateRoute><ServicesPage /></PrivateRoute>} />
          <Route path="/admin/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/admin/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/admin/orders" element={<PrivateRoute><OrderDashboard /></PrivateRoute>} />
          <Route path="/admin/add" element={<PrivateRoute><AdminProviders /></PrivateRoute>} />
          <Route path="/loginProvider" element={<LoginProvider />} />
          <Route path="/dashboard" element={<PrivateRoute><ProviderDashboard /></PrivateRoute>} />
          <Route path="/client-dashboard" element={<PrivateRoute><ClientDashboard /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;