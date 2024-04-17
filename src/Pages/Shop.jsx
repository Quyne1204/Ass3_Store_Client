import React, { useCallback, useEffect, useState } from "react";
import "./Style.css";
import ProductList from "./Shop/ProductList ";
import Banner from "./Shop/Banner";

function Shop() {
  const [product, setProduct] = useState([]);
  const getData = useCallback(async () => {
    const myHeaders = new Headers();
    myHeaders.append("isAdmin", "");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://ass3-store-server.onrender.com/product", requestOptions)
      .then((response) => response.json())
      .then((result) => setProduct(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <Banner />
      <ProductList product={product} />
    </div>
  );
}

export default Shop;
