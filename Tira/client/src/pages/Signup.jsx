import { useState } from "react";
import axios from "axios";
import "../css/style.css";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [agree, setAgree] = useState(false);
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !mobile) {
      alert("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Enter valid 10 digit number");
      return;
    }

    if (!agree) {
      alert("Please accept terms");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/register", {
        email,
        phone: mobile,
        password,
      });

      alert(res.data.message);
    } catch (err) {
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
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="+91 | Enter Phone Number"
              value={mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) setMobile(value);
              }}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="checkbox">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label>
                I agree to Terms of Use and Privacy Policy
              </label>
            </div>

            <button type="submit">Register</button>
          </form>

          {/* switch to login */}
          <p>
            Already have an account?{" "}
            <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;