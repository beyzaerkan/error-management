import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import LoginElement from '../../Components/LoginElement/LoginElement';
import Keyboard from 'react-simple-keyboard';
import Button from '../../Components/Button/Button'
import './TerminalLogin.css'
import "react-simple-keyboard/build/css/index.css";

function TerminalLoginPage() {
  const loginInfo = {
    registrationNo: "9961",
    password: "123456"
  }
  let { filterCode, depCode } = useParams();
  const [terminals, setTerminals] = useState([]);
  const [terminal, setTerminal] = useState();
  const [shift, setShift] = useState({
    "shiftNo": 3,
    "shiftCode": "M",
    "rgbColor": "#12a6eb"
  });
  const [inputs, setInputs] = useState({});
  const [layout, setLayout] = useState("default");
  const [inputName, setInputName] = useState("default");
  const [index, setIndex] = useState(0);
  const [shifts, setShifts] = useState([]);

  const keyboard = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/data.json")
      .then(response => {
        setTerminals(response.data.login.data.map((item) => {
          return {
            ...item,
            displayName: item.termName
          }
        }))
        setShifts(response.data.shifts.data.map(item => {
          return {
            ...item,
            displayName: item.shiftCode
          }
        }))
      })
  }, [])


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

  const labels = {
    registrationNo: "Sicil No",
    password: "Şifre",
    assemblyNo: "Montaj No",
  }

  const onChangeInput = event => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal
    });

    keyboard.current.setInput(inputVal);

  };


  const getInputValue = inputName => {
    return inputs[inputName] || "";
  };

  const terminalList = {
    options: terminals,
    setter: setTerminal,
    isArrowsActive: true,
  }

  const registrationNoInput = {
    value: getInputValue(labels.registrationNo),
    type: "text",
    onFocus: () => {
      setInputName(labels.registrationNo)
    },
    onChange: onChangeInput,
  }

  const passwordInput = {
    value: getInputValue(labels.password),
    type: "password",
    onFocus: () => {
      setInputName(labels.password)
    },
    onChange: onChangeInput,
  }

  const assemblyNoInput = {
    value: getInputValue(labels.assemblyNo),
    type: "text",
    onFocus: () => {
      setInputName(labels.assemblyNo)
    },
    onChange: onChangeInput,
  }

  const shiftDropdown = {
    options: shifts,
    setter: setShift,
    isArrowsActive: false,
  }

  const login = () => {
    if (getInputValue(labels.registrationNo) !== loginInfo.registrationNo
      || getInputValue(labels.password) !== loginInfo.password
      || getInputValue(labels.assemblyNo) !== terminal.lastAssyNo) {
      alert("Failed!");
    }
    else {
      navigate(`/terminal/defectentry/${depCode}/${filterCode}/`, {
        state: {
          "seqNo": 222,
          "bodyNo": 25073,
          "specData": "",
          "bgColor": "#ff1c23",
          "extCode": " 3U5",
          "firstname": "Yusuf Ziya",
          "lastname": "Başbuğ",
          "departmentCode": "AI",
          "modelName": "CHR",
          "companyName": "CVQS (TMMT)",
          "termName": "CHASSIS-2",
          "modelId": 23638,
          "assyNo": 222
        }
      })
    }
  }


  return (
    <div className='terminal-login'>
      <div className='container'>
        <div className='login-title'>CVQS (TMMT)</div>
        <div className='login-form'>
          <LoginElement whichComponent="dropdown" label="Terminal Listesi" {...terminalList} />
          <LoginElement whichComponent="textInput" label={labels.registrationNo} {...registrationNoInput} />
          <LoginElement whichComponent="textInput" label={labels.password} {...passwordInput} />
          <LoginElement whichComponent="textInput" label={labels.assemblyNo} {...assemblyNoInput} />
          <div className='selects' style={{ background: shift.rgbColor }}>
            <LoginElement whichComponent="datePicker" label="Tarih" />
            <LoginElement whichComponent="dropdown" label="Vardiya" {...shiftDropdown} />
          </div>
          <div className='buttons'>
            <Button variant="dark" type={"submit"} onClick={login}>GİRİŞ YAP</Button>
            <Button variant="danger" >KAPAT</Button>
          </div>
        </div>
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          onChangeAll={onChangeAll}
          layoutName={layout}
          onKeyPress={onKeyPress}
          inputName={inputName}
        />
        <p className='support'>TEKNİK DESTEK</p>
      </div>
    </div>
  );
}

export default TerminalLoginPage;
