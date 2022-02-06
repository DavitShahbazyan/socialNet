import React from "react";
import './Chat.css';

export default function LeftMessage({item: {name, text, time}}){
    return(
            <div className="msg left-msg">
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