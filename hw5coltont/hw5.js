/*
 * author: Colton Tshudy
 * version: 3/22/2023
 */

// Occurs on first loading of the page
async function onload() {
    const response = await fetch("./data.json");
    const data = await response.json().then(console.log("data recvd:"));
    console.log(data);

    // Get average of input data
    averages = dataAverage(data, ["Week"])
    console.log(`rounded data averages:`)
    console.log(averages)

    // Draw graphs for the first time
    writeInfo(averages)
    renderGraphs(data, averages)

    // Re draw graphs when window is resized
    addEventListener("resize", () => { renderGraphs(data, averages) });
}

// Calls each graph's render function
function renderGraphs(data, averages) {
    plotScatter(data, 0.8)
    plotPie(averages, 0.8)
    plotBar(averages, 0.8)
}

// Scatter plot of data over time. Scale is a size multiplier
function plotScatter(data, scale) {

}

// Pie chart of average of every data point. Scale is a size multiplier
function plotPie(data, scale) {
    size = getMinSize('pie') * scale
    console.log(`pie size: ${size}`)

    // Get simple array of averages
    values = []
    for (k in data) { values.push(data[k]) }

    // Generate the pie chart data
    const arcData = d3.pie()(values)
    console.log(`Arch Data: \n`)
    console.log(arcData)
    const arcMaker = d3.arc().innerRadius(size / 5).outerRadius(size / 2).padAngle(.1)

    // Calculate the arch
    console.log(`Arch Maker:\n`)
    console.log(arcData.map(element => arcMaker(element)))  // Generates arc
    console.log(d3.schemePastel1) // Color scheme

    // Create ordinal scaling
    const scC = d3.scaleOrdinal().range(d3.schemeSet1).domain(arcData.map(d => d.index))

    try { document.querySelector('#pie>svg').remove() }
    catch { }

    // SVG Root
    const g = d3.select('#pie')
        .append('svg')
        .attr('width', size + 1)
        .attr('height', size + 1)
        .append('g')
        .attr('transform', `translate(${size / 2}, ${size / 2})`)

    // Draw the arc
    const pieSel = g.selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('d', arcMaker)
        .attr('fill', d => scC(d))
        .attr('stroke', 'black')
        .attr('stroke-width', 4)

    // Tooltip
    let toolTip = d3.select('#pie')
        .append('text')
        .attr('visibility', 'hidden')
        .attr('id', 'pi-info')
        .attr('pointer-events', 'none')

    pieSel.on('mouseover', function (e, d) {
        let keys = Object.keys(data)
        let [x, y] = d3.pointer(e, this)
        toolTip.attr('visibility', 'visible')
            .text(`${keys[values.indexOf(d.value)]}: ${d.value}`)
    })

    pieSel.on('mouseleave', function (e, d) {
        toolTip.attr('visibility', 'hidden')
            .text('')

    })
}

function plotBar(data, scale) {
    container = document.getElementById('bar')
    width = container.clientWidth * scale
    height = container.clientHeight * scale

    dataArray = Object.entries(data).map(([key, value]) => ({ language: key, average: value }))

    try { document.querySelector('#bar>svg').remove() }
    catch { }

    // SVG Root
    var svg = d3.select("#bar")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")

    // X axis
    var x = d3.scaleBand()
        .range([0, width])
        .domain(dataArray.map(d => d.language))
        .padding(0.1);

    // Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(dataArray, d => d.average)])
        .range([height, 0])

    let colorBar = d3.scaleThreshold().domain(dataArray.map(d => d.language)).range(d3.schemeSet1)

    // Bars
    barSel = svg.selectAll("mybar")
        .data(dataArray)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.language) })
        .attr("y", function (d) { return y(d.average) })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.average); })
        .attr('fill', d => colorBar(d.language))
        .attr('stroke', 'black')
        .attr('stroke-width', 4)

    // Tooltip
    let toolTip = d3.select('#bar')
        .append('text')
        .attr('visibility', 'hidden')
        .attr('id', 'bar-info')
        .attr('pointer-events', 'none')

    barSel.on('mouseover', function (e, d) {
        let [x, y] = d3.pointer(e, this)
        toolTip.attr('visibility', 'visible')
            .text(`${d.language}: ${d.average}`)
    })

    barSel.on('mouseleave', function (e, d) {
        toolTip.attr('visibility', 'hidden')
            .text('')

    })
}

// Returns the smaller of width and height of an element
function getMinSize(element) {
    container = document.getElementById(element)
    width = container.clientWidth
    height = container.clientHeight
    return Math.min(width, height)
}

// Creates an unordered list of a given dictionary for the info tab.
function writeInfo(dict) {
    const ul = document.querySelector("#info>ul");
    for (let k in dict) {
        let li = document.createElement('li')
        li.innerHTML = `${k}: ${dict[k]}`
        li.classList = "align-left"
        ul.append(li)
    }
}

// Calculates average of all keys in a json object, exlcuding given keys
function dataAverage(data, exclusions) {
    totals = {}

    data.forEach((entry) => {
        for (let k in entry) {
            if (!exclusions.includes(k)) {
                if (k in totals) //add to existing value
                    totals[k] = totals[k] + entry[k]
                else //append new key to totalsionary
                    totals[k] = entry[k]
            }
        }
    })

    for (let k in totals)
        totals[k] = Math.round(totals[k] / data.length)

    return totals
}