import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Navbar from '../Navbar/Navbar';
import './BigFont.css'

const BigFont = ({ assyNo, bodyNo, rgbColor, extCode, bgColor, user, departmentCode, modelName, nameList, setIsVisible }) => {
  const [duration, setDuration] = useState(10);
  const [background, setBackground] = useState('var(--background)');
  const [audio] = useState(new Audio("https://www.soundjay.com/mechanical/sounds/smoke-detector-1.mp3"));

  useEffect(() => {
    let timerId;
    timerId = setInterval(() => {
      setDuration(prev => prev - 1);
    }, 1000);

    if (duration === 0) {
      setBackground('var(--apple)');
      clearInterval(timerId);
      audio.play();
    }

    return () => {
      clearInterval(timerId);
      audio.pause();
    };
  }, [duration]);


  const clickButton = () => {
    setIsVisible(true);
  }

  return (
    <div className='big-font' style={{ background: background }}>
      <Navbar
        rgbColor={rgbColor}
        assyNo={assyNo}
        bodyNo={bodyNo}
        extCode={extCode}
        bgColor={bgColor}
        user={user}
        departmentCode={departmentCode}
        background={"#fff"}
      ></Navbar>
      <div className='main-screen'>
        <div className='info'>
          <div className='main-title'>
            {modelName} - {assyNo}
            <br />
            {bodyNo}
          </div>
          <div className='name-section'>
            {
              nameList.map((item, index) => {
                return (
                  <h1 key={index}>{item.partName} - {item.defectName}</h1>
                )
              })
            }
          </div>
        </div>
        <div className='input-section'>
          <Button
            variant={"danger"}
            size="full"
            onClick={clickButton}
          >
            HATA GİRİŞİ
          </Button>
          <p>MONTAJ NO</p>
          <Input
            type={"text"}
            value={assyNo}
          />
          <Button
            size="full"
          >
            ARA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BigFont;
