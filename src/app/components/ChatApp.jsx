import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";


import ThemeToggle from './ThemeToggle.js'; 

import { Sidebar } from "./Sidebar.jsx";

import { ChatMessages } from "./ChatMessage.jsx";




const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");


  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-user-profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const result = await response.json();
        if (result.success) {
          const id = result.data._id;
          setSenderId(id);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Failed to fetch user profile.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
    console.log("Socket connected");
    newSocket.on("connect", () => {
      setSocketId(newSocket.id);
    });

    newSocket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.off("connect");
      newSocket.off("receive_message");
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/messages/${receiverId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const result = await response.json();

        setMessages(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [receiverId]);

  useEffect(() => {
    if (socket) {
      socket.on("user_data", (userData) => {
        if (Array.isArray(userData)) {
          setUsers(userData);
        } else {
          console.error(userData.error);
        }
      });
      socket.emit("get_user", senderId);
    }

    return () => {
      if (socket) {
        socket.off("user_data");
      }
    };
  }, [socket, senderId]);

  useEffect(() => {
    if (socket && senderId) {
      socket.emit("join", senderId);
    }
  }, [socket, senderId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      console.warn("Cannot send an empty message.");
      return;
    }

    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const messageData = {
        sender: senderId,
        receiver: receiverId,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      socket.emit("send_message", messageData);
      setSocketId(socket.id);

      // setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSelectUser = (userId) => {
    setReceiverId(userId);
    setMessages([]); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-black">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar users={users} onSelectUser={handleSelectUser} selectedUserId={receiverId} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-black border-b border-gray-300">
            <div className="flex items-center">
              <img
                src={users.find((u) => u.id === receiverId)?.avatar || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <p className="font-medium text-lg">
                {users.find((u) => u.id === receiverId)?.name || "Select a user"}
              </p>
            </div>
            <ThemeToggle /> {/* Added ThemeToggle */}
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <ChatMessages messages={messages} senderId={senderId} users={users} />
          </div>
          {receiverId && (
            <div className="p-4 border-t border-gray-300">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={handleKeyPress}
                  className="flex-1 p-3 border border-gray-300 rounded-lg dark:bg-black dark:text-white dark:border-black"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg"
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
