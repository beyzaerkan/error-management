import  React, { useState, useEffect } from 'react';
import './Dropdown.css'
import ShiftArrows from '../ShiftArrows/ShiftArrows';

//ok saga tasinacak

const Dropdown = ({options, isArrowsActive}) => {
  const [isActive, setİsActive] = useState(false);
  const [selected, setSelected] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
      options &&
      setSelected(options.at(index));
  },[index])

  return (
    <div className='dropdown'>
      <div className='dropdown-btn' onClick={e => setİsActive(!isActive)}>
        {selected}
        <i className='arrow down'></i>
      </div>
      {
        isActive && 
        <div>
          {
            isArrowsActive &&
            <div className='shift-arrows-section'>
            <ShiftArrows index={index} setIndex={setIndex} listLength={options.length}/>
          </div>
          }
          
          <div className='dropdown-content'>
          {options.map((element, elementIndex) => <div key={elementIndex} className='dropdown-item' onClick={e => {
            setSelected(element);
            setIndex(elementIndex)
          }}>{element}</div>)}
          </div>
        </div>
      }
    </div>
  );
};

export default Dropdown;
