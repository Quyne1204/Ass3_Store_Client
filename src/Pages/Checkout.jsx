import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectUser } from "./Store";
import { Link } from "react-router-dom";
import { UserContext } from "../context/context";

function Checkout() {
  const { user } = useContext(UserContext);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  // console.log(user)
  const [total, setTotal] = useState(0);

  function Sum() {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].total;
    }
    setTotal(totalPrice);
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(()=>{
    setName(user.info.fullName ? user.info.fullName : '');
    setEmail(user.info.email ? user.info.email : '');
    setAddress(user.info.address ? user.info.address : '');
    setPhone(user.info.phoneNumber ? user.info.phoneNumber : '');
  },[user]);
  
  const [success, setSuccess] = useState("");
  const [errorName, setErrorName] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [errorAddress, setErrorAddress] = useState();
  const [errorPhone, setErrorPhone] = useState();

  console.log(cart);

  function Checkout() {
    if (phone.length != 0) {
      setErrorPhone("");
    } else {
      setErrorPhone("Bạn hãy nhập Number Phone");
    }
    if (address.length != 0) {
      setErrorAddress("");
    } else {
      setErrorAddress("Bạn hãy nhập Address");
    }

    if (email.length != 0) {
      setErrorEmail("");
    } else {
      setErrorEmail("Bạn hãy nhập Email");
    }
    if (name.length != 0) {
      setErrorName("");
    } else {
      setErrorName("Bạn hãy nhập Họ và Tên");
    }

    const newCart = cart.map((item) => {
      return {
        _id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.count,
        total: item.total,
        img: item.product.img1
      }
    });

    if (name != "" && email != "" && address != "" && phone != "") {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "id": user.info._id,
        "fullName": name,
        "email": email,
        "phone": phone,
        "address": address,
        "cart": newCart,
        "total": total
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      fetch("https://ass3-store-server.onrender.com/order/checkout", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.message) {
            setSuccess(result.message);
            dispatch({ type: "CHECK_OUT" });
          }
        })
        .catch((error) => console.error(error));

    }
  }

  useEffect(() => {
    Sum();
  }, [cart, user]);

  return (
    <div className="container mb-5">
      <div className=" d-flex justify-content-between banner-shop">
        <p className="text-uppercase ps-5 ms-5 pt-5 fs-1 fw-semibold">Banner</p>
        <p className="text-uppercase p-5 m-2 fs-4 fw-semibold">
          <Link className="me-2 ms-2 text-decoration-none text-dark" to="/">
            Home
          </Link>
          /
          <Link className="me-2 ms-2 text-decoration-none text-dark" to="/cart">
            Cart
          </Link>
          /
          <Link
            className="me-2 ms-2 text-secondary text-decoration-none"
            to="/checkout"
          >
            Checkout
          </Link>
        </p>
      </div>
      <div>
        <div className="mt-3">
          <p className="text-uppercase fs-3 fw-semibold">BILLING DETAILS</p>
        </div>
        <div className="row">
          <div className="col-7">
            <div >
              <div className="text-uppercase mb-4">
                <label className="fs-5 d-block mb-2">full name: </label>
                <input
                  className="d-block w-100 ps-3 p-2 fs-5"
                  placeholder="Enter Your Full Name Here!"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                {errorName && <p className=" text-danger">{errorName}</p>}
              </div>
              <div className="text-uppercase mb-4">
                <label className="fs-5 d-block mb-2">EMAIL: </label>
                <input
                  className="d-block w-100 ps-3 p-2 fs-5"
                  placeholder="Enter Your Email Here!"
                  type="text"
                  defaultValue={user.info.email ? user.info.email : ''}
                  onChange={e => setEmail(e.target.value)}
                />
                {errorEmail && <p className=" text-danger">{errorEmail}</p>}
              </div>
              <div className="text-uppercase mb-4">
                <label className="fs-5 d-block mb-2">phone number: </label>
                <input
                  className="d-block w-100 ps-3 p-2 fs-5"
                  placeholder="Enter Your Phone Number Here!"
                  type="number"
                  min="10"
                  defaultValue={user.info.phoneNumber ? user.info.phoneNumber : ''}
                  onChange={e => setPhone(e.target.value)}
                />
                {errorPhone && <p className=" text-danger">{errorPhone}</p>}
              </div>
              <div className="text-uppercase mb-4">
                <label className="fs-5 d-block mb-2">Address: </label>
                <input
                  className="d-block w-100 ps-3 p-2 fs-5"
                  placeholder="Enter Your Address Here!"
                  type="text"
                  defaultValue={user.info.address ? user.info.address : ''}
                  onChange={e => setAddress(e.target.value)}
                />
                {errorAddress && <p className=" text-danger">{errorAddress}</p>}

              </div>
              <div className="text-uppercase mb-4">
                {!success ? (<button
                  className="btn bg-dark border-0 text-light ps-4 pe-4 p-2 fs-4"
                  type="submit"
                  onClick={Checkout}
                >
                  Place Order
                </button>) : (
                  <p className="fs-4 fw-semibold mb-4 m-0">{success}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-5 bg-total p-5">
            <div>
              <p className="fs-4 fw-semibold mb-4 m-0">YOUR ORDER</p>
              {cart.map((item) => (
                <div
                  key={item.product.name}
                  className="fw-semibold mb-2 pb-2 m-0 text-secondary d-flex justify-content-between br "
                >
                  <span className="text-dark checkout-name">
                    {item.product.name}
                  </span>
                  <div>
                    <span>{item.total.toLocaleString("vi-VN")}</span>
                    VND x <span>{item.count}</span>
                  </div>
                </div>
              ))}
              <div className="fw-semibold mb-2 m-0 text-secondary d-flex justify-content-between">
                <span className="text-dark fs-4">TOTAL</span>
                <div>
                  <span className="fs-4">
                    {total.toLocaleString("vi-VN")} VND
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
