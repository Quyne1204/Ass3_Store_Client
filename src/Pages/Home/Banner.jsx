import React from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  function navBtn() {
    // navigate('/shop');
  }
  return (
    <div className="container banner">
      <div className="text-uppercase text-banner">
        <p className="text-secondary">new inspiration 2020 </p>
        <p className="fs-2">20% off on new season</p>
        <button
          onClick={navBtn}
          className="border-0 bg-dark text-light pt-2 pb-2 p-4"
        >
          Browse collections
        </button>
      </div>
    </div>
  );
}

export default Banner;
