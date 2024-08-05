import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
    const getToken = localStorage.getItem('token')
    console.log(getToken)

  return getToken !== null ? children : (<Navigate to="/signin"/>)
}

export default PrivateRoute
