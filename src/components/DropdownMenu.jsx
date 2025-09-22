import React from "react";
import {
  FaFileUpload,
  FaImage,
  FaLightbulb,
  FaSearch,
  FaBook,
  FaEllipsisH,
  FaChevronRight,
} from "react-icons/fa";

const DropdownMenu = () => {
  return (
    <div className="dropdown-menu">
      <div className="dropdown-divider" />
      <div className="dropdown-section">
        <div className="dropdown-item">
          <FaImage className="dropdown-icon" />
          <div className="dropdown-text">
            <span>Upload image</span>
          </div>
        </div>
        <div className="dropdown-item">
          <FaLightbulb className="dropdown-icon" />
          <div className="dropdown-text">
            <span>Upload Files/Docs</span>
          </div>
        </div>
        <div className="dropdown-item">
          <FaSearch className="dropdown-icon" />
          <div className="dropdown-text">
            <span>Upload Audio</span>
          </div>
        </div>
        <div className="dropdown-item">
          <FaEllipsisH className="dropdown-icon" />
          <div className="dropdown-text">
            <span>More</span>
          </div>
          <FaChevronRight className="dropdown-arrow" />
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;