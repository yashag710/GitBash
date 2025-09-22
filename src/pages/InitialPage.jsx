import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

const InitialPage = () => {
  const navigate = useNavigate();

  const startChat = (e) => {
    e.preventDefault();
    // Navigate to the main chat view
    navigate("/chat");
  };

  return (
    <div className="initial-page-container">
      <div className="initial-page-content">
        <h1 className="initial-title">GitBash</h1>
        <form className="initial-input-form" onSubmit={startChat}>
          <input
            type="text"
            className="initial-input"
            placeholder="Ask anything"
          />
          <button type="submit" className="initial-send-btn">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InitialPage;