import React, { useEffect } from 'react';
import LoginElement from '../LoginElement/LoginElement';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import './ErrorEntryForm.css';

function ErrorEntryForm({ nrReasons, dropdowns, description, process, setErrorResposibility, setErrorClass, setExitDepartment, setSubResponsible, saveError, cancel }) {
  useEffect(() => {
    console.log(nrReasons);
  })

  const errorRes = {
    options: nrReasons,
    setter: setErrorResposibility,
    isArrowsActive: false,
  }

  const errorCls = {
    options: nrReasons,
    setter: setErrorClass,
    isArrowsActive: false,
  }
  const exitDepart = {
    options: nrReasons,
    setter: setExitDepartment,
    isArrowsActive: false,
  }
  const subResp = {
    options: nrReasons,
    setter: setSubResponsible,
    isArrowsActive: false,
  }

  const processInput = {
    value: process,
    type: "text",
    // onFocus: () => {
    //   setInputName()
    // },
    //onChange: onChangeInput,
  }

  const descriptionInput = {
    value: description,
    type: "text",
    // onFocus: () => {
    //   setInputName()
    // },
    //onChange: onChangeInput,
  }


  return (
    <div className='error-entry-modal'>
      <div className='modal-container'>
        <div className='top'>
          CVQS (TMMMT) <span><FontAwesomeIcon icon={faSquare} size="2x" /> SIK GELEN HATA</span>
        </div>
        <div className='modal-form'>
          <div className='error-resp'>
            <LoginElement whichComponent="dropdown" label="Hata Sorumlusu" {...errorRes} />
            <span><FontAwesomeIcon icon={faSquare} size="2x" /> Harigami</span>
            <LoginElement whichComponent="dropdown" {...errorRes} />
          </div>
          <div className='error-class'>
            <LoginElement whichComponent="dropdown" label="Hata Sınıfı" {...errorCls} />
            <Button variant={"danger"} size="slim" onClick={saveError}>KAYDET</Button>
            <Button variant={"danger"} size="slim" onClick={cancel}>İPTAL</Button>
          </div>
          <div className='exit-department'> <LoginElement whichComponent="dropdown" label="Exit Department" {...exitDepart} /></div>
          <div className='description'>
            <LoginElement whichComponent="textInput" label={"Açıklama"} {...descriptionInput} />
          </div>
          <div className='process'><LoginElement whichComponent="textInput" label={"Yapılan İşlem"} {...processInput} /> </div>
          <div className='sub-resp'> <LoginElement whichComponent="dropdown" label="Alt Sorumlu" {...subResp} /></div>
        </div>
        <div>keyboard</div>
      </div>
    </div>
  )
}

export default ErrorEntryForm;
