import React, {useState} from 'react';

const Unlogged = (props) => {
  const [inputValue, setInputValue] = useState('');
  function setName(e) {
    e.preventDefault();
    if (inputValue.length > 0) {
      props.setUserName(inputValue);
      setInputValue('');
    }
  }
  return (
    <div className="unlogged-container">
      <p className='type-name'>What is your name?</p>
      <form onSubmit={setName}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} type="text"/>
        <button>GO</button>
      </form>
    </div>
  )
}

export default Unlogged
