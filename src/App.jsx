import { Routes, Route } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import MainChatPage from "./pages/MainChatPage";
import Chat from "./app/Chat";

import "./index.css"; // Make sure your CSS is imported
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<MainChatPage />} />
      </Routes>
    </div>
  );
}

export default App;