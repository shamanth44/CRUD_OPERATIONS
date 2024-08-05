import React from 'react'
import { Navigate } from 'react-router-dom'


function OpenRoute({children}) {
  const getToken = localStorage.getItem('token')
  console.log(getToken)

return getToken === null ? children : (<Navigate to="/dashboard"/>)
}

export default OpenRoute
