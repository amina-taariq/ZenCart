import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import Navbar from "./Navbar";
import { MdClose, MdMenu } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import logout from "../assets/logout.svg";
import user from "../assets/user.svg";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const [header,setHeader]=useState(false)
   const { getTotalCartItems } = useContext(ShopContext);

  return (
    <header className="fixed top-0 left-0 m-auto max-padd-container w-full bg-white ring-1 ring-slate-900/5 z-10">
      <div className="px-4 flexBetween py-3 max-xs:px-2">
        <div>
          <Link to="/">
            <img
              src={logo}
              height={31}
              width={31}
              alt="Logo"
            />
          </Link>
        </div>
        <div>
          <Navbar containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1"} />
        </div>
        {menuOpened && (
          <div>
            <Navbar
              containerStyles={`flex flex-col items-start gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50`}
            />
          </div>
        )}
        <div className="flexBetween gap-x-3 sm:gap-x-2 bold-16">
          {!menuOpened ? (
            <MdMenu
              className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
              onClick={toggleMenu}
            />
          ) : (
            <MdClose
              className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
              onClick={toggleMenu}
            />
          )}
          <div className="flexBetween sm:gap-x-6">
            <NavLink
              to={"/cart-page"}
              className="flex">
              <FaOpencart className="p-2 h-10 w-10 hover:text-secondary" />
              <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-primary medium-14 -top-2 right-3"> {getTotalCartItems()}</span>
            </NavLink>

            {localStorage.getItem('auth-token') ?
            <NavLink
              to={"/login"}
                onClick={()=>{localStorage.removeItem('auth-token'); window.location.assign(login)}}
              className={"btn-secondary flexCenter gap-x-2 medium-16 rounded-xl"}>
              <img
                src={logout}
                alt=""
                height={19}
                width={19}
              />
              Logout
            </NavLink>:
            <NavLink
              to={"/login"}
              className={"btn-secondary flexCenter gap-x-2 medium-16 rounded-xl"}>
              <img
                src={user}
                alt=""
                height={19}
                width={19}
              />
              Login
            </NavLink>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
