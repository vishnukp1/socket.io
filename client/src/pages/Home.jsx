import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3033');

function Home() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage(''); 
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <div className="App">
      <div className="message_body">
        {messageList.map((message, index) => (
          <div key={index} className="message p-2 border-b border-gray-700">
            <p>{message.message}</p>
            <p className="text-gray-500 text-xs">{message.time}</p>
          </div>
        ))}
      </div>
      <div className="input_section fixed bottom-0 w-full p-2 bg-gray-900 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="flex-grow p-2 bg-gray-500 border border-gray-600 rounded"
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}

export default Home;
