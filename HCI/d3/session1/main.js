// console.log(d3);
// d3.select("rect")
//   .style("fill", "pink");
const data = rawData.map(d => ({
  usGross: parseFloat(d.us_gross),
  rottenRating: parseInt(d.rotten_rating),
  rating: d.rating
}))

const svg = d3.select('svg')
const [svgWidth, svgHeight] = [500, 500]
const margin = {top: 20, right: 10, bottom: 30, left: 40}
svg.attr('width', svgWidth).attr('height', svgHeight);

const width = svgWidth - margin.right - margin.left
const height = svgHeight - margin.top - margin.bottom

const translate = (x, y) => `translate(${x}, ${y})`
const container = svg.append('g')
  .attr('transform', translate(margin.left, margin.top));

const x = d3.scaleLinear()
  .domain([
    d3.min(data.map(d => d.usGross)),
    d3.max(data.map(d => d.usGross))
  ])
  .range([0, width])

const y = d3.scaleLinear()
  .domain([
    d3.min(data.map(d => d.rottenRating)),
    d3.max(data.map(d => d.rottenRating))
  ])
  .range([height, 0])

const color = d3.scaleOrdinal()
  .domain(['전체이용가', '7세이상', '15세이상', '19세이상'])
  .range(['#3366cc', '#109618', '#ff9900', '#dc3912'])

const circles = container.selectAll('circle').data(data).enter().append('circle')
  .attr('cx', d => x(d.usGross))
  .attr('cy', d => y(d.rottenRating))
  .attr('r', 3.5)
  .style('fill', d => color(d.rating))

const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);


container.append('g').call(xAxis)
  .attr('transform', translate(0, height));
container.append('g').call(yAxis)
  .attr('transform', translate(0, 0))

circles.on('mouseenter', function () {
  d3.select(this).style('fill', 'black')
    .transition().duration(1000)
    .attr('r', 15)
})

circles.on('mouseleave', function () {
  d3.select(this).style('fill', d => color(d.rating))
    .transition().duration(1000)
    .attr('r', 3.5)
})

// const oldData = [
//   {name: 'A', value: 2}, 
//   {name: 'B', value: 1}, 
//   {name: 'C', value: 5}, 
// ];

// const svg = d3.select('svg');

// svg.selectAll('rect')
//   .data(oldData, d => d.name).enter().append('rect')
//   .attr('width', d => d.value * 100)
//   .attr('height', 30)
//   .attr('x', 0)
//   .attr('y', (d, i) => i * 50);

// const newData = [
//   {name: 'A', value: 4}, 
//   {name: 'B', value: 3}, 
//   {name: 'C', value: 2}, 
// ];

// let bars = svg.selectAll('rect').data(newData, d => d.name)
// console.log(bars);

// bars.enter().append('rect').merge(bars)
//   .attr('width', d => d.value * 100)
//   .attr('height', 30)
//   .attr('x', 0)
//   .attr('y', (d, i) => i * 50);

// // bars
// //   .attr('width', d => d.value * 100)
// //   .attr('height', 30)
// //   .attr('x', 0)
// //   .attr('y', (d, i) => i * 50); 

// bars.exit().remove();