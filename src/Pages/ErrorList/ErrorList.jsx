import React, { useState, useEffect, useRef, useCallback } from 'react';
import Error from '../../Components/Error/Error';
import { useFetch } from '../../Hooks';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import ShiftArrows from '../../Components/ShiftArrows/ShiftArrows';

import './ErrorList.css'

function ErrorListPage() {
  const { errors, loading, error } = useFetch();
  const [defectList, setDefectList] = useState([]);
  const [list, setList] = useState([]);
  const [assyNo, setAssyNo] = useState("");
  const [page, setPage] = useState(1);
  const scroller = useRef(null);
  const pageSize = 15;

  const defects = async () => {
    let updatedDefectList = errors[0].defectList;
    setList(oldList => [...oldList, ...updatedDefectList]);
    setDefectList((defect) => [...defect, ...updatedDefectList.slice(0, 15)]);
  }

  useEffect(() => {
    defects();
  }, [errors]);

  const loadMoreError = () => {
    setDefectList((defect) => [...defect, ...list.slice(((page - 1) * pageSize), page * pageSize)]);
  };

  const observer = useRef();
  const lastErrorElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(entries[0]);
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    []
  );

  useEffect(() => {
    loadMoreError();
  }, [page]);

  const findAssyNo = () => {
    setDefectList(defectList.filter(defect => {
      return defect.assyNo === assyNo;
    }))
  }

  const onChange = (event) => {
    const inputVal = event.target.value;
    setAssyNo(inputVal);
  }

  return (
    <div className='error-list'>
      <div className='list' ref={scroller}>
        <table>
          <thead className='table-head'>
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
          <tbody className='table-body'>
            {loading ? (
              <p>loading...</p>
            ) : (
              defectList.map((item, index) => {
                const isLastElement = defectList.length === index + 1;
                return (
                  isLastElement ? (
                    <Error key={index} errorItem={item} ref={lastErrorElementRef} />
                  ) : (<Error key={index} errorItem={item} />)
                )
              })
            )
            }
          </tbody>
        </table>
      </div>
      <div className='menu'>
        {
          !loading && <div className='total-rows'>Total Rows: {list.length}</div>
        }
        <div className='sub-menu'>
          <div className='search'>
            <div className='montaj-no'>
              <p>MONTAJ NO </p>
              <Input type="text" value={assyNo} onChange={onChange} />
              <Button size="slim" onClick={findAssyNo}>ARA</Button>
            </div>
            <div className='body-no'>
              <p>BODY NO </p>
              <Input type="text" />
              <Button className="search-btn" size="slim">ARA</Button>
            </div>
          </div>
          <div className='shifts'>
            <ShiftArrows refList={scroller} />
          </div>
          <div className='buttons'>
            <Button size="full">ARAÇ LİSTESİ</Button>
            <Button size="full">MANUAL HATA</Button>
            <Button size="full">ÇOKLU HATA</Button>
            <Button size="full">HATA LİSTESİ</Button>
            <Button size="full">HATA KOPYA</Button>
            <Button size="full">ÇIKIŞ</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorListPage;
