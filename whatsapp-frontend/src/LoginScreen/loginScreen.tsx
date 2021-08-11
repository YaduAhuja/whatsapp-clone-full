import React from 'react';
import LandingWindow from './components/landingWindow';
import LandingWrapper from './components/landingWrapper';
import "./loginScreen.css";

export default function LoginScreen() {
	return (
		<div className="login-screen">
			<LandingWrapper />
			<LandingWindow />
		</div>
	);
}