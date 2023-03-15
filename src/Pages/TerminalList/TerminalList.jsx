import React, { useEffect, useState } from 'react';
import { useFetch } from '../../Hooks';
import Terminal from '../../Components/Terminal/Terminal'
import './TerminalList.css'

function TerminalListPage() {
  const { terminals, loading, error } = useFetch();

  const [terminalList, setTerminalList] = useState([]);

  useEffect(() => {
    setTerminalList(terminals);
  },[terminals]);

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
        {loading ? (
            <p>loading...</p>
          ) : terminalList.map((element, index) => {
            return (
              <tbody>
                <Terminal key={index} element={element} />
              </tbody>
            )
          })
          }
      </table>
    </div>
  );
}

export default TerminalListPage;
