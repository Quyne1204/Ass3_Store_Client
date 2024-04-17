import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectUser } from "../Pages/Store";
import { UserContext } from "../context/context";

function Header() {
  const navigate = useNavigate();

  const { user, logout } = useContext(UserContext);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  function navigateHome() {
    navigate("/");
  }
  function navigateShop() {
    navigate("/shop");
  }
  function navigateCart() {
    navigate("/cart");
  }
  function navigateLogin() {
    navigate("/login");
  }

  const [isChat, setIsChat] = useState(false);
  function Chat() {
    setIsChat(!isChat);
  }

  return (
    <div className="container d-flex justify-content-between  pt-3 pb-3  ">
      <ul className="mt-2 m-0 p-0">
        <button className="border-0 fs-5 me-3 bg-white" onClick={navigateHome}>
          Home
        </button>
        <button className="border-0 fs-5 bg-white" onClick={navigateShop}>
          Shop
        </button>
      </ul>
      <div>
        <p className="fs-2 m-0">BOUTIQUE</p>
      </div>
      <ul className="mt-2 m-0 p-0 d-flex">
        <button
          className="border-0 fs-5 me-3 bg-white"
          style={{ maxHeight: "32px" }}
          onClick={navigateCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="0.8em"
            viewBox="0 0 576 512"
            className="me-1"
            fill="#8c929b"
          >
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>
          Cart
          {cart.length > 0 && <span className="ms-1">- {cart.length} </span>}
        </button>

        {user.auth === true ? (
          <div className="">
            <button className="border-0 fs-5 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="0.8em"
                viewBox="0 0 448 512"
                className="me-1 "
                fill="#8c929b"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              <NavLink className="text-black text-decoration-none" to="/order/history">
                <button className="border-0 fs-5 bg-white">
                  {user.info.username == '' ? 'Xin chào bạn' : 'Xin chào, ' + user.info.fullName}
                </button>
              </NavLink>
            </button>
            <button
              className="border-0 fs-5 bg-white"
              onClick={logout}
            >
              (Logout)
            </button>
          </div>
        ) : (
          <button
            className="border-0 fs-5 bg-white"
            style={{ maxHeight: "32px" }}
            onClick={navigateLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="0.8em"
              viewBox="0 0 448 512"
              className="me-1 "
              fill="#8c929b"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            Login
          </button>
        )}
      </ul>
      {isChat && (
        <div className="chat">
          <ul class="list-group">
            <li class="list-group-item active" aria-current="true">
              <p className="m-0 fw-semibold">Customer Support</p>
            </li>
            <div className="p-4">
              <div className="float-end mb-3 col-9 d-grid justify-content-end ">
                <p className="text-light bg-primary  p-2 rounded d-block">
                  Xin Chào
                </p>
                <p className="text-light bg-primary  p-2  rounded d-block">
                  Làm thế nào để xem các sản phẩm
                </p>
              </div>
              <div className="float-left mt-5 pt-5 col-8 ">
                <p className="text-light bg-secondary  p-2 rounded mt-3 ">
                  ADMIN: Chào bạn
                </p>
                <p className="text-light bg-secondary  p-2 rounded d-block">
                  ADMIN: Bạn có thể vào <strong>Shop</strong> để xem các sản
                  phẩm
                </p>
              </div>
            </div>
            <div className=" ps-4 pe-4 mb-3">
              <input
                className="ps-3 p-2 border-0 bg-light col-8 rounded"
                type="text"
                placeholder="Enter..."
              />
              <button className="btn   bg-primary p-2 col-4 fw-semibold text-light">
                Gửi
              </button>
            </div>
          </ul>
        </div>
      )}
      <div className="live-chat">
        <button
          className="border-0 bg-white rounded-circle"
          onClick={() => Chat()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2.5em"
            viewBox="0 0 512 512"
          >
            <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Header;
