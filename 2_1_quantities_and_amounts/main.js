/* CONSTANTS AND GLOBALS */
const width = 1000,
 height = 600,
 margin = 40;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    // console.log("data", data)

    data.sort((a,b) => d3.descending(a.count, b.count))

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      // .style("background-color", "lightblue")
    
    const activities = data.map(d => d.activity)

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.count))
      .range([0, width])
      .nice()

    // console.log(d3.extent(data, d => d.count))
    
    const yScale = d3.scaleBand()
      .domain(activities)
      .range([height-margin, 0])
      
      .paddingInner(0.2);

    // console.log(d => yScale(d.activity))

    const colorScale = d3.scaleOrdinal(d3.schemeAccent);

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", margin)
      .attr("y", d => yScale(d.activity))
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth)
      .style("fill", d => colorScale(d.activity))

      svg.append("g")
        .attr("class", "x-axis")
        .style("transform", `translate(${margin}px, ${height-margin}px)`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("font-size", "medium")

      svg.append("g")
        .attr("class", "y-axis")
        .style("transform", `translate(${margin}px,0px)`)
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        // .attr("y", 0)
        .attr("x", 5)
        .attr("dy", "1.5em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "middle")
        .style("font-size", "large")
  })