import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Artists from "./routes/Artists.jsx";
import ArtistDetails from "./routes/ArtistPage.jsx";
import LikedSongs from "./routes/LikedSongs.jsx";
import Auth from "./Auth.jsx";
import MyAccount from "./routes/MyAccount.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/artists" replace />,
      },
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
      {
        path: "conta",
        element: <MyAccount />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <Navigate to="/auth/login" replace />,
      },
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
