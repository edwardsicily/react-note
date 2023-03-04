import React, { useContext, useEffect } from "react";
import AppContext from "../store/context";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { USERACTIONS } from "../store/reducers";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: USERACTIONS.LOGOUT_USER });
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={"/notes"}> Notes </Link>
        </li>
        <li>
          <Link to={"/todo"}> Todo </Link>
        </li>
        <li>
          <Link to={"/"}> Home </Link>
        </li>
      </ul>
      <div className="user-info">
        {state?.userData ? (
          <>
            <div> Ciao {state?.userData.username} </div>
            <div onClick={handleLogout}>Logout</div>
          </>
        ) : (
          <div onClick={() => navigate("/auth")}>Login</div>
        )}

        <i>
          <FaRegUserCircle />
        </i>
      </div>
    </nav>
  );
};
