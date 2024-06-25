import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Artists from "./routes/Artists.jsx";
import ArtistDetails from "./routes/ArtistPage.jsx";
import LikedSongs from "./routes/LikedSongs.jsx";
import Auth from "./Auth.jsx";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "artists",
        element: <Artists />,
      },
      {
        path: "artists/:id",
        element: <ArtistDetails />,
      },
      {
        path: "curtidas",
        element: <LikedSongs />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
