import React from "react";
import { Provider } from "react-redux";

import "./Style.css";
import Banner from "./Home/Banner";
import Categories from "./Home/Categories";
import Products from "./Home/Products";
import More from "./Home/More";
import Store from "./Store";

function Home() {
  return (
    <Provider store={Store}>
      <Banner />
      <Categories />
      <Products />
      <More />
    </Provider>
  );
}

export default Home;
