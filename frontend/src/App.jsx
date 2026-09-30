import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Menu from "./components/menu";
import About from "./components/about";
import Gallery from "./components/gallery";
import Reviews from "./components/reviews";
import Contact from "./components/contact";
import Order from "./components/order";
import AdminOrders from "./components/adminorder.jsx";
import AdminLogin from "./components/adminlogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute.jsx";
import OrderTracking from "./components/ordertracking";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Menu />
      <About />
      <Gallery />
      <Reviews />
      <Contact />
      <Order />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Customer Website */}
        <Route path="/" element={<Home />} />

        {/* Customer Order Tracking */}
        <Route
          path="/track-order"
          element={<OrderTracking />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;