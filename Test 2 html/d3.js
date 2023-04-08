/*
 * author: Colton Tshudy
 * version: 04/07/2023
 */

let collectedData = {
    webTech: [
        { skill: "None", count: 7 },
        { skill: "Beginner", count: 10 },
        { skill: "Intermediate", count: 4 },
        { skill: "Advanced", count: 1 }
    ]
}

function onload() {
    let g = d3.select('#d3').append('svg')
        .attr('width', 500)
        .attr('height', 300)
        .style('background', 'lightgrey')
        .append('g')
        .attr('class', 'pie-container')
        .attr('transform', 'translate(250, 150)')

    let arcData = d3.pie().value(d => d.count)(collectedData.webTech)
    console.log(`Arch Data: \n`)
    console.log(arcData)

    let arcMaker = d3.arc().innerRadius(20).outerRadius(100).padAngle(0)
    console.log(`Arch Maker:\n`)
    console.log(arcData.map(element => arcMaker(element)))

    console.log(d3.schemePastel1)

    let scC = d3.scaleOrdinal().range(d3.schemePastel1).domain(arcData.map(d => d.index))

    let pieSel = g.selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('d', arcMaker)
        .attr('fill', d => scC(d))
}