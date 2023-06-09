import React, { useState, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Products from "./Components/Products/Products";
import jwt from "jwt-decode";
import Cart from "./Components/Cart/Cart";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";



export default function App() {
  const [user, setUser] = useState(null);
  function saveCurrentUser() {
    const token = localStorage.getItem("userToken");
    const decoded = jwt(token);
    setUser(decoded);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveCurrentUser();
    }
  });
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout user={user} setUser={setUser}/>,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "cart", element: <ProtectedRouter><Cart /></ProtectedRouter> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveCurrentUser={saveCurrentUser} /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}
