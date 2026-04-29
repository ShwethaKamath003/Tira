import { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../css/styles.css";

function LoginAdmin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "123456") {
      alert("Admin Login Successful");
    navigate("/admindashboard");   
    }
    else {
      alert("Invalid Admin");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onclick={handleLogin}>Login</button>

      </form>
    </div>
  );
}

export default LoginAdmin;