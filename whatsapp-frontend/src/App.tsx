import React from 'react';
import './App.css';

import Sidebar from "./components/sidebar/sidebar";
import Chatbar from "./components/Chatbar/chatbar";

function App() {
	return (
		<div className="app">
			<div className = "app_body">
				<Sidebar />
				<Chatbar />
			</div>
		</div>
	);
}

export default App;
