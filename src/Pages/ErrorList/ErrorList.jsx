import React, { useState, useEffect } from 'react';
import Error from '../../Components/Error/Error';
import { useFetch } from '../../Hooks';

import './ErrorList.css'

function ErrorListPage() {
  const { errors, loading, error } = useFetch();
  const [defectList, setDefectList] = useState([]);

  const defects = async () => {
    let updatedDefectList = errors[0].defectList;
    setDefectList([...updatedDefectList]);
  }

  useEffect(() => {
    defects();
  }, [errors]);


  return (
    <div className='error-list'>
      <div className='list'>
        <table>
          <thead>
            <tr>
              <th>Bildiren</th>
              <th>Body</th>
              <th>Assy</th>
              <th>Vin No</th>
              <th>Renk</th>
              <th>Mdl</th>
              <th>Sicil</th>
              <th>Parca</th>
              <th>Spot</th>
              <th>Gun</th>
              <th>Arc</th>
              <th>ArcGun</th>
              <th>Hata</th>
              <th>Rank</th>
              <th>Saat</th>
              <th>Hata Türü</th>
              <th>Hata Sor</th>
              <th>Alt Sorumlu</th>
              <th>NR REASON</th>
              <th>Kaydet</th>
              <th>İşlem</th>
            </tr>
          </thead>
          {loading ? (
            <p>loading...</p>
          ) : (
            defectList.map((item, index) => {
              return (
                <Error errorItem={item} />
              )
            })
          )
          }
        </table>
      </div>
      <div className='menu'></div>
    </div>
  );
}

export default ErrorListPage;
