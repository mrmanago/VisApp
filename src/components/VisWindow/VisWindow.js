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
    const [dataFiltered, setDataFiltered] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState([0,0]);
    const [minTime, setMinTime] = useState(null)
    const [maxTime, setMaxTime] = useState(null)
    const [selection, setSelection] = useState(null)
    const [groups, setGroups] = useState([])
    const [groupColor, setGroupColor] = useState(null)

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
            console.log(parseDate)
            data.forEach(d => {
                d.date = parseDate(d.date)
            })
            
            const firstDate = data.reduce((r, o) => o.date < r.date ? o : r)
            const lastDate = data.reduce((r, o) => o.date > r.date ? o : r)
            const defaultEndTime = new Date(firstDate.date)
            defaultEndTime.setDate(defaultEndTime.getDate() + 400)
            console.log(firstDate, "      ", firstDate.date, "    ", firstDate.date.getTime())
            setMinTime(firstDate.date)
            setMaxTime(lastDate.date)

            setValue([firstDate.date.getTime(), defaultEndTime.getTime()])
            const names = Array.from(new Set(data.flatMap(d => [d.fromJobtitle, d.toJobtitle]))).sort(d3.ascending)
            setGroups(names)

            setLoading(false)
        }
    }, [data])

    // Filtering the data based on the timeslider
    useEffect(() => {
        if (data) {
            const dataDate = []
            for (let i = 0; i < data.length; i++) {
                if (!(data[i].date < value[0] || data[i].date > value[1])) {
                    dataDate.push(data[i])
                }
            }
            setDataFiltered(dataDate)
        }
    }, [data, value])

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

    // For the slider
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

    function poop(value) {
        return new Date(value).toDateString();
    }

    const classes = useStyles();

    const updateSelection = (selection) => {
        setSelection(selection)
    }

    return (
        <div className="VisWindow">
            <input type="file" accept=".csv" onChange={onFileChange}/>
            {data ? <CsvPreview data={data} /> : "No Data"}
            {loading && <div>loading</div>}
            {!loading && <Chord data={dataFiltered} groups={groups} selection={selection} updateSelection={updateSelection}/>}
            {!loading && <Node data={dataFiltered} groups={groups} selection={selection} updateSelection={updateSelection}/>}

            {!loading && <div className={classes.root}>
                <Typography id="range-slider" gutterBottom>
                </Typography>
                <div className="hi">hi</div>
                <div className="timeline-text">Timeline</div>
                <div className="Slider">
                    <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={poop}
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        min={minTime.getTime()}
                        max={maxTime.getTime()}
                    />
                </div>
            </div>}
        </div>
    )
}

export default VisWindow