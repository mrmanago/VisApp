import React from 'react'
import { useState, useEffect } from 'react'
import * as d3 from "d3";
import Chord from "./Chord";
import Node from "./Node";
import CsvPreview from "./CsvPreview";

const VisWindow = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    // const [selection, setSelection] = useState(
    //     {
    //         groupKey: "fromJobtitle",
    //         source: "fromId",
    //         outgoingId: "toId"
    //     }
    // )

    //Loading default data
    useEffect(() => {
        d3.csv("/sample-datasets/enron-v1.csv").then(data => {
            // TODO make data column a date

            // TODO sort data by date
            setStartTime(0) //first row
            setEndTime(1) //last row
            setData(data)
            setLoading(false)
        })
        return () => undefined
    }, [])

    //Checking useState works
    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data])

    // Read File
    const onFileChange = (e) => {
        const reader = new FileReader()
        let file = e.target.files[0]
        reader.onload = function(e) {
            const contents = e.target.result
            setData(d3.csvParse(contents))
        }
        reader.readAsText(file)
    }

    // TODO Timeslider
    // set starttime and endtime for props
    // make interaction slider here

    return (
        <div className="VisWindow">
            <input type="file" accept=".csv" onChange={onFileChange}/>
            {data ? <CsvPreview data={data} /> : "No Data"}
            {loading && <div>loading</div>}
            {!loading && <Chord data={data} />}
            {!loading && <Node data={data} startTime={startTime} endTime={endTime}/>}
            {/*<div className="slider"></div>*/}
        </div>
    )
}

export default VisWindow