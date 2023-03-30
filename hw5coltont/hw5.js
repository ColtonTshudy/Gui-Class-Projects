/*
 * author: Colton Tshudy
 * version: 3/22/2023
 */

// Global constants
const colorScheme = ['red', 'green', 'blue']

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
    plotScatter(data, 0.7)
    plotPie(averages, 0.7)
    plotBar(averages, 0.7)
}

// Scatter plot of data over time. Scale is a size multiplier
function plotScatter(data, scale) {
    [width, height] = getElementSize('scatter').map((x) => x * scale)

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const verticalMargin = 0.05; //percentage of space to add to forehead
    const dotRadius = 4

    // Delete old graph
    try { document.querySelector('#scatter>svg').remove() }
    catch { }

    // SVG Root
    const svg = d3.select("#scatter")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + verticalMargin * height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top + verticalMargin * height})`)

    // Generate axes
    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);
    xScale.domain(d3.extent(data, d => new Date(d.Week)));
    yScale.domain([0, d3.max(data, d => d3.max([d.javascript, d.python, d.java]))]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Draw data points
    const circlesJavascript = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(new Date(d.Week)))
        .attr("cy", d => yScale(d.javascript))
        .attr("r", dotRadius)
        .attr("fill", colorScheme[0])
        .attr("data-tooltip", d => `javascript: ${d.javascript} (${d.Week})`)

    const circlesPython = svg.selectAll("circlesPython")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(new Date(d.Week)))
        .attr("cy", d => yScale(d.python))
        .attr("r", dotRadius)
        .attr("fill", colorScheme[1])
        .attr("data-tooltip", d => `python: ${d.python} (${d.Week})`)

    const circlesJava = svg.selectAll("cyclesJava")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(new Date(d.Week)))
        .attr("cy", d => yScale(d.java))
        .attr("r", dotRadius)
        .attr("fill", colorScheme[2])
        .attr("data-tooltip", d => `java: ${d.java} (${d.Week})`)

    // Draw lines
    const line = d3.line()
        .x(d => xScale(new Date(d.Week)))
        .y(d => yScale(d.value))
        .curve(d3.curveLinear);

    const paths = svg.selectAll(".line")
        .data(["javascript", "python", "java"])
        .enter()
        .append("path")
        .attr("d", d => line(data.map(e => ({ Week: e.Week, value: e[d] }))))
        .style("fill", "none")
        .style("stroke-width", "2px")
        .style("stroke", d => d === 'javascript' ? colorScheme[0] : d === 'python' ? colorScheme[1] : colorScheme[2])


    // Tooltips
    scatterLocation = document.querySelector('#scatter>svg').getBoundingClientRect();

    const tooltip = d3.select('#scatter').append('div')
        .attr("id", "scatter-tip")
        .style("opacity", 0)
        .style("position", "absolute");

    circlesJavascript.on("mouseover", function () {
        tooltip.transition()
            .style("opacity", 1);
        tooltip.html(this.getAttribute("data-tooltip"))
    })
        .on("mousemove", function (e) {
            let [x, y] = d3.pointer(e, this)
            tooltip.transition()
                .style("opacity", 1)
                .style('left', (scatterLocation.left + x) + 'px')
                .style('top', (scatterLocation.top + y) + 'px');
        })
        .on("mouseout", function () {
            tooltip.transition()
                .style("opacity", 0);
        });

    circlesPython.on("mouseover", function () {
        tooltip.transition()
            .style("opacity", 1);
        tooltip.html(this.getAttribute("data-tooltip"))
    })
        .on("mousemove", function (e) {
            let [x, y] = d3.pointer(e, this)
            tooltip.transition()
                .style("opacity", 1)
                .style('left', (scatterLocation.left + x) + 'px')
                .style('top', (scatterLocation.top + y) + 'px');
        })
        .on("mouseout", function () {
            tooltip.transition()
                .style("opacity", 0);
        });

    circlesJava.on("mouseover", function (e) {
        tooltip.transition()
            .style("opacity", 1);
        tooltip.html(this.getAttribute("data-tooltip"))
    })
        .on("mousemove", function (e) {
            let [x, y] = d3.pointer(e, this)
            tooltip.transition()
                .style("opacity", 1)
                .style('left', (scatterLocation.left + x) + 'px')
                .style('top', (scatterLocation.top + y) + 'px');
        })
        .on("mouseout", function () {
            tooltip.transition()
                .style("opacity", 0);
        });
}

// Pie chart of average of every data point. Scale is a size multiplier
function plotPie(data, scale) {
    size = Math.min(...getElementSize('pie')) * scale
    console.log(`pie size: ${size}`)

    verticalMargin = 0.05; //percentage of space to add to forehead
    margin = 10; //px of total margin

    // Build data
    values = []
    for (k in data) { values.push(data[k]) }
    console.log('Pie Data:')
    console.log(values)

    // Generate the pie chart data
    const arcData = d3.pie()(values)
    console.log(`Pie Arch Data: \n`)
    console.log(arcData)
    const arcMaker = d3.arc().innerRadius(size / 5).outerRadius(size / 2).padAngle(.1)

    // Calculate the arch
    console.log(`Arch Maker:\n`)
    console.log(arcData.map(element => arcMaker(element)))  // Generates arc

    // Create ordinal scaling
    const scC = d3.scaleOrdinal().range(['red', 'green', 'blue']).domain(arcData.map(d => d.index))

    // Delete old graph
    try {
        document.querySelector('#pie>svg').remove()
        document.querySelector('#pie>div').remove()
    }
    catch { }

    // SVG Root
    const g = d3.select('#pie')
        .append('svg')
        .attr('width', size + margin)
        .attr('height', size + margin + size * verticalMargin)
        .append('g')
        .attr('transform', `translate(${(size + margin) / 2}, ${(size + margin) / 2 + size * verticalMargin})`)

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
    pieLocation = document.querySelector('#pie>svg').getBoundingClientRect();

    let pieTip = d3.select('#pie')
        .append('div')
        .attr('id', 'pie-tip')
        .attr('pointer-events', 'none')

    pieSel.on('mouseover', function (e, d) {
        let [x, y] = d3.pointer(e, this)
        const keys = Object.keys(data)
        pieTip.style('visibility', 'visible')
            .text(`${keys[values.indexOf(d.value)]}: ${d.value}`)
    })

    pieSel.on('mousemove', function (e, d) {
        let [x, y] = d3.pointer(e, this)
        const keys = Object.keys(data)
        pieTip.style('visibility', 'visible')
            .text(`${keys[values.indexOf(d.value)]}: ${d.value}`)
            .style('position', 'absolute')
            .style('left', (pieLocation.left + x + 110) + 'px')
            .style('top', (pieLocation.top + y + 170) + 'px');
    })

    pieSel.on('mouseleave', function (e, d) {
        pieTip.style('visibility', 'hidden')
    })
}

function plotBar(data, scale) {
    [width, height] = getElementSize('bar').map((x) => x * scale)

    verticalMargin = 0.05; //percentage of space to add to forehead

    // Build data
    dataArray = Object.entries(data).map(([key, value]) => ({ language: key, average: value }))
    console.log('Bargraph Data:')
    console.log(dataArray)

    // Delete old graph
    try {
        document.querySelector('#bar>svg').remove()
        document.querySelector('#bar>div').remove()
    }
    catch { }

    // SVG Root
    var svg = d3.select("#bar")
        .append("svg")
        .attr("width", width)
        .attr("height", height + height * 0.05)
        .append("g")
        .attr("transform", `translate(${0},${height * 0.05})`);

    // X axis
    var x = d3.scaleBand()
        .range([0, width])
        .domain(dataArray.map(d => d.language))
        .padding(0.1);

    // Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(dataArray, d => d.average)])
        .range([height, 0])

    let colorBar = d3.scaleThreshold().domain(dataArray.map(d => d.language)).range(['blue', 'red', 'green'])

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
    graphLocation = document.querySelector('#bar>svg').getBoundingClientRect();

    let toolTip = d3.select('#bar')
        .append('div')
        .attr('id', 'bar-tip')
        .attr('pointer-events', 'none')

    barSel.on('mouseover', function (e, d) {
        let [x, y] = d3.pointer(e, this)
        toolTip.style('visibility', 'visible')
            .text(`${d.language}: ${d.average}`)
    })

    barSel.on('mousemove', function (e, d) {
        let [x, y] = d3.pointer(e, this)
        toolTip.style('visibility', 'visible')
            .text(`${d.language}: ${d.average}`)
            .style('position', 'absolute')
            .style('left', (graphLocation.left + x + 10) + 'px')
            .style('top', (graphLocation.top + y + 30) + 'px');
    })

    barSel.on('mouseleave', function (e, d) {
        toolTip.style('visibility', 'hidden')
    })
}

// Returns the smaller of width and height of an element
function getElementSize(element) {
    container = document.getElementById(element)
    return [container.clientWidth, container.clientHeight]
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