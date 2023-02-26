/*
 * author: Colton Tshudy
 * version: 2/24/2023
 */

import React, { useState, useEffect } from "react";
import './App.css';
import UserInput from './components/UserInput';
import Box from "./components/Box";
import Readout from './components/Readout';

function App() {
  const [boxCount, setBoxCount] = useState(0);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(selected.filter((value) => value <= boxCount))
  }, [boxCount])


  function boxClick(newValue) {
    const index = selected.indexOf(newValue);
    if (index !== -1) {
      setSelected(selected.filter((value) => value != newValue))
    }
    else {
      selected.push(newValue)
      setSelected([...selected.map(e => Number(e)).sort(function(a, b){return a-b})])
    }
    
  }
  const arr = []
  for (let i = 0; i < boxCount; i++) {
    arr.push(0);
  }

  return (
    <div id="main">
      <div className="flex-container">
        <UserInput onInput={setBoxCount} />
        <Readout selected={selected} />
      </div>
      <div className="boxContainer">
      {arr.map((_, index) => <Box onClick={boxClick} key={index + 1} value={index + 1}/>)}
      </div>
    </div>
    
  );
}

export default App;