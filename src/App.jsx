import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Deashboard";
import Products from "./pages/ProductList";
import AllOrder from "./pages/Order";
import Customers from "./pages/Customers";
import Inveentory from "./pages/inveentory";
import Analytics from "./pages/Analytics";
import Revenue from "./pages/revenue";
import Shipping from "./pages/Shipping";
import Login from "./pages/Login";
import Regestore from "./pages/Regestor";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import SellerProfile from "./pages/profile";
import NotificationShowPage from "./pages/NotificationShowPage";
 


const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
       <ToastContainer/>
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 overflow-y-auto">
             <div className="flex-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<AllOrder />} />
           {/* // <Route path="/customer" element={<Customers/>} /> */}
            <Route path="/inventory" element={<Inveentory />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/shipping" element={<Shipping />} />
             <Route path="/login" element={< Login/>}/>
            <Route path="/register" element={<Regestore/>}/>
             <Route path="/profile" element={<SellerProfile/>}/>
             <Route path= "/notification" element={<NotificationShowPage/>}/>
 
  
          </Routes>
        </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
