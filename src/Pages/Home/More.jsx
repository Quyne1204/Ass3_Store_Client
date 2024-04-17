import React from "react";

function More() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row p-5  more">
        <div className="col-4">
          <p className="fs-5 text-uppercase m-0">Free Shipping</p>
          <p className="text-secondary m-0">Free shipping worlwide</p>
        </div>
        <div className="col-4">
          <p className="fs-5 text-uppercase m-0">24 x 7 Service</p>
          <p className="text-secondary m-0">Free shipping worlwide</p>
        </div>
        <div className="col-4">
          <p className="fs-5 text-uppercase m-0">Festival offer </p>
          <p className="text-secondary m-0">Free shipping worlwide</p>
        </div>
      </div>
      <div className="mt-5 row">
        <div className="col">
          <p className="fs-5 text-uppercase m-0">Let's be friends!</p>
          <p className="text-secondary m-0">Nisi nisi tempor consequat laboris nisi.</p>
        </div>
        <div className="col row w-100">
            <input className="col-8" type="text" />
            <button className="col-4 btn bg-dark text-light fs-4 border-0 rounded-0">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default More;
