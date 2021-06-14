import React, {useEffect, useState, useCallback} from 'react'
import * as d3 from "d3";
//import PropTypes from 'prop-types'

const Node = ({ data, groups, selection, updateSelection }) => {
    const [nodeTemp, setNodeTemp] = useState(null)
    const width = 778
    const height = 778
    const radius = 1

    const drag = (simulation) => {

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    useEffect(() => {
        let nodes = []
        for (let i = 0; i < data.length; i++) {
            if (!nodes.some(e => e.id === data[i]['fromId'])) {
                nodes.push({id: data[i]['fromId'], Email: data[i]['fromEmail'], JobTitle: data[i]['fromJobtitle']})
            }
            if (!nodes.some(e => e.id === data[i]['toId'])) {
                nodes.push({id: data[i]['toId'], Email: data[i]['toEmail'], JobTitle: data[i]['toJobtitle']})
            }
        }

        // creates array to store the links. If there is not a node for the outgoing edge it creates one
        let linksAll = []
        for (let i = 0; i < data.length; i++) {
            linksAll.push({source: data[i]['fromId'], target: data[i]['toId'], date: data[i]['date'], key:data[i]['fromId']+data[i]['toId']})
        }

        let links = []
        for (let i = 0; i < linksAll.length; i++) {
            if (!links.some(e => e.key === linksAll[i]['key'])) {
                links.push({source: data[i]['fromId'], target: data[i]['toId'], key:data[i]['fromId']+data[i]['toId'], value: 1, sentiment: data[i]['sentiment']})
            } else {
                links.find(e => e.key === linksAll[i]['key']).value++
                links.find(e => e.key === linksAll[i]['key']).value++
            }
        }



        const ticked = () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)

            node
                .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); })
        }

        // force sim
        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-50))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked)


        // Clear old version
        d3.select(".node-diagram").selectAll("*").remove()

        const scale = d3.scaleOrdinal(d3.schemeCategory10);

        const svg = d3.select(".node-diagram")
            .attr("viewBox", [0, 0, width, height])
            .append("g");

        let link = svg
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .style("stroke", "#3bb1a9"); // TODO color links by sentiment

        let node = svg
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", d => scale(d.JobTitle))
            .call(drag(simulation))

        if (nodeTemp) {
            const old = new Map(nodeTemp.data().map(d => [d.id, d]));
            nodes = nodes.map(d => Object.assign(old.get(d.id) || {}, d));
            links = links.map(d => Object.assign({}, d))
        }

        node = node
            .data(nodes, d => d.id)
            .join(enter => enter.append("circle")
                .attr("r", 5)
                .call(drag(simulation))
                .call(node => node.append("title").text(d => d.id)))

        link = link
            .data(links, d => [d.source, d.target])
            .join("line")

        setNodeTemp(node)

        //Brush
        const brushed = (event) => {
            let selection = event.selection;
            if (selection) {
                const [[x0, y0], [x1, y1]] = selection
                const nodeSelection = nodes.filter(d => {
                    return d.x >= x0 &&
                           d.x <= x1 &&
                           d.y >= y0 &&
                           d.y <= y1
                })
                node.classed("selected", selection && function(d) {
                    return selection[0][0] <= d.x && d.x < selection[1][0]
                        && selection[0][1] <= d.y && d.y < selection[1][1];
                })
                updateSelection(nodeSelection)
            } else {
                updateSelection(nodes)
            }
        }

        const brush = svg.append('g')
            .attr("class", "node")
            .call(d3.brush()
                .extent([[0,0], [width, height]])
                .on("start brush end", brushed))

        // Start sim
        simulation.nodes(nodes);
        simulation.force("link").links(links)
        simulation.alpha(1).restart().tick()
        ticked()
    }, [data])

    useEffect(() => {

    }, [])

    return (
        <div className="Vis2">
            <svg className="node-diagram" />
        </div>
    )   

}

export default Node