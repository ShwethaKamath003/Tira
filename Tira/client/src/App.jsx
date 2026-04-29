import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import LoginAdmin from "./pages/LoginAdmin";
import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import ManageUser from "./pages/ManageUser";
import SingleProduct from "./pages/SingleProduct";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ManageOrders from "./pages/ManageOrders";
function App()
{
  return(
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup />} />
     <Route path="/adminlogin" element={<LoginAdmin/>} />
     <Route path="/adminpanel" element={<AdminPanel/>}/>
     <Route path="/admindashboard" element={<AdminDashboard/>}/>
     <Route path="/addproduct" element={<AddProduct/>}/>
    <Route path="/viewproduct" element={<ViewProduct/>}/>
    <Route path="/manageproducts" element={<ManageProducts/>}/>
    <Route path="/editproduct/:id" element={<EditProduct />} />
    <Route path="/manageuser" element={<ManageUser/>}/>
   <Route path="/product/:id" element={<SingleProduct />} />
    <Route path="/category/:category" element={<CategoryPage/>}/>
    <Route path="/cart/" element={<Cart/>}/>
    <Route path="/checkout" element={<Checkout/>}/>
     <Route path="/manageorders" element={<ManageOrders/>}/>
    </Routes>
      </BrowserRouter>
  );
}
export default App;
