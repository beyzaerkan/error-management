import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from '../../Hooks';
import LoginElement from '../../Components/LoginElement/LoginElement';
import Keyboard from 'react-simple-keyboard';
import Button from '../../Components/Button/Button'
import SkeletonComponent from '../../Components/SkeletonComponent/SkeletonComponent';
import Toast from '../../Components/Toast/Toast';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Stack, Typography } from '@mui/material'
import "react-simple-keyboard/build/css/index.css";

function TerminalLoginPage() {
  const { logins, shifts, loading, error } = useFetch();
  const loginInfo = {
    registrationNo: "9961",
    password: "123456"
  }
  let { filterCode, depCode } = useParams();
  const [terminals, setTerminals] = useState([]);
  const [terminal, setTerminal] = useState("");
  const [shift, setShift] = useState("");
  const [inputs, setInputs] = useState({});
  const [layout, setLayout] = useState("default");
  const [inputName, setInputName] = useState("default");
  const [shiftList, setShiftList] = useState([]);
  const toastRef = useRef(null);
  const keyboard = useRef();
  const navigate = useNavigate();

  const loginSchema = yup.object({
    registrationNo: yup
      .string('Enter registration no')
      .required('Registration no is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
    assemblyNo: yup
      .string('Enter asssembly no')
      .max(3, 'Assembly No should be of minimum 3 characters length'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      registrationNo: '',
      assemblyNo: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {

      if (values.registrationNo !== loginInfo.registrationNo
        || values.password !== loginInfo.password
        || values.assemblyNo !== terminal.lastAssyNo) {
        toastRef.current.showToast("Failed", "danger");
      }
      else {
        toastRef.current.showToast(JSON.stringify({
          ...values,
          terminal,
          shift,
        }, null, 2), "info");

        const timer = setTimeout(() => {
          navigate(`/terminal/defectentry/${depCode}/${filterCode}`, {
            state: {
              "seqNo": 222,
              "bodyNo": 25073,
              "specData": "",
              "bgColor": "#ff1c23",
              "extCode": "3U5",
              "firstname": "Yusuf Ziya",
              "lastname": "Başbuğ",
              "departmentCode": "AI",
              "modelName": "CHR",
              "companyName": "CVQS (TMMT)",
              "termName": terminal.displayName,
              "modelId": 23638,
              "assyNo": formik.values.assemblyNo,
              "rgbColor": shift.rgbColor,
            }
          })
        }, 2000)
      }
    },
  });

  const setDropdownLists = async () => {
    setTerminals(logins.map((item) => {
      return {
        ...item,
        displayName: item.termName
      }
    }))

    setShiftList(shifts.map(item => {
      return {
        ...item,
        displayName: item.shiftCode
      }
    }))
  }

  useEffect(() => {
    setDropdownLists();
  }, [logins, shifts]);


  const onChangeAll = inputs => {
    setInputs({ ...inputs });
    formik.setFieldValue(inputName, inputs[inputName]);
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
    registrationNo: "registrationNo",
    password: "password",
    assemblyNo: "assemblyNo",
  }

  const onChangeInput = (event) => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal
    });

    formik.setFieldValue(inputName, inputVal);

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
    name: "registrationNo",
    value: getInputValue("registrationNo"),
    type: "text",
    onFocus: () => setInputName("registrationNo"),
    onChange: onChangeInput,
    error: formik.touched.registrationNo && Boolean(formik.errors.registrationNo),
    helperText: formik.touched.registrationNo && formik.errors.registrationNo,
  }

  const passwordInput = {
    name: "password",
    value: getInputValue("password"),
    type: "password",
    onFocus: () => setInputName("password"),
    onChange: onChangeInput,
    error: formik.touched.password && Boolean(formik.errors.password),
    helperText: formik.touched.password && formik.errors.password,
  }

  const assemblyNoInput = {
    name: "assemblyNo",
    value: getInputValue("assemblyNo"),
    type: "text",
    onFocus: () => setInputName("assemblyNo"),
    onChange: onChangeInput,
    error: formik.touched.assemblyNo && Boolean(formik.errors.assemblyNo),
    helperText: formik.touched.assemblyNo && formik.errors.assemblyNo,
  }

  const shiftDropdown = {
    options: shiftList,
    setter: setShift,
    isArrowsActive: false,
  }

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Toast ref={toastRef} />
      <Box sx={{
        width: '60%',
        height: '90%',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        border: '1px solid var(--smoke)',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 20px 10px 20px',
      }}>
        <Typography sx={{
          textAlign: 'center',
          color: 'var(--apple)',
          fontWeight: 'bold',
          borderBottom: '1px solid grey',
          marginBottom: '5px'
        }}>CVQS (TMMT)</Typography>
        {loading ? (
          <SkeletonComponent />
        ) : (<>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{
              paddingX: '12.5%'
            }}>
              <LoginElement whichComponent="dropdown" label="terminalList" {...terminalList} />
              <LoginElement whichComponent="textInput" label={labels.registrationNo} {...registrationNoInput} />
              <LoginElement whichComponent="textInput" label={labels.password} {...passwordInput} />
              <LoginElement whichComponent="textInput" label={labels.assemblyNo} {...assemblyNoInput} />
              <Stack direction="row" spacing={10} sx={{
                background: shift.rgbColor,
                padding: 1,
                borderRadius: '5px'
              }}>
                <LoginElement whichComponent="datePicker" label="date" />
                <LoginElement whichComponent="dropdown" label="shift" {...shiftDropdown} />
              </Stack>
              <Stack direction="row">
                <Button variant="dark" type="submit" >logIn</Button>
                <Button variant="danger" type="button">close</Button>
              </Stack>
            </Box>
          </form>
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            onChangeAll={onChangeAll}
            layoutName={layout}
            onKeyPress={onKeyPress}
            inputName={inputName}
          />
          <Typography sx={{
            color: 'var(--apple)',
            fontWeight: 'bold',
            textAlign: 'end',
          }}>TEKNİK DESTEK</Typography>
        </>)
        }
      </Box>
    </Box>
  );
}

export default TerminalLoginPage;
