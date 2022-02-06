import React from "react";
import './Chat.css';

export default function HeaderChat(){
    return(
        <div className="msger-header">
            <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i>
                SimpleChat
            </div>
            <div className="msger-header-options">
            <span><i className="fas fa-cog"></i></span>
            </div>
        </div>

    )
}

