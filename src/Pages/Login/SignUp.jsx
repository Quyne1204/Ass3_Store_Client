import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const nameHandler = (event) => {
    if (event.target.value.length != 0) {
      setName(event.target.value);
      setErrorName("");
    } else {
      setErrorName("Bạn hãy nhập Họ và Tên");
    }
  };
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
      setErrorPassword("Password phải từ 8 ký tự trở lên");
    } else if (event.target.value.length <= 0) {
      setErrorPassword("Bạn hãy nhập Password");
    }
  };
  const phoneHandler = (event) => {
    if (event.target.value.length > 0) {
      setPhone(event.target.value);
      setErrorPhone("");
    } else if (event.target.value.length <= 0) {
      setErrorPhone("Bạn hãy nhập số điện thoại");
    }
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (name == "") {
      setErrorName("Bạn hãy nhập Họ và Tên");
    }
    if (email == "") {
      setErrorEmail("Bạn hãy nhập Email");
    }
    if (password == "") {
      setErrorPassword("Bạn hãy nhập Password");
    }
    if (phone == "") {
      setErrorPhone("Bạn hãy nhập số điện thoại");
    }

    if (name != "" && email != "" && password.length > 8 && phone != "") {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        "fullName": name,
        "email": email,
        "phoneNumber": phone,
        "password": password
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("https://ass3-store-server.onrender.com/auth/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            setError(result.error);
          } else {
            setError("");
          }
          setSuccess(result.message);

        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="banner-login">
      <div className="container d-flex justify-content-center">
        <div className="mt-5 col-6 bg-light shadow-lg p-3 mb-5 rounded">
          <p className="fs-1 fw-lighter text-center   ">Sign Up</p>
          <div className="d-flex  justify-content-center">
            <form className="col-9 mt-3 mb-5" onSubmit={handlerSubmit}>
              <input
                className="w-100 ps-4 p-3"
                placeholder="Full Name"
                type="text"
                onChange={nameHandler}
              />
              {errorName && <p className="p-2 text-danger">{errorName}</p>}
              {error && error.username && <p className="p-2 text-danger">{error.username}</p>}
              <input
                className="w-100 ps-4 p-3"
                placeholder="Email"
                type="text"
                onChange={emailHandler}
              />
              {errorEmail && <p className="p-2 text-danger">{errorEmail}</p>}
              {error && error.email && <p className="p-2 text-danger">{error.email}</p>}
              <input
                className="w-100 ps-4 p-3"
                placeholder="Password"
                type="text"
                onChange={passHandler}
              />
              {errorPassword && (
                <p className="p-2 text-danger">{errorPassword}</p>
              )}
              <input
                className="w-100 ps-4 p-3"
                placeholder="Phone"
                type="number"
                onChange={phoneHandler}
              />
              {errorPhone && <p className="p-2 text-danger">{errorPhone}</p>}
              {error && error.phone && <p className="p-2 text-danger">{error.phone}</p>}

              {success && <p className="p-2 text-danger">{success}</p>}
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
              Login?{" "}
              <Link className="text-decoration-none" to="/login">
                Click
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
