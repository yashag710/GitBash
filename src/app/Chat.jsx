// src/App.jsx
import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function Chat() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Start a new chat session
  const startChat = async () => {
    try {
      const id = await invoke("start_chat");
      setSessionId(id);
      setMessages([]);
    } catch (err) {
      console.error("Failed to start chat:", err);
    }
  };

  // Fetch messages for current session
  const fetchMessages = async () => {
    if (!sessionId) return;
    try {
      const msgs = await invoke("get_messages", { sessionId });
      setMessages(msgs);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    try {
      await invoke("send_message", { sessionId, content: input });
      setInput("");
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // Auto-refresh once when session starts
  useEffect(() => {
    if (sessionId) fetchMessages();
  }, [sessionId]);

  return (
    <div className="flex flex-col h-screen p-4">
      {!sessionId ? (
        <button
          onClick={startChat}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start New Chat
        </button>
      ) : (
        <>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto border p-2 rounded bg-gray-100">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 my-1 rounded ${
                  msg.sender === "User"
                    ? "bg-blue-200 text-right"
                    : "bg-green-200 text-left"
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>

          {/* Buttons for actions */}
          <div className="flex mt-2 space-x-2">
            <button
              onClick={fetchMessages}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Fetch Messages
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border p-2 rounded"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
