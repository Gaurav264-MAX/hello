import React, { useState } from "react";
import { signInWithGoogle } from "./firebase.js";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSuccessfulSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      localStorage.setItem('userId', user.uid);

      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
  
      if (onSuccessfulSignup) {
        onSuccessfulSignup();
      }
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error("wrong email or password", {
        position: "bottom-center",
      });
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithGoogle();
      if (result && result.user) {
        localStorage.setItem('userId', result.user.uid);
        
        toast.success("Successfully signed in with Google", {
          position: "top-center",
        });

        if (onSuccessfulSignup) {
          onSuccessfulSignup();
        }
        navigate("/");
      }
    } catch (error) {
      toast.error("Error signing in with Google", {
        position: "bottom-center",
      });
    }
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button className="form-btn">Log in</button>
        </form>
        <p className="sign-up-label">
          Don't have an account?
          <Link to="/register" className="sign-up-link">Register</Link>
        </p>
        <div className="buttons-container">
          <div className="apple-login-button">
            <span>Log in with Apple</span>
          </div>
          <GoogleLoginButton onClick={handleGoogleSignIn}>
            <span>Sign Up with Google</span>
          </GoogleLoginButton>
        </div>
      </div>
    </StyledWrapper>
  );
};
const GoogleLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #4285F4;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background-color: #357ae8;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  .form-container {
    width: 350px;
    height: 500px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
    padding: 20px 30px;
  }
  .title {
    text-align: center;
    font-size: 28px;
    font-weight: 800;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .input {
    border-radius: 20px;
    border: 1px solid #c0c0c0;
    padding: 12px 15px;
  }
  .form-btn {
    padding: 10px 15px;
    border-radius: 20px;
    background: teal;
    color: white;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .apple-login-button,
  .google-login-button {
    border-radius: 20px;
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    gap: 5px;
  }
  .apple-login-button {
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
  }
  .google-login-button {
    border: 2px solid #747474;
  }
`;

export default Signup;