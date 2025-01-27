import React, { useEffect, useState } from 'react'
import '../Css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, 
        MoreVert, 
        SearchOutlined, 
        InsertEmoticon, 
         } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from '../firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

 
function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [roomName, setRoomName] = useState("");
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMassage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date (
                            messages[messages.length - 1]?.
                            timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">

                { messages.map(msg => ( 

                    <p key={msg.timestamp}
                        className={`chat_message ${msg.name === user.displayName
                     && "chat_receiver"
                    }`}>
                        
                    <span className="chat_name">{msg.name}</span>
                    {msg.message}
                    <span className="chat_timestamp">
                        {new Date(msg.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p> 

                ))}

            </div>

            <div className="chat_footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} 
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a massage"
                        type="text" 
                    />
                    <button onClick={sendMassage} type="submit">Send a massage</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    );
}

export default Chat
