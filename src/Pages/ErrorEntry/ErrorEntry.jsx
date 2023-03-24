import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar'
import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import BigFont from '../../Components/BigFont/BigFont'
import ErrorEntryForm from '../../Components/ErrorEntryForm/ErrorEntryForm';
import ErrorEntryImage from '../../Components/ErrorEntryImage/ErrorEntryImage';
import Toast from '../../Components/Toast/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { useFetch, useMouse } from '../../Hooks';
import './ErrorEntry.css';
import { ErrorEntryContext } from '../../Context';

function ErrorEntryPage() {
  const { defects, nrReasons, dropdowns, loading, error } = useFetch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [list, setList] = useState([]);
  const [nrReasonList, setNrReasons] = useState([]);
  const [dropdownList, setDropdowns] = useState([]);
  const [isSubImageOpen, setIsSubImageOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isErrorEntryOpen, setIsErrorEntryOpen] = useState(false);
  const [selectedError, setSelectedError] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [options, setOptions] = useState([]);
  const [reset, setReset] = useState(false);
  const [description, setDescription] = useState(null);
  const [process, setProcess] = useState(null);
  const [errorResbonsibility, setErrorResposibility] = useState(null);
  const [errorClass, setErrorClass] = useState(null);
  const [exitDepartment, setExitDepartment] = useState(null);
  const [subResponsible, setSubResponsible] = useState(null);
  const imageRef = useRef(null);
  const toastRef = useRef(null);
  const { x, y } = useMouse(imageRef);

  const data = {
    isSubImageOpen,
    setIsSubImageOpen,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedError,
    setSelectedError,
    imageRef,
    options,
    setOptions,
    selectedPart,
    setSelectedPart,
    x,
    y,
    setIsErrorEntryOpen,
  }

  const defectList = async () => {
    let updatedDefectList = defects[0].defectButtonRecords;
    setList(oldList => [...oldList, ...updatedDefectList]);
    setNrReasons(nrReasons.map((item) => {
      return {
        ...item,
        displayName: item.nrReasonAbb,
      }
    }));
    setDropdowns({
      models: dropdowns.models.map((item) => {
        return {
          ...item,
          displayName: item.modelCode,
        }
      }),
      defectClass: dropdowns.requiredFieldsByInspectionDTOList[4].errDetailComboBoxValueDTOList.map((item) => {
        return {
          ...item,
          displayName: item.dataValue,
        }
      }),
      defectResponsibles: dropdowns.requiredFieldsByInspectionDTOList[5].errDetailComboBoxValueDTOList.map((item) => {
        return {
          ...item,
          displayName: item.dataValue,
        }
      }),
      subResponsiblesByDefrespId: dropdowns.subResponsiblesByDefrespId.map((item) => {
        return {
          ...item,
          displayName: "",
        }
      }),
    });
  }

  const saveError = () => {
    // console.log(
    //   x,
    //   y,
    //   errorResbonsibility,
    //   errorClass,
    //   exitDepartment,
    //   subResponsible,
    //   description,
    //   process
    // );
    setIsErrorEntryOpen(false);
    toastRef.current.showToast("Başarılı bir şekilde kaydedildi");
    
  }

  const cancel = () => {
    setIsErrorEntryOpen(false);
  }

  useEffect(() => {
    defectList();
  }, [defects, nrReasons, dropdowns]);

  const errorList = () => {
    navigate(`/terminal/defcorrect`);
  }

  useEffect(() => {
    if (selectedPart !== null) {
      setIsButtonDisable(false);
    }
    console.log(selectedPart);
  }, [selectedPart]);

  const showBigFont = () => {
    setIsVisible(false);
  }

  const firstImage = () => {
    setReset(!reset);
  }

  const props = {
    assyNo: state.assyNo,
    bodyNo: state.bodyNo,
    rgbColor: state.rgbColor,
    extCode: state.extCode,
    bgColor: state.bgColor,
    user: (state.firstname + ' ' + state.lastname).toUpperCase(),
    departmentCode: state.departmentCode,
    modelName: state.modelName,
    setIsVisible,
    nameList: [
      {
        "partName": "ECI PAR DENEME",
        "description": "test",
        "defectName": "ARACI VPI ANALİZ 'E AYIRIN"
      },
      {
        "partName": "CHASSIS PROSES",
        "defectName": "KONTROL EDİLEMEDİ"
      },
      {
        "partName": "A/C TUBE",
        "description": "örnek açıklama",
        "defectName": "DEFORME"
      }
    ]
  }

  return (
    <ErrorEntryContext.Provider value={data}>
      <div className='error-entry'>
        <Toast ref={toastRef} background={"warning"} />
        {
          isErrorEntryOpen &&
          <ErrorEntryForm
            nrReasons={nrReasonList}
            dropdowns={dropdownList}
            description={description}
            process={process}
            setErrorResposibility={setErrorResposibility}
            setErrorClass={setErrorClass}
            setExitDepartment={setExitDepartment}
            setSubResponsible={setSubResponsible}
            saveError={saveError}
            cancel={cancel}
          />
        }
        {
          isVisible ?
            (
              <div className='container'>
                <Navbar
                  rgbColor={state.rgbColor}
                  assyNo={state.assyNo}
                  bodyNo={state.bodyNo}
                  extCode={state.extCode}
                  bgColor={state.bgColor}
                  user={(state.firstname + ' ' + state.lastname).toUpperCase()}
                  departmentCode={state.departmentCode}
                ></Navbar>
                <div className='main'>
                  <div className='image'>
                    <ErrorEntryImage errorList={list} setErrorList={setList} />
                  </div>
                  <div className='side-menu'>
                    <span><FontAwesomeIcon icon={faSquare} size="2x" /> HARİGAMİ</span>
                    <span><FontAwesomeIcon icon={faSquare} size="2x" /> RDD</span>
                    <Button
                      disabled={true}
                    >
                      HIZLI KAYDET
                    </Button>
                    <Button
                      disabled={true}
                    >
                      KAYDET VE GEÇ
                    </Button>
                    <Button
                      disabled={isButtonDisable}
                      onClick={() => setIsErrorEntryOpen(true)}
                    >
                      HATA KAYIT
                    </Button>
                    <div className='montaj-title'>MONTAJ NO</div>
                    <Input
                      value={state.assyNo}></Input>
                    <Button
                    >
                      ARA
                    </Button>
                    <Button
                    >
                      TERMİNAL İLK RESMİ
                    </Button>
                    <Button
                    >
                      SIK GELEN HATA
                    </Button>
                    <Button
                    >
                      MANİFEST
                    </Button>
                  </div>
                </div>
                <div className='submenu'>
                  <div className='button'>
                    <Button>ÇIKIŞ</Button>
                    <Button onClick={firstImage}>MODEL İLK RESMİ</Button>
                    <Button> &#60; GERİ </Button>
                    <Button
                      onClick={errorList}
                    >
                      HATA LİSTESİ
                    </Button>
                    <Button> TEMİZLE </Button>
                    <Button onClick={showBigFont}> BÜYÜK FONT </Button>
                  </div>
                  <div className='selected'>
                    {selectedPart && <span>{selectedPart.defectName}</span>}
                  </div>
                </div>
                <div className='selected-error'>
                {selectedError && <span className='errror'>{selectedError.labelText}</span>}
                <span className='support-title'>TEKNİK DESTEK</span>
                </div>
              </div>
            )
            : (<BigFont {...props} />)
        }
      </div>
    </ErrorEntryContext.Provider>
  );
}

export default ErrorEntryPage;
