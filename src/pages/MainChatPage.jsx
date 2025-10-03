import React, { useState, useRef } from "react";

function MainChatPage() {
  const [messages, setMessages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [question, setQuestion] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);

  const addMessage = (sender, content) => {
    setMessages((prev) => [...prev, { sender, content }]);
  };

  const handleSend = async () => {
    if (!question.trim()) return;
    addMessage("user", question);
    setQuestion("");

    addMessage("system", "Thinking...");

    try {
      const response = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.text();
      setMessages((prev) => [...prev, { sender: "system", content: data }]);
    } catch (err) {
      addMessage("system", `Error: ${err.message}`);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    addMessage("system", "Uploading PDF...");

    const formData = new FormData();
    formData.append("pdfs", file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        addMessage("system", data.message);
        setPdfs((prev) => [...prev, file.name]);
      } else {
        addMessage("system", `Error: ${data.error}`);
      }
    } catch (err) {
      addMessage("system", `Network error: ${err.message}`);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        audioChunks.current = [];

        recorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.wav");

          try {
            const response = await fetch("http://localhost:3000/transcribe", {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            if (response.ok) {
              setQuestion(data.transcription);
            } else {
              addMessage("system", `Error: ${data.error}`);
            }
          } catch (err) {
            addMessage("system", `Network error: ${err.message}`);
          }
        };

        recorder.start();
        setIsRecording(true);
      } catch (err) {
        addMessage("system", `Error accessing mic: ${err.message}`);
      }
    }
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Sidebar */}
      <aside className="w-72 bg-surface-light dark:bg-surface-dark flex flex-col p-4 border-r">
        <h1 className="text-xl font-bold mb-4">Chat</h1>
        <button className="w-full bg-primary text-white py-2 px-4 rounded-lg mb-6">
          New Chat
        </button>
        <h2 className="text-xs uppercase font-bold mb-2">Uploaded PDFs</h2>
        <ul>
          {pdfs.map((pdf, i) => (
            <li key={i} className="mb-1 text-sm text-gray-600">
              {pdf}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t flex items-center space-x-2">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            id="pdf-upload"
            onChange={handleUpload}
          />
          <label
            htmlFor="pdf-upload"
            className="px-3 py-2 border rounded-lg cursor-pointer"
          >
            Attach
          </label>

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border rounded-lg"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={toggleRecording}
            className={`px-3 py-2 rounded-lg ${
              isRecording ? "bg-red-500 text-white" : "border"
            }`}
          >
            {isRecording ? "Stop" : "Voice"}
          </button>

          <button
            onClick={handleSend}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
}

export default MainChatPage;
