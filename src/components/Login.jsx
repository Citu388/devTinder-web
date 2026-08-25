import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError("");
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoginForm ? handleLogin() : handleSignUp();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative flex flex-col overflow-hidden">
      {/* Ambient background: faint code-grid + glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#E8316A]/20 blur-[140px]" />

      {/* Hero */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center py-20">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-950/80 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-gray-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          git commit -m &quot;found my match&quot;
        </span>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05]">
          It starts with a
          <span className="block italic text-[#E8316A]">commit.</span>
        </h1>
        <p className="mt-5 text-gray-400 text-base max-w-sm">
          Someone on DevTinder might just merge your PR.
        </p>

        {/* Form card */}
        <div className="mt-10 w-full max-w-sm bg-gray-950/90 backdrop-blur border border-gray-800 rounded-3xl shadow-2xl shadow-black/40 p-8">
          {/* Segmented tab switcher */}
          <div className="mb-7 grid grid-cols-2 rounded-xl bg-gray-900 p-1 border border-gray-800">
            <button
              type="button"
              onClick={() => {
                setIsLoginForm(true);
                setError("");
              }}
              className={`rounded-lg py-2 text-sm font-semibold transition-all duration-200 ${
                isLoginForm
                  ? "bg-[#E8316A] text-white shadow"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLoginForm(false);
                setError("");
              }}
              className={`rounded-lg py-2 text-sm font-semibold transition-all duration-200 ${
                !isLoginForm
                  ? "bg-[#E8316A] text-white shadow"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 text-left">
                    First Name
                  </label>
                  <input
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg bg-gray-900 border border-gray-800 text-white px-3.5 py-2.5 text-sm placeholder-gray-600 outline-none transition focus:ring-2 focus:ring-[#E8316A] focus:border-transparent"
                    placeholder="Harry"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 text-left">
                    Last Name
                  </label>
                  <input
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg bg-gray-900 border border-gray-800 text-white px-3.5 py-2.5 text-sm placeholder-gray-600 outline-none transition focus:ring-2 focus:ring-[#E8316A] focus:border-transparent"
                    placeholder="Potter"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 text-left">
                Email ID
              </label>
              <input
                type="email"
                autoComplete="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full rounded-lg bg-gray-900 border border-gray-800 text-white px-3.5 py-2.5 text-sm placeholder-gray-600 outline-none transition focus:ring-2 focus:ring-[#E8316A] focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 text-left">
                Password
              </label>
              <input
                type="password"
                autoComplete={isLoginForm ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-gray-900 border border-gray-800 text-white px-3.5 py-2.5 text-sm placeholder-gray-600 outline-none transition focus:ring-2 focus:ring-[#E8316A] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-left">
                <p className="text-red-400 text-xs leading-snug">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 rounded-xl bg-[#E8316A] text-white font-semibold text-base py-3 tracking-wide transition-all duration-200 hover:bg-[#d12a5e] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              )}
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-600 font-medium font-mono">
              or
            </span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <p className="text-sm text-gray-400 text-center">
            {isLoginForm ? "New User? " : "Existing User? "}
            <button
              type="button"
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
              }}
              className="text-[#E8316A] font-medium hover:underline"
            >
              {isLoginForm ? "Signup Here" : "Login Here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
