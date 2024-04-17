import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList({ product }) {
  const [category, setCategory] = useState(product);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const getCategory = useCallback((cate) => {
    // console.log(cate);
    if (cate === "") {
      setCategory(product);
    } else {
      const filteredData = product.filter(
        (item) => item.category === cate,
      );
      setCategory(filteredData);
    }
  }, [product]);

  const getProduct = () => {
    if (price === "") {
      setCategory(product);
    } else if (price === "desc") {
      const data = product.sort((a, b) => b.price - a.price);
      setCategory(data);
    } else if (price === "asc") {
      const data = product.sort((a, b) => a.price - b.price);
      setCategory(data);
    }
    if (name !== '') {
      const data = product.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
      setCategory(data);
    } else {
      setCategory(product);
    }
  }

  useEffect(() => {
    setCategory(product);
    getProduct();
  }, [product, name, price]);


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

  return (
    <div className="row mt-5 mb-5">
      <div>
        <p className="fs-2 fw-semibold text-uppercase">Categories</p>
      </div>
      <div className="col-4 ">
        <ul className="list-group">
          <li className="list-group-item bg-dark text-light text-uppercase">
            Apple
          </li>
          <button
            className="text-start list-group-item text-uppercaseborder-0 bg-light "
            onClick={() => getCategory("")}
          >
            All
          </button>
          <li className="list-group-item list-group-item-secondary text-uppercase fw-semibold">
            IPhone & mac
          </li>
          <button
            className="text-start list-group-item text-uppercaseborder-0 bg-light "
            onClick={() => getCategory("iphone")}
          >
            Iphone
          </button>
          <button
            className="text-start list-group-item text-uppercaseborder-0 bg-light "
            onClick={() => getCategory("ipad")}
          >
            Ipad
          </button>
          <button
            className="text-start list-group-item text-uppercaseborder-0 bg-light "
            onClick={() => getCategory("macbook")}
          >
            Macbook
          </button>
          <li className="list-group-item list-group-item-secondary text-uppercase fw-semibold">
            Wireless
          </li>
          <button
            className="text-start list-group-item text-uppercaseborder-0 bg-light "
            onClick={() => getCategory("airpod")}
          >
            Airpod
          </button>
          <button
            className="text-start list-group-item text-uppercaseborder-0 bg-light "
            onClick={() => getCategory("watch")}
          >
            Watch
          </button>
          <li className="list-group-item list-group-item-secondary text-uppercase fw-semibold">
            Other
          </li>
          <button
            className="text-start list-group-item text-uppercaseborder-0 bg-light "
            onClick={() => getCategory("mouse")}
          >
            Mouse
          </button>
          <button
            className="text-start list-group-item text-uppercaseborder-0 bg-light "
            onClick={() => getCategory("keyboard")}
          >
            Keyboard
          </button>
          <button
            className="text-start list-group-item text-uppercaseborder-0 bg-light "
            onClick={() => getCategory("other")}
          >
            Other
          </button>
        </ul>
      </div>
      <div className="col-8">
        <div className="d-flex justify-content-between">
          <input
            type="text"
            className="input ps-3 p-2 col-4"
            placeholder="Enter Search Here!"
            onChange={(e) => setName(e.target.value)}
          />
          <select className="col-4 ps-3 p-2" onChange={(e) => setPrice(e.target.value)}>
            <option value="">Default Sorting</option>
            <option value="asc">Price High to Low</option>
            <option value="desc">Price Low to High</option>
          </select>
        </div>
        <div className="row mt-3">
          {category.map((item) => (
            <div className="col-4 text-center product" key={item.name}>
              <Link to={`/detail/${item._id}`} className="border-0 p-0">
                <img className="w-100" src={item.img1} alt="" />
              </Link>
              <p className="fw-bold" style={{ height: "50px" }}>{item.name}</p>
              <p className="text-secondary">{formatPrice(item.price)} VND</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
