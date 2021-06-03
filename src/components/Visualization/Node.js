import React, { Component } from 'react';
import * as d3 from 'd3';

class Node extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        
        d3.json("/sample-datasets/node-link-value.json", function(data) {
            const width = 1024,
            height = 640;
      
            //Initializing chart
            const svg = d3.select('.chart')
                .attr('width', width)
                .attr('height', height)
                .append('g');
            
            //Creating tooltip
            const tooltip = d3.select('.container')
                .append('div')
                .attr('class', 'tooltip')
                .html('Tooltip');

            
            //Initializing force simulation
            const simulation = d3.forceSimulation()
                .force('link', d3.forceLink())
                .force('charge', d3.forceManyBody())
                .force('collide', d3.forceCollide())
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force("y", d3.forceY(0))
                .force("x", d3.forceX(0));
        
        
            //Drag functions
            const dragStart = d => {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            };
      
            const drag = d => {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            };
            
            const dragEnd = d => {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            const mouseOver = d => {
                tooltip.html("id:"+d.id+"<br/>"+"eamil:"+d.email+"<br/>"+"Job Title:"+d.jobTitle)
                    .transition()
                    .delay(1000)
                    .duration(1500)
                    .style('left', d3.event.pageX + 5 +'px')
                    .style('top', d3.event.pageY + 5 + 'px')
                    .style('opacity', .9);
            }

            const mouseOut = () => {
                tooltip.style('opacity', 0)
                .style('left', '400px')
                .style('top', '400px');
            }
        
            //Creating links
            const link = svg
                .selectAll('line')
                .data(data.links).enter()
                .append('line')
                .style("stroke", "#aaa");
      
            //Creating nodes
            const node = svg
                .selectAll('circle')
                .data(data.nodes).enter()
                .append('circle')
                .attr("r", 6)
                .style("fill", "red")
                .on('mouseover', mouseOver)
                .on('mouseout', mouseOut)
                .call(d3.drag()
                    .on('start', dragStart)
                    .on('drag', drag)
                    .on('end', dragEnd)
                );
        
            //Setting location when ticked
            const ticked = () => {
                link
                .attr("x1", d => { return d.source.x; })
                .attr("y1", d => { return d.source.y; })
                .attr("x2", d => { return d.target.x; })
                .attr("y2", d => { return d.target.y; });

                node
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
            };
        
            //Starting simulation
            simulation.nodes(data.nodes)
                .on('tick', ticked);
            
            simulation.force('link')
                .links(data.links);
        });
    }

    render(){
        return (
            <div className='container'>
                <div className='chartContainer'>
                    <svg className='chart'>
                    </svg>
                </div>
          </div>
        );
    }

}
export default Node