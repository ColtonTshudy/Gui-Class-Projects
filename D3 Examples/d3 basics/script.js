const inputData = [
    {x: 100, y: 50, color: "red", value: 3},
    {x: 200, y: 100, color: 'blue', value: 5},
    {x: 300, y: 150, color:"red", value: 7},
    {x: 400, y: 200, color: 'black', value: 3},
    {x: 500, y: 250, color: 'yellow', value: 4}]

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
    // Why it is not working?
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

function handleOnLoad() {
    D3Basic()
}