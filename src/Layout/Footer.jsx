import React from "react";
import "./Style.css";
function Footer() {
  return (
    <div className="bg-dark">
      <div className="container container-fluid pt-5 pb-5 row">
        <div className="text-light col">
          <p>CUSTOMER SERVICES</p>
          <div className="a d-grid">
            <a href="#">Help & Contact Us</a>
            <a href="#">Returns & Refuncds</a>
            <a href="#">Online Stores</a>
            <a href="#">Terms & Conditions</a>
          </div> 
        </div>
        <div className="text-light col">
          <p>COMPANY</p>
          <div className="a d-grid">
            <a href="#">What We Do</a>
            <a href="#">Available Services</a>
            <a href="#">Latest Posts</a>
            <a href="#">FAQs</a>
          </div>
        </div>
        <div className="text-light col">
          <p>SOCIAL MEDIA</p>
          <div className="a d-grid">
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
