/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import * as d3 from 'd3'
import React, { useEffect } from 'react';

const LineChart = (props) => {
    // Default props
    const {
        data,
        className,
        id,
        title,
        colors = ['red', 'green', 'blue'],
        dotRadius = 4
    } = props;

    const margin = {
        top: 40, right: 10, bottom: 10, left: 50,
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

        /// Generate axes
        const xScale = d3.scaleTime().range([0, graphW]);
        const yScale = d3.scaleLinear().range([graphH, 0]);
        xScale.domain(d3.extent(data, d => new Date(d.Week)));
        yScale.domain([0, d3.max(data, d => d3.max([d.javascript, d.python, d.java]))]);

        svg.append("g")
            .attr("transform", "translate(0," + graphH + ")")
            .call(d3.axisBottom(xScale));
        svg.append("g")
            .call(d3.axisLeft(yScale));

        // Tooltips
        let dotTip = d3.select(root)
            .append('div')
            .attr('id', 'pie-tip')
            .attr('pointer-events', 'none')

        // Draw data points
        let dots = []
        let i = 0
        for (let k in data[0]) {
            if (k !== "Week") {
                // Create a dot for each key's dataset
                dots.push(svg.selectAll(`${k}`)
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", d => xScale(new Date(d.Week)))
                    .attr("cy", d => yScale(d[k]))
                    .attr("r", dotRadius)
                    .attr("fill", colors[i])
                    .attr("data-tooltip", d => `${k}: ${d.k} (${d.Week})`)
                    .on('mousemove', (e, d) => {
                        dotTip.style('opacity', 1)
                            .text(`${k}: ${d[k]}`)
                            .style('left', (e.pageX + 10) + 'px')
                            .style('top', (e.pageY + 10) + 'px');
                    })
                    .on('mouseleave', () => {
                        dotTip.style('opacity', 0)
                    })
                )
                i++
            }
        }

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
            .style("stroke", d => d === 'javascript' ? colors[0] : d === 'python' ? colors[1] : colors[2])

        // Tooltips
        // let barTip = d3.select(root)
        //     .append('div')
        //     .attr('id', 'pie-tip')
        //     .attr('pointer-events', 'none')

        // bars
        //     .on('mousemove', (e, d) => {
        //         barTip.style('opacity', 1)
        //             .text(`${d.language}: ${d.average}`)
        //             .style('left', (e.pageX + 10) + 'px')
        //             .style('top', (e.pageY + 10) + 'px');
        //     })
        //     .on('mouseleave', () => {
        //         barTip.style('opacity', 0)
        //     })
    }

    return <div id={id} ref={myRef} className={className} />;
}

export default LineChart;