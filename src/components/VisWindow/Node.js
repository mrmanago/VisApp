import React, {useEffect} from 'react'
import * as d3 from "d3";
//import PropTypes from 'prop-types'

const Node = ({ data }) => {
    const width = 778
    const height = 778

    useEffect(() => {
        // Finding all the availible peop;e
        const ids = Array.from(new Set(data.flatMap(d => [d.fromId]))).sort(d3.ascending)
        console.log(ids)

        // ParseData
        let nodeData = data
        let objData = {}
        let edges = []
        for (let i = 0; i < data.length; i++) {
            nodeData[i]['id'] = nodeData[i]['fromId']
            delete nodeData[i]['fromId']
        }
        // creates array to store the edges. Does not include targets that do not have a source
        for (let i = 0; i < nodeData.length; i++) {
            if (ids.includes(nodeData[i]['toId'])) {
                edges.push({source: nodeData[i].id, target: nodeData[i]['toId']})
            }
        }
        objData = {nodes: nodeData, links: edges}
        //const jsonData = JSON.stringify(objData)
        //console.log(objData)

        // Change color later to sync with chord
        const color = d3.scaleOrdinal(d3.schemeCategory10)

        // Array of objects that hold the nodes and links. Can replace these with the calc version above
        const links = objData.links.map(d => Object.create(d))
        const nodes = objData.nodes.map(d => Object.create(d))
        //console.log(links)
        //console.log(nodes)

        // force sim
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-.05))
            .force("center", d3.forceCenter(width / 2, height / 2))

        const svg = d3.select(".node-diagram")
            .attr("viewBox", [0, 0, width, height])
            .append("g");

        // clear out old version
        svg.selectAll("*").remove();

        const link = svg
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .style("stroke", "#69b3a2"); // TODO color edges by sentiment

        const node = svg
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", color);

        node.append("title")
            .text(d => d.id);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });


    }, [data])

    // create sim - setting up the layout

    // draw - making the chart

    // drag - dragging nodes around

    // node - filter using timeStart and timeEnd

    // link - filter using timeStart and timeEnd


    // TODO brushing and linking
    // TODO grouping in node


    return (
        <div className="Vis2">
            <svg className="node-diagram"/>
        </div>
    )   

}

export default Node