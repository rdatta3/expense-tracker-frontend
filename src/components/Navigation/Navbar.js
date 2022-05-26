import React from "react";
import { useSelector } from "react-redux";
import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./public/PublicNavbar";

const Navbar = () => {
  const userLogin = useSelector(state => state?.users?.userAuth);
  console.log(userLogin);
  return <>{userLogin ? <PrivateNavbar /> : <PublicNavbar />}</>;
};

export default Navbar;