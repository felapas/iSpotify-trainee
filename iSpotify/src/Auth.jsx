import React from 'react'
import { Outlet } from "react-router-dom";


const Auth = () => {
  return (
    <div className="container">
        
      <Outlet />
    </div>
  );
}

export default Auth