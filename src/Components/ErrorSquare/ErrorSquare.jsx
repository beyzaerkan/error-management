import React, { useState, useContext } from 'react';
import DropdownContent from '../DropdownContent/DropdownContent';
import { ErrorEntryContext } from '../../Context';
import './ErrorSquare.css';

function ErrorSquare({ coord, size, color, labelText, handleClick, isDropdownOpen }) {
  const [selected, setSelected] = useState(true);
  const { options, imageRef } = useContext(ErrorEntryContext);
  const maxX = imageRef.current.offsetLeft + imageRef.current.clientWidth - size.width;
  const maxY = imageRef.current.offsetTop + imageRef.current.clientHeight - size.height;
  const constrainedX = Math.max(coord.x, Math.min(imageRef.current.offsetLeft + coord.x, maxX));
  const constrainedY = Math.max(coord.y, Math.min(imageRef.current.offsetTop + coord.y, maxY));

  const styleProps = {
    top: constrainedY,
    left: constrainedX,
    width: size.width,
    height: size.height,
    border: `5px solid ${color}`,
    color,
  };

  return (
    <div className='error-square' style={styleProps} onClick={handleClick}>
      <div className='square-title'>{labelText}</div>
      {
        isDropdownOpen && selected && <DropdownContent options={options} setter={setSelected} />
      }
    </div>
  )
}

export default ErrorSquare;
