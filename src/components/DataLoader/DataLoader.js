import React from 'react'
import * as d3 from 'd3';
//import PropTypes from 'prop-types'

//TODO fix the rendering issue where it never finishes loading

const DataLoader = () => {
    // d3.csv("/sample-datasets/enron-v1.csv", function(data) {
    //     console.log(data);
    // })

    // User input Object
    let selection = {
        group: "fromJobTitle",
        id: "fromId",
        outgoingid: "toId"
    }

    // Data
    const load_dataset = (csvUrl) => {
        const data = d3.csvParse(csvUrl)
        create_table(data)
        parse(data)
    }


    let jsonData = {}
    let matrix = []
    let sent = {}
    let groups = []

    //TODO move this to VisWindow
    const parse = (data) => {
        let edges = []
        let i;
        for (i = 0; i < data.length; i++) {
            // renames source id to 'id
            data[i].id = data[i]['fromId']
            delete data[i].fromId

            // creates array to store the edges
            edges.push({source: data[i].id, target: data[i].toId})

            // finding all jobtitles
            if (data[i].fromJobtitle in sent) {
                sent[data[i].fromJobtitle]++
            } else {
                sent[data[i].fromJobtitle] = 1
                groups.push(data[i].fromJobtitle)

                // creates new row in matrix
                matrix.push( [[]] )

                // creates new column in matrix
                // TODO create a nxn matrix where n is # of jobtitles
                // for (let j = 0; j < matrix.length; j++) {
                //     matrix[j].push(0)
                // }
            }
        }
        console.log(edges)

        jsonData = {nodes: data, links: edges}
        console.log(jsonData)
        console.log(matrix)
        console.log(groups)
        console.log(sent)
    }

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

    // Displays Table of csv
    const create_table = (data) => {
        const keys = d3.keys(data[0])
        const stats = d3.select(".stats").html("")

        stats.append("div").text("Columns: " + keys.length)
        stats.append("div").text("Rows: " + data.length)


        // found from http://bl.ocks.org/syntagmatic/3299303
        d3.select(".table")
            .html("")
            .append("tr")
            .attr("class","fixed")
            .selectAll("th")
            .data(keys)
            .enter().append("th")
            .text(function(d) { return d;})

        d3.select(".table")
            .selectAll("tr.row")
            .data(data)
            .enter().append("tr")
            .attr("class", "row")
            .selectAll("td")
            .data(function(d) { return keys.map(function(key) { return d[key] }) ; })
            .enter().append("td")
            .text(function(d) { return d; });
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
        <div className="container">
            <input type="file" accept=".csv"/>
            <div className="stats"/>
            <table className="table"/>
        </div>
    )
}

export default DataLoader