import React, { useEffect, useState } from 'react'
import '../Css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, 
        MoreVert, 
        SearchOutlined, 
        InsertEmoticon, 
         } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const sendMassage = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last name at...</p>
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

                <p className={`chat_message ${true && "chat_receiver"}`}>
                <span className="chat_name">Jay Patel</span>
                Hey! guys!
                <span className="chat_timestamp">8:37PM</span>
                </p>

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
