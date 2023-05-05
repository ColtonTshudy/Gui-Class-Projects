/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import * as d3 from 'd3'
import React, { useEffect } from 'react';

const BarChart = (props) => {
    // Default props
    const {
        data,
        className,
        title,
        colors = ['red', 'green', 'blue']
    } = props;

    const margin = {
        top: 20, right: 10, bottom: 10, left: 10,
    };

    const myRef = React.createRef();
    const averages = dataAverage(data, ["Week", "id", "_id"])

    useEffect(() => {
        // Runs on mount
        drawChart(averages);

        // Runs on resize
        function handleResize() {
            drawChart(averages);
        }

        // Attach the event listener to the window object
        window.addEventListener('resize', handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [averages]);

    // Draws graph
    function drawChart(averages) {
        // Parent element
        const root = myRef.current;
        let w = root.clientWidth
        let h = root.clientHeight

        // Size based on variables w and h
        const graphW = w - margin.left - margin.right
        const graphH = h - margin.top - margin.bottom

        // Remove old svg
        d3.select(root)
            .select('svg')
            .remove();

        // Remove old tooltip
        d3.select(root)
            .select('div')
            .remove();

        // Create new svg
        const svg = d3
            .select(root)
            .append('svg')
            .attr('width', w)
            .attr('height', h)
            .append('g')
            .attr('transform', `translate(${(w - graphW) / 2}, ${(h - graphH) / 2})`);

        // Append title
        svg.append("text")
            .attr("x", graphW / 2)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(title);

        // X axis
        var x = d3.scaleBand()
            .domain(averages.map(d => d.language))
            .range([0, graphW])
            .padding(0.1);

        // Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(averages, d => d.average) * (1 + 1 / margin.top)])
            .range([graphH, 0])

        let colorBar = d3.scaleThreshold().domain(averages.map(d => d.language)).range(colors)

        // Bars
        const bars = svg.selectAll("mybar")
            .data(averages)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.language) })
            .attr("y", function (d) { return y(d.average) })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return graphH - y(d.average); })
            .attr('fill', d => colorBar(d.language))
            .attr('stroke', 'black')
            .attr('stroke-width', 4)

        // Tooltips
        let tooltip = d3.select(root)
            .append('div')
            .attr('class', 'tooltip')
            .attr('pointer-events', 'none')

        bars
            .on('mousemove', (e, d) => {
                tooltip.style('opacity', 1)
                    .text(`${d.language}: ${d.average}`)
                    .style('left', (e.pageX + 10) + 'px')
                    .style('top', (e.pageY + 10) + 'px');
            })
            .on('mouseleave', () => {
                tooltip.style('opacity', 0)
            })
    }

    return <div ref={myRef} className={className} />;
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

export default BarChart;