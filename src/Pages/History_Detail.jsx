import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/context";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

function HistoryDetail() {
  const [data, setData] = useState();
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const HandleData = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`http://localhost:5000/order/history/detail/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result[0]))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (user && user.info && user.info._id) {
      HandleData();
    }
  }, [user, HandleData]);

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
      <div>
        <h1>INFORMATON ORDER</h1>
        <p>ID User: {data && data.user._id}</p>
        <p>Full Name: {data && data.user.fullName}</p>
        <p>Phone: {data && data.user.phone}</p>
        <p>Address: {data && data.user.address}</p>
        <p>Total: {data && formatPrice(data.total_price)} VND</p>
      </div>
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr className="table-light text-center">
              <th>ID PRODUCT</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>COUNT</th>
            </tr>
          </thead>
          <tbody className=" fw-semibold text-center">
            {data && data.product.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td><img width={80} src={item.img} alt="" /></td>
                  <td>{item.name}</td>
                  <td>{formatPrice(item.price)} VND</td>
                  <td>{item.quantity}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryDetail;
