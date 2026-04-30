import { useState } from "react";
import axios from "axios";
import "./css/style.css";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "./Urls";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/login`,{email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data); // ✅ debug

      alert(res.data.message);

      // ✅ redirect after success
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <div className="header">
        <img src="/logo.png" alt="Tira Logo" />
      </div>

      <div className="login-container">
        <div className="top-section">
          <h1 className="logo">tira</h1>
          <p>Authentic global & homegrown brands</p>
        </div>

        <div className="login">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p>
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;