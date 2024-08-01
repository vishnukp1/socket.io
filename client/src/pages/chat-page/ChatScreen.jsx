import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ChatScreen.css";
import { useChat } from "../../hooks/ChatHooks";

const ChatScreen = () => {
  const { userId: selectedUserId } = useParams();
  const ownerId = localStorage.getItem("onwerId");
  const [newMessage, setNewMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [placeholder, setPlaceholder] = useState("Type your message...");
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
      setPlaceholder("Type your message...")
    }
  };

  const handleReply = (message) => {
    setReplyTo(message._id);
    setPlaceholder("Reply message here"); 
    setNewMessage("");
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
    <div className="flex flex-col h-screen bg-slate-800">
      <div className="flex-1 overflow-auto p-4 bg-gray-850">
        
        <div className="chat-history">
          {chatHistory.length === 0 ? (
            <div>No messages yet.</div>
          ) : (
            chatHistory.map((message) => (
              <div
                key={message._id}
                className={`message ${
                  message.sender === ownerId ? "sender" : "receiver"
                } shadow-md shadow-gray-400`}
              >
                <div className="text-xl">
                  {message.text}
                  {message.replyTo && (
              <div>
                <strong>Reply to:</strong> {message.replyTo.text}
              </div>
            )}

                </div>
                <div className="text-[13px]">{formatDate(message.createdAt)}</div>
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
          placeholder={placeholder}
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <butto
          onClick={handleSendMessage}
          className="ml-4 px-8 py-3 bg-[#70b6ef] shadow-md shadow-gray-400 text-white rounded-lg hover:bg-[#456b8a] focus:outline-none focus:ring-2  "
        >
          Send
        </butto>
      </div>
    </div>
  );
};

export default ChatScreen;
