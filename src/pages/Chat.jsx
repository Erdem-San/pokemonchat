import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [tempUsername, setTempUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data);
        setMessages(messageList);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && username.trim()) {
      const messagesRef = ref(db, 'messages');
      push(messagesRef, {
        text: newMessage,
        username: username,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    }
  };

  const handleUsernameSubmit = () => {
    if (tempUsername.trim()) {
      const newUsername = tempUsername.trim();
      setUsername(newUsername);
      localStorage.setItem('username', newUsername);
      setTempUsername('');
      setIsEditingUsername(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        {(!username || isEditingUsername) && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Kullanıcı adınızı girin"
              className="w-full p-2 border rounded"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
            />
            <button
              onClick={handleUsernameSubmit}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Onayla
            </button>
          </div>
        )}
        {username && !isEditingUsername && (
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <span className="text-gray-700">Kullanıcı Adı: {username}</span>
            <button
              onClick={() => {
                setIsEditingUsername(true);
                setTempUsername(username);
              }}
              className="text-blue-500 hover:text-blue-600"
            >
              Düzenle
            </button>
          </div>
        )}
      </div>
      
      {username && !isEditingUsername && (
        <>
          <div className="bg-white rounded-lg shadow-md h-96 overflow-y-auto mb-4 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.username === username ? 'text-right' : 'text-left'
                }`}
              >
                <span className="text-sm text-gray-500">{message.username}: </span>
                <span className="bg-blue-100 rounded-lg p-2 inline-block">
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="flex-1 p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Gönder
            </button>
          </form>
        </>
      )}
    </div>
  );
} 