import React, { useState } from 'react';
import './Chat.css';
import HeaderChat from './HeaderChat';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';

export default function Chat() {
    const messages = [
        {
            id: 1,
            name: 'Avo',
            text: 'Hello',
            time: '12:02',
            sent: false
        },
        {
            id: 2,
            name: 'Karo',
            text: 'Hello Karo',
            time: '13:14',
            sent: true
        },
        {
            id: 3,
            name: 'Avo',
            text: 'zzzzzzzzzzzzzzzzzz',
            time: '22:40',
            sent: false
        },
        {
            id: 4,
            name: 'Avo',
            text: 'aaaaaaac aaaaaacn aaaaaaaaaaaa aaaaaaaa aaaaaaaaaa aaaaaaa',
            time: '23:40',
            sent: false
        },
        {
            id: 5,
            name: 'Karo',
            text: 'jnjjkncl kmckewlcme lkcmelkcmklm',
            time: '22:50',
            sent: true
        }, 
    ];

    const [newText, setNewText] = useState('');
    const [data, setData] = useState([...messages]);

    const newDate = () =>{
        const h = "0" + new Date().getHours();
        const m = "0" + new Date().getMinutes();
        return `${h.slice(-2)}:${m.slice(-2)}`;
    }

    const hendleText = e =>{
        setNewText(e.target.value);
    }

    const hendleSubmit = e =>{
        e.preventDefault();
        setData(prev => [...prev, {
            id: prev.length + 1,
            name: 'Karo',
            text: newText,
            time: newDate(),
            sent: true
        }]) 
        console.log(data);
        setNewText('');
    }

  return (
        <section className="msger">
            <HeaderChat/>

            <div className="msger-chat">
            {data.map(item =>(
                item.sent ? <RightMessage  key={item.id} item={item}/> : <LeftMessage key={item.id} item={item}/>
            ))}
            
            </div>
                <form className="msger-inputarea" onSubmit={hendleSubmit}>
                    <input 
                        type="text" 
                        className="msger-input" 
                        placeholder="Enter your message..."
                        value={newText}
                        onChange={hendleText}
                    />
                    <button type="submit" className="msger-send-btn">Send</button>
                </form>

        </section>
  )
}
