import Chat from './components/Chat.js'

import React,{useState} from 'react';

function App() {
  const [messages, setMessages] = useState([])
  return (
    <Chat
      messages={messages}
      setMessages={setMessages}
      greeting={true}
      name={'Username'}
      token={'null'}
      />
  );
}

export default App;
