import React, { useState, useEffect } from "react";
import Box from "./Box";

function BoxList({ length, onArrayCreated }) {
  const [boxes, setBoxes] = useState([]);
  useEffect(() => createBoxArray(), [length])

  const createBoxArray = () => {
    const newBoxes = Array.from({ length }, (_, index) => <Box key={index + 1} value={index + 1} />);
    setBoxes(newBoxes);
    onArrayCreated(newBoxes);
  };

  return (
    <div className="boxContainer">{boxes}</div>
  );
}

export default BoxList;