import React from 'react'
import * as d3 from "d3";

const CsvPreview = ({data}) => {
    const keys = Object.keys(data[0])
    const stats = d3.select(".stats").html("")

    stats.append("div").text("Columns: " + keys.length)
    stats.append("div").text("Rows: " + data.length)

    // found from http://bl.ocks.org/syntagmatic/3299303
    // view csv
    // d3.select(".table")
    //     .html("")
    //     .append("tr")
    //     .attr("class","fixed")
    //     .selectAll("th")
    //     .data(keys)
    //     .enter().append("th")
    //     .text(function(d) { return d;})
    //
    // d3.select(".table")
    //     .selectAll("tr.row")
    //     .data(data)
    //     .enter().append("tr")
    //     .attr("class", "row")
    //     .selectAll("td")
    //     .data(function(d) { return keys.map(function(key) { return d[key] }) ; })
    //     .enter().append("td")
    //     .text(function(d) { return d; });

    return (
        <div>
            <div className="stats"/>
            <div className="table"/>
        </div>
    )
}

export default CsvPreview