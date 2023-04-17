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
        dotRadius = 4,
        ignoredKeys = [],
        selected,
        setSelected
    } = props;

    const margin = {
        top: 40, right: 10, bottom: 10, left: 50,
    };

    const myRef = React.createRef();

    useEffect(() => {
        // Runs on mount
        drawChart();

        // Runs on resize
        function handleResize() {
            drawChart();
        }

        // Attach the event listener to the window object
        window.addEventListener('resize', handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, selected]);

    // Draws graph
    function drawChart() {
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
        let tooltip = d3.select(root)
            .append('div')
            .attr('class', 'tooltip')
            .attr('pointer-events', 'none')

        // Draw data points
        let dots = []
        let i = 0
        for (let k in data[0]) {
            if (!ignoredKeys.includes(k)) {
                // Create a dot for each key's dataset
                dots.push(svg.selectAll(`.dot`)
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("id", d => d.id)
                    .attr("cx", d => xScale(new Date(d.Week)))
                    .attr("cy", d => yScale(d[k]))
                    .attr("r", dotRadius)
                    .attr("fill", colors[i])
                    .attr("class", d => selected.includes(d.id) ? "selected" : "")
                    .attr("data-tooltip", d => `${k}: ${d.k} (${d.Week})`)
                    .on('mousemove', function (e, d) {
                        tooltip.style('opacity', 1)
                            .text(`${k}: ${d[k]}`)
                            .style('left', (e.pageX + 10) + 'px')
                            .style('top', (e.pageY + 10) + 'px');

                        d3.select(this)
                            .attr("r", dotRadius * 3);
                    })
                    .on('mouseleave', function () {
                        tooltip.style('opacity', 0)

                        d3.select(this)
                            .attr("r", dotRadius);
                    })
                    .on('click', function () {
                        const id = parseInt(this.id);
                        if (selected.includes(id)){
                            setSelected(oldArray => oldArray.filter((oldId) => oldId !== id))
                        }
                        else
                            setSelected(oldArray => [...oldArray, id])
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

        svg.selectAll(".line")
            .data(["javascript", "python", "java"])
            .enter()
            .append("path")
            .attr("d", d => line(data.map(e => ({ Week: e.Week, value: e[d] }))))
            .style("fill", "none")
            .style("stroke-width", "2px")
            .style("stroke", d => d === 'javascript' ? colors[0] : d === 'python' ? colors[1] : colors[2])
    }

    return <div id={id} ref={myRef} className={className} />;
}

export default LineChart;