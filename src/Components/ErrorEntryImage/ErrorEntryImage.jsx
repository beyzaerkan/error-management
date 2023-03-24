import React, { useState, useEffect, useContext } from 'react';
import { useFetch } from '../../Hooks/index';
import ErrorSquare from '../ErrorSquare/ErrorSquare';
import { ErrorEntryContext } from '../../Context';
import Cursor from '../Cursor/Cursor';
import './ErrorEntryImage.css';

function ErrorEntryImage({ errorList, setErrorList }) {
  const { errorDetail, loading, error } = useFetch();
  const [selectedErrrorDetail, setSelectedErrorDetail] = useState("");

  const {
    isSubImageOpen,
    setIsSubImageOpen,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedError,
    setSelectedError,
    imageRef,
    setOptions,
    selectedPart,
    x,
    y,
  } = useContext(ErrorEntryContext);

  const errorDetails = async () => {
    let updatedDefectList = errorDetail[0];
    setSelectedErrorDetail({
      partDefects: updatedDefectList.partDefects,
      spotDefects: updatedDefectList.spotDefects,
      arcDefects: updatedDefectList.arcDefects,
      nutDefects: updatedDefectList.nutDefects,
      boltDefects: updatedDefectList.boltDefects,
      defectButtonRecords: updatedDefectList.defectButtonRecords[0],
    });
  }

  useEffect(() => {
    errorDetails();
  }, [errorDetail])

  const handleClick = (shape) => {
    setSelectedError(shape)
    if (shape.boxColor === "blue") {
      setErrorList([
        {
          "buttonId": 700469,
          "picId": 87897,
          "childPicID": 0,
          "boxX": 441,
          "boxY": 65,
          "lineX": 348,
          "lineY": 279,
          "boxColor": "red",
          "labelColor": "red",
          "boxWidth": 80,
          "boxHeight": 80,
          "labelText": "A/C TUBE",
          "buttonType": "P",
          "locId11": 0,
          "locId12": 0,
          "locId13": 0,
          "partId1": 6605,
          "locId21": 0,
          "locId22": 0,
          "locId23": 0,
          "partId2": 0,
          "locId31": 0,
          "locId32": 0,
          "locId33": 0,
          "partId3": 0,
          "spotId": 0,
          "arcnutboltId": null,
          "wisNo": null,
          "defRespId": 0,
          "defClsId": 0
        }
      ])
      imageRef.current.src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
    } else {
      console.log("kırmızı veya yeşil");
      setOptions(selectedErrrorDetail.partDefects);
    }
  }

  return (
    <div className='image-mapper'>
      <img ref={imageRef} src="https://www.autopartspro.co.uk/tips-advice/wp-content/uploads/2018/04/Unterbodenschutz1-2.jpg" alt="" />
      {
        selectedPart && selectedError.boxColor === "blue" ?
          (<Cursor x={x} y={y} />)
          :
          (
            errorList.map((shape, index) => {
              return (
                <ErrorSquare
                  key={index}
                  coord={{ x: shape.boxX, y: shape.boxY }}
                  size={{ width: shape.boxWidth, height: shape.boxHeight }}
                  color={shape.boxColor}
                  labelText={shape.labelText}
                  handleClick={() => {
                    handleClick(shape)
                    shape.isDropdownOpen = true;
                  }}
                  isDropdownOpen={shape.isDropdownOpen}
                />
              )
            })
          )
      }
    </div>
  )
}

export default ErrorEntryImage;
