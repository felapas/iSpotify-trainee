import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css"




function App() {
  return (
    <div className="container">
      <Navbar/>
      <Outlet/>
    </div>
  );
   
}

export default App;
