import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ChatScreen.css";
import { useChat } from "../../hooks/ChatHooks";

const ChatScreen = () => {
  const { userId: selectedUserId } = useParams();
  const ownerId = localStorage.getItem("onwerId");
  const [newMessage, setNewMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const { chatHistory, sendMessage, fetchChatHistory, loading, error } =
    useChat(ownerId);

  useEffect(() => {
    if (selectedUserId) {
      fetchChatHistory(selectedUserId);
    }
  }, [selectedUserId, fetchChatHistory]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage({ receiver: selectedUserId, text: newMessage, replyTo });
      setNewMessage("");
      setReplyTo(null);
    }
  };

  const handleReply = (message) => {
    setReplyTo(message._id);
    setNewMessage(`@Reply to ${message.text} :  `);
  };

  if (!selectedUserId) {
    return <div>Please select a user to chat with.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4">
        <div className="chat-history">
          {chatHistory.length === 0 ? (
            <div>No messages yet.</div>
          ) : (
            chatHistory.map((message) => (
              <div
                key={message._id}
                className={`message ${
                  message.sender === ownerId ? "sender" : "receiver"
                }`}
              >
                <div className="text-xl">
                  {message.text}
                  {message.replyTo && <div className="reply"></div>}
                </div>
                <div className="text-sm">{formatDate(message.createdAt)}</div>
                <button
                  onClick={() => handleReply(message)}
                  className="reply-button"
                >
                  Reply
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="p-1 bg-gray-500 border-t border-gray-300 flex items-center">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 px-4 py-2 bg-red-400 text-black rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
