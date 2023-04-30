import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MyMain from "./components/Main";
import Page from "./components/Page";
import {NasaClass} from "./components/Nasa";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Page />}>
                <Route index element={<MyMain />}/>
                <Route path={"/projects"} element={<NasaClass />}/>
            </Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
