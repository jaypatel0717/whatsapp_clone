import React, { useEffect, useState } from 'react'
import '../Css/SidebarChat.css';
import { Avatar } from '@material-ui/core';

function SidebarChat({ addNewChat }) {
    const [seed, setSeed] = useState("")

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const createChat = () => {
        const roomName = prompt("Please Enter name for chat");
        if(roomName){
            // do some db stuff here...
        }
    };

    return !addNewChat ?  (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat_info">
                <h2>room name</h2>
                <p>Last massage...!</p>
            </div>
        </div>
    ) : (
        <div 
        className="sidebarChat"
        onClick={createChat}
        >
            <h3>Add New Chat</h3>
        </div>
    );
}

export default SidebarChat
