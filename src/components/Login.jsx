import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      if (err?.response?.data) {
        setError(err.response.data);
      } else if (err?.request) {
        setError("Unable to connect to server. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20">
        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-[#E8316A] italic leading-none">
          It starts with a commit.
        </h1>
        <p className="mt-6 text-gray-400 text-base">
          Someone on DevTinder might just merge your PR.
        </p>

        {/* Form card */}
        <div className="mt-12 w-full max-w-sm bg-gray-950 border border-gray-800 rounded-3xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-white text-center mb-6">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          <div className="space-y-4">
            {!isLoginForm && (
              <>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5 text-left">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8316A] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1.5 text-left">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8316A] focus:border-transparent"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm text-gray-300 mb-1.5 text-left">
                Email ID
              </label>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8316A] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1.5 text-left">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8316A] focus:border-transparent"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
          )}

          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="w-full mt-6 rounded-xl bg-[#E8316A] text-white font-semibold text-base py-3 tracking-wide hover:bg-[#d12a5e] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-xs text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <p className="text-sm text-gray-400 text-center">
            {isLoginForm ? "New User? " : "Existing User? "}
            <span
              className="text-[#E8316A] font-medium cursor-pointer hover:underline"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Signup Here" : "Login Here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
