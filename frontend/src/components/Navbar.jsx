import React from 'react'
import { NavLink } from 'react-router-dom'
import {MdCategory, MdContacts, MdHomeFilled, MdShop2} from 'react-icons/md'

const Navbar = ({containerStyles}) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "active-link" : "")}>
        <div className="flexCenter gap-x-1">
          {" "}
           Home
        </div>
      </NavLink>
      <NavLink
        to={"/clothing"}
        className={({ isActive }) => (isActive ? "active-link" : "")}>
        <div className="flexCenter gap-x-1"> Clothing</div>
      </NavLink>
      <NavLink
        to={"/cosmetics"}
        className={({ isActive }) => (isActive ? "active-link" : "")}>
        <div className="flexCenter gap-x-1"> Cosmetics</div>
      </NavLink>
      <NavLink
        to={"/electronics"}
        className={({ isActive }) => (isActive ? "active-link" : "")}>
        <div className="flexCenter gap-x-1"> Electronics</div>
      </NavLink>
    </nav>
  );
}

export default Navbar