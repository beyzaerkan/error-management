import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css'
import ShiftArrows from '../ShiftArrows/ShiftArrows';

//ok saga tasinacak

const Dropdown = ({ options, isArrowsActive, setter }) => {
  const [isActive, setİsActive] = useState(false);
  const [selected, setSelected] = useState("");
  const [index, setIndex] = useState(0);
  const dropdownRef = useRef(null);

  const updateSelected = async () => {
    setSelected(options[0].displayName);
    setter(options[0]);
  }

  useEffect(() => {
    updateSelected();
  }, [options])

  useEffect(() => {
    setİsActive(!isActive);
  }, [selected])

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
              <ShiftArrows refList={dropdownRef} />
            </div>
          }

          <div className='dropdown-content' ref={dropdownRef}>
            {options.map((element, elementIndex) => <div key={elementIndex} className='dropdown-item' onClick={() => {
              setter(element);
              setSelected(element.displayName)
            }}>{element.displayName}</div>)}
          </div>
        </div>
      }
    </div>
  );
};

export default Dropdown;
