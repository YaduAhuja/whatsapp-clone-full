import React from "react";
import LandingWindow from "./landingWindow";
import "./landingWrapper.css";

export default function LandingWrapper() {
	return (
		<div>
			<div className="landing-wrapper">
				<div className="landing-header"></div>
				<LandingWindow />
			</div>
		</div>
	)
}