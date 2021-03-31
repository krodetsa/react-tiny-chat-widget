import React from 'react';
const Message = (props) => {

  return (
    <div className={'message-box ' + (props.data.isUser ? 'out' : 'in')}>
      <div className="tail"></div>
      <div className="message-text">{props.data.message}</div>
      <div className="message-time">{props.data.time}</div>
    </div>
  )
}

export default Message
