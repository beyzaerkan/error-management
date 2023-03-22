
import React, { useState, useRef, useEffect } from 'react';
import { useFetch, useMouse } from '../../Hooks/index';
import ErrorSquare from '../ErrorSquare/ErrorSquare';
import './ErrorEntryImage.css';

function ErrorEntryImage({ errorList }) {
  const {errorDetail, loading, error} = useFetch();
  const imageRef = useRef(null);
  const [isSubImageOpen, setIsSubImageOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedError, setSelectedError] = useState("");
  const [selectedErrrorDetail, setSelectedErrorDetail] = useState("");


  const handleClick = (shape) => {
    if (shape.boxColor === "blue") {
      setIsSubImageOpen(true);
      let updatedDefectList = errorDetail[0];
      setSelectedErrorDetail({
        partDefects: updatedDefectList.partDefects,
        spotDefects: updatedDefectList.spotDefects,
        arcDefects: updatedDefectList.arcDefects,
        nutDefects: updatedDefectList.nutDefects,
        boltDefects: updatedDefectList.boltDefects,
        defectButtonRecords: updatedDefectList.defectButtonRecords[0],
      });
      setSelectedError(shape);
      imageRef.current.src = "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    } else {
      console.log("kırmızı veya yeşil");
    }
    setIsDropdownOpen(true);
  }

  return (
    <div className='image-mapper'>
      <img ref={imageRef} src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
      {
        isSubImageOpen ? (
          <>
          <ErrorSquare
            coord={{ x: selectedErrrorDetail.defectButtonRecords.boxX, y: selectedErrrorDetail.defectButtonRecords.boxY }}
            size={{ width: selectedErrrorDetail.defectButtonRecords.boxWidth, height: selectedErrrorDetail.defectButtonRecords.boxHeight }}
            color={selectedErrrorDetail.defectButtonRecords.boxColor}
            labelText={selectedErrrorDetail.defectButtonRecords.labelText}
            imageRef={imageRef}
            handleClick={() => setIsDropdownOpen(true)}
            options={selectedErrrorDetail.partDefects}
            isDropdownOpen={isDropdownOpen}
            />
          </>
        ) :
          (
            errorList.map((shape, index) => (
              <ErrorSquare
                key={index}
                coord={{ x: shape.boxX, y: shape.boxY }}
                size={{ width: shape.boxWidth, height: shape.boxHeight }}
                color={shape.boxColor}
                labelText={shape.labelText}
                imageRef={imageRef}
                handleClick={() => handleClick(shape)}
                isDropdownOpen={isDropdownOpen}
              />
            ))
          )
      }

    </div>
  )
}

export default ErrorEntryImage;
