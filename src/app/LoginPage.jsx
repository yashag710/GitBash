import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const LoginPage = ({ onLogin }) => {
	const [input, setInput] = useState("");

	const handleLogin = () => {
		// In a real application, you would have authentication logic here.
		// For this example, we'll just call the onLogin function to proceed.
		if (input.trim() !== "") {
			onLogin();
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleLogin();
		}
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<h1 className="login-title">GitBash</h1>
				<div className="login-input-container">
					<input
						type="text"
						className="login-input"
						placeholder="Ask anything"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<button className="login-button" onClick={handleLogin}>
						<FaPaperPlane />
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;