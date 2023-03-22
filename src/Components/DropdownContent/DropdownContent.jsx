import React, { useState, useRef } from 'react';
import './DropdownContent.css'
import ShiftArrows from '../ShiftArrows/ShiftArrows';

const DropdownContent = ({ options, setter }) => {
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  return (
    <div className='dropdown-element' >
      <div className='shift-arrows-section'>
        <ShiftArrows refList={dropdownRef} />
      </div>
      <div className='dropdown-items' ref={dropdownRef}>
        {options.map((element, elementIndex) => <div key={elementIndex} className='dropdown-item' onClick={ () => {
          setter(false)
          setSelected(element)
        }}>{element.defectName}</div>)}
      </div>
    </div>
  );
};

export default DropdownContent;
