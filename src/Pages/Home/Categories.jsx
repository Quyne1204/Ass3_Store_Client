import React from "react";
import product_1 from "../../images/product_1.png";
import product_2 from "../../images/product_2.png";
import product_3 from "../../images/product_3.png";
import product_4 from "../../images/product_4.png";
import product_5 from "../../images/product_5.png";

function Categories() {
  return (
    <div className="container mt-5">
      <div className="text-uppercase text-center mb-3">
        <p className="text-secondary m-0">carefully created collections</p>
        <p className="fs-3 m-0">browse our categories</p>
      </div>
      <div className="categories">
        <div className="row mb-4 ">
          <img className="col w-50" src={product_1} alt="" />
          <img className="col w-50" src={product_2} alt="" />
        </div>
        <div className="row">
          <img className="col-4" src={product_3} alt="" />
          <img className="col-4" src={product_4} alt="" />
          <img className="col-4" src={product_5} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Categories;
