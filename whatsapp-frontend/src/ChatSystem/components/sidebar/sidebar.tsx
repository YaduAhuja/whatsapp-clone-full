import React from 'react';
import "./sidebar.css";

import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';

import  SidebarChat from "./sidebarChat";

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebar_header">
				<Avatar src = "https://th.bing.com/th/id/OIP.W8apTKARTqVhmLzMCisNmAHaEs?pid=ImgDet&rs=1"/>
				<div className="sidebar_headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className = "sidebar_search" >
				<div className="sidebar_searchContainer">
					<SearchOutlined />
					<input placeholder="Search or start or new Chat" type="text"/>
				</div>
			</div>

			<div className = "sidebar_chat">
				<SidebarChat />
				<SidebarChat />
				<SidebarChat />
			</div>

		</div>
	);
}


export default Sidebar;