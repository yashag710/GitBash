import React from "react";
import Sidebar from "../components/Sidebar";
import ChatView from "../components/ChatView";

const MainChatPage = () => {
  return (
    <div className="main-chat-page">
      <Sidebar />
      <ChatView />
    </div>
  );
};

export default MainChatPage;