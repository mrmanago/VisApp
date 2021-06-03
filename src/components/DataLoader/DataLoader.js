import React from 'react'
import * as d3 from 'd3'
// import csvUrl from './enron-v1.csv'
//import PropTypes from 'prop-types'

const DataLoader = () => {
    // const csvUrl = './enron-v1.csv'
    // const [data, setData] = useState(null)
    // const message = data => {
    //     let message = '';
    //     message = message + data.length + ' rows\n'
    //     message = message + data.columns.length + ' columns'
    //     return message
    // }
    //
    // useEffect(() => {
    //     d3.csv(csvUrl).then(setData)
    //
    // }, [])

    // var rowToHtml = function( row ) {
    //     var result = "";
    //     for (const key in row) {
    //         console.log(result)
    //         result += key + ": " + row[key] + "<br/>"
    //     }
    //     return result;
    // }
    //
    // var previewCsvUrl = function( csvUrl ) {
    //     d3.csv( csvUrl, function( rows ) {
    //         d3.select("div#preview").html(
    //             "<b>First row:</b><br/>" + rowToHtml( rows[0] ));
    //     })
    // }
    //
    // d3.select("html")
    //     .style("height","100%")
    //
    // d3.select("body")
    //     .style("height","100%")
    //     .style("font", "12px sans-serif")
    //
    //     .append("input")
    //     .attr("type", "file")
    //     .attr("accept", ".csv")
    //     .style("height", "5px")
    //     .on("change", function(event) {
    //         var file = event.target.files[0];
    //         if (file) {
    //             var reader = new FileReader();
    //             reader.onloadend = function(evt) {
    //                 var dataUrl = evt.target.result;
    //                 // The following call results in an "Access denied" error in IE.
    //                 previewCsvUrl(dataUrl);
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     })
    //
    // d3.select("body")
    //     .append("div")
    //     .attr("id", "preview")
    //     .style("margin", "5px")
    //
    // // Initialize with csv file from server
    // previewCsvUrl("enron-v1.csv")


    return (
        <div>
        </div>
    )
}

export default DataLoader