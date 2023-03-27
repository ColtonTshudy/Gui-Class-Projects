function osmMap() {

    /**
     * HTML code
     * <div>
     *     <svg width="600" height="350" style="background: lightgrey" id="osm"></svg>
     * </div>
     */

    let projector = d3.geoIdentity().reflectY(true)  // Projectors are the key element when visualizing geographic data,  
    // why this? 
    // Try other such as geoMercator and see the result!
    // Why reflectY set to true? Canvas and SVG treat positive y as pointing down. This is not true when using standard spatial reference system

    let path = d3.geoPath() // Our path generator
    let svg = d3.select('#osm')
    let width = svg.attr('width')
    let height = svg.attr('height')

    d3.json('./rsc/bb.topojson')
        .then((map) => {
            console.log(map)
            // Creating mesh from topojson file is the easiest way to fit
            // the scale of our svg file
            const mesh = topojson.mesh(map, map.objects.collection)
            projector.fitSize([width, height], mesh)
            path.projection(projector) // Assigning our projector to the path generator.

            buildings = topojson.feature(map, map.objects.collection).features

            // Create array of building names
            let names = {};
            buildings.forEach(function(d){
                names[d.id] = d.properties.name;
                });
            console.log(names)
            
            svg.append("g")
                .selectAll("path")
                .data(buildings)
                .enter()
                .append("path")
                .attr("d", path);

            svg.append("g")
                .selectAll("text")
                .data(buildings)
                .enter()
                .append("svg:text")
                .text(function (d) {
                    return names[d.id];
                })
                .attr("x", function (d) {
                    return path.centroid(d)[0];
                })
                .attr("y", function (d) {
                    return path.centroid(d)[1];
                })
                .attr("text-anchor", "middle")
                .attr('fill', 'white')
                .attr('style', 'font-size:10px; text-shadow: -0.5px 0.5px 0 #000;')
        })
}