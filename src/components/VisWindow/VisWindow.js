import React from 'react'
import Chord from "./Chord";
import Vis2 from "./Vis2";
import * as d3 from "d3";
//import PropTypes from 'prop-types'

const VisWindow = () => {
    // Iterating through data
    // for row
    // if group does not exist yet in the dictionary, add it
    // add object in json as a node and a link
    // add to the matrix as described in the chord diagram
    // return json and matrix

    // Node Link:
    // Data needed for nodelink: id, outgoing id.

    // Create a json file
    // Iterate through the

    // Chord Diagram Parsing:
    // Make a ixj matrix where i and j are job titles.
    // easy to make an out going one first
    // ceo: ceo, employee, manager
    // employee: ceo, employee, manager
    // manager: ceo, employee, manager
    // length of them is the count of unique job

    // Data Needed for Chord diagram Matrix: category, id, outgoing id

    // MATRIX
    // function to find category and function to count each category
    // for (row in data)
    // Outgoing
    // if (category does not exist in list) add row/column. assign category with id of that row/column.
    // ++ to count of category in the column. ex. ceo: toEmployee++ or ceo: toVice++
    // Incoming
    // turn each row into a column
    // Combined, add the 2 matrices

    // d3.csv("/sample-datasets/enron-v1.csv", function(data) {
    //     console.log(data);
    // })
    var dataGlobal

    const load_dataset = (csvUrl) => {
        const data = d3.csvParse(csvUrl)
        dataGlobal = data
        table_preview(data)
        data_process(data)
    }

    let selection = {
        groupKey: "fromJobtitle",
        source: "fromId",
        outgoingId: "toId"
    }

    const data_process = (data) => {
        const groupKey = selection.groupKey
        const sourceId = selection.source
        const outgoingId = selection.outgoingId

        // Creates JSON file for Node Diagram
        let objData = {}
        let edges = []
        let i
        for (i = 0; i < data.length; i++) {
            // renames source id to 'id
            data[i]['id'] = data[i][sourceId]
            delete data[i][sourceId]

            // creates array to store the edges
            edges.push({source: data[i].id, target: data[i][outgoingId]})
        }
        objData = {nodes: data, links: edges}
        const jsonData = JSON.stringify(objData)
        console.log(jsonData)

        // Creates Groups for Chord Diagram
        let sent = {}
        let groups = []
        let j
        for (j = 0; j < data.length; j++) {
            // finding all jobtitles
            if (data[j][groupKey] in sent) {
                sent[data[j][groupKey]]++
            } else {
                sent[data[j][groupKey]] = 1
                groups.push(data[j][groupKey])
            }
        }
        console.log(groups)
        console.log(sent)

        //initializes matrix
        let k
        let l
        let matrix = []
        for (k = 0; k < groups.length; k++) {
            matrix[k] = []
            for (l = 0; l < groups.length; l++) {
                matrix[k][l] = 0
            }
        }
        let m

        // Fills Matrix
        for (m = 0; m < data.length; m++) {
            matrix[groups.indexOf(data[m][groupKey])][groups.indexOf(data[m]['toJobtitle'])]++
        }
        console.log(matrix)
    }

    const table_preview = (data) => {
        const keys = d3.keys(data[0])
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
    }

    const reader = new FileReader()


    reader.onload = function(e) {
        const contents = e.target.result
        load_dataset(contents)
    }

    d3.select("input").on("change", function(){
        d3.select(".table").append("text").text("Loading...")
        const file = this.files[0]
        reader.readAsText(file)
    })

    return (
        <div className="VisWindow">
            <input type="file" accept=".csv"/>
            <div className="stats"/>
            <div className="table"/>

            <Chord data={dataGlobal} />{/*Chord Diagram*: matrix, groups */}
            <Vis2 /> {/*Node Link. Props: jsondata */}
        </div>
    )
}

export default VisWindow