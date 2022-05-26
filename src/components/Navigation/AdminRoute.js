import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute= ({children}) => {
   const { userAuth } = useSelector(state => state?.users)
   return userAuth?.isAdmin ?  children : <Navigate replace to="/not-found" />
}
export default AdminRoute;