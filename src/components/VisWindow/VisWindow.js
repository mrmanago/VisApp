import React from 'react'
import { useState, useEffect } from 'react'
import * as d3 from "d3";
import Chord from "./Chord";
import Node from "./Node";
import CsvPreview from "./CsvPreview";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const VisWindow = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState([0,0]);
    const [minTime, setMinTime] = useState(null)
    const [maxTime, setMaxTime] = useState(null)
    const [selection, setSelection] = useState(null)
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
            setData(data)
        })
        return () => undefined
    }, [])

    // Setting min time, max time, and default values of start and end time
    useEffect(() => {
        if (data) {
            // makes date column a date type
            let parseDate = d3.timeParse("%Y-%m-%d")

            data.forEach(d => {
                d.date = parseDate(d.date)
            })

            const firstDate = data.reduce((r, o) => o.date < r.date ? o : r)
            const lastDate = data.reduce((r, o) => o.date > r.date ? o : r)
            const defaultEndTime = new Date(firstDate.date)
            defaultEndTime.setDate(defaultEndTime.getDate() + 400)

            setMinTime(firstDate.date)
            setMaxTime(lastDate.date)

            setValue([firstDate.date.getTime(), defaultEndTime.getTime()])
            //setStartTime(parseDate("2000-01-01"))
            //setEndTime(parseDate("2000-01-15"))
            setLoading(false)
        }
    }, [data])

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

    const useStyles = makeStyles({
        root: {
            width: 1505,
        },
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function valuetext(value) {
        return `${value}°C`;
    }

    const classes = useStyles();

    const updateSelection = () => {
        setSelection(selection)
    }

    return (
        <div className="VisWindow">
            <input type="file" accept=".csv" onChange={onFileChange}/>
            {data ? <CsvPreview data={data} /> : "No Data"}
            {loading && <div>loading</div>}
            {!loading && <Chord data={data} startTime={value[0]} endTime={value[1]} selection={selection} updateSelection={updateSelection}/>}
            {!loading && <Node data={data} startTime={value[0]} endTime={value[1]}/>}

            {!loading && <div className={classes.root}>
                <Typography id="range-slider" gutterBottom>
                    Timeline
                </Typography>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={minTime.getTime()}
                    max={maxTime.getTime()}
                />
            </div>}
        </div>
    )
}

export default VisWindow