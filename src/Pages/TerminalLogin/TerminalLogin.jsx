import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LoginElement from '../../Components/LoginElement/LoginElement';
import Keyboard from 'react-simple-keyboard';
import './TerminalLogin.css'
import "react-simple-keyboard/build/css/index.css";

function TerminalLoginPage() {
    const [terminals, setTerminals] = useState([]);
    const [input, setInput] = useState('');
    const [layout, setLayout] = useState('default');
    const [inputName, setInputName] = useState('default');
    const [inputs, setInputs] = useState({});
    const keyboard = useRef();
    const data = null;

    useEffect(()=>{
        axios.get("../data.json")
        .then(response => {
          setTerminals(
            response.data.login.data.map(({ termName }) => termName)
          )
        })
    })

    const onChangeAll = inputs => {

      setInputs({ ...inputs });
      console.log("Inputs changed", inputs);
    };

  const onChange = (input) => {
    setInput(input);
    console.log('Input changed', input);
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
    setInputName(Math.random().toString(36).substring(3,9));
  }

  const getInputValue = inputName => {
    return inputs[inputName] || "";
  };

    const props = {
        options: terminals,
        value: inputs[inputName],
        onFocus,
        onChange: onChangeInput
    }

    const labels = {
      sicilNo: "Sicil No",
      sifre: "Şifre",
      montajNo: "montajNo", 
    }
  return (
    <div className='terminal-login'>
    <div className='container'>
        <div className='login-title'>CVQS (TMMT)</div>
        <div className='login-form'>
            <LoginElement type="dropdown" label="Terminal Listesi" {...props}/>
            <LoginElement type="textInput" label={labels.sicilNo} {...props}/>
            <LoginElement type="textInput" label={labels.sifre} {...props}/>
            <LoginElement type="textInput" label={labels.montajNo} {...props}/>
            <div className='selects'>
                <LoginElement type="datePicker" label="Tarih"/>
                <LoginElement type="dropdown" label="Vardiya"/>
            </div>
            <div className='buttons'>
              <button>Giriş yap</button> <button>Kapat</button>
            </div>
        </div>
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layout}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
          inputName={inputName}
        />
    </div>
  </div>
  );
}

export default TerminalLoginPage;
