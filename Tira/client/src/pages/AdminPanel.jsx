import {Routes, Route } from "react-router-dom";
import LoginAdmin from "./LoginAdmin";
import "../css/AddProduct.css";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
function AdminPanel() {
  return (
      <Routes>

        <Route path="adminlogin" element={<LoginAdmin />} />
        <Route path="adminpanel" element={<AdminPanel />} />
        <Route path="admindashboard" element={<AdminDashboard/>}/>
         <Route path="viewproduct" element={<ViewProduct/>}/>
      </Routes>
  );
}

export default AdminPanel;
