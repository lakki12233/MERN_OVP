import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./register.scss";
import poster from "./poster.png"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const phoneRef = useRef();


  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    setPhone(phoneRef.current.value);
    try {
      await axios.post("auth/register", { email,username, password, phone });
      history.push("/login");
    } catch (err) {
      console.error(err)
    }
  };


  const navigateToLogin = () => {
    try{
    history.push("/login");
    }
    catch(err){}
  };


  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src={poster}
            alt=""
          />

          <Link to="/login" className="loginButton">
          Sign In
        </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <p>
          Ready to watch? Enter your email to create 
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <input type="phone" placeholder="phone.no" ref={phoneRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}