import React, { useState, useEffect } from "react";
import './App.css';
import UserInput from './components/UserInput';
import BoxList from './components/BoxList';
import Readout from './components/Readout';

function App() {
  const [boxCount, setBoxCount] = useState(0);
  const [boxes, setBoxes] = useState([]);

  return (
    <div id="main">
      <div className="flex-container">
        <UserInput onInput={setBoxCount} />
        <Readout selected={[]} />
      </div>
      <BoxList length={boxCount} onArrayCreated={setBoxes} />
    </div>
  );
}

export default App;