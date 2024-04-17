import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../Store";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";

function SignIn() {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  console.log(user);
  const dispatch = useDispatch();

  const emailHandler = (event) => {
    if (event.target.value.length != 0) {
      setEmail(event.target.value);
      setErrorEmail("");
    } else {
      setErrorEmail("Bạn hãy nhập Email");
    }
  };
  const passHandler = (event) => {
    if (event.target.value.length > 8) {
      setPassword(event.target.value);
      setErrorPassword("");
    } else if (event.target.value.length <= 8) {
      setPassword(event.target.value);
      setErrorPassword("Password gồm 8 ký tự trở lên");
    } else if (event.target.value.length <= 0) {
      setPassword(event.target.value);
      setErrorPassword("Bạn hãy nhập Password");
    }
  };

  function loginSubmit(event) {
    event.preventDefault();
    const userArr = JSON.parse(localStorage.getItem("user"));

    if (email == "") {
      setErrorEmail("Bạn hãy nhập Email");
    }
    if (password == "") {
      setErrorPassword("Bạn hãy nhập Password");
    }
    if (email != "" && password.length > 8) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        "email": email,
        "password": password
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(`http://localhost:5000/auth/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.accessToken) {
            let expires = new Date();
            expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // Thêm 1 ngày tính bằng mili giây
            setCookie('token', result.accessToken, { path: '/', expires });
            navigate('/');
          }
          setError(result.message);
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <div className="banner-login">
      <div className="container d-flex justify-content-center">
        <div className="mt-5 col-6 bg-light shadow-lg p-3 mb-5 rounded">
          <p className="fs-1 fw-lighter text-center   ">Sign Up</p>
          <div className="d-flex  justify-content-center">
            <form className="col-9 mt-3 mb-5" onSubmit={loginSubmit}>
              <input
                className="w-100 ps-4 p-3"
                placeholder="Email"
                type="text"
                value={email}
                onChange={emailHandler}
              />
              {errorEmail && <p className="p-2 text-danger">{errorEmail}</p>}
              <input
                className="w-100 ps-4 p-3"
                placeholder="Password"
                type="password"
                onChange={passHandler}
                value={password}
              />
              {errorPassword && (
                <p className="p-2 text-danger">{errorPassword}</p>
              )}
              {error && <p className="p-2 text-danger">{error}</p>}
              <button
                type="submit"
                className="btn bg-dark text-light w-100 p-3 mt-3"
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="text-center">
            <p>
              Create an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
