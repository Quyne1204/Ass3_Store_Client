import { configureStore } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Ví dụ về các reducer function
const State1 = { showPopup: false, idPopup: "" };
const State2 = {
  user: JSON.parse(localStorage.getItem("userActive"))
    ? JSON.parse(localStorage.getItem("userActive"))
    : undefined,
};
const State3 = {
  cart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

//Popup
const reducer1 = (state = State1, action) => {
  switch (action.type) {
    case "SHOW_POPUP":
      return { ...state, showPopup: true, idPopup: action.idPopup };
    case "HIDE_POPUP":
      return { ...state, showPopup: false };
    case "SHOW_CHAT":
      return { ...state, showPopup: true, idPopup: action.idPopup };
    case "HIDE_CHAT":
      return { ...state, showPopup: false };
    default:
      return state;
  }
};
//Login
const reducer2 = (state = State2, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      localStorage.setItem("userActive", JSON.stringify(action.data));
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("userActive")),
      };
    case "ON_LOGOUT":
      localStorage.removeItem("userActive");
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
};
//Cart
const reducer3 = (state = State3, action) => {
  let arr = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  switch (action.type) {
    case "ADD_CART":
      let found = false; // Biến flag để kiểm tra tìm thấy phần tử phù hợp
      arr.forEach(item => {
        if (item.product._id === action.cart.product._id) {
          item.count += action.cart.count;
          found = true; // Đánh dấu là đã tìm thấy phần tử phù hợp
        }
      });

      if (!found) {
        arr.push(action.cart); // Thêm action.cart vào arr chỉ khi không tìm thấy phần tử phù hợp
      }

      localStorage.setItem("cart", JSON.stringify(arr));
      return {
        ...state,
        cart: JSON.parse(localStorage.getItem("cart")),
      };
    case "INC":
      const cartArr1 = arr.map((item) => {
        if (item.product.name === action.name) {
          item.count = item.count + 1;
          item.total = item.product.price * item.count;
          return item;
        } else {
          return item;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartArr1));
      return {
        ...state,
        cart: JSON.parse(localStorage.getItem("cart")),
      };
    case "DEC":
      const cartArr2 = arr.map((item) => {
        if (item.product.name === action.name) {
          if (item.count > 1) {
            item.count = item.count - 1;
          }
          item.total = item.product.price * item.count;
          return item;
        } else {
          return item;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartArr2));
      return {
        ...state,
        cart: JSON.parse(localStorage.getItem("cart")),
      };

    case "DELETE_CART":
      let n = 0;
      let index = 0;
      if (arr.length > 1) {
        index = Number(
          arr.map((item) => {
            if (item.product._id === action._id) {
              n++;
              return n;
            }
          }),
        );
      } else {
        index = 0;
      }

      console.log(arr);
      console.log(action._id);
      arr.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(arr));
      return {
        ...state,
        cart: JSON.parse(localStorage.getItem("cart")),
      };

    case "CHECK_OUT":
      arr = [];
      localStorage.setItem("cart", JSON.stringify(arr));
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    slice1: reducer1,
    slice2: reducer2,
    slice3: reducer3,
  },
});

const selectSlice1 = (state) => state.slice1;
const selectSlice2 = (state) => state.slice2;
const selectSlice3 = (state) => state.slice3;

// Selector để lấy giá trị idPopup
export const selectIdPopup = createSelector(
  selectSlice1,
  (slice) => slice.idPopup,
);

// Selector để lấy giá trị showPopup
export const selectShowPopup = createSelector(
  selectSlice1,
  (slice) => slice.showPopup,
);
export const selectUser = createSelector(selectSlice2, (slice) => slice.user);
export const selectCart = createSelector(selectSlice3, (slice) => slice.cart);

export default store;
