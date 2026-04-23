import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }

  if (connections.length === 0) {
    return <h1>No Connections Found</h1>;
  }
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-500/60 font-semibold mb-2">
            Your Network
          </p>
          <h1 className="text-4xl font-bold text-white/90 tracking-tight">
            Connections
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-pink-500/30" />
            <span className="text-pink-500/50 text-xs">✦</span>
            <div className="h-px w-12 bg-pink-500/30" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {connections.map((connection) => {
            const { firstName, lastName, photoUrl, age, gender, about, _id } =
              connection;
            return (
              <div
                key={_id}
                className="group relative bg-base-300 border border-white/5 rounded-2xl overflow-hidden
              hover:border-pink-500/30 hover:shadow-xl hover:shadow-pink-500/10
              transition-all duration-300"
              >
                {/* Top pink accent bar */}
                <div
                  className="h-1 w-full bg-gradient-to-r from-pink-600 via-pink-400 to-fuchsia-500
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="p-6 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div
                      className="w-20 h-20 rounded-full ring-2 ring-pink-500/20
                  group-hover:ring-pink-500/60 transition-all duration-300 overflow-hidden shadow-lg"
                    >
                      <img
                        alt="photo"
                        className="w-full h-full object-cover"
                        src={photoUrl}
                      />
                    </div>
                    {/* Online dot */}
                    {/* <span
                      className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-400 rounded-full
                  border-2 border-base-300"
                    /> */}
                  </div>

                  {/* Name & meta */}
                  <h2 className="font-bold text-lg text-white/90 leading-tight">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-xs text-pink-400/70 font-medium mt-1 uppercase tracking-wider">
                      {age} · {gender}
                    </p>
                  )}
                  {about && (
                    <p className="text-gray-400/80 mt-3 text-sm leading-relaxed line-clamp-2">
                      {about}
                    </p>
                  )}

                  {/* Chat button */}
                  <Link to={"/chat/" + _id} className="w-full mt-5">
                    <button
                      className="w-full py-2.5 rounded-xl text-sm font-semibold
                  bg-pink-500/10 text-pink-400 border border-pink-500/20
                  hover:bg-pink-500 hover:text-white hover:border-pink-500
                  transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Message
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
