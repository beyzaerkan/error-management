import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [terminals, setTerminals] = useState([]);

  useEffect(()=>{
    axios.get("../data.json")
    .then(response => {
        setTerminals(response.data.terminals.data)
    })
})

  return (
    <div className="App">
      {terminals.map((element, index) => {
        return (
          <div key={index}>
            <h2> ({element.shopCode}) {element.depName}</h2>
            <hr />
          </div> 
        )
      })}
    </div>
  );
}

export default App;
