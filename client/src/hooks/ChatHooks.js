import { useState, useEffect, useCallback } from "react";
import { Axios } from "../api/Axois";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io("http://localhost:3033");

export const useChat = (userId) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("/users");
        setUsers(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
    console.log("socketio", socket);

    socket.on("receive_message", (message) => {
      setChatHistory((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [userId]);

  const fetchChatHistory = useCallback(
    async (receiver) => {
      setLoading(true);
      try {
        const response = await Axios.get(`/history/${receiver}`);
        setChatHistory(response.data.data);
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching chat history");
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  const sendMessage = useCallback(
    async ({ receiver, text, replyTo }) => {
      setLoading(true);
      try {
       
        console.log("replay",replyTo);
        socket.emit("send_message", {
          sender: userId,
          receiver,
          text,
          replyTo,
        });
        const response = await Axios.post("/send", {
          sender: userId,
          receiver,
          text,
          replyTo,
        });
        await fetchChatHistory(receiver);
      } catch (err) {
        setError(err.message);
        toast.error("Error sending message");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [userId, socket, fetchChatHistory]
  );

  return { chatHistory, users, sendMessage, fetchChatHistory, loading, error };
};
