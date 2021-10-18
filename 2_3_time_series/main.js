 /* CONSTANTS AND GLOBALS */
const width = 700,
  height = 700,
  margin = 30;

/* LOAD DATA */
d3.csv('../data/usHeatExtremes.csv', d => {
  return {
    // year: new Date(+d.Year, 0, 1),
    // country: d.Entity,
    // population: +d.Population
    state: d.State,
    heatchange: d['Change in 95 percent Days'],
    lat: d.Lat
  }
}).then(data => {
  // console.log(data);

  datafiltered = data.filter(d => d.state == "NY")
  console.log(datafiltered);

  datafiltered.sort((a,b) => d3.ascending(a.lat, b.lat) || d3.ascending(a.heatchange, b.heatchange))

  // SCALES
  const xScale = d3.scaleLinear()
    .domain(d3.extent(datafiltered, d => d.lat))
    .range([margin, width-margin])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(datafiltered, d => d.heatchange))
    .range([height-margin, margin])

  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION
  const lineGen = d3.line()
  .x(d => xScale(d.lat))
  .y(d => yScale(d.heatchange))

  const stategroup = d3.groups(datafiltered, d => d.state, d => d.lat).map(([key, state, lat]) => datafiltered)
  
  // console.log('stategroups :>>',stategroup)

  // DRAW LINE
  svg.selectAll(".line")
    .data(stategroup)
    .join("path")
    .attr("class", "line")
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("d", d => lineGen(d))

  svg.append("g")
    .attr("class", "x-axis")
    .style("transform", `translate(0px, ${width-margin}px)`)
    .call(d3.axisBottom(xScale))
    // .selectAll("text")
    // .style("font-size", "medium")

  svg.append("g")
    .attr("class", "y-axis")
    .style("transform", `translate(${margin}px,0px)`)
    .call(d3.axisLeft(yScale))
    // .selectAll("text")
    // .attr("y", 0)
    // .attr("x", 5)
    // .attr("dy", "1.5em")
    // .attr("transform", "rotate(90)")
    // .style("text-anchor", "middle")
    // .style("font-size", "large")

});