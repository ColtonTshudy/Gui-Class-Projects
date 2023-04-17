import React, { useState, useEffect } from 'react';
import './App.css';
import Data from './rsc/data.json';
import PieChart from './components/pie-chart';
import BarChart from './components/bar-chart';
import LineChart from './components/line-chart';

function App() {

    localStorage.setItem("searchData", JSON.stringify(Data))
    let data = JSON.parse(localStorage.getItem("searchData"))
    console.log('data:')
    console.log(data)

    let averages = dataAverage(data, ["Week"]);
    console.log('averages:')
    console.log(averages)

    return (
        <div id="main-window" className="flex-column">

            <div id="top-graphs" className="full-size">
                <div id="scatter" className="bordered full-size flex-column">
                <LineChart data={data} title="Scatter Plot" className="full-size flex-center" colors={['blue', 'green', 'red']} dotRadius={4}/>
                </div>
            </div>

            <div id="bottom-graphs" className="flex-row full-size">
                <div id="pie" className="bordered full-size">
                    <PieChart data={averages} title="Pie Chart" className="full-size flex-center" colors={['red', 'green', 'blue']} />
                </div>
                <div id="bar" className="bordered full-size flex-column">
                    <BarChart data={averages} title="Histogram" className="full-size flex-center" colors={['blue', 'red', 'green']} />
                </div>
            </div>
        </div>
    );
}

// Compute the averages of each key of our data, excluding certain keys
function dataAverage(data, exclusions) {
    let totals = {}
    let averages = []

    data.forEach((entry) => {
        for (let k in entry) {
            if (!(exclusions.includes(k))) {
                if (k in totals) //add to existing value
                    totals[k] = totals[k] + entry[k]
                else //append new key to totalsionary
                    totals[k] = entry[k]
            }
        }
    })

    averages = Object.entries(totals).map(([key, value]) => ({ language: key, average: Math.floor(value / data.length) }))

    return averages
}

export default App;