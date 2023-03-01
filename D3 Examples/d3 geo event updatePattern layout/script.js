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


function transitionExample1(){
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

function transitionExample2(){
    let ds1 = [['value1', 5], ['value2', 10], ['value3', 2]]
    // add ['value4', 8] to understand exit and enter
    let ds2 = [['value1', 15], ['value3', 7], ['value4', 8]]
    let svg = d3.select("#d7").append('svg')
    svg.attr('width', 600).attr('height', 300)
    svg.style('background', 'lightgrey')
    let pxX = svg.attr('width'), pxY =svg.attr('height')
    let scX = d3.scaleLinear().domain([1, 15]).range([50, pxX]).nice()
    let scY = d3.scaleLinear().domain([-1, 3]).range([pxY, 0]).nice()

    let counter = -1
    svg.selectAll('text')
        .data(ds1)
        .enter()
        .append('text')
        .attr('x', 20)
        .attr('y', d=>scY(++counter))
        .text(d=>d[0])

    counter = -1
    svg.selectAll('circle')
        .data(ds1)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', d=>scX(d[1]))
        .attr('cy', d=>scY(++counter))

    let cd = svg.selectAll('circle').data()

    svg.on('click', function(){
        let cir = svg.selectAll('circle').data(ds2, d=>d[0])
        // On enter if we include ['value4', 8] to ds2, it will be added
        // cir.enter()
        //     .append('circle')
        //     .attr('r', 5)
        //     .attr('cx', d=>scX(d[1]))
        //     .attr('cy', d=>scY(2))
        cir.transition().duration(1000)
            .attr('cx', d=>scX(d[1]))
        // On exit "value3" is the only element that the color will get change.
        cir.exit().attr('fill', 'blue')
    })
}

function generalUpdatePatternExample(){
    /**
     * Exploring general update pattern
     */
    let ds1 = [[2, 3, 'green'], [1, 2, 'red'], [2, 1, 'blue'], [3, 2, 'yellow']]
    let ds2 = [[1, 1, 'red'], [3, 3, 'black'], [1, 3, 'lime'], [3, 1, 'blue']]

    let svg = d3.select('#d8').append('svg').attr("width", 600).attr('height', 300)
    svg.style('background', 'lightgrey')
    let pxX = svg.attr('width'), pxY = svg.attr('height')

    let scX = d3.scaleLinear().domain([1, 3]).range([20, pxX-20]).nice()
    let scY = d3.scaleLinear().domain([1, 3]).range([pxY-20, 20]).nice()


    svg.on('click', function(e, d){
        [ds1, ds2] = [ds2, ds1]

        // Step1: Bind new data
        // assign the selection
        let cs = svg.selectAll('circle').data(ds1, d=>d[2])

        // Step2: Remove any surplus items that do not have matching data
        //remove the element that are not in the dataset
        cs.exit().remove()

        // Step3: Create and configure all item associated with data points
        // append the element new to the dataset
        cs = cs.enter().append('circle')
            .attr('r', 5)
            .attr('fill', d=>d[2])
            // Step 4: Merge the remaining items from the original selection with the newly created items
            .merge(cs)
        console.log("after merging")
        console.log(cs)
        // Step5: Update all items in the combined selection based on the current values of the bound data set
        cs.attr('cx', d=>scX(d[0]))
            .attr('cy', d=>scY(d[1]))
    })
    svg.dispatch('click') // Trigger the event when the page is first loaded.



}

function eventExample1() {
    let svg = d3.select('#mousePos').append('svg').attr("width", 600).attr('height', 300)
    svg.style('background', 'lightgrey')

    let text = svg.append('text')
    svg.on('mousemove', function(e, d){
        let [x, y] = d3.pointer(e, this)  // New to d3v6, the older version uses d3.mouse
        text.attr('x', x+10)
            .attr('y', y).text(`${x}, ${y}`)
    })
}

function dragAndDrop(){
    let widget = undefined, color = undefined
    let drag = d3.drag()
        .on('start', function (e, d){
            color = d3.select(this).attr('fill')
            widget = d3.select(this)
                .attr('fill', 'lime')

        })
        .on('drag', function (e, d){
            let [x, y] = d3.pointer(e, this)
            widget.attr('cx', x).attr('cy', y)
        })
        .on('end', function(e, d){
            widget.attr('fill', color)
            widget = undefined
        })
    d3.select("#drag")
        .selectAll('circle').call(drag)

}


function trackPoint(){

    let margin ={top: 20, right: 20, bottom: 20, left: 20}
    let width = 300 - margin.left - margin.right
    let height = 300 - margin.top - margin.bottom
    let svg1 = d3.select("#track").append("svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('background', 'lightgrey')
        .attr('id', 't1')

    let svg2 = d3.select("#track").append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('background', 'lightgrey')
        .attr('id', 't2')

    let ds1 = [{id: '1', x: 3, y:5}, {id: '2', x: 6, y:9}, {id: '3', x: 16, y:7}, {id: '4', x: 20, y:23}]
    let ds2 = [{id: '1', x: 13, y:10}, {id: '2', x: 16, y:19}, {id: '3', x: 6, y:14}, {id: '4', x: 18, y:20}]

    let scX1 = d3.scaleLinear().domain(d3.extent(ds1.map(element=>element.x))).range([0, width])
    let scY1 = d3.scaleLinear().domain(d3.extent(ds1.map(element=>element.y))).range([height, 0])

    let scX2 = d3.scaleLinear().domain(d3.extent(ds2.map(element=>element.x))).range([0, width])
    let scY2 = d3.scaleLinear().domain(d3.extent(ds2.map(element=>element.y))).range([height, 0])


    let g1 = svg1.append('g')
        .classed('ds1', true)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Look at this code snippet! We can make it a function
    // A function such as this that takes a selection instance as argument and
    // adds DOM elements to that selection is called component in D3.
    let cs1 = g1.selectAll('circle')
        .data(ds1, d=>d.id)
        .enter()
        .append('circle')
        .attr('r', '5')
        .attr('cx', d=>scX1(d.x))
        .attr('cy', d=>scY1(d.y))



    let g2 = svg2.append('g')
        .classed('ds2', true)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    let cs2 = g2.selectAll('circle')
        .data(ds2, d=>d.id)
        .enter()
        .append('circle')
        .classed('cir', true)
        .attr('r', '5')
        .attr('cx', d=>scX2(d.x))
        .attr('cy', d=>scY2(d.y))

    let text1 = g1.append('text')
    let text2 = g2.append('text')

    cs1.on("mouseover", function(e, d) {
        let [x, y] = d3.pointer(e, this)
        text1.attr('x', x+10)
            .attr('y', y+10)
            .text(d.id)
            .attr('visibility', 'visible')
        cs2.filter(e=>e.id===d.id).classed('cir', false).classed('sel', true)
    })
        .on('mouseout', (e, d)=>{
            text1.attr('visibility', 'hidden')
            cs2.filter(e=>e.id===d.id).classed('cir', true).classed('sel', false)
        })
        .on('click', (e, d)=>{

            if (e.detail === 1){
                cs2.filter(e=>e.id===d.id).classed('cir sel', false).classed('fixed', true)
            }
            else if(e.detail === 2){
                cs2.filter(e=>e.id===d.id).classed('sel fixed', false).classed('cir', true)
            }
        })
}

function geoVis(){
    let path = d3.geoPath()

    d3.json("https://d3js.org/us-10m.v1.json").then(function(us){
        console.log(topojson.feature(us, us.objects.states))
        let margin ={top: 20, right: 20, bottom: 20, left: 20}
        let width = 1200 - margin.left - margin.right
        let height = 1200 - margin.top - margin.bottom
        let svg1 = d3.select("#geo").append("svg")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .style('background', 'lightgrey')
            .selectAll('path')
            .data(topojson.feature(us, us.objects.states).features)
            .enter()
            .append('path')
            .attr('d', path)
    })

}

function makePie() {
    /**
     * Example from D3 for impatient
     */
    let data = [ { name: "Jim", votes: 12 },
        { name: "Sue", votes:  5 },
        { name: "Bob", votes: 21 },
        { name: "Ann", votes: 17 },
        { name: "Dan", votes:  3 } ];

    let pie = d3.pie().value(d=>d.votes).padAngle(0.025)( data )

    let arcMkr = d3.arc().innerRadius( 50 ).outerRadius( 150 )
        .cornerRadius(10);

    let scC = d3.scaleOrdinal( d3.schemePastel2 )
        .domain( pie.map(d=>d.index) )

    let svg = d3.select("#pie")
        .append('svg')
        .attr('width', 600)
        .attr('height', 350)
        .style('background', 'lightgrey')


    let g = svg
        .append( "g" ).attr( "transform", "translate(300, 175)" )

    g.selectAll( "path" ).data( pie ).enter().append( "path" )
        .attr( "d", arcMkr )
        .attr( "fill", d=>scC(d.index) ).attr( "stroke", "grey" );

    g.selectAll( "text" ).data( pie ).enter().append( "text" )
        .text( d => d.data.name )
        .attr( "x", d=>arcMkr.innerRadius(85).centroid(d)[0] )
        .attr( "y", d=>arcMkr.innerRadius(85).centroid(d)[1] )
        .attr( "font-family", "sans-serif" ).attr( "font-size", 14 )
        .attr( "text-anchor", "middle" );
}



function handleOnLoad() {
    D3Basic()

    demo2()  // Working with line and scale
    demo3()  // creating axis
    demo4()  // Exploring Othert DOM element
    transitionExample1()  // Transition example
    transitionExample2()
    generalUpdatePatternExample()
    eventExample1() //Getting x and y coord based on relative position related to parent
    dragAndDrop()
    trackPoint()
    geoVis()
    makePie()
}

