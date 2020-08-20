import React, { useEffect, useState } from 'react'
import '../Css/SidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from '../firebase';
import { Link } from "react-router-dom";


function SidebarChat({  id, name, addNewChat }) {
    const [seed, setSeed] = useState("")
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(onsnapshot => 
                setMessages(onsnapshot.docs.map(doc => 
                    doc.data()))
            );
        }
    }, [id]);

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const createChat = () => {
        const roomName = prompt("Please Enter name for chat");
        if(roomName){
            //insert new room in firebase DB.
            db.collection("rooms").add({
                name : roomName,
            });
        }
    };

    return !addNewChat ?  (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>
                        {messages[0]?.message}
                    </p>
                </div>
            </div>
        </Link>
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
