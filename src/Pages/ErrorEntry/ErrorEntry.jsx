import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar'
import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import BigFont from '../../Components/BigFont/BigFont'
import ErrorEntryImage from '../../Components/ErrorEntryImage/ErrorEntryImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import './ErrorEntry.css'
import { useFetch } from '../../Hooks';

function ErrorEntryPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const { defects, loading, error } = useFetch();
  const [list, setList] = useState([]);
  const imageRef = useRef(null);


  const defectList = async () => {
    let updatedDefectList = defects[0].defectButtonRecords;
    setList(oldList => [...oldList, ...updatedDefectList]);
  }

  useEffect(() => {
    defectList();
  }, [defects]);

  const errorList = () => {
    navigate(`/terminal/defcorrect`);
  }

  const showBigFont = () => {
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
    <div className='error-entry'>
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
                 <ErrorEntryImage errorList={list}/>
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

                  >
                    KAYDET VE GEÇ
                  </Button>
                  <Button
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
              </div>
              <p className='support'>TEKNİK DESTEK</p>
            </div>
          )
          : (<BigFont {...props} />)
      }
    </div>
  );
}

export default ErrorEntryPage;
