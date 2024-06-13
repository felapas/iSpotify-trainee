import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './routes/Login.jsx';
import CreateUser from './routes/CreateUser.jsx';
import Artists from './routes/Artists.jsx';
import LikedSongs from './routes/LikedSongs.jsx';

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
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <CreateUser />,
      },
      {
        path: "artists",
        element: <Artists />,
      },
      {
        path: "curtidas",
        element: <LikedSongs/>,
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
