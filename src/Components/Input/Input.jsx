import React, { useEffect, useRef } from 'react';

import './Input.css';

function Input({ 
  type,
  detail,
  value,
  style,
  isFocused,
  valueSetter,
  label,
  hasError,
  placeholder,
  press,
  refSetter,
  onFocus,
  onChange,
  ...props}) {

  const input = useRef(null);
  if (refSetter){
    refSetter(input);
  }

  useEffect(() => {
    if (isFocused) {
      input.current?.focus();
    }
  }, [])


  return (
    <div className='text-input' style={style}>
      { label && <p className='header'>{label}</p> }
      <input 
        type={type}
        value={value}
        className={hasError ? 'error' : undefined} 
        ref={input}
        onChange={onChange} 
        onKeyPress={press} 
        onFocus={onFocus}
        placeholder={placeholder}
        title={placeholder}
      />
      {detail && (<small className='detail'>{detail}</small>)}
    </div>
  );
}

export default Input;
