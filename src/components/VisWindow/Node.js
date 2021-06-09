import React, {useEffect} from 'react'
import * as d3 from "d3";
//import PropTypes from 'prop-types'

const Node = ({ data, startTime, endTime }) => {
    const width = 778
    const height = 778

    useEffect(() => {
        const dataDate = []
        for (let i = 0; i < data.length; i++) {
            if (!(data[i].date < startTime || data[i].date > endTime)) {
                dataDate.push(data[i])
            }
        }
        console.log(dataDate)

        let nodes = []
        for (let i = 0; i < dataDate.length; i++) {
            if (!nodes.some(e => e.id === dataDate[i]['fromId'])) {
                nodes.push({id: dataDate[i]['fromId'], Email: dataDate[i]['fromEmail'], JobTitle: dataDate[i]['fromJobtitle']})
            }
            if (!nodes.some(e => e.id === dataDate[i]['toId'])) {
                nodes.push({id: dataDate[i]['toId'], Email: dataDate[i]['toEmail'], JobTitle: dataDate[i]['toJobtitle']})
            }
        }

        // creates array to store the edges. If there is not a node for the outgoing edge it creates one
        let edges = []
        for (let i = 0; i < dataDate.length; i++) {
            edges.push({source: dataDate[i]['fromId'], target: dataDate[i]['toId'], date: dataDate[i]['date']})
        }

        const color = d3.scaleOrdinal(d3.schemeCategory10)

        // force sim
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(edges).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-50))
            .force("center", d3.forceCenter(width / 2, height / 2))

        // Clear old version
        d3.select(".node-diagram").selectAll("*").remove()

        const svg = d3.select(".node-diagram")
            .attr("viewBox", [0, 0, width, height])
            .append("g");

        const link = svg
            .selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke", "#69b3a2"); // TODO color edges by sentiment

        const node = svg
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", color); // TODO base color on group

        node.append("title")
            .text(d => d.id);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
        })
    }, [data, startTime, endTime])

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