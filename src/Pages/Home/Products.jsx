import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIdPopup, selectShowPopup } from "../Store";
import Popup from "./Popup";

export const showPopup = (id) => {
  return {
    type: "SHOW_POPUP",
    idPopup: id,
  };
};

function Products() {
  const [product, setProduct] = useState([]);
  const idPopup = useSelector(selectIdPopup);
  const isShowPopup = useSelector(selectShowPopup);
  const dispatch = useDispatch();

  const getData = () => {
    const myHeaders = new Headers();
    myHeaders.append("isAdmin", "");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:5000/product", requestOptions)
      .then((response) => response.json())
      .then((result) => setProduct(result))
      .catch((error) => console.error(error));

  };

  useEffect(() => {
    getData();
  }, [ isShowPopup, idPopup]);
  // console.log(product);

  function formatPrice(number) {
    // Tạo một danh sách các đơn vị số từ chuỗi số
    const units = [];
    let tempStr = number.toString();
    while (tempStr.length > 3) {
      units.unshift(tempStr.slice(-3));
      tempStr = tempStr.slice(0, -3);
    }
    units.unshift(tempStr);

    // Thêm dấu chấm ngăn cách giữa các đơn vị
    const formattedPrice = units.join(".");

    return formattedPrice;
  }

  function showPopupHandler(id) {
    dispatch(showPopup(id));
  }

  return (
    <div className="mt-5">
      {isShowPopup && idPopup && (
        <Popup data={product.find((item) => item._id === idPopup)} />
      )}
      <div className="container">
        <div className="text-uppercase mb-3">
          <p className="text-secondary m-0">made the hard way</p>
          <p className="fs-3 m-0">top trending products</p>
        </div>

        <div className="row">
          {product.map((item) => (
            <div className="col-3 text-center product" key={item.name}>
              <button
                className="border-0 p-0"
                onClick={() => {
                  showPopupHandler(item._id);
                }}
              >
                <img className="w-100"  src={item.img1} alt="" />
              </button>
              <p className="fw-bold" style={{ height:"50px" }}>{item.name}</p>
              <p className="text-secondary">{formatPrice(item.price)} VND</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
