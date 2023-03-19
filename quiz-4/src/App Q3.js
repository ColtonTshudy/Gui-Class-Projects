import React, { useState, useEffect } from "react";

function EffectCompFunction(props) {
  const [state, setState] = useState({ count: 0 })

  useEffect(()=>{
    const timeId = setTimeout(() => {
      setState(prevState=>({count: prevState.count+1}))
    }, 1000)

    return () => {
      console.log("cleaned")
      clearTimeout(timeId)
    }
  }, [state.count])

  return (
    <p>{state.count}</p>
  )
}

function App() {
  return (
    <div className="App">
      <EffectCompFunction />
    </div>
  );
}

export default App;
