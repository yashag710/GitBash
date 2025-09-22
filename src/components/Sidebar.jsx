import React, { useState } from "react";
import { FaBars, FaPlus, FaComment, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        {isOpen && (
          <button className="new-chat-btn">
            <FaPlus /> New chat
          </button>
        )}
      </div>

      {isOpen && (
        <div className="chat-history">
          <div className="chat-item">
            <FaComment />
            <span>Git clone issue fix</span>
          </div>
          <div className="chat-item">
            <FaComment />
            <span>Greedy algorithm bug</span>
          </div>
          {/* Add more history items here */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;