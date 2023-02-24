import React, { useState, useEffect } from "react";

function InputSection(props) {
    const api = "DEMO_KEY"
    const url = `https://api.nasa.gov/planetary/apod?api_key=${api}`
    const [state, setState] = useState({ description: '', url: '' })
  
    const getImage = () => {
      fetch(url).then(response => response.json())
        .then(data => setState({ description: data.explanation, url: data.url }))
    }
  
    return (
      <div>
        <button onClick={getImage}>Get Image</button>
        <img src={state["url"]} alt={'Nasa apod api'} />
        <section>
          <p>{state["description"]}</p>
        </section>
      </div>
    )
}