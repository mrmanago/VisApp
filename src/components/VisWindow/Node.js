import React, {useEffect, useState} from 'react'
import * as d3 from "d3";
//import PropTypes from 'prop-types'

const Node = ({ data, startTime, endTime }) => {
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
        const dataDate = []
        for (let i = 0; i < data.length; i++) {
            if (!(data[i].date < startTime || data[i].date > endTime)) {
                dataDate.push(data[i])
            }
        }

        let nodes = []
        for (let i = 0; i < dataDate.length; i++) {
            if (!nodes.some(e => e.id === dataDate[i]['fromId'])) {
                nodes.push({id: dataDate[i]['fromId'], Email: dataDate[i]['fromEmail'], JobTitle: dataDate[i]['fromJobtitle']})
            }
            if (!nodes.some(e => e.id === dataDate[i]['toId'])) {
                nodes.push({id: dataDate[i]['toId'], Email: dataDate[i]['toEmail'], JobTitle: dataDate[i]['toJobtitle']})
            }
        }

        // creates array to store the links. If there is not a node for the outgoing edge it creates one
        let linksAll = []
        for (let i = 0; i < dataDate.length; i++) {
            linksAll.push({source: dataDate[i]['fromId'], target: dataDate[i]['toId'], date: dataDate[i]['date'], key:dataDate[i]['fromId']+dataDate[i]['toId']})
        }

        let links = []
        for (let i = 0; i < linksAll.length; i++) {
            if (!links.some(e => e.key === linksAll[i]['key'])) {
                links.push({source: dataDate[i]['fromId'], target: dataDate[i]['toId'], key:dataDate[i]['fromId']+dataDate[i]['toId'], value: 1})
            } else {
                links.find(e => e.key === linksAll[i]['key']).value++
            }
        }

        const color = d3.scaleOrdinal(d3.schemeCategory10)

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

        const svg = d3.select(".node-diagram")
            .attr("viewBox", [0, 0, width, height])
            .append("g");

        let link = svg
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .style("stroke", "#69b3a2"); // TODO color links by sentiment

        let node = svg
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", color) // TODO base color on group
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

        simulation.nodes(nodes);
        simulation.force("link").links(links)
        simulation.alpha(1).restart().tick()
        ticked()
    }, [data, startTime, endTime])

    useEffect(() => {

    }, [])

    return (
        <div className="Vis2">
            <svg className="node-diagram"/>
        </div>
    )   

}

export default Node