import React, { useEffect } from 'react';
import './ShiftArrows.css'

const ShiftArrows = ({ refList, buttonColor }) => {
  const goUp = (ref) => {
    ref?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  const goDown = (ref) => {
       ref?.scrollTo({
        top: ref.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
  }

  const stopScroll = (ref) => {
    ref.scrollTop = ref.scrollTop;
  };

  return (
    <div className='shift-arrows'>
      <div
        onPointerDown={(e) => goUp(refList.current)}
        onPointerUp={(e) => stopScroll(refList.current)}
        style={{backgroundColor: buttonColor}}
      ><i className='arrow up'></i></div>
      <div
        onPointerDown={(e) => goDown(refList.current)}
        onPointerUp={(e) => stopScroll(refList.current)}
        style={{backgroundColor: buttonColor}}
      ><i className='arrow down'></i></div>
    </div>
  );
};

export default ShiftArrows;
