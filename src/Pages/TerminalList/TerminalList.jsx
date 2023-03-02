import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Terminal from '../../Components/Terminal/Terminal'
import './TerminalList.css'

function TerminalListPage() {
  const [terminals, setTerminals] = useState([]);

  useEffect(()=>{
    axios.get("../data.json")
    .then(response => {
        setTerminals(response.data.terminals.data)
    })
})

  return (
    <div className="terminal-list">
      <div className='title'>TÜM TERMİNALLER</div>
      <table>
        <thead>
          <tr>
            <th>BÖLÜM BAZINDA</th>
            <th>FİLTRE BAZINDA</th>
          </tr>
        </thead>
        <tbody>
        {terminals.map((element, index) => {
            return (
              <Terminal key={index} element={element}/>
            )
        })}
        </tbody>
      </table>
    </div>
  );
}

export default TerminalListPage;
