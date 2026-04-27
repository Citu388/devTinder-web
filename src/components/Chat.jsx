import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-700 m-5 h-[75vh] flex flex-col rounded-2xl shadow-lg bg-[#0f172a]">
      {/* Header */}
      <h1 className="p-4 border-b border-gray-700 text-lg font-semibold text-white">
        Chat
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg, index) => {
          const isMe = user.firstName === msg.firstName;

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[70%]">
                {/* Name + time */}
                <div
                  className={`text-xs mb-1 ${
                    isMe
                      ? "text-right text-gray-400"
                      : "text-left text-gray-400"
                  }`}
                >
                  {msg.firstName} {msg.lastName} • 2h ago
                </div>

                {/* Message bubble */}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                    isMe
                      ? "bg-pink-500 text-white rounded-br-none"
                      : "bg-gray-700 text-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Seen */}
                {isMe && (
                  <div className="text-[10px] text-gray-500 mt-1 text-right">
                    Seen
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-3 bg-[#020617] rounded-b-2xl">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
