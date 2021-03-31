import React, {useState} from 'react';
import {ReactComponent as Send} from '../icons/send.svg';
const InputComponent = (props) => {
  const [inputValue, setInputValue] = useState('');
  function sendMessage(e) {
    e.preventDefault();
    if (inputValue.length > 0) {
      props.addMine(inputValue);
      setInputValue('');
    }
  }
  return (
    <div className='chat-input'>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Your message..."
        />
        <button>
          <Send/>
        </button>
      </form>


    </div>
  )
}

export default InputComponent
