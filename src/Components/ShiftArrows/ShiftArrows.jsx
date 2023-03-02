import  React from 'react';
import './ShiftArrows.css'

const ShiftArrows = ({index, setIndex, listLength}) => {

  const onClickUp = () => {
    if(index > 0){
      setIndex(index - 1);
    }
  }
  const onClickDown = () => {
    if(index < listLength - 1){
      setIndex(index + 1);
    }
  }

  return (
    <div className='shift-arrows'>
      <div onClick={onClickUp}><i className='arrow up'></i></div>
      <div onClick={onClickDown}><i className='arrow down'></i></div>
    </div>
  );
};

export default ShiftArrows;
