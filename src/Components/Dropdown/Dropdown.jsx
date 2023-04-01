import React, { useState, useEffect, useRef } from 'react';
import ShiftArrows from '../ShiftArrows/ShiftArrows';
import './Dropdown.css'

const Dropdown = ({ options, isArrowsActive, setter }) => {
  const [isActive, setİsActive] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const updateSelected = async () => {
    setSelected(options[0].displayName);
    setter(options[0]);
  }

  useEffect(() => {
    updateSelected();
  }, [options])

  return (
    <div className='dropdown'>
      <div className='dropdown-btn' onClick={() => setİsActive(!isActive)}>
        {selected}
        <i className='arrow down'></i>
      </div>
      {
        isActive &&
        <div>
          {
            isArrowsActive &&
            <div className='shift-arrows-section'>
              <ShiftArrows refList={dropdownRef} buttonColor={'var(--background)'} />
            </div>
          }

          <div className='dropdown-content' ref={dropdownRef}>
            {options.map((element, elementIndex) => <div key={elementIndex} className='dropdown-item' onClick={() => {
              setter(element);
              setSelected(element.displayName)
              setİsActive(!isActive)
            }}>{element.displayName}</div>)}
          </div>
        </div>
      }
    </div>
  );
};

export default Dropdown;
