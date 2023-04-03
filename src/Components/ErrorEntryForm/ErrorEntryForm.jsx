import React, { useContext, useEffect, useRef, useState } from 'react';
import LoginElement from '../LoginElement/LoginElement';
import Button from '../Button/Button';
import { Box, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import Keyboard from 'react-simple-keyboard';
import { ErrorEntryContext } from '../../Context';

function ErrorEntryForm({ nrReasons, dropdowns, saveError, cancel }) {
  const [inputName, setInputName] = useState("default");
  const [inputs, setInputs] = useState({});
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const {
    setDescription,
    setProcess,
    setErrorResposibility,
    setErrorClass,
    setExitDepartment,
    setRdd,
    setFixType,
    setFixMethod
  } = useContext(ErrorEntryContext);

  const onChangeAll = inputs => {
    setInputs({ ...inputs });
  };

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default';
    setLayout(newLayoutName);
  };

  const onKeyPress = async (button) => {
    console.log('Button pressed', button, inputName);
    if (button === '{shift}' || button === '{lock}') handleShift();
  };


  const onChangeInput = event => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal
    });

    keyboard.current.setInput(inputVal);

  };

  const getInputValue = (setter, inputName) => {
    setter(inputs[inputName]);
    return inputs[inputName] || "";
  };

  const errorRes = {
    options: dropdowns.defectResponsibles,
    setter: setErrorResposibility,
    isArrowsActive: false,
  }
  const rdd = {
    options: nrReasons,
    setter: setRdd,
    isArrowsActive: false,
  }

  const errorCls = {
    options: dropdowns.defectClass,
    setter: setErrorClass,
    isArrowsActive: false,
  }
  const exitDepart = {
    options: dropdowns.exitDepartments,
    setter: setExitDepartment,
    isArrowsActive: false,
  }
  const fixType = {
    options: dropdowns.fixTypes,
    setter: setFixType,
    isArrowsActive: false,
  }

  const fixMethod = {
    options: dropdowns.defectResponsibles,
    setter: setFixMethod,
    isArrowsActive: false,
  }

  const processInput = {
    name: "process",
    value: getInputValue(setProcess, "process"),
    type: "text",
    onFocus: () => {
      setInputName("process")
    },
    onChange: onChangeInput,
  }

  const descriptionInput = {
    name: "description",
    value: getInputValue(setDescription, "description"),
    type: "text",
    onFocus: () => {
      setInputName("description")
    },
    onChange: onChangeInput,
  }

  return (
    <Box sx={{
      backdropFilter: 'blur(1px)',
      position: 'fixed',
      display: "flex",
      alignItems: "center",
      justifyContent: 'center',
      height: "100vh",
      width: "100vw",
      zIndex: 2,
    }}>
      <Box sx={{
        width: '80%',
        height: '80%',
        borderRadius: '12px',
        backgroundColor: 'var(--background)',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        display: 'flex',
        flexDirection: 'column',
        padding: '25px',
      }} >
        <Grid container spacing={1}>
          <Grid item xs={12} position='relative'>
            <Typography fontWeight='bold' display='inline-block'>CVQS (TMMMT)</Typography>
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              label="SIK GELEN HATA"
              labelPlacement="end"
              sx={{
                position: 'absolute',
                right: 0,
                fontWeight: 'bold',
                '& .MuiSvgIcon-root': {
                  fontSize: 40
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LoginElement whichComponent="dropdown" label="errorManager" {...errorRes} />
          </Grid>
          <Grid item xs={2}>
          <FormControlLabel
              value="end"
              control={<Checkbox />}
              label="Harigami"
              labelPlacement="end"
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 40
                }
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <LoginElement whichComponent="dropdown" {...rdd} />
          </Grid>
          <Grid item xs={6}>
            <LoginElement whichComponent="dropdown" label="errorClass" {...errorCls} />
          </Grid>
          <Grid item xs={3}>
            <Button variant={"danger"} size="large" onClick={saveError}>save</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant={"danger"} size="large" onClick={cancel}>cancel</Button>
          </Grid>
          <Grid item xs={6}>
            <LoginElement whichComponent="dropdown" label="exitDepartment" {...exitDepart} />
          </Grid>
          <Grid item xs={6}>
            <LoginElement whichComponent="dropdown" label="fixMethod" {...fixMethod} />
          </Grid>
          <Grid item xs={6}>
            <LoginElement whichComponent="dropdown" label="fixType" {...fixType} />
          </Grid>
        </Grid>
        <Box>
          <LoginElement whichComponent="textInput" label={"description"} {...descriptionInput} />
          <LoginElement whichComponent="textInput" label={"transaction"} {...processInput} />
        </Box>
        <Box>
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            onChangeAll={onChangeAll}
            layoutName={layout}
            onKeyPress={onKeyPress}
            inputName={inputName}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ErrorEntryForm;
