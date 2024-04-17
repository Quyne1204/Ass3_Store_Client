import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);

  const getDetail = useCallback(async () => {
    const myHeaders = new Headers();
    myHeaders.append("isAdmin", "");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`http://localhost:5000/product/detail/${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setProduct(result))
      .catch((error) => console.error(error));
  }, [params.id]);

  const getRelated = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("isAdmin", "");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`http://localhost:5000/product/related/category?cate=${product.category}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setRelated(result))
      .catch((error) => console.error(error));
  }, [product]);

  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const countProduct = (event) => {
    setCount(event.target.value);
  };

  function Product() {
    const Cart = {
      product: product,
      count: Number(count),
      total: Number(product.price * count),
    };
    dispatch({ type: "ADD_CART", cart: Cart });
  }

  function inc() {
    setCount(count + 1);
  }
  function dec() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    getDetail();
    getRelated();
  }, [params.id, product]);

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
    <div className="container mb-5">
      <div className="row mb-5">
        <div className="col-6 row pe-3">
          <div className="col-3 d-block">
            <img className="row w-100 mb-2" src={product.img1} alt="" />
            <img className="row w-100 mb-2" src={product.img2} alt="" />
            <img className="row w-100 mb-2" src={product.img3} alt="" />
            <img className="row w-100 mb-2" src={product.img4} alt="" />
          </div>
          <img className="col-9" src={product.img1} alt="" />
        </div>
        <div className="col-6 ">
          <p className="fs-3 fw-semibold">{product.name}</p>
          <p className="fs-4 text-secondary">{product.price} VND</p>
          <p className="text-secondary">{product.short_desc}</p>
          <p>
            <span className="text-uppercase me-2 fs-4">Category:</span>
            <span className="text-secondary">{product.category}</span>
          </p>
          <div className="row">
            <div className="col-3 d-flex">
              <button className="btn bg-white border-0" onClick={() => dec()}>
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
                className="border-0 text-dark bg-white input-count"
                type="number"
                value={count}
                min="1"
                disabled
                onChange={countProduct}
              />
              <button className="btn bg-white border-0" onClick={() => inc()}>
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
            </div>

            <button
              className="col-5 bg-dark text-light border-0"
              onClick={() => Product()}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="col-6 mb-5">
        <p className="ps-3 p-2 fs-4 text-light bg-dark col-6">Description</p>
        <p className=" fs-3">Produt Description</p>
        <p>{product.long_desc}</p>
      </div>
      <div className="">
        <p className="text-uppercase fs-3">related products</p>
        <div className="row mt-3">
          {related.map((item) => {
            if (item._id !== product._id) {
              return <div className="col-3 text-center product" key={item._id}>
                <Link to={`/detail/${item._id}`} className="border-0 p-0">
                  <img className="w-100" src={item.img1} alt="" />
                </Link>
                <p className="fw-bold">{item.name}</p>
                <p className="text-secondary">{formatPrice(item.price)} VND</p>
              </div>
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Detail;
