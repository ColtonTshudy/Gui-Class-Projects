import React, { useState, useEffect } from "react";
import './App.css';
import UserInput from './components/UserInput';
import Box from './components/Box';
import Readout from './components/Readout';

function App() {
  const [boxCount, setBoxCount] = useState(0);
  const [boxList, setBoxList] = useState([]);

  useEffect(()=>{
    return console.log(boxCount)
  },[boxCount]);

  return (
    <div id="main">
      <div className="flex-container">
        <UserInput callbackFunc={setBoxCount}/>
        <Readout selected={[]}/>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default App;