import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./Register.css"; // ✅ Import the CSS file
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone,setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Phone: phone,
          photo: "",
        });
        await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
                phone: phone,
                password: password,
            }),
          });
      }
      toast.success("User Registered Successfully!!", {
        position: "top-center",
        Navigate: "/",
      });
    setTimeout(() => {
        navigate("/"); // Go to home page
      }, 1500);
    }catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn" >
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/signup">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
