/*
 * author: Colton Tshudy
 * version: 2/26/2023
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

  function boxClick(label) {
    const newValue = parseInt(label.innerText);
    const index = selected.indexOf(newValue);
    if (index !== -1) {
      label.classList.remove("selectedBox")
      setSelected(selected.filter((value) => value != newValue))
    }
    else {
      label.classList.add("selectedBox")
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