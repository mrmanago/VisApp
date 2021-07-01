import React, {Component, useEffect} from 'react';
import * as d3 from 'd3';

const SummaryNode = () => {

    useEffect(() => {
        d3.json("/sample-datasets/node-link-value.json").then(data => {

            const width = 778,
                height = 778;

            let beautifulVariable = true;

            //Drag functions
            const dragStart = (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            };

            const drag = (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            };

            const dragEnd = (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            //Setting location when ticked
            const ticked = () => {
                link
                    .attr("x1", d => { return d.source.x; })
                    .attr("y1", d => { return d.source.y; })
                    .attr("x2", d => { return d.target.x; })
                    .attr("y2", d => { return d.target.y; });

                node
                    .attr("cx", function (d) {return d.x;})
                    .attr("cy", function (d) {return d.y;});
            };

            //Initializing force simulation
            const simulation = d3.forceSimulation()
                .force('link', d3.forceLink())
                .force('charge', d3.forceManyBody().strength(-50))
                .force('collision', d3.forceCollide().radius(20))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force("y", d3.forceY(0))
                .force("x", d3.forceX(0));

            const scale = d3.scaleOrdinal(d3.schemeCategory10);

            //Initializing chart
            const svg = d3.select('.chart')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .call(d3.zoom().on("zoom", function(event) {
                    svg.attr("transform", event.transform)
                }));

            //Creating tooltip
            const tooltip = d3.select('.Vis3')
                .append('div')
                .attr('class', 'tooltip')
                .html('Tooltip');


            const mouseOver = (event, d) => {
                tooltip.html("id:" + d.id + "<br/> email:" + d.email + "<br/> Job Title:" + d.jobTitle)
                    .transition()
                    .delay(100)
                    .duration(1000)
                    .style('left', event.pageX + 5 + 'px')
                    .style('top', event.pageY + 5 + 'px')
                    .style('opacity', .9);
            }

            const mouseClick = (event, d) => {
                if (beautifulVariable) {
                    node
                        .filter((c) => {
                            c.selected = true;
                        })

                    link
                        .filter((c) => {
                            if (c.target.id === d.id) {

                                c.source.selected = false;
                                c.target.selected = false;
                            }
                            if (c.source.id === d.id) {

                                c.source.selected = false;
                                c.target.selected = false;
                            }
                            return c.target.id !== d.id && c.source.id !== d.id;
                        })
                        .style("visibility", "hidden")

                    node
                        .filter(c => c.selected)
                        .attr("opacity", 0);
                }
                beautifulVariable = false;
            }

            const mouseOut = () => {
                tooltip.style('opacity', 0)
                    .style('left', '400px')
                    .style('top', '400px');
            }

            const mouseClickButton = () => {
                beautifulVariable = true;
                node.attr("opacity", 1);
                link.style("visibility", "visible");
            }

            //Creating links
            const link = svg
                .selectAll('line')
                .data(data.links).enter()
                .append('line')
                .style("stroke", "#aaa")
                .attr('stroke-width', (d) => d.weight / 100);

            //Creating nodes
            const node = svg
                .selectAll('circle')
                .data(data.nodes).enter()
                .append('circle')
                .attr("r", 7)
                .style("fill", (d) => scale(d.jobTitle))
                .on('mouseover', mouseOver)
                .on('mouseout', mouseOut)
                .on('click', mouseClick)
                .call(d3.drag()
                    .on('start', dragStart)
                    .on('drag', drag)
                    .on('end', dragEnd)
                );

            const rect = svg.append('rect', 'text')
                .attr("x", 0)
                .attr("y", 550)
                .attr("width", 60)
                .attr("height", 60)
                .style("fill", "black")
                .on('click', mouseClickButton);

            const text = svg.append('text')
                .attr('x', 5)
                .attr('y', 585)
                .attr('stroke', 'white')
                .style("font-size", 19)
                .text("Reset")
                .on('click', mouseClickButton);

            //Starting simulation
            simulation.nodes(data.nodes).on('tick', ticked);
            simulation.force('link').links(data.links);
        })
    }, [])

    return (
        <div className='Vis3'>
            <svg className='chart' />
        </div>)
}
export default SummaryNode