import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Navbar from '../Navbar/Navbar';
import { Box, Grid, Typography } from '@mui/material'

const BigFont = ({ assyNo, bodyNo, rgbColor, extCode, bgColor, user, departmentCode, modelName, nameList, backToPage }) => {
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

  return (
    <Box sx={{
      background: background,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 5
    }}>
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
      <Box sx={{mt: 2}}>
        <Grid container >
          <Grid item xs={10}>
            <Box textAlign= 'center'>
              <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '150px'}}>
                {modelName} - {assyNo}
                <br />
                {bodyNo}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'left', my: 5}}>
              {
                nameList.map((item, index) => {
                  return (
                    <Typography sx={{fontWeight: 'bold', mb: 1}} variant="h4" key={index}>{item.partName} - {item.defectName}</Typography>
                  )
                })
              }
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                right: '30px',
                padding: '10px',
                margin: '10px',
                border: '0.5px solid var(--smoke)',
                borderRadius: '5px',
                bgcolor: 'var(--background)',
              }}
            >
              <Button
                variant={"danger"}
                size="large"
                onClick={backToPage}
              >
                HATA GİRİŞİ
              </Button>
              <Typography variant="subtitle1">
                MONTAJ NO
              </Typography>
              <Input
                type={"text"}
                value={assyNo}
              />
              <Button
                size="large"
              >
                ARA
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
};

export default BigFont;
