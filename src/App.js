import React, { useCallback, useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Layout/Root";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Detail from "./Pages/Detail";
import SignIn from "./Pages/Login/SignIn";
import SignUp from "./Pages/Login/SignUp";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import { UserContext } from "./context/context";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { selectCart } from "./Pages/Store";
import History from "./Pages/History";
import HistoryDetail from "./Pages/History_Detail";

function App() {
  const { user, login } = useContext(UserContext);
  const [cookies] = useCookies(['token']);
  const cart = useSelector(selectCart);
  // console.log(cart);

  const handleLogin = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("cookies", cookies.token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://ass3-store-server.onrender.com/auth/checklogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        login(result);
      })
      .catch((error) => console.error(error));
  }, [cookies.token]);

  useEffect(() => {
    if (cookies.token) {
      handleLogin();
    }
  }, [cookies.token, handleLogin]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/shop", element: <Shop /> },
        { path: "/detail/:id", element: <Detail /> },
        { path: "/login", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/order/history", element: <History /> },
        { path: "/order/history/detail/:id", element: <HistoryDetail/> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
