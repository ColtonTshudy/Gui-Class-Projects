/*
 * author: Colton Tshudy
 * version: 04/07/2023
 */

let data =
{
    "value": 1,
    "r": 30,
    "children": [
        {
            "value": 2,
            "r": 20,
            "children": [
                {
                    "value": 4,
                    "r": 10,
                },
                {
                    "value": 5,
                    "r": 10,
                }]
        },
        {
            "value": 3,
            "r": 20,
        }
    ]
}
console.log('data:')
console.log(data)

const backgroundColor = 'lightgrey'
const margin = { top: 20, bottom: 20, left: 10, right: 10 }
const width = 400 - margin.left - margin.right
const height = 300 - margin.top - margin.bottom
const totalWidth = width + margin.left + margin.right
const totalHeight = height + margin.top + margin.bottom

function onload() {
    let hierarchyData = d3.hierarchy(data)

    let g = d3.select('#cluster')
        .append('svg')
        .attr('width', totalWidth)
        .attr('height', totalHeight)
        .style('background', backgroundColor)
        .attr('class', 'svg-container')
        .append('g')
        .attr('class', 'cluster-container')
        .attr('transform', `translate(${margin.left} ${margin.top * 2})scale(.9)`)

    // x-y coord
    let cluster = d3.cluster().size([width, height])(hierarchyData)

    console.log(cluster)

    let lineGen = d3.linkVertical().x(d => d.x).y(d => d.y)
    g.selectAll('path')
        .data(cluster.links())
        .enter()
        .append('path')
        .attr('d', d => lineGen(d))
        .attr('fill', 'none')
        .attr('stroke', 'black')

    let d3_object = g.selectAll('circle')
        .data(cluster.descendants())
        .enter()

    d3_object.append('circle')
        .attr('r', d => d.data.r)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('fill', 'red')

    d3_object.append('text')
        .attr('color', 'black')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .text(d => d.data.value)

}