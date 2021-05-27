import React from 'react';
import "./chatbar.css";

import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, SearchOutlined } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

function ChatBar(){
	return(
		<div className = "chat">
			<div className = "chat_header">
				<Avatar />
				
				<div className = "chat_header_info">
					<h3>Chat Name</h3>
					<p>Last Seen at ...</p>
				</div>

				<div>
					<IconButton>
						<SearchOutlined/>
					</IconButton>

					<IconButton>
						<AttachFile/>
					</IconButton>

					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			
			</div>

			<div className="chat_body">
				<p className = "chat_message chat_sender">
					<span className="chat_name">Chat_name</span>
							this is a message    
					<span className="chat_timestamp">
						{new Date().toLocaleTimeString()}
					</span>
				
				</p>

				<p className = "chat_message chat_sender">
					<span className="chat_name">Chat_name</span>
							this is a message
					<span className="chat_timestamp">
						{new Date().toLocaleTimeString()}
					</span>
				
				</p>
				
				<p className = "chat_message chat_receiver">
					<span className="chat_name">Chat_name</span>
							this is a message
					<span className="chat_timestamp">
						{new Date().toLocaleTimeString()}
					</span>
				
				</p>
			</div>

			<div className="chat_footer">
				<InsertEmoticonIcon />
				<form>
					<input placeholder = "Type a Message" type="text" />
					<button type ="submit">Send</button>
				</form>
				<MicIcon/>
			</div>
		</div>
	);
}


export default ChatBar;