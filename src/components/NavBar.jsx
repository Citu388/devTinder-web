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
    <div className="navbar bg-[#0a0a0a] relative px-4 sm:px-6 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative flex-1">
        <Link
          to="/"
          className="btn btn-ghost px-2 hover:bg-[#E8316A]/10 flex items-center gap-2"
        >
          <span className="text-2xl font-extrabold tracking-tight leading-none">
            <span className="text-[#E8316A]">Dev</span>
            <span className="text-white">Tinder</span>
          </span>
        </Link>
      </div>
      <div className="relative flex-none gap-2">
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-3 px-3 py-1.5 rounded-full cursor-pointer
              hover:bg-[#E8316A]/10 transition-all duration-200 group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-widest leading-none mb-0.5">
                  Welcome back
                </p>
                <p className="text-sm font-semibold text-gray-200 leading-none">
                  {user.firstName}
                </p>
              </div>

              {/* Divider */}
              <div className="w-px h-7 bg-[#E8316A]/20 hidden sm:block" />

              {/* Avatar with pink ring */}
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-full ring-2 ring-[#E8316A]/40 ring-offset-2 ring-offset-[#0a0a0a]
                group-hover:ring-[#E8316A]/80 transition-all duration-200 overflow-hidden"
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
                border-2 border-[#0a0a0a] shadow-sm"
                />
              </div>

              {/* Chevron */}
              <svg
                className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#E8316A] transition-colors duration-200"
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
              className="menu menu-sm dropdown-content bg-gray-950 border border-gray-800
              rounded-2xl z-[1] mt-3 w-52 p-2 shadow-xl shadow-black/40"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between rounded-xl text-gray-300 hover:bg-[#E8316A]/10 hover:text-[#E8316A]"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="rounded-xl text-gray-300 hover:bg-[#E8316A]/10 hover:text-[#E8316A]"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="rounded-xl text-gray-300 hover:bg-[#E8316A]/10 hover:text-[#E8316A]"
                >
                  Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="rounded-xl text-gray-300 hover:bg-[#E8316A]/10 hover:text-[#E8316A]"
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
        )}
      </div>
    </div>
  );
};

export default NavBar;
