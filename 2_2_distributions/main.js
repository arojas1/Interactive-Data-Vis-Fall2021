/* CONSTANTS AND GLOBALS */
const width = 1000,
  height = 500,
  margin = 20,
  leftmargin = 105,
  radius = 15;

/* LOAD DATA */
d3.csv("../data/populationOverTimeFILTERED.csv", d3.autoType)
  .then(data => {
    console.log(data)

    // datafiltered = data.filter(d => d.Entity == "China")

    // data.sort((a,b) => d3.ascending(a.Entity, b.Entity))

    const svg = d3.select("#container")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "black")

    /* SCALES */   

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Year))
      .range([leftmargin, width-margin])
      .nice()

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.Entity))
      .range([height-margin, margin])
      .paddingInner(10)
      // .nice()

    const colorScale = d3.scaleOrdinal(d3.schemeAccent);

    const rScale = d3.scaleRadial()
      .domain(d3.extent(data, d => d.Population))
      .range([0, radius])

    // console.log(xScale("Samoa"))

    
    
    /* HTML ELEMENTS */

    svg.selectAll(".point")
      // .data(data)
      .data(data)
      .join("circle")
      .attr("class", "point")
      .attr("cx", d => xScale(d.Year))
      .attr("cy", d => yScale(d.Entity))
      // .attr("r", radius)
      .attr("r", d => rScale(d.Population))
      .style("fill", d => colorScale(d.Entity))

      svg.append("g")
        .attr("class", "x-axis")
        .style("transform", `translate(0px, ${height-margin}px)`)
        .call(d3.axisBottom(xScale))
        .style("color", "white")
        // .selectAll("text")
        // .style("font-size", "medium")

      svg.append("g")
        .attr("class", "y-axis")
        .style("transform", `translate(${leftmargin}px,0px)`)
        .call(d3.axisLeft(yScale))
        .style("color", "white")
        // .selectAll("text")
        // .attr("x", 5)
        // .attr("dy", "1.5em")
        // .attr("transform", "rotate(90)")
        // .style("text-anchor", "middle")
        // .style("font-size", "large")
    
  });
