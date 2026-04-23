// import React from 'react';

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    return navigate("/login");
  };
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        {/* <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link> */}
        <Link to="/" className="btn btn-ghost text-xl font-bold tracking-tight">
          <span className="text-xl">💻</span>
          <span className="text-pink-500">Dev</span>Tinder
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control"></div>
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-3 px-3 py-1.5 rounded-full cursor-pointer
              hover:bg-pink-500/10 transition-all duration-200 group"
            >
              {/* Welcome text block */}
              <div className="text-right hidden sm:block">
                <p className="text-xs text-base-content/40 font-medium uppercase tracking-widest leading-none mb-0.5">
                  Welcome back
                </p>
                <p className="text-sm font-semibold text-base-content/90 leading-none">
                  {user.firstName}
                </p>
              </div>

              {/* Divider */}
              <div className="w-px h-7 bg-pink-500/20 hidden sm:block" />

              {/* Avatar with pink ring */}
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-full ring-2 ring-pink-500/40 ring-offset-2 ring-offset-base-300
                group-hover:ring-pink-500/80 transition-all duration-200 overflow-hidden"
                >
                  <img
                    alt="user photo"
                    src={user.photoUrl}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online dot */}
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full
                border-2 border-base-300 shadow-sm"
                />
              </div>

              {/* Chevron */}
              <svg
                className="w-3.5 h-3.5 text-base-content/30 group-hover:text-pink-400 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 border border-pink-500/10
              rounded-2xl z-[1] mt-3 w-52 p-2 shadow-xl shadow-black/20"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between rounded-xl hover:bg-pink-500/10 hover:text-pink-400"
                >
                  Profile
                  {/* <span className="badge badge-sm bg-pink-500 text-white border-none">
                    New
                  </span> */}
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="rounded-xl hover:bg-pink-500/10 hover:text-pink-400"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="rounded-xl hover:bg-pink-500/10 hover:text-pink-400"
                >
                  Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="rounded-xl hover:bg-pink-500/10 hover:text-pink-400"
                >
                  Home
                </Link>
              </li>
              <div className="divider my-1 opacity-20" />
              <li>
                <a
                  onClick={handleLogout}
                  className="rounded-xl text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default NavBar;
