import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "./Store";
import { Link } from "react-router-dom";
import { UserContext } from "../context/context";

function Cart() {
  const {user} = useContext(UserContext);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  function Sum() {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].total;
    }
    setTotal(totalPrice);
  }

  function inc(name) {
    dispatch({ type: "INC", name: name });
  }
  function dec(name) {
    dispatch({ type: "DEC", name: name });
  }
  function del(id) {
    dispatch({ type: "DELETE_CART", _id: id });
  }

  function formatPrice(number) {
    // Tạo một danh sách các đơn vị số từ chuỗi số
    const units = [];
    let tempStr = number;
    while (tempStr.length > 3) {
      units.unshift(tempStr.slice(-3));
      tempStr = tempStr.slice(0, -3);
    }
    units.unshift(tempStr);

    // Thêm dấu chấm ngăn cách giữa các đơn vị
    const formattedPrice = units.join(".");

    return formattedPrice;
  }

  useEffect(() => {
    Sum();
  }, [cart]);
  return (
    <div className="container mb-5">
      <div>
        <p className="text-uppercase fs-2">Shopping Cart</p>
      </div>
      <div className="row">
        <div className="col-9">
          <table className="table">
            <thead className="table-secondary ">
              <tr className="text-uppercase ">
                <th>Image</th>
                <th>Product</th>
                <th>price</th>
                <th>quanlity</th>
                <th>total</th>
                <th>remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item, index = 0) => (
                  <tr key={index + 1}>
                    <td className="col-1">
                      <img
                        className="img-fluid"
                        src={item.product.img1}
                        alt=""
                      />
                    </td>
                    <td className="col-3 fw-semibold fs-5">
                      {item.product.name}
                    </td>
                    <td className="col-1 fs-5 text-center text-secondary">
                      {formatPrice(item.product.price)} VND
                    </td>
                    <td className="col-1 text-center pt-3">
                      <button
                        className="btn bg-white border-0"
                        onClick={() => dec(item.product.name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1.7em"
                          viewBox="0 0 256 512"
                          fill="#000000"
                          className="mb-2"
                        >
                          <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="border-0 input-count bg-white fw-semibold text-dark"
                        value={item.count}
                        disabled
                        min="1"
                      />
                      <button
                        className="btn bg-white border-0"
                        onClick={() => inc(item.product.name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1.7em"
                          viewBox="0 0 256 512"
                          fill="#050505"
                          className="mb-2"
                        >
                          <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                        </svg>
                      </button>
                    </td>
                    <td className="col-1 fs-5 text-center text-secondary">
                      <input
                        type="text"
                        className="border-0 text-secondary text-center m-0 input-total bg-white "
                        value={item.total.toLocaleString("vi-VN")}
                        disabled
                        min="1"
                      />
                      VND
                    </td>
                    <td className="col-1 text-center">
                      <button
                        className="mt-4 border-0 bg-white"
                        onClick={() => del(item.product._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="2em"
                          viewBox="0 0 448 512"
                          className=""
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <div>
                  <p className="fs-3 text-danger fw-bold">
                    Bạn chưa thêm sản phẩm nào!
                  </p>
                </div>
              )}
            </tbody>
          </table>
          <div className="checkout p-5 pt-4 pb-4 d-flex justify-content-between ">
            <Link
              to="/shop"
              className="text-decoration-none fw-semibold text-dark"
            >
              <span>
                <svg
                  className="me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
                </svg>
                Continue Shopping
              </span>
            </Link>
            {cart.length > 0 && user.auth==true  ?(
              <Link
                to="/checkout"
                className="text-decoration-none fw-semibold p-2 ps-3 pe-3 border-dark border text-dark "
              >
                Proceed to checkout
                <svg
                  className="ms-2"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
                </svg>
              </Link>
            ):(
              <p className="text-decoration-none fw-semibold p-2 ps-3 pe-3 border-dark border text-danger m-0">Bạn cần phải đăng nhập để đặt được hàng</p>
            )}
          </div>
        </div>
        <div className="col-3">
          <div className="bg-total pt-5 ps-4 pe-4 pb-5">
            <div>
              <p className="fs-4 fw-semibold mb-4 m-0">CART TOTAL</p>
              <p className="fw-semibold mb-2 pb-2 m-0 border-bottom border-secondary d-flex justify-content-between text-secondary">
                <span className="text-dark">SUBTOTAL</span>
                <div>
                  <input
                    className="input-total-sum border-0 text-secondary fw-semibold"
                    value={total.toLocaleString("vi-VN")}
                    disabled
                    // onChange={totalHanlder}
                    type="text"
                  />
                  VND
                </div>
              </p>
              <p className="fw-semibold mb-2 m-0 text-secondary d-flex justify-content-between">
                <span className="text-dark">TOTAL</span>
                <div>
                  <input
                    className="input-total-sum border-0 text-secondary fw-semibold"
                    value={total.toLocaleString("vi-VN")}
                    disabled
                    type="text"
                  />
                  VND
                </div>
              </p>
            </div>
            <div className="mt-4">
              <input
                className="w-100 border-0 ps-3 p-2"
                type="text"
                placeholder="Enter your copon"
              />
              <button className="btn w-100 bg-dark text-white p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.3em"
                  viewBox="0 0 512 512"
                  fill="#ffffff"
                >
                  <path d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z" />
                </svg>
                <span className="ms-1">Apply coupon</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
