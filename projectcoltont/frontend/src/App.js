import React, { useState, useEffect } from 'react';
import './App.css';
import PieChart from './components/pie-chart';
import BarChart from './components/bar-chart';
import LineChart from './components/line-chart';
import Checklist from './components/checklist';

const url = "http://localhost:5001/data"

function App() {
    const [data, setData] = useState([])
    const [averages, setAverages] = useState([])
    let [state, setState] = useState([])

    useEffect(() => {
        fetch(url).then(res => {
            if (res.status >= 400) {
                throw new Error("Server responds with error!");
            }
            return res.json()
        })
            .then(
                data => {
                    data.forEach((item, idx) => item.id = idx)
                    setData(data)
                    const averages = dataAverage(data, ["Week", "id", "_id"])
                    setAverages(averages)

                    console.log('Data:')
                    console.log(data)
                    console.log('Averages:')
                    console.log(averages)
                }
            )
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div id="main-window" className="flex-row">

            <div id="graph-window" className="flex-column full-size">

                <div id="top-graphs" className="full-size">
                    <div id="scatter" className="bordered full-size flex-column">
                        <LineChart data={data} title="Scatter Plot" className="full-size flex-center" colors={['red', 'green', 'blue']} dotRadius={4} ignoredKeys={["Week", "id", "_id"]} selected={state} setSelected={setState} />
                    </div>
                </div>

                <div id="bottom-graphs" className="flex-row full-size">
                    <div id="pie" className="bordered full-size">
                        <PieChart data={averages} title="Pie Chart" className="full-size flex-center" colors={['red', 'green', 'blue']} />
                    </div>
                    <div id="bar" className="bordered full-size flex-column">
                        <BarChart data={averages} title="Histogram" className="full-size flex-center" colors={[null, 'red', 'green', 'blue']} />
                    </div>
                </div>

            </div>

            <div id="mui-window" className="full-size">
                <div id="data-grid" className="full-size bordered">
                    <Checklist data={data} className="full-size" selected={state} setSelected={setState} />
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