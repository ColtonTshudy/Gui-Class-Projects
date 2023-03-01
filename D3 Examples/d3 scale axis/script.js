const inputData = [
    {x: 100, y: 50, color: "red", value: 3},
    {x: 200, y: 100, color: 'blue', value: 5},
    {x: 300, y: 150, color:"red", value: 7},
    {x: 400, y: 200, color: 'black', value: 3},
    {x: 500, y: 250, color: 'yellow', value: 4}]

const inputData2 = [
    {
        "x": 1,
        "y1": 0.001,
        "y2": 0.63
    },
    {
        "x": 3,
        "y1": 0.003,
        "y2": 0.84
    },
    {
        "x": 4,
        "y1": 0.024,
        "y2": 0.56
    },
    {
        "x": 4.5,
        "y1": 0.054,
        "y2": 0.22
    },
    {
        "x": 4.6,
        "y1": 0.062,
        "y2": 0.15
    },
    {
        "x": 5,
        "y1": 0.1,
        "y2": 0.08
    },
    {
        "x": 6,
        "y1": 0.176,
        "y2": 0.2
    },
    {
        "x": 8,
        "y1": 0.198,
        "y2": 0.71
    },
    {
        "x": 9,
        "y1": 0.199,
        "y2": 0.65
    }
]

function D3Basic() {

    let root = d3.select("#svgContainer") // select and selectAll functions accepts CSS selectors
        .append("svg")
        .attr("width", 600)
        .attr("height", 300)
        .style("background", "lightgray")

    let dataContainer = root.append("g")
    dataContainer
        .selectAll('cirlce') // returns an empty collection of <circle> elements,
                                     // Which is our placeholder that we will fill.
                                     // this is a common D3 idiom when populating a graph with new elements

        .data(inputData)    // associate our collection with the data set
                            // It is essential to realize that the two collections (DOM elements and data points) are not
                            // affiliated with each other as collection "in bulk".
                            // D3 attempts to establish a one-to-one correspondence between DOM elements and data points
                            // __Each data point is represented through a separate DOM element__,
                            // which in turn takes its properties from the information of the data point
                            // This is a fundamental feature of D3 to establish and manage such one-to-one
                            // correspondences between individual data points and their associated DOM element
                            // data function returns a collection of elements that have been associated with individual data points.

        .enter()    // There are no circle element, so the collection is empty, but we can have access to surplus data points
                    // that could not be matched with DOM element through the enter() function.
                    // This goes into our surplus collection

        .append("circle") // Append circle to the collection of our circle, which is empty

        .attr("cx", (d)=>{
            return d.x
        })  // We supply accessor functions that
            // given an entry (a single line of record),
            // returns the corresponding value

        .attr("cy", (d)=>d['y'])  // Another approach to pass data into the attribute, If there is only a single line, there is no need to define return
        .attr("fill", (d, number)=>{
            console.log(d, number) // Overloaded accessor function that receives to input, first is data and the next is the index.
            return d.color // Another approach to pass data into the attribute, If there is only a single line, there is no need to define return
        })
        .attr('r', (d, number,ourCirclePlaceHolder) =>{
            console.log(d, number, ourCirclePlaceHolder)  // and another accessor method with three parameters. The last parameter provides access to our circle empty placeholder
            return d.value
    })
        .on('mouseover', (e, d)=>{
            let element = d3.select(e.target)
            element.attr("fill", "black")
        } )
        .on("mouseleave", (e, d)=>{
            console.log(d['color'])
            let element = d3.select(e.target)
            element.attr("fill", d['color'])
        })


    // Can you detect the issue with the following code?
    // Why is it not working?
    // let prevColor = ""
    // dataContainer.on("mouseover", (event)=>{
    //     let element = d3.select(event.target)
    //     prevColor = element.attr("fill")
    //     element.attr("fill", "black")
    //
    // })
    //
    // dataContainer.on("mouseleave", (event)=>{
    //     console.log(prevColor)
    //     d3.select(event.target).attr("fill", prevColor)
    //     console.log(d3.select(event.target).attr("fill"))
    // })

}

function adjustScale(data, value, lowerBound, upperBound){
    /**
     * A helper method that returns functional object for adjusting the scale of our input points.
     */
    return d3.scaleLinear().domain(d3.extent(data, d=>d[value])).range([lowerBound, upperBound]).nice()

}

function demo2() {

            let svg = d3.select("#d2")

            let pxX = svg.attr('width'), pxY = svg.attr('height')

            //let scX = adjustScale(data, 'x', 0, pxX)
            let scX = d3.scaleLinear().domain(d3.extent(inputData2, d=>d['x'])).range([0, pxX])
            let scY1 = d3.scaleLinear()
                .domain(d3.extent(inputData2, d=>d['y1']))
                .range([pxY, 0]) // we invert the vertical axis scaling to fix upside down orientation of the SVG coordinate

            let scY2 = adjustScale(inputData2, 'y2', pxY, 0)

            let val = d3.select("#d2")
                .append('g').attr('id', 'g1')
                .selectAll('circle')
                .data(inputData2)
            console.log(val)  // by exploring the val values, we can see the __data__ property contains all the information about the data
            val.enter()
                .append('circle')
                .attr('fill', 'red').attr('r', 5)
                .attr('cx', d=>scX(d['x']))
                .attr('cy', d=>scY1(d['y1']))

            d3.select("#d2")
                .append('g').attr('id', 'g2').attr('fill', 'blue')
                .selectAll('circle')
                .data(inputData2).enter()
                .append('circle')
                .attr('r', 5)
                .attr('cx', d=>scX(d['x']))
                .attr('cy', d=>scY2(d['y2']))

            let lineMaker = d3.line()  // line function returns a function object, which, given a dataset, produces a string suitable for the d attribute for path element
                .x(d=>scX(d['x']))  // requires accessor function to get the x and y values
                .y(d=>scY1(d['y1']))

            d3.select('#g1')
                .append('path')
                .attr("fill", "none").attr('stroke', 'red')
                .attr("d", lineMaker(inputData2))

            lineMaker = d3.line().x(d=>scX(d['x'])).y(d=>scY2(d['y2']))
            d3.select("#g2")
                .append('path')
                .attr('fill', 'none').attr('stroke', 'blue')
                .attr('d', lineMaker(inputData2))
}


function demo3(){
    // define scale

    let margin = 20
    let svg = d3.select("#d3")
    //svg.style('padding', 20)
    let pxX = svg.attr('width'), pxY = svg.attr('height')
    let setScale = function (accessor, range){
        return d3.scaleLinear().domain(d3.extent(inputData2, accessor)).range(range).nice()
    }
    // Example adjusting our chart by defining margin
    let scX = setScale(d=>d['x'], [0, pxX-margin])
    let scY1 = setScale(d=>d['y1'], [pxY-margin, margin])
    let scy2 = setScale(d=>d['y2'], [pxY-margin, margin])


    // Another approach by defining functions inside our method
    // Check closures [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures] to understand how
    // variables are visible to this function.
    let drawChart = function(g, accessor, curve){
        g.selectAll('circle').data(inputData2).enter()
            .append('circle')
            .attr('fill', 'red')
            .attr('r', 5)
            .attr('cx', d=>scX(d['x']))
            .attr('cy', accessor)

        let makeLine = d3.line().curve(curve).x(d=>scX(d['x'])).y(accessor)
        g.append('path').attr('d', makeLine(inputData2)).attr('fill', 'none')
    }
    let g1 = d3.select("#d3").append("g")
    let g2 = d3.select("#d3").append('g')
    g1.attr('stroke', 'blue')
    g2.attr('stroke', 'black')
    drawChart(g1, d=>scY1(d['y1']), d3.curveStep)
    drawChart(g2, d=>scy2(d['y2']), d3.curveNatural)

    let axMkr = d3.axisRight(scY1)
    axMkr(svg.append('g'))
    axMkr = d3.axisLeft(scy2)
    svg.append('g').attr('transform', `translate(${pxX} 0)`).call(axMkr)

    axMkr = d3.axisTop(scX)
    svg.append('g').attr('transform', `translate(0, ${pxY})`).call(axMkr)


}

function demo4(){
    // D3 is not limited to SVG
    // Here we explore how to add list items to our ul element
    let element = d3.select("#d4")
    let values = ['1', '2', '3', '4']
    // After selecting we bound the data to the selection
    element.append('ul').selectAll('li').data(values).enter().append('li').text(d=>d)
}


function demo5(){
    // This example shows how we can control each element of our data by applying event to them
    let element = d3.select("#d5")
    let values = ["value1", "value2", "value3", "value4"]
    element.append('ul').selectAll('li').data(values).enter()
        .append('li')
        .text(d=>d)
        .on("click", function(e){
            // JavaScript permissive nature makes the process of tracking state inside the element easy.
            // By adding a new member to our element (In this case HTMLElement) we can track the state
            // D3 assign the active DOM element to "this" before invoking the callback, and so provide
            // access to the current DOM element.
            // If element is undefined, it returns false in boolean context.
            // Remember we don't have access to this when using arrow function ()=>{}
            this.toggleState = !this.toggleState  //this.toggleState is undefined, which returns false, then we reverse it
            console.log(this.toggleState)
            d3.select(this)
                .transition() // smoothly transite between current state and the final state
                .duration(1000) // the interval to transition is specified as 1 seconds.
                .style('color', this.toggleState?"red":"black")
            // selectDemo1() // Uncomment this to see how states in one element can be used to update other elements.

        })
}

function handleOnLoad() {
    D3Basic()

    demo2()  // Working with line and scale
    demo3()  // creating axis
    demo4()  // Exploring Othert DOM element
    demo5()  // Transition example
}

