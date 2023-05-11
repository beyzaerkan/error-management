import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar'
import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import BigFont from '../../Components/BigFont/BigFont'
import DefectEntryForm from '../../Components/DefectEntryForm/DefectEntryForm';
import DefectEntryImage from '../../Components/DefectEntryImage/DefectEntryImage';
import Toast from '../../Components/Toast/Toast';
import BlockUI from '../../Components/BlockUI/BlockUI';
import { useFetch, useMouse } from '../../Hooks';
import { Box, Grid, Stack, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { DefectEntryContext } from '../../Context';

function DefectEntryPage() {
  const { defects, nrReasons, dropdowns, loading, error } = useFetch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [list, setList] = useState([]);
  const [nrReasonList, setNrReasons] = useState([]);
  const [dropdownList, setDropdowns] = useState([]);
  const [isSubImageOpen, setIsSubImageOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDefectEntryOpen, setIsDefectEntryOpen] = useState(false);
  const [selectedDefect, setSelectedDefect] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [options, setOptions] = useState([]);
  const [description, setDescription] = useState(null);
  const [process, setProcess] = useState(null);
  const [defectResbonsibility, setDefectResposibility] = useState(null);
  const [defectClass, setDefectClass] = useState(null);
  const [exitDepartment, setExitDepartment] = useState(null);
  const [rdd, setRdd] = useState(null);
  const [fixType, setFixType] = useState(null);
  const [fixMethod, setFixMethod] = useState(null);
  const [imageUrl, setImageUrl] = useState("https://www.autopartspro.co.uk/tips-advice/wp-content/uploads/2018/04/Unterbodenschutz1-2.jpg");
  const [blocking, setBlocking] = useState(false);
  const imageRef = useRef(null);
  const toastRef = useRef(null);
  const { x, y } = useMouse(imageRef);
  const [duration, setDuration] = useState(10);
  const [audio] = useState(new Audio("https://www.soundjay.com/mechanical/sounds/smoke-detector-1.mp3"));
  let updatedDefectList = [];
  let timerId;

  useEffect(() => {
    timerId = setInterval(() => {
      setDuration(prev => prev - 1);
    }, 1000);


    if (duration === 0 && isDefectEntryOpen === false) {
      toastRef.current.showToast("Hala hata girişi yapılmadı", "warning");
      clearInterval(timerId);
      audio.play();
    }

    return () => {
      clearInterval(timerId);
      audio.pause();
    };
  }, [duration]);

  const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const navigatePage = async () => {
    await wait(2000);
    setBlocking(false);
  };

  const data = {
    isSubImageOpen,
    setIsSubImageOpen,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedDefect,
    setSelectedDefect,
    imageRef,
    options,
    setOptions,
    selectedPart,
    setSelectedPart,
    list,
    setList,
    x,
    y,
    setIsDefectEntryOpen,
    imageUrl,
    setImageUrl,
    setDescription,
    setProcess,
    setDefectResposibility,
    setDefectClass,
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
    setIsDefectEntryOpen(false);
    setDescription(null);
    setProcess(null);
    setDefectResposibility(null);
    setDefectClass(null);
    setExitDepartment(null);
    setRdd(null);
    setFixType(null);
    setFixMethod(null);
  }

  const saveDefect = async () => {
    clearInterval(timerId);
    audio.pause();
    setIsDefectEntryOpen(false);
    setBlocking(true);
    toastRef.current.showToast(JSON.stringify({
      x,
      y,
      selectedDefect: selectedDefect.labelText,
      selectedPart: selectedPart.defectName,
      defectResbonsibility: defectResbonsibility.displayName,
      defectClass: defectClass.displayName,
      exitDepartment: exitDepartment.displayName,
      rdd: rdd.displayName,
      fixType: fixType.displayName,
      fixMethod: fixMethod.displayName,
      description,
      process
    }, null, 2), "success");

    await navigatePage();
    await refreshPage();
  }

  const goToDefectListPage = () => {
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
    setSelectedDefect(null);
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
    <DefectEntryContext.Provider value={data}>
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <BlockUI blocking={blocking} />
        <Toast ref={toastRef} />
        {
          isDefectEntryOpen &&
          <DefectEntryForm
            nrReasons={nrReasonList}
            dropdowns={dropdownList}
            saveDefect={saveDefect}
            cancel={refreshPage}
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
            <DefectEntryImage />
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
                quickSave
              </Button>
              <Button
                disabled={true}
                size="large"
              >
                saveAndSkip
              </Button>
              <Button
                disabled={isButtonDisable}
                onClick={() => setIsDefectEntryOpen(true)}
                size="large"
              >
                saveDefect
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
                search
              </Button>
              <Button
                size="large"
                onClick={firstImage}
              >
                terminalFirstImage
              </Button>
              <Button
                size="large"
              >
                commonMistake
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
                <Button>exit</Button>
                <Button>modelFirstImage</Button>
                <Button>back</Button>
                <Button
                  onClick={goToDefectListPage}
                >
                  defectList
                </Button>
                <Button>clear</Button>
                <Button onClick={showBigFont}>bigFont</Button>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              {selectedPart && <Typography fontWeight={'bold'}>{selectedPart.defectName}</Typography>}
            </Grid>
          </Grid>
          <Box position='relative'>
            {selectedDefect && <Typography fontWeight='bold' display='inline-block'>{selectedDefect.labelText}</Typography>}
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
    </DefectEntryContext.Provider>
  );
}

export default DefectEntryPage;
