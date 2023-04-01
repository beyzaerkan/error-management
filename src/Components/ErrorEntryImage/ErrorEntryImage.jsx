import React, { useState, useEffect, useContext } from 'react';
import { useFetch } from '../../Hooks/index';
import ErrorSquare from '../ErrorSquare/ErrorSquare';
import Cursor from '../Cursor/Cursor';
import {Box} from '@mui/material';
import { ErrorEntryContext } from '../../Context';
import './ErrorEntryImage.css';

function ErrorEntryImage() {
  const { errorDetail, loading, error } = useFetch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [selectedErrrorDetail, setSelectedErrorDetail] = useState("");

  const {
    isSubImageOpen,
    setIsSubImageOpen,
    selectedError,
    setSelectedError,
    imageRef,
    setOptions,
    selectedPart,
    setSelectedPart,
    list,
    setList,
    x,
    y,
    imageUrl,
    setImageUrl,
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
    setSelectedError(shape);
    if (shape.boxColor === "blue") {
      setSelectedPart(null);
      setIsSubImageOpen(true);
      setList([
        {
          "buttonId": 700469,
          "picId": 87897,
          "childPicID": 0,
          "boxX": 441,
          "boxY": 65,
          "lineX": 300,
          "lineY": 250,
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
      setImageUrl("https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80");
    } else {
      setOptions(selectedErrrorDetail.partDefects);
      setIsDropdownOpen(!isDropdownOpen);
      shape.isDropdownOpen = isDropdownOpen;
    }
  }

  return (
    <Box sx={{
      width:'100%',
      height:'100%',
      border: '1px solid black'
    }}>
      <img ref={imageRef} src={imageUrl} alt="" />
      {
        selectedPart && isSubImageOpen ?
          (<Cursor x={x} y={y} />)
          :
          (
            list.map((shape, index) => {
              return (
                <ErrorSquare
                  key={index}
                  box={shape}
                  handleClick={() => {
                    handleClick(shape)
                  }}
                />
              )
            })
          )
      }
    </Box>
  )
}

export default ErrorEntryImage;
