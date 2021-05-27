import { Avatar } from '@material-ui/core';
import React from 'react';
import "./sidebarChat.css";


function SidebarChat(){
	return (
		<div className = "sidebarChat">
			<Avatar className = "sidebarChat_avatar" src = "https://th.bing.com/th/id/OIP.W8apTKARTqVhmLzMCisNmAHaEs?pid=ImgDet&rs=1"/>
			<div className = "sidebarChat_info">
				<div className = "sidebarChat_info_heading">
					<span className = "sidebarChat_header">Chat Name</span>
					<p>{ new Date().toLocaleTimeString([],{
						hour:'2-digit',
						minute:'2-digit',
						hour12:true
					})}</p>
				</div>
				<p>This Message was deleted. </p>
			</div>
		</div>
	);
}

export default SidebarChat;
