import React, { useState } from 'react';
import DropdownContent from '../DropdownContent/DropdownContent';
import Cursor from '../Cursor/Cursor';
import { useMouse } from '../../Hooks/index';
import './ErrorSquare.css';

function ErrorSquare({ coord, size, color, labelText, imageRef, handleClick, options, isDropdownOpen}) {
  const [selected, setSelected] = useState(true);
  const {x, y} = useMouse(imageRef);
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
      selected ? (  <div className='error-square' style={styleProps} onClick={handleClick}>
      <div className='square-title'>{labelText}</div>
      {
        isDropdownOpen && <DropdownContent options={options} setter={setSelected} />
      }
    </div>) :
    (
      <Cursor x={x} y={y}/>
    )
  )
}

export default ErrorSquare;
