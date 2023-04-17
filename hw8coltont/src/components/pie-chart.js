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
        top: 20, right: 10, bottom: 10, left: 10,
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
        const outerRadius = Math.min(graphW,graphH)/2
        const innerRadius = outerRadius/4

        // Remove old svg
        d3.select(root)
            .select('svg')
            .remove();

        // Create new svg
        const svg = d3
            .select(root)
            .append('svg')
            .attr('width', w)
            .attr('height', h)
            .append('g')
            .attr('transform', `translate(${w/2}, ${h/2+margin.top/2-margin.bottom/2})`);

        // Append title
        svg.append("text")
            .attr("x", 0)
            .attr("y", -h / 2 + margin.top/2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(title);

        // Generate arc data
        const arcGenerator = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        const pieGenerator = d3
            .pie()
            .padAngle(0)
            .value((d) => d.averages);
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
            .style('stroke-width', 0);

        // Append text labels
        arc
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text((d) => d.data.language)
            .style('fill', '#ffffff')
            .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y})`;
            });
    }

    return <div id={id} ref={myRef} className={className} />;
}

export default PieChart;