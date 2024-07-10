import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../app/userslice";
import { useDispatch } from "react-redux";
import Weather from "../componets/Weather";
import { useSelector } from "react-redux";
import { IoIosHome } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
import { MdOutlineChangeCircle } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { SiAboutdotme } from "react-icons/si";

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const { amount } = useSelector((state) => state.user.userP);
  const dispatch = useDispatch();
  return (
    <div className=" navbar px-20 border-b-2 bg-red-600 dark:bg-white">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white m-0">
          Kitchen
        </Link>
      </div>
      <Weather />
      <div className="flex-none">
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Link to={"/Trash"}>
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{amount}</span>
              </div>
            </Link>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          ></div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[2] mt-3 w-52 shadow"
          >
            <li>
              <Link to="/">
                <IoIosHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/about">
                <SiAboutdotme /> About
              </Link>
            </li>
            <li>
              <Link to="/Create">
                <IoCreate /> Create resipet
              </Link>
            </li>
            <li>
              <Link to="/charts">
                {" "}
                <MdOutlineChangeCircle />
                Charts
              </Link>
            </li>
            <li>
              <Link to="/Login" onClick={() => dispatch(logout())}>
                <FiLogOut /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
