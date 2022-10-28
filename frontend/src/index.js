import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Landing from "./pages/landing"
import AddBook from "./pages/addbook"
import Search from "./pages/search"
import App from "./App";
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/search",
    element: <Search />
  },
  // {
  //   path: "/search/books",
  //   element: <Navigate to="/search/books"/>
  // },
  {
    path: "/addbook",
    element: <AddBook />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
