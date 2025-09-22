import React, { useState } from "react";
import { FaPaperPlane, FaPlus } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu"; // Import the new component

const ChatView = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="chat-view">
      <div className="chat-content">
        <div className="empty-chat-placeholder">
          <h1>GitBash</h1>
        </div>
      </div>

      <div className="chat-input-area">
        {/* Conditionally render the dropdown menu */}
        {isDropdownVisible && <DropdownMenu />}

        <form className="chat-input-form">
          {/* Add the plus button here */}
          <button
            type="button"
            className="chat-add-btn"
            onClick={toggleDropdown}
          >
            <FaPlus />
          </button>

          <input
            type="text"
            className="chat-input with-plus" // Add a new class
            placeholder="Ask anything"
          />
          <button type="submit" className="chat-send-btn">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;