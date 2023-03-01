import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LoginElement from '../../Components/LoginElement/LoginElement';
import Keyboard from 'react-simple-keyboard';
import Button from '../../Components/Button/Button'
import './TerminalLogin.css'
import "react-simple-keyboard/build/css/index.css";

function TerminalLoginPage() {
  const [terminals, setTerminals] = useState([]);
  const [layout, setLayout] = useState('default');
  const [inputName, setInputName] = useState('default');
  const [inputs, setInputs] = useState({});
  const [index, setIndex] = useState(0);
  const keyboard = useRef();

  useEffect(() => {
    axios.get("../data.json")
      .then(response => {
        setTerminals(
          response.data.login.data.map(({ termName }) => termName)
        )
      })
  })

  useEffect(() => {

  }, [inputName]);

  const onChangeAll = inputs => {

    setInputs({ ...inputs });
    console.log("Inputs changed", inputs);
  };

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default';
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log('Button pressed', button);
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

  const onFocus = () => {
    if (inputName === 'default') {
      setInputName(0);
    }
    setInputName(index);
    setIndex(index + 1);
    console.log(inputName);
  }

  const getInputValue = inputName => {
    return inputs[inputName] || "";
  };

  const props = {
    options: terminals,
    value: getInputValue(inputName),
    onFocus,
    onChange: onChangeInput,
    isArrowsActive: true,
  }

  const labels = {
    sicilNo: "Sicil No",
    sifre: "Şifre",
    montajNo: "Montaj No",
  }
  return (
    <div className='terminal-login'>
      <div className='container'>
        <div className='login-title'>CVQS (TMMT)</div>
        <div className='login-form'>
          <LoginElement type="dropdown" label="Terminal Listesi" {...props} />
          <LoginElement type="textInput" label={labels.sicilNo} {...props} />
          <LoginElement type="textInput" label={labels.sifre} {...props} />
          <LoginElement type="textInput" label={labels.montajNo} {...props} />
          <div className='selects'>
            <LoginElement type="datePicker" label="Tarih" />
            <LoginElement type="dropdown" label="Vardiya" />
          </div>
          <div className='buttons'>
            <Button variant="dark">GİRİŞ YAP</Button>
            <Button variant="danger" >KAPAT</Button>
          </div>
        </div>
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layout}
            onChangeAll={onChangeAll}
            onKeyPress={onKeyPress}
            inputName={inputName}
          />
        <p className='support'>TEKNİK DESTEK</p>
      </div>
    </div>
  );
}

export default TerminalLoginPage;
