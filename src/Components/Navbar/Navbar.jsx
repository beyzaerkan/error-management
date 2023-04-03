import React from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Item = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  margin: '1px 5px',
  padding: '0 10px',
  fontWeight: 'bold'
}));


const Navbar = ({ assyNo, bodyNo, rgbColor, extCode, bgColor, user, departmentCode, background = "transparent" }) => {
  const {t} = useTranslation();
  return (
    <Box sx={{backgroundColor: background, mx: 3 , mt: 1, borderRadius: '5px'}}>
      <Grid container>
        <Grid item xs={2}   textAlign= 'center' >
          <Item>
            {t('assemblyNo').toUpperCase()}
            <br />
            <span>{assyNo}</span></Item>
        </Grid>
        <Grid item xs={2} textAlign= 'center'>
          <Item sx={{
            bgcolor: rgbColor,
            border: '1px solid black'
          }}
          >BODY NO
            <br />
            <span>{bodyNo}</span></Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{
            fontSize: '25px',
            textAlign:'left',
          }} 
          >
            {t('errorEntryScreen').toUpperCase()}
          </Item>
        </Grid>
        <Grid item xs={1} textAlign= 'center'>
          <Item sx={{
            bgcolor: bgColor,
            border: '1px solid black',
            color: '#fff',
          }}            
          >
            {t('color')}
            <br />
            <span>{extCode}</span></Item>
        </Grid>
        <Grid item xs={3} textAlign= 'center'>
          <Item sx={{
            color: 'red',
          }}>{user} ({departmentCode})</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
