import React from "react";
import {Link} from "react-router-dom";
import "../css/AdminDashboard.css";
function AdminDashboard()
{
    return(
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
           <div className="dashboard-container">
           <Link to="/addproduct" className="card">
           <h3>Add Product</h3>
           </Link>  
           <Link to="/viewproduct" className="card">
           <h3>View Product</h3></Link>      
           <Link to="/manageproducts" className="card">
           <h3>Manage Product</h3></Link> 
           <Link to="/manageorders" className="card">
           <h3>Manage Orders</h3></Link> 
            </div> 
        </div>
    );
}
export default AdminDashboard;
