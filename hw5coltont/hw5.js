/*
 * author: Colton Tshudy
 * version: 3/22/2023
 */

async function render() {
    const response = await fetch("./data.json");
    const data = await response.json().then(console.log("data recvd:\n"));
    console.log(data);
    
    plotScatter(data)
    plotPie(data)
    plotHistogram(data)
}

function plotScatter(data) {

}

function plotPie(data) {
    let arcData = d3.pie()(data)
    console.log(`Arch Data: \n`)
    console.log(arcData)

    let arcMaker = d3.arc().innerRadius(50).outerRadius(100).padAngle(.02)
    console.log(`Arch Maker:\n`)
    console.log(arcData.map(element => arcMaker(element)))  // The arcData adds extra properties to __Data__ which arcMaker will use to generate path.

    let scC = d3.scaleOrdinal().range(d3.schemePastel1).domain(arcData.map(d => d.index)) 

    let g = d3.select('#pie')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', backgroundColor)
        .attr('class', 'svg-container')
        .append('g')
        .attr('class', 'pie-container')



    g.attr('transform', `translate(${width / 2}, ${height / 2})`)
    let pieSel = g.selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('d', arcMaker)
        .attr('fill', d => scC(d))
        .attr('stroke', 'black')

}

function plotHistogram(data) {

}

function pieDataBuilder(data) {
    let dict = 0;
    data.forEach((item)=>{
        item
    })
}