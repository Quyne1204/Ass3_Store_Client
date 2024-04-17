import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const hidePopup = (id) => {
  return {
    type: "HIDE_POPUP",
    idPopup: id,
  };
};

function Popup({data}) {
  const dispatch = useDispatch();

  function hidePopupHandler(id) {
    dispatch(hidePopup(id));
  }

  return (
    <div className="popup d-flex justify-content-center">
      <div className="popup-content col-6">
        <button
          className="btn-close float-end mt-3 me-3"
          onClick={() => hidePopupHandler("")}
        ></button>
        <div className="mt-5 row p-3">
          <img className="col-6" style={{ height:"450px" }} src={data.img1} alt="" />
          <div className="col-6" style={{ height:"470px" }}>
            <div className="desc">
              <p className="fs-3 fw-semibold">{data.name}</p>
              <p className="fs-5 text-secondary">{data.price} VND</p>
              <p className="desc-content pe-3">{data.short_desc}</p>
            </div>

            <Link
              to={`/detail/${data._id}`}
              className="border-0 btn bg-dark text-light ps-4 pe-4 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="0.8em"
                viewBox="0 0 576 512"
                className="me-1"
                fill="#ffffff"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
              View Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
