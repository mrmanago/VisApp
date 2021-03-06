import React, {useEffect} from 'react'
import * as d3 from "d3";

//import PropTypes from 'prop-types'

const Chord = ({ data, groups, selection, updateSelection }) => {
    const width = 778
    const height = 778
    const innerRadius = Math.min(width, height) * 0.5 - 90
    const outerRadius = innerRadius + 10

    //TODO take selection variable make it so that it selects the ribbon/node that has the same jobtitle

    useEffect(() => {
        // matrix
        const index = new Map(groups.map((name, i) => [name, i]))
        let matrix = Array.from(index, () => Array(groups.length).fill(0))
        for (const {fromJobtitle, toJobtitle} of data) {
            matrix[index.get(fromJobtitle)][index.get(toJobtitle)] += 1
        }

        const chord = d3.chordDirected()
            .padAngle(10 / innerRadius)
            .sortSubgroups(d3.descending)
            .sortChords(d3.descending)

        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

        const ribbon = d3.ribbonArrow()
            .radius(innerRadius - 1)
            .padAngle(1 / innerRadius)

        const color = d3.scaleOrdinal(groups, d3.quantize(d3.interpolateRainbow, groups.length))

        // chart
        const svg = d3.select("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, height]);

        svg.selectAll("*").remove()

        const chords = chord(matrix)


        const group = svg.append("g")
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .selectAll("g")
            .data(chords.groups)
            .join("g")

        group.append("path")
            .attr("fill", d => color(groups[d.index]))
            .attr("d", arc)

        group.append("text")
            .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
            .attr("dy", "0.35em")
            .attr("transform", d => `
                rotate(${(d.angle * 180 / Math.PI - 90)})
                translate(${outerRadius + 5})
                ${d.angle > Math.PI ? "rotate(180)" : ""}
            `)
            .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
            .text(d => groups[d.index])
            .style("font-size", "1.2em")

        svg.append("g")
            .attr("fill-opacity", 0.75)
            .selectAll("path")
            .data(chords)
            .join("path")
            .style("mix-blend-mode", "multiply")
            .attr("fill", d => color(groups[d.target.index]))
            .attr("d", ribbon)
            .append("title")

    }, [data, innerRadius, outerRadius])

    useEffect(() => {

        d3.select("svg")
            .selectAll("path")
            .attr("fill-opacity", 0.75);

        if(selection!=null && selection.length>0) {
                        d3.select("svg")
                .selectAll("path")
                .filter((d) => d.source != null && !selection.includes(groups[d.source.index]))
                .attr("fill-opacity", 0);
        }
    }, [selection])

    return (
        <div className="Vis1">
            <svg />
        </div>
    )   

}

export default Chord