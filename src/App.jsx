import { Routes, Route } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import MainChatPage from "./pages/MainChatPage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/chat" element={<MainChatPage />} />
      </Routes>
    </div>
  );
}

export default App;