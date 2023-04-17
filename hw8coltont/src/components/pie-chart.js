/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import * as d3 from 'd3'
import React, { useEffect } from 'react';

const PieChart = (props) => {
    // Default props
    const {
        data,
        className,
        id,
        title,
        colors = ['red', 'green', 'blue']
    } = props;

    const margin = {
        top: 30, right: 10, bottom: 10, left: 10,
    };

    // Placeholder size values
    let w = 200
    let h = 200

    const myRef = React.createRef();

    useEffect(() => {
        // Runs on mount
        w = myRef.current.clientWidth
        h = myRef.current.clientHeight
        drawChart();

        // Runs on resize
        function handleResize() {
            w = myRef.current.clientWidth
            h = myRef.current.clientHeight
            drawChart();
        }

        // Attach the event listener to the window object
        window.addEventListener('resize', handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data]);

    // Draws graph
    function drawChart() {
        // Parent element
        const root = myRef.current;

        // Size based on variables w and h
        const shortestSide = Math.min(w, h)
        const graphW = shortestSide - margin.left - margin.right
        const graphH = shortestSide - margin.top - margin.bottom
        const outerRadius = Math.min(graphW, graphH) / 2
        const innerRadius = outerRadius / 4

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
            .attr('transform', `translate(${w / 2}, ${h / 2 + margin.top / 2 - margin.bottom / 2})`);

        // Append title
        svg.append("text")
            .attr("x", 0)
            .attr("y", -h / 2 + margin.top / 4)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(title);

        // Generate arc data
        const arcGenerator = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .padAngle(.05);
        const pieGenerator = d3
            .pie()
            .padAngle(0)
            .value((d) => d.average);
        const arc = svg
            .selectAll()
            .data(pieGenerator(data))
            .enter();

        // Append sectors
        arc
            .append('path')
            .attr('d', arcGenerator)
            .style('fill', (_, i) => colors[i])
            .style('stroke', '#ffffff')
            .style('stroke-width', 0)

        // Tooltips
        let tooltip = d3.select(root)
            .append('div')
            .attr('class', 'tooltip')
            .attr('pointer-events', 'none')

        arc.selectAll('path')
            .on('mousemove', (e, d) => {
                tooltip.style('opacity', 1)
                    .text(`${d.data.language}: ${d.data.average}`)
                    .style('left', (e.pageX + 10) + 'px')
                    .style('top', (e.pageY + 10) + 'px');
            })
            .on('mouseleave', () => {
                tooltip.style('opacity', 0)
            })

    }

    return <div id={id} ref={myRef} className={className} />;
}

export default PieChart;