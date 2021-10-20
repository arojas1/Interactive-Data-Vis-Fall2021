/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9,
  height = window.innerHeight * .9,
  margin = { top: 20, bottom: 20, left: 20, right: 20 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/custom.geo.json"),
  d3.csv("../data/flood_myths_site_data.csv", d3.autoType),
]).then(([geojson, floodloc]) => {
  console.log(geojson, floodloc)
  
  // SPECIFY PROJECTION
  const projection = d3.geoEqualEarth()
    .fitSize([
      width - margin.left- margin.right,
      height - margin.top - margin.bottom
    ], geojson)

  // DEFINE PATH FUNCTION
    const pathGen = d3.geoPath(projection)
    // console.log('path :>>', pathGen);

  // APPEND GEOJSON PATH  
  const svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block");

  const countries = svg.selectAll("path.countries")
    .data(geojson.features, d => d.properties.postal)
    .join("path")
    .attr("class", "countries")
    .attr("d", d => pathGen(d))
    .attr("fill", "transparent")
    .attr("stroke", "black")
  
  // APPEND DATA AS SHAPE
  svg.selectAll("circle.floodloc")
  .data(floodloc)
  .join("circle")
  .attr("class", "floodloc")
  .attr("r", 3)
  .attr("fill", "blue")
  .attr("transform", d => {
    const [x,y] = projection([d.Lon, d.Lat])
    return `translate(${x}, ${y})`
  })
    .append("svg:title")
    .text(d => d.FMcountry)

});