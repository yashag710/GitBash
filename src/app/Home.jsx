import React from "react";

const Home = () => {
	return (
		<div
			style={{
				minHeight: "100vh",
				width: "100vw",
				background: "#111",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
			}}
		>
			<h1
				style={{
					color: "#fff",
					fontSize: "4rem",
					fontWeight: "bold",
					letterSpacing: "0.1em",
					margin: 0,
					textShadow: "0 2px 16px #00ffe7, 0 1px 0 #222"
				}}
			>
				GITBASH
			</h1>
			<p
				style={{
					color: "#aaa",
					fontSize: "1.5rem",
					marginTop: "1.5rem",
					textAlign: "center",
					maxWidth: "600px"
				}}
			>
				Your modern command center. Fast, simple, and beautiful.
			</p>
		</div>
	);
};

export default Home;
