import React from "react";
import './Chat.css';


export default function RightMessage({item: {name, text, time}}){
    return(
            <div className="msg right-msg">
                <div className="msg-img"></div>
                <div className="msg-bubble">
                    <div className="msg-info">
                        <div className="msg-info-name">{name}</div>
                        <div className="msg-info-time">{time}</div>
                    </div>
                    <div className="msg-text">
                       {text}
                    </div>
                </div>
            </div>
    )
}