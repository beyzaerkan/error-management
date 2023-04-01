import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar'
import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import BigFont from '../../Components/BigFont/BigFont'
import ErrorEntryForm from '../../Components/ErrorEntryForm/ErrorEntryForm';
import ErrorEntryImage from '../../Components/ErrorEntryImage/ErrorEntryImage';
import Toast from '../../Components/Toast/Toast';
import { useFetch, useMouse } from '../../Hooks';
import { Box, Grid, Stack, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { ErrorEntryContext } from '../../Context';

function ErrorEntryPage() {
  const { defects, nrReasons, dropdowns, loading, error } = useFetch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
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
  const [rdd, setRdd] = useState(null);
  const [fixType, setFixType] = useState(null);
  const [fixMethod, setFixMethod] = useState(null);
  const [imageUrl, setImageUrl] = useState("https://www.autopartspro.co.uk/tips-advice/wp-content/uploads/2018/04/Unterbodenschutz1-2.jpg");
  const imageRef = useRef(null);
  const toastRef = useRef(null);
  const { x, y } = useMouse(imageRef);
  const [audio] = useState(new Audio("https://www.soundjay.com/mechanical/sounds/smoke-detector-1.mp3"));
  audio.muted = true;
  let updatedDefectList = [];


  useEffect(() => {
    let timeoutId = setTimeout(() => {
      toastRef.current.showToast("User didn't interact with page", "danger");
      audio.addEventListener("canplaythrough", () => {
        audio.play().catch(e => {
          document.addEventListener('click', () => {
            audio.play();
          })
        })
      })
    }, 5000);

    const handleMouseClick = () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleMouseClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };

    const handleMouseMove = () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleMouseClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };

    document.addEventListener("click", handleMouseClick);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleMouseClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };

  });

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
    list,
    setList,
    x,
    y,
    setIsErrorEntryOpen,
    imageUrl,
    setImageUrl,
    setDescription,
    setProcess,
    setErrorResposibility,
    setErrorClass,
    setExitDepartment,
    setRdd,
    setFixType,
    setFixMethod,
    shiftId: state.shiftId
  }


  const defectList = async () => {
    if (!defects[0]) {
      return;
    }

    updatedDefectList = defects[0].defectButtonRecords;
    setList(oldList => [...oldList, ...updatedDefectList]);

    setNrReasons(nrReasons.map((item) => {
      return {
        ...item,
        displayName: item.nrReasonAbb,
      }
    }));
    setDropdowns({
      defectResponsibles: dropdowns.requiredFieldsByInspectionDTOList[5].errDetailComboBoxValueDTOList.map((item) => {
        return {
          ...item,
          displayName: item.dataValue,
        }
      }),
      defectClass: dropdowns.requiredFieldsByInspectionDTOList[4].errDetailComboBoxValueDTOList.map((item) => {
        return {
          ...item,
          displayName: item.dataValue,
        }
      }),
      exitDepartments: dropdowns.requiredFieldsByInspectionDTOList[0].errDetailComboBoxValueDTOList.map((item) => {
        return {
          ...item,
          displayName: item.dataValue,
        }
      }),
      fixTypes: [
        { displayName: "Inline" },
        { displayName: "Offline" },
      ],
    });
  }

  useEffect(() => {
    defectList();
  }, [defects, nrReasons, dropdowns]);

  const refreshPage = async () => {
    firstImage();
    setIsVisible(false);
    setIsErrorEntryOpen(false);
    setDescription(null);
    setProcess(null);
    setErrorResposibility(null);
    setErrorClass(null);
    setExitDepartment(null);
    setRdd(null);
    setFixType(null);
    setFixMethod(null);
  }

  const saveError = () => {
    setIsErrorEntryOpen(false);
    toastRef.current.showToast(JSON.stringify({
      x,
      y,
      selectedError: selectedError.labelText,
      selectedPart: selectedPart.defectName,
      errorResbonsibility: errorResbonsibility.displayName,
      errorClass: errorClass.displayName,
      exitDepartment: exitDepartment.displayName,
      rdd: rdd.displayName,
      fixType: fixType.displayName,
      fixMethod: fixMethod.displayName,
      description,
      process
    }, null, 2), "success");

    refreshPage();
  }

  const cancel = () => {
    setIsErrorEntryOpen(false);
  }

  const errorList = () => {
    navigate(`/terminal/defcorrect`);
  }


  useEffect(() => {
    if (selectedPart !== null) {
      setIsButtonDisable(false);
    }
  }, [selectedPart]);

  const showBigFont = () => {
    setIsVisible(true);
  }

  const firstImage = () => {
    updatedDefectList = defects[0].defectButtonRecords;
    setList([...updatedDefectList]);
    setIsSubImageOpen(false);
    setImageUrl("https://www.autopartspro.co.uk/tips-advice/wp-content/uploads/2018/04/Unterbodenschutz1-2.jpg");
    setSelectedError(null);
    setSelectedPart(null);
    setOptions(null);
    setIsButtonDisable(true);
  }

  const backToPage = () => {
    setIsVisible(false);
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
    backToPage,
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
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Toast ref={toastRef} />
        {
          isErrorEntryOpen &&
          <ErrorEntryForm
            nrReasons={nrReasonList}
            dropdowns={dropdownList}
            saveError={saveError}
            cancel={cancel}
          />
        }
        {
          isVisible && <BigFont {...props} />
        }

        <Box
          sx={{
            width: '70%',
            height: '95%',
            borderRadius: '12px',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            border: '1px solid var(--smoke)',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 20px 10px 20px',
          }}
        >
          <Navbar
            rgbColor={state.rgbColor}
            assyNo={state.assyNo}
            bodyNo={state.bodyNo}
            extCode={state.extCode}
            bgColor={state.bgColor}
            user={(state.firstname + ' ' + state.lastname).toUpperCase()}
            departmentCode={state.departmentCode}
          />

          <Box display='flex' width='100%' height='80%' >
            <ErrorEntryImage />
            <Box sx={{
              flex: '30%',
              margin: '0 10px',
            }}>
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Harigami"
                labelPlacement="end"
                sx={{
                  fontWeight: 'bold',
                  '& .MuiSvgIcon-root': {
                    fontSize: 40
                  }
                }}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="RDD"
                labelPlacement="end"
                sx={{
                  fontWeight: 'bold',
                  '& .MuiSvgIcon-root': {
                    fontSize: 40
                  }
                }}
              />
              <Button
                disabled={true}
                size="large"
              >
                HIZLI KAYDET
              </Button>
              <Button
                disabled={true}
                size="large"
              >
                KAYDET VE GEÇ
              </Button>
              <Button
                disabled={isButtonDisable}
                onClick={() => setIsErrorEntryOpen(true)}
                size="large"
              >
                HATA KAYIT
              </Button>
              <Typography sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                zIndex: 5
              }}>MONTAJ NO</Typography>
              <Input
                value={state.assyNo}></Input>
              <Button
                size="large"
              >
                ARA
              </Button>
              <Button
                size="large"
                onClick={firstImage}
              >
                TERMİNAL İLK RESMİ
              </Button>
              <Button
                size="large"
              >
                SIK GELEN HATA
              </Button>
              <Button
                size="large"
              >
                MANİFEST
              </Button>
            </Box>
          </Box>
          <Grid container spacing={12} alignItems='center'>
            <Grid item xs={9}>
              <Stack direction="row">
                <Button>ÇIKIŞ</Button>
                <Button>MODEL İLK RESMİ</Button>
                <Button> &#60; GERİ </Button>
                <Button
                  onClick={errorList}
                >
                  HATA LİSTESİ
                </Button>
                <Button> TEMİZLE </Button>
                <Button onClick={showBigFont}> BÜYÜK FONT </Button>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              {selectedPart && <Typography fontWeight={'bold'}>{selectedPart.defectName}</Typography>}
            </Grid>
          </Grid>
          <Box position='relative'>
            {selectedError && <Typography fontWeight='bold' display='inline-block'>{selectedError.labelText}</Typography>}
            <Typography sx={{
              position: 'absolute',
              color: 'var(--apple)',
              right: 0,
              fontWeight: 'bold',
              display: 'inline-block',
            }}>TEKNİK DESTEK</Typography>
          </Box>
        </Box>
      </Box>
    </ErrorEntryContext.Provider>
  );
}

export default ErrorEntryPage;
