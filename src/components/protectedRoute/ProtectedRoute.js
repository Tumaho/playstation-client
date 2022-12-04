import React from 'react'
import cookie from 'react-cookies'
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({component, ...rest}) {
  console.log('====================================');
  console.log(cookie.load('token'));
  console.log('====================================');
    const isAuthenticated = cookie.load('token');
  return (
    <div>
        {isAuthenticated ? < div {...rest} ></div> : <Navigate to="/"/>}
    </div>
  )
}