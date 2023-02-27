import  React, { useState } from 'react';
import './Dropdown.css'

//ok saga tasinacak

const Dropdown = ({options}) => {
  const [isActive, setİsActive] = useState(false);
  const [selected, setSelected] = useState("")

  return (
    <div className='dropdown'>
      <div className='dropdown-btn' onClick={e => setİsActive(!isActive)}>
        {selected}
        <i className='arrow down'></i>
      </div>
      {
        isActive && 
      <div className='dropdown-content'>
          {options.map(element => <div className='dropdown-item' onClick={e => setSelected(element)}>{element}</div>)}
        </div>
      }
    </div>
  );
};

export default Dropdown;
