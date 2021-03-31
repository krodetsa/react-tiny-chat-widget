import React,{useState, useRef, useEffect} from 'react';
import './css/chat.css';
import useSound from 'use-sound';
import sfx from './sounds/message.mp3';
import ChatInput from './components/Input.js';
import Message from './components/Message.js';
import Unlogged from './components/Unlogged.js';
import {ReactComponent as CloseLogo} from './icons/cancel.svg';
import {ReactComponent as ChatHidden} from './icons/conversation.svg';

const Chat = (props) => {
  const messagesEndRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState([]);
  const [playOn] = useSound(sfx,{ volume: 0.5 });

  function scrollToBottom(){
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    if (props.name !== undefined) {
      setUserName(props.name);
    }
  },[props.name]);
  useEffect(() => {
    setMessages(props.messages);
  },[props.messages]);
  /*user greeting*/

  useEffect(() => {
    if (started === true) {
      if (props.name !== undefined) {
        loggedStart(props.token)
      }
    }
  },[started]);
  useEffect(() => {
    setNewMessage(false);
  },[chatOpen])


  function addMine(text) {
    props.setMessages([...messages, {
      isUser: true,
      message: text,
      time: `${ new Date().getHours().length > 1 ? "0" + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes().length > 1 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`
    }]);
    scrollToBottom();
    // playOn();
  }
  function unloggedStart(name) {
    playOn();
  }
  function loggedStart(token) {
    playOn();
  }
  return (
    <div className={"chat-global " }>
      <div className={"chat-window " + (chatOpen === true ? '' : 'closed')}>

        <div className='chat-header'>
           {userName !== '' && props.name === undefined && <p>Welcome, {userName}!</p>}
           {props.name !== undefined && <p>Welcome back, {userName}!</p>}
           {userName === '' && <p>Chat support</p>}
          <div onClick={() => setChatOpen(!chatOpen)} className="close">
            <CloseLogo/>
          </div>
        </div>
        {/*logged user*/}
        { userName !== '' && props.greeting === true &&
          <div
            className='chat-body'>
            {[{
              isUser: false,
              message: 'Hello! Is there anything we can do for you?',
              time: `${ new Date().getHours().length > 1 ? "0" + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes().length > 1 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`
            }].map((el,i) => {
              return (
                <Message key={i} data={el}/>
              )
            })}
            {
              messages.map((el,i) => {
                return (
                  <Message key={i} data={el}/>
                )
              })
            }
            <div ref={messagesEndRef} />
          </div>
        }

        {userName !== '' && <ChatInput addMine={addMine}/>}

        {props.token === null && userName === '' && <Unlogged setUserName={setUserName}/>}

      </div>

      <div onClick={() => {setChatOpen(!chatOpen);setStarted(true)}} className={'chat-hidden ' + (chatOpen ? '' : 'active') + (newMessage === true ? ' new-message' : '')}>
        <ChatHidden/>
      </div>

    </div>
  )
}

export default Chat
