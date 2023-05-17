import React, { useRef, useContext } from 'react';
import { DefectEntryContext } from '../../Context';
import ShiftArrows from '../ShiftArrows/ShiftArrows';
import './DropdownContent.css'

const DropdownContent = ({ options, setter }) => {
  const dropdownRef = useRef(null);
  const { setSelectedPart } = useContext(DefectEntryContext);

  return (
    <div className='dropdown-element' >
      <div className='shift-arrows-section'>
        <ShiftArrows refList={dropdownRef} buttonColor={'var(--background)'} />
      </div>
      <div className='dropdown-items' ref={dropdownRef}>
        {options.map((element, elementIndex) => <div key={elementIndex} className='dropdown-item' onClick={ () => {
          setter(false)
          setSelectedPart(element)
        }}>{element.defectName}</div>)}
      </div>
    </div>
  );
};

export default DropdownContent;
