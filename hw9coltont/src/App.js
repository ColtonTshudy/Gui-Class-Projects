import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyMain from "./components/main";
import Page from "./components/page";
import Projects from "./components/projects_list";
import Project from './components/project_description';
import Picture from './components/picture';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Page />}>
                        <Route index element={<MyMain />} />
                        <Route path={"/projects"} element={<Projects />} />
                        <Route path={"/projects/1"} element={<Project title={1} description={"Project 1 description"}/>} />
                        <Route path={"/projects/2"} element={<Project title={2} description={"Project 2 description"}/>} />
                        <Route path={"/projects/3"} element={<Project title={3} description={"Project 3 description"}/>} />
                        <Route path={"/projects/4"} element={<Project title={4} description={"Project 4 description"}/>} />
                        <Route path={"/lol"} element={<Picture />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
