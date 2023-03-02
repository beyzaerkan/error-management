import  React, { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './DatePicker.css'

const date  = {
    days: [1, 2, 3, 4],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    years: [2002]
} 

const DatePicker = () => {
    
  return (
    <div className='date-picker'>
         <Dropdown options={date.days} isArrowsActive={false}/>
         <Dropdown options={date.months} isArrowsActive={false}/>
         <Dropdown options={date.years} isArrowsActive={false}/>
    </div>
  );
};

export default DatePicker;
