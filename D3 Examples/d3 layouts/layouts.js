

function handleLoad(){
        exploringPieLayout()
        expoloringHistogram()
        exploringTree()
        exploringCluster()
        exploringRadialLayout()
        exploringTreemap()
        exploringParitionLayout()
        exploringPackingLayout()
        exploringForceSimulation()
        exploringCollision()
}


const margin = {top: 10, bottom: 10, left: 10, right: 10}
const width = 600 - margin.left - margin.right
const height = 300 - margin.top - margin.bottom
const totalWidth = width + margin.left + margin.right
const totalHeight = height + margin.top + margin.bottom
const backgroundColor = 'lightgrey'

function exploringPieLayout(){

    let data = [1, 1, 2, 2, 2, 3, 4, 5, 1, 4, 4]
    // {1: 3, 2: 3, 3: 1, 4: 3, 5: 1}
    // let data2 = [{value: 1, count: 3},
    //     {value: 2, count: 3},
    //     {value: 3, count: 1},
    //     {value: 4, count: 3},
    //     {value: 5, count: 1}]
    // pie layout Needs a number as a value
    // If the data is not number, we need an accessor for pie().value(d=>d.count)
    let arcData = d3.pie()(data)
    console.log(`Arch Data: \n`)
    console.log(arcData)
    //let arcData = d3.pie().value(d=>d.count)(data2)
   // console.log(arcData)
    // padAngle: Can be define here or can be read from the layout
    // Calculated as padRadius * padAngle
    // padRadius: innerRadius^2 + outerRaidus^2, separtes adjacent arcs
    let arcMaker = d3.arc().innerRadius(50).outerRadius(100).padAngle(.02)
    console.log(`Arch Maker:\n`)
    console.log(arcData.map(element=>arcMaker(element)))  // The arcData adds extra properties to __Data__ which arcMaker will use to generate path.
    // Filling our pie value,
    // Ordinal scales have a discrete domain (set of name and category)
    // Given the value in domian returns the value in the range
    // Hence, the domain needs to be specified array of values (Simply accessor d=>d.value won't work
    // We can use pie.map.

    // Using set to get the unique values
    // let arcSet = new Set()
    // arcData.forEach(e=>arcSet.add(e.value))
    // console.log(arcSet)

    //console.log(arcData.map(d=>d.index))
    console.log(d3.schemePastel1) // Just array of hex color
    let scC = d3.scaleOrdinal().range(d3.schemePastel1).domain(arcData.map(d=>d.index)) // ScaleOrdinal as name suggests, creates ordinal scaling. In D3 categorical and ordinal are the same, as everything in d3 is one-to-one connection.

    let g = d3.select('#pie')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', backgroundColor)
            .attr('class', 'svg-container')
            .append('g')
            .attr('class', 'pie-container')



        g.attr('transform', `translate(${width/2}, ${height/2})`)
        let pieSel = g.selectAll('path')
                        .data(arcData)
                        .enter()
                        .append('path')
                        .attr('d', arcMaker)
                        .attr('fill', d=>scC(d))
                        .attr('stroke', 'black')

        // Adding text

        // g.selectAll('text')
        //     .data(arcData)
        //     .enter()
        //     .append('text')
        //     .text(d=>d.value)
        //     //.text(d=>d.data.value)
        //     .attr('x',d=> arcMaker.centroid(d)[0])
        //     .attr('y',d=> arcMaker.centroid(d)[1])

    // Adding text

    //     let toolTip = d3.select('.pie-container')
    //         .append('text')
    //         .attr('visibility', 'hidden')
    //         .attr('id', 'pi-info')
    //         .attr('pointer-events', 'none')
    //
    //     pieSel.on('mouseover', function(e, d){
    //         console.log('here')
    //         let [x, y] = d3.pointer(e, this)
    //         toolTip.attr('visibility', 'visible')
    //             .text(d.value)
    // })
    //
    //     pieSel.on('mouseleave', function(e, d){
    //         toolTip.attr('visibility', 'hidden')
    //
    // })
}

function expoloringHistogram(){
    let data = [0, 0, 1, 1, 1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8]
    let bin = d3.bin()
    // The bins returned by d3.bin are customarily represented by a histogram chart (frequent bar chart)
    // in case we are dealing with an object
    // let bin = d3.bin().value(d=>d.value)

    // bin domain defines the lowest and highest value to be considered
    // the default value for domain is min and max
    // We can define a scale function to set the range for our domain using nice bound
    // bin.domain([0, 5])
    // bin threshold accepts various types of arguments, depending on the strategy we want the bin to use when it will
    // read the data
    // bin.thresholds([0, 5, 10])
    // Define as a fixed number of bins
     //bin.thresholds(4)  // the result is not guaranteed to yield the exact number of buckets we asked for.

    // console.log(d3.ticks(0, 10, 4))  // Generates an array between start and stop nicely rounded based on count
    // We can define our own threshold generator using the following callback: (data, min, max)=>{}
    let buckets = bin(data)
    console.log(buckets)

    let g = d3.select('#hist')
            .append('svg')
            .attr('width', totalWidth)
            .attr('height', totalHeight)
            .style('background', backgroundColor)
            .attr('class', 'svg-container')
            .append('g')
            .attr('class', 'hist-container')

    let x = d3.scaleLinear().domain([0, 10]).range([30, width-30])
    let maxLength =d3.max(buckets.map(element=>element.length))  // Check the length property in buckets
    var y = d3.scaleLinear().domain([0, maxLength]).range([height, 0])
    let colorBin = d3.scaleThreshold().domain(buckets.map(d=>d.x0)).range(d3.schemePastel2)
    g.selectAll('rect')
        .data(buckets)
        .enter()
        .append('rect')
        .attr("x", d => (x(d.x0) + 1) | 0)
        .attr('y', d=>(y(d.length) + margin.bottom))
        .attr('height', d=>height - y(d.length))
        .attr('width', d=>(x(d.x1)|0) - (x(d.x0)|0) - 10)  // -10 works as our padding
        .attr('fill', d=>colorBin(d.x0))
        .attr('stroke', 'black')
}

function d3ScaleThresholdExample(){
    var color = d3.scaleThreshold()
        .domain([0, 1])
        .range(["red", "white", "green"]);

    color(-1);   // "red"
    color(0);    // "white"
    color(0.5);  // "white"
    color(1);    // "green"
    color(1000); // "green"
}

const hierarchyExample = {
    "value": 10,
    "children": [
        {
            "value": 2
        },
        {
            "value": 5,
            "children": [
                {
                    "value": 3
                },
                {
                    "value": 4
                }
            ]
        },
        {
            "value": 6
        },
        {
            "value": 8,
            "children": [
                {
                    "value": 7
                }
            ]
        },
        {
            "value": 9
        }
    ]
}

const relationshipTable =
    "value,parent\n" +
    "10,\n" +
    "2,10\n" +
    "5,10\n" +
    "3,5\n" +
    "4,5\n" +
    "6,10\n" +
    "8,10\n" +
    "7,8\n" +
    "9,10"


function exploringTree() {

    let hierarchyData = d3.hierarchy(hierarchyExample)
    console.log(hierarchyData)

    // Using table of relationships
    let nonHierarchy = d3.csvParse(relationshipTable)
    nonHierarchy = d3.stratify().id(d=>d.value).parentId(d=>d.parent)(nonHierarchy)
    //console.log(nonHierarchy)

    // each value is a node
    let children = hierarchyData.descendants() // returns an array of all descending children
    //console.log(children)

    let links = hierarchyData.links()
    //console.log(links)

    // sum method adds a value property to data and increase the value based on the accessor method.
    let sum = hierarchyData.sum(d=>d.value ? 1:0)  // some layouts requires node.value, so we need to call this method d3.treemap is one of them
    //console.log(sum)

    // sort children
    // If 'a' needs to be before 'b': return value less than zero
    // if 'b' needs to be before 'a': returns value greater than zero
    // otherwise the relative order is not specified
    // hierarchyData.sort((a, b)=>b.data.value - a.data.value) // in place sorting, this returns descending order
   //console.log(hierarchyData)

    // tree layout
    let addTree = true
    if (addTree)
    {
        let treeLayout = d3.tree().size([500, 250])(hierarchyData)
        console.log(treeLayout)

        let g = d3.select('#tree')
            .append('svg')
            .attr('width', totalWidth)
            .attr('height', totalHeight)
            .style('background', backgroundColor)
            .attr('class', 'svg-container')
            .append('g')
            .attr('class', 'hie-container')
            .attr('transform', `translate(${margin.left } ${margin.top + 15})`)

        // Building circle for each node
        g.selectAll('circle')
            .data(treeLayout.descendants())
            .join((enter)=>{
                // we need a group
                let g= enter.append('g')
                    .attr('class', 'data-group')
                g.append('circle')
                    .attr('r', 20)
                    .attr('cx', d=>d.x)
                    .attr('cy', d=>d.y)
                    .attr('fill', 'red')
                    .attr('opacity', '.5')
                g.append('text')
                    .attr('x', d=>d.x)
                    .attr('y', d=>d.y)
                    .attr('dominant-baseline', 'middle')
                    .attr('text-anchor', 'middle')
                    .text(d=>d.data.value)
                return g
            })

        // Suitable for visualizing links in a tree diagram
        let lineGen = d3.linkVertical().x(d=>d.x).y(d=>d.y)
        // draw lines
        g.selectAll('path')
            .data(treeLayout.links()) // pay attention to this, we are passing links
            .enter()
            .append('path')
            .attr('d', d=>lineGen(d))
            .attr("stroke", 'black')
            .attr('fill', 'none')
    }


}

function exploringCluster(){
    let hierarchyData = d3.hierarchy(hierarchyExample)

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
    g.selectAll('circle')
        .data(cluster.descendants())
        .enter()
        .append('circle')
        .attr('r', d=>d.data.value)
        .attr('cx', d=>d.x)
        .attr('cy', d=>d.y)
        .attr('fill', 'red')

    let lineGen = d3.linkVertical().x(d=>d.x).y(d=>d.y)
    g.selectAll('path')
        .data(cluster.links())
        .enter()
        .append('path')
        .attr('d', d=>lineGen(d))
        .attr('fill', 'none')
        .attr('stroke', 'black')
}

function exploringRadialLayout(){
    let hierarchyData = d3.hierarchy(hierarchyExample)

    let g = d3.select('#radial')
        .append('svg')
        .attr('width', totalWidth)
        .attr('height', totalHeight)
        .style('background', backgroundColor)
        .attr('class', 'svg-container')
        .append('g')
        .attr('class', 'cluster-container')
        .attr('transform', `translate(${width/2} ${height/2})scale(.9)`)


    let cluster = d3.cluster().size([2 * Math.PI, 125])(hierarchyData)

    let h = (r, phi)=>r * Math.sin(phi)
    let v = (r, phi)=>-r * Math.cos(phi)
    console.log(cluster)
    g.selectAll('circle')
        .data(cluster.descendants())
        .enter()
        .append('circle')
        .attr('r', d=>d.data.value)
        .attr('cx', d=>h(d.y, d.x))
        .attr('cy', d=>v(d.y, d.x))
        .attr('fill', 'red')

    console.log(cluster.links())
    g.selectAll('line')
        .data(cluster.links())
        .enter()
        .append('line')// appending line and defining end and start of each line in the link
        .attr('x1', d=>h(d.source.y, d.source.x))
        .attr('y1', d=>v(d.source.y, d.source.x))
        .attr('x2', d=>h(d.target.y, d.target.x))
        .attr('y2', d=>v(d.target.y, d.target.x))
        .attr('fill', 'none')
        .attr('stroke', 'black')

    // Instead of line we can use linkRadial to generator d attribute for path to get curve shape.
    // let lineGen = d3.linkRadial().angle(d=>d.x).radius(d=>d.y)
    // g.selectAll("path")
    //     .data(cluster.links())
    //     .enter()
    //     .append('path')
    //     .attr('d', d=>lineGen(d))
    //     .attr('stroke', 'black')
    //     .attr('fill', 'none')
}

function exploringTreemap() {
    let data = d3.hierarchy(hierarchyExample)
    data.sum(d=>d.value ? 1:0)
    data.sort((a, b)=> b.value - a.value || b.height - a.height)
    console.log(data)
    let treemap = d3.treemap().size([width, height]).padding(5)(data)

    let g = d3.select('#treemap')
        .append('svg')
        .attr('width', totalWidth)
        .attr('height', totalHeight)
        .style('background', backgroundColor)
        .attr('class', 'svg-container')
        .append('g')
        .attr('class', 'treemap-container')
        .attr('transform', `translate(${margin.left} ${margin.top})`)

    let sc = d3.scaleOrdinal().range(d3.schemeBlues[9])

    g.selectAll('rect')
        .data(treemap.descendants())
        .enter()
        .append('rect')
        .attr('x', d=>d.x0)
        .attr('y', d=>d.y0)
        .attr('width', d=>d.x1 - d.x0)
        .attr('height', d=>d.y1 - d.y0)
        .attr('fill', d=>sc(d.depth))
        .attr('stroke', 'black')

    g.selectAll('text')
        .data(treemap.leaves())
        .enter()
        .append('text')
        .text(d=>d.data.value)
        .attr('text-anchor', 'middle')
        .attr('x', d=>(d.x0 + d.x1)/2)
        .attr('y', d=>(d.y0 + d.y1)/2)
}

function exploringParitionLayout(){
    let data = d3.hierarchy(hierarchyExample)
    data.sum(d=>d.value ? 1:0)
    data.sort((a, b)=> b.value - a.value || b.height - a.height)
    console.log(data)
    let treemap = d3.partition().size([width, height]).padding(5)(data)

    let g = d3.select('#partition')
        .append('svg')
        .attr('width', totalWidth)
        .attr('height', totalHeight)
        .style('background', backgroundColor)
        .attr('class', 'svg-container')
        .append('g')
        .attr('class', 'partition-container')
        .attr('transform', `translate(${margin.left} ${margin.top})`)

    let sc = d3.scaleOrdinal().range(d3.schemeBlues[9])

    g.selectAll('rect')
        .data(treemap.descendants())
        .enter()
        .append('rect')
        .attr('x', d=>d.x0)
        .attr('y', d=>d.y0)
        .attr('width', d=>d.x1 - d.x0)
        .attr('height', d=>d.y1 - d.y0)
        .attr('fill', d=>sc(d.depth))
        .attr('stroke', 'black')

    g.selectAll('text')
        .data(treemap.descendants())
        .enter()
        .append('text')
        .text(d=>d.data.value)
        .attr('text-anchor', 'middle')
        .attr('x', d=>(d.x0 + d.x1)/2)
        .attr('y', d=>(d.y0 + d.y1)/2)
}

function exploringPackingLayout(){
    let data = d3.hierarchy(hierarchyExample)
    data.sum(d=>d.value ? 1:0)  // we need the value property for pack
    //data.sort((a, b)=> b.value - a.value || b.height - a.height)
    console.log(data)
    let pack = d3.pack().size([width, height])(data)
    console.log(pack)
    let circles = d3.packSiblings(pack)
    console.log(circles)

    let g = d3.select('#pack')
        .append('svg')
        .attr('width', totalWidth)
        .attr('height', totalHeight)
        .style('background', backgroundColor)
        .attr('class', 'svg-container')
        .append('g')
        .attr('class', 'partition-container')
        .attr('transform', `translate(${width/2} ${height/2})scale(.5)`)

    let sc = d3.scaleOrdinal().range(d3.schemeGreys[9])
    g.selectAll('circle')
        .data(pack.descendants())
        .enter()
        .append('circle')
        .attr('cx', d=>d.x)
        .attr('cy', d=>d.y)
        .attr('r', d=>d.r)
        .attr('fill', d=>sc(d.depth))
        .attr('stroke', 'black')

    g.selectAll('text')
        .data(pack.descendants())
        .enter()
        .append('text')
        .attr('x', d=>d.x)
        .attr('y', d=>d.y)
        .text(d=>d.data.value)

}

function exploringForceSimulation(){
    // make the simulation layout by defining forces, multiple forces can be applied
    let simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(10)) // Positive strength to make it attractive
        .force("center", d3.forceCenter().x(width/2).y(height/2))  // Make the nodes center

    // Define our nodes
    let sampleData = d3.range(100).map((d, i)=>({r: 100 - i * .5})) // reduce the radius for each circle
    console.log(sampleData)
    let sc = d3.scaleOrdinal().range(["yellow", 'red', 'green'])


    // assign our nodes to the simulation
    simulation.nodes(sampleData).on('tick', updateNetwork)

    console.log(simulation.nodes())

    let g = d3.select('#force')
        .append('svg')
        .attr('width', totalWidth)
        .attr('height', totalHeight)
        .style('background', backgroundColor)
        .attr('class', 'svg-container')
        .append('g')
        .attr('class', 'force-container')
        .attr('transform', `translate(${margin.left} ${margin.top})`)

    g.selectAll('circle')
        .data(simulation.nodes())
        .enter()
        .append('circle')
        .attr('fill', (d, i)=>sc(i))
        .attr("r", d=>d.r)

    function updateNetwork(){
        g.selectAll('circle')
            .attr('cx', d=>d.x)
            .attr('cy', d=>d.y)
    }
}

function exploringCollision()
{
    let g = d3.select('#collision')
        .append('svg')
        .attr('width', totalWidth)
        .attr('height', totalHeight)
        .style('background', backgroundColor)
        .attr('class', 'svg-container')
        .append('g')
        .attr('class', 'col-container')
        .attr('transform', `translate(${width/2})`)

    let sc = d3.scaleOrdinal().range(["yellow", 'red', 'green'])

    let sampleData = d3.range(300).map(()=>({
        r: Math.abs(d3.randomNormal()()*5+ 2), value: height/2 + d3.randomNormal()() * 5}))

    console.log(sampleData)
    let simulation = d3.forceSimulation()
        .force("collision", d3.forceCollide(d=>d.r))
        .force('x', d3.forceX(100))
        .force('y', d3.forceY(d=>d.value).strength(3))

    simulation.nodes(sampleData).on('tick', updateNetwork)
    console.log(simulation.nodes())
    g.selectAll('circle')
        .data(simulation.nodes())
        .enter()
        .append('circle')
        .attr('fill', (d, i)=>sc(i))
        .attr("r", d=>d.r)

    function updateNetwork(){
        g.selectAll('circle')
            .attr('cx', d=>d.x)
            .attr('cy', d=>d.y)
    }

}

