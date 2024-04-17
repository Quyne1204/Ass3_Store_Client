import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/context";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";

function History() {
  const [data, setData] = useState();
  const { user } = useContext(UserContext);

  const HandleData = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`https://ass3-store-server.onrender.com/order/history/${user.info._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  }, [user]);

  useEffect(() => {
    if (user && user.info && user.info._id) {
      HandleData();
    }
  }, [user, HandleData]);
  // console.log(data)

  function formatPrice(number) {
    // Chuyển đổi số thành chuỗi
    const numberString = number.toString();

    // Tạo một danh sách các đơn vị số từ chuỗi số
    const units = [];
    let tempStr = numberString;
    while (tempStr.length > 3) {
      units.unshift(tempStr.slice(-3));
      tempStr = tempStr.slice(0, -3);
    }
    units.unshift(tempStr);

    // Thêm dấu chấm ngăn cách giữa các đơn vị
    const formattedPrice = units.join(".");

    return formattedPrice;
  }


  return (
    <div className="container">
      <div className=" d-flex justify-content-between banner-shop">
        <p className="text-uppercase ps-5 ms-5 pt-5 fs-1 fw-semibold">History</p>
        <p className="text-uppercase p-5 m-2 fs-4 fw-semibold">History</p>
      </div>
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr className="table-light text-center">
              <th>ID ORDER</th>
              <th>ID USER</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>TOTAL</th>
              <th>DELIVERY</th>
              <th>STATUS</th>
              <th>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.user._id}</td>
                  <td>{item.user.fullName}</td>
                  <td>{item.user.phone}</td>
                  <td>{item.user.address}</td>
                  <td>{formatPrice(item.total_price)} VND</td>
                  <td width="100">Waiting for progressing</td>
                  <td >{item.status}</td>
                  <td>
                    <NavLink to={`/order/history/detail/${item._id}`}>
                      <button className="">
                       <span className="me-2">View</span>
                        <svg
                        width={20}
                          fill="#000000"
                          viewBox="0 0 24 24"
                          id="right-arrow"
                          data-name="Flat Line"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon flat-line"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <line
                              id="primary"
                              x1="3"
                              y1="12"
                              x2="21"
                              y2="12"
                              style={{
                                fill: "none",
                                stroke: "#000000",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                              }}
                            ></line>
                            <polyline
                              id="primary-2"
                              data-name="primary"
                              points="18 15 21 12 18 9"
                              style={{
                                fill: "none",
                                stroke: "#000000",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                              }}
                            ></polyline>
                          </g>
                        </svg>
                      </button>
                    </NavLink>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
