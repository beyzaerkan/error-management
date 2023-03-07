import React from 'react';
import './Terminal.css'
import Filter from './Filter/Filter';

function Terminal({ element }) {

  const filters = element.filterBaseds
  return (
      <tr>
        <td className='section' >({element.shopCode}) {element.depName}</td>
        <td className='filter'>
          {filters.map((item, index) => {
            return (
              <Filter key={index} terminal={item} selected={element}/>
            )
          })}
          </td> 
      </tr>
  );
}

export default Terminal;
