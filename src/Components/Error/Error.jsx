import React, { useState, useEffect } from 'react';
import { useFetch } from '../../Hooks';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

import './Error.css'

function Error({ errorItem }) {
  const { errors, loading, error } = useFetch();
  const [nrReasonList, setNrReasonList] = useState([]);

  const reasonList = async () => {
    let updatedNrReasonList = errors[0].nrReasonList;
    setNrReasonList([...updatedNrReasonList]);
  }

  useEffect(() => {
    reasonList();
  }, [errors]);

  return (
    <tr className='error-list-item'>
      <td>{errorItem.depCode}</td>
      <td>{errorItem.bodyNo}</td>
      <td>{errorItem.assyNo}</td>
      <td>{errorItem.vinNo}</td>
      <td><div className='color-section' style={{ background: errorItem.rgbCode }}>{errorItem.colorExtCode}</div></td>
      <td>{errorItem.modelCode}</td>
      <td>{errorItem.localId}</td>
      <td><a href="url">{errorItem.partName}</a></td>
      <td>{ }</td>
      <td>{ }</td>
      <td>{ }</td>
      <td>{ }</td>
      <td>{errorItem.defectName}</td>
      <td>{errorItem.defrankCode}</td>
      <td>{errorItem.formattedDefectHour}</td>
      <td>{errorItem.defectType}</td>
      <td>{errorItem.defrespName}</td>
      <td>{ }</td>
      <td>
        <select>
          {
            nrReasonList.map(nrReason => {
              return (
                <option selected={nrReason.nrId == errorItem.nrReasonId}>{nrReason.nrReasonAbb}</option>
              )
            })
          }
        </select>
      </td>
      <td>
        <Button variant='dark' >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </Button>
      </td>
      <td>
        <div className='operation-section'>
          <Button variant='danger'><FontAwesomeIcon icon={faPen} /></Button>
          <Button variant='danger'><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
      </td>
    </tr>
  );
}

export default Error;
