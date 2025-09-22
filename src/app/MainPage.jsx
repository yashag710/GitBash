import React from "react";
import Sidebar from "../components/Sidebar";
import ChatView from "../components/ChatView";

const MainPage = () => {
	return (
		<div className="main-page">
			<Sidebar />
			<ChatView />
		</div>
	);
};

export default MainPage;