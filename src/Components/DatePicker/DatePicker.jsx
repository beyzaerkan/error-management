import React, { useState, useEffect } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './DatePicker.css';

const DatePicker = () => {
  const calendarMonths = [];
  const calendarDays = [];
  const calendarYears = [];

  const [days, setDays] = useState([
    {
      displayName: 1,
    },
  ]);
  const [months, setMonths] = useState([
    {
      displayName: 1,
    },
  ]);
  const [years, setYears] = useState([
    {
      displayName: 2000,
    },
  ]);

  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2000);

  const months30 = [4, 6, 9, 11];
  const [leapYear, setLeapYear] = useState(true);
  const [numberOfDays, setNumberOfDays] = useState(0);


  useEffect(() => {
    // fill the months array
    for (let i = 0; i < 12; i++) {
      calendarMonths[i] = {
        displayName: i + 1,
      }
    }
    setMonths(calendarMonths);

    // fill the years
    for (let i = 0; i < 20; i++) {
      calendarYears[i] = {
        displayName: i + 2000,
      }
    }
    setYears(calendarYears);
  }, []);

  useEffect(() => {
    setLeapYear(((year.displayName % 4 == 0) && (year.displayName % 100 != 0)) || (year.displayName % 400 == 0));
  }, [year]);


  useEffect(() => {
    setNumberOfDays(month.displayName === 2 ? leapYear ? 29 : 28 : months30.includes(month.displayName) ? 30 : 31);
  }, [month, leapYear]);

  useEffect(() => {
    for (let i = 0; i < numberOfDays; i++) {
      calendarDays[i] = {
        displayName: i + 1,
      }
    }
    setDays(calendarDays);
  }, [numberOfDays]);

  return (
    <div className='date-picker'>
      <div><Dropdown options={days} isArrowsActive={false} setter={setDay} /></div>
      <div><Dropdown options={months} isArrowsActive={false} setter={setMonth} /></div>
      <div><Dropdown options={years} isArrowsActive={false} setter={setYear} /></div>
    </div>
  );
};

export default DatePicker;
