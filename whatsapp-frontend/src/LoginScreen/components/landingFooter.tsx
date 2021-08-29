import React from 'react';

import "./landingFooter.css";
import videoImg from "../resources/video-instructions.jpg";

export default function LandingFooter() {
	return (
		<div className="landing-footer">
			<div className="video-instructions-wrapper">
				<div className="video-instructions">
					<img src={videoImg} alt="" className="video-instructions-img"></img>
				</div>
			</div>
		</div>
	);
}