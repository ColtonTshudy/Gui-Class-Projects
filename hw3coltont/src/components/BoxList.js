/*
 * author: Colton Tshudy
 * version: 2/24/2023
 */

import React, { useState, useEffect } from "react";
import Box from "./Box";

function BoxList({ length, onArrayCreated, onClick, selected}) {
  const [boxes, setBoxes] = useState([]);
  useEffect(() => createBoxArray(), [length])

  const updateSelectedArray = (box) => {
    console.log(`pass in ${selected}`);

    const newSelected = [...selected];
    if (!newSelected.includes(box.innerText)) {
      newSelected.push(box.innerText);
    }
    else {
      newSelected.slice(newSelected.indexOf(box.innerText), 0);
    }
    const selectedCopy = [...selected]
    selectedCopy.push(box.innerText);
    onClick(selectedCopy)
  }

  const createBoxArray = () => {
    const newBoxes = Array.from({ length }, (_, index) => <Box key={index + 1} value={index + 1} onClick={updateSelectedArray} />);
    setBoxes(newBoxes);
    onArrayCreated(newBoxes);
  };

  return (
    <div className="boxContainer">{boxes}</div>
  );
}

export default BoxList;