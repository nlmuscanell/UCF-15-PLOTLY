//////////////////////////// Belly Button Diversity Data //////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////

// Append names to dropdown menu
d3.json("data/samples.json").then(function(data) {
    data.names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name).property("value", name);
});
});

///////////////////////////////////////////////////////////////////////////////////////

// Grab top ten samples for the first individual (default data to be displayed upon page load)
d3.json("data/samples.json").then(function(data) {
    var samples = data.samples;
    console.log(samples);
    var meta = data.metadata
    console.log(meta);
    
// First 10 samples for the default data to be disaplayed upon page load (id 940)
    var defaultOTUs_10 = samples[0].otu_ids.slice(0, 10);
    console.log(defaultOTUs_10);

    var defaultValues_10 = samples[0].sample_values.slice(0, 10);
    console.log(defaultValues_10);
     
    var defaultLabels_10 =  samples[0].otu_labels.slice(0, 10);
    console.log (defaultLabels_10);

    // OTU ids with string "otu" added to number (for sliced ids)
    var defaultOTU_labels_10 = defaultOTUs_10.map(otu => `OTU ${otu}`);
    console.log (defaultOTU_labels_10);

    // Get all samples for id 940 (for the bubble chart)
    var defaultOTUs = samples[0].otu_ids;
    console.log(defaultOTUs);

    var defaultValues = samples[0].sample_values;
    console.log(defaultValues);

    var defaultLabels = samples[0].otu_labels;
    console.log(defaultLabels);

     // OTU ids with string "otu" added to number
     var defaultOTU_labels = defaultOTUs.map(otu => `OTU ${otu}`);
     console.log (defaultOTU_labels);

///////////////////////////////////////////////////////////////////////////////////////

// Default Horizontal Bar Chart (display upon intitial page load)
var trace1 = {
      x: defaultValues_10,
      y: defaultOTU_labels_10,
      text: defaultLabels_10,
      orientation: "h",
      type: "bar",
      marker: {
        color: 'deeppink'} 
 };

// Create data variable
var barData = [trace1];

// Create layout variable
var barLayout = {
    title: 'Bacteria Frequency for Top 10 OTU Samples',
};

// Plot bar chart
Plotly.newPlot("bar", barData, barLayout);

// Default Bubble Chart (display upon intitial page load)
var trace2 = {
	x: defaultOTUs,
	y: defaultValues,
	text: defaultLabels,
	mode: 'markers',
	marker: {
		color: defaultOTUs,
		size: defaultValues
		}
};

// Create data variable		
var bubbleData = [trace2];

// Create layout variable
var bubbleLayout = {
	title: 'All OTU Samples For Test Subject',
	xaxis: { title: "OTU ID"},
	showlegend: false,
};
    
// Plot bubble chart
Plotly.newPlot('bubble', bubbleData, bubbleLayout);

// Default Gauge Chart (display upon intitial page load)
var defaultGauge = data.metadata.filter(sample => sample.id === 940)[0];
console.log(defaultGauge);
console.log("default data for gauge chart")
console.log(defaultGauge.wfreq);
console.log("default wfreq for id 940");

// // BCS TRACE CODE
// var level = parseFloat(defaultGauge.wfreq) * 20;
// // Trig to calc meter point
// var degrees = 180 - level;
// var radius = 0.5;
// var radians = (degrees * Math.PI) / 180;
// var x = radius * Math.cos(radians);
// var y = radius * Math.sin(radians);

// // Path: may have to change to create a better triangle
// var mainPath = "M -.0 -0.05 L .0 0.05 L ";
// var pathX = String(x);
// var space = " ";
// var pathY = String(y);
// var pathEnd = " Z";
// var path = mainPath.concat(pathX, space, pathY, pathEnd);
// trace3 = [
//     {
//       type: "scatter",
//       x: [0],
//       y: [0],
//       marker: { size: 12, color: "850000" },
//       showlegend: false,
//       name: "Freq",
//       text: level,
//       hoverinfo: "text+name"
//     },
//     {
//       values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
//       rotation: 90,
//       text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//       textinfo: "text",
//       textposition: "inside",
//       marker: {
//         colors: [
//           "rgba(0, 105, 11, .5)",
//           "rgba(10, 120, 22, .5)",
//           "rgba(14, 127, 0, .5)",
//           "rgba(110, 154, 22, .5)",
//           "rgba(170, 202, 42, .5)",
//           "rgba(202, 209, 95, .5)",
//           "rgba(210, 206, 145, .5)",
//           "rgba(232, 226, 202, .5)",
//           "rgba(240, 230, 215, .5)",
//           "rgba(255, 255, 255, 0)"
//         ]
//       },
//       labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//       hoverinfo: "label",
//       hole: 0.5,
//       type: "pie",
//       showlegend: false
//     }
//   ];

// //MY TRACE CODE
// // var trace3 = { 
// //     domain: { x: [0, 1], y: [0, 1]},
// //     // values: defaultGauge.wfreq,
// //     values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
// //     // labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
// //     title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week<br>",
// //     delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
// //     type: "indicator",
// //     mode: "gauge+number+delta",
// //     gauge: {
// //         axis: { range: [null, 9] },
// //         steps: [
// //           { range: [0, 1], color: "#F3FE42" },
// //           { range: [1, 2], color: "#FFBF00" },
// //           { range: [2, 3], color: "#FF7F50" },
// //           { range: [3, 4], color: "#DE3163" },
// //           { range: [4, 5], color: "#DAF7A6" },
// //           { range: [5, 6], color: "#40E0D0" },
// //           { range: [6, 7], color: "#6495ED" },
// //           { range: [7, 8], color: "#CCCCFF" },
// //           { range: [8, 9], color: "7718D7" },
// //         ]
// //     }
// // }

// // Create data variable		
// var gaugeData = [trace3];


// // BCS LAYOUT
// var gaugeLayout = {
//     shapes: [
//       {
//         type: "path",
//         path: path,
//         fillcolor: "850000",
//         line: {
//           color: "850000"
//         }
//       }
//     ],
//     title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
//     height: 1000,
//     width: 1000,
//     xaxis: {
//       zeroline: false,
//       showticklabels: false,
//       showgrid: false,
//       range: [-1, 1]
//     },
//     yaxis: {
//       zeroline: false,
//       showticklabels: false,
//       showgrid: false,
//       range: [-1, 1]
//     }
//   };

// // //MY LAYOUT
// // // Create layout variable
// // var gaugeLayout = {  =
// //     width: 500, 
// //     height: 400, 
// //     margin: { t: 0, b: 0 }, 
// //     template: {
// //         data: {
// //           indicator: [
// //             {
// //               mode: "number+delta+gauge",
// //               delta: { reference: 90 }
// //             }
// //           ]
// //         }
// //       }
// // };

// var GAUGE = document.getElementById('gauge')
// Plotly.newPlot(GAUGE, gaugeData, gaugeLayout);
///////////////////////////////////////////////////////////////////////////////////////

// Default Demographic Table (default metadata to be displayed upon page load)
defaultMeta = meta.filter(meta => meta.id === 940)[0];
console.log(defaultMeta);

Object.entries(defaultMeta).forEach(([key, value]) => {
    d3.select("#sample-metadata").append("p").text(`${key.toUpperCase()}: ${value}`);

});
///////////////////////////////////////////////////////////////////////////////////////

// Create an event handler for updates via dropdown menu selection
d3.selectAll("#selDataset").on("change", updateCharts);

function updateCharts() {
    var inputElement = d3.select("#selDataset");
    console.log("input element");
    console.log(inputElement);
    
    var inputValue = inputElement.property("value");
    console.log("input value");
    console.log(inputValue);
    
    filteredData = samples.filter(samples => samples.id === inputValue)[0];
    console.log("filtered data");
    console.log(filteredData);

    // Store top 10 samples for the id selected in the drop down
    filteredValues_10 = filteredData.sample_values.slice(0, 10);
    console.log("Top 10 filtered values");
    console.log(filteredValues_10);

    filteredOTUs_10 = filteredData.otu_ids.slice(0, 10);
    console.log("Top 10 filtered otu ids");
    console.log(filteredOTUs_10);

    filteredLabels_10 = filteredData.otu_labels.slice(0, 10);
    console.log("Top 10 filtered otu labels");
    console.log(filteredLabels_10);

    // OTU ids with string "otu" added to number
    var filteredOTU_labels_10 = filteredOTUs_10.map(otu => `OTU ${otu}`);
    console.log("Top 10: filtered bacteria labels for bar plot hover text")
    console.log (filteredOTU_labels_10);

    // Store all samples for the id selected in the drop down (for bubble chart)
    filteredValues = filteredData.sample_values;
    console.log("filtered values");
    console.log(filteredValues);

    filteredOTUs = filteredData.otu_ids;
    console.log("filtered otu ids");
    console.log(filteredOTUs);
     
    filteredLabels = filteredData.otu_labels;
    console.log("filtered otu labels");
    console.log(filteredLabels);

     // OTU ids with string "otu" added to number
     var filteredOTU_labels = filteredOTUs.map(otu => `OTU ${otu}`);
     console.log("filtered bacteria labels for bar plot hover text")
     console.log (filteredOTU_labels);

///////////////////////////////////////////////////////////////////////////////////////

// Update Horizontal Bar Chart (with drop down input)
Plotly.restyle("bar", "x", [filteredValues_10]);
Plotly.restyle("bar", "y", [filteredOTU_labels_10]);
Plotly.restyle("bar", "text", [filteredLabels_10]);

// Update Bubble Chart (with drop down input)
Plotly.restyle("bubble", "x", [filteredOTUs]);
Plotly.restyle("bubble", "y", [filteredValues]);
Plotly.restyle("bubble", "text", [filteredLabels]);
Plotly.restyle("bubble", "marker.color", [filteredOTUs]);
Plotly.restyle("bubble", "marker.size", [filteredValues]);
        
// Update Demographic Table (Metadata)
metaUpdate = data.metadata.filter(samples => samples.id == inputValue)[0];
    d3.select("#sample-metadata").html("");
    Object.entries(metaUpdate).forEach(([key, value]) => {
        d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);

});
    buildGuage(2);
};
});

function buildGuage(wFreq) {
    // BCS TRACE CODE
var level = parseFloat(wFreq) * 20;

// Trig to calc meter point
var degrees = 180 - level;
var radius = 0.5;
var radians = (degrees * Math.PI) / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = "M -.0 -0.05 L .0 0.05 L ";
var pathX = String(x);
var space = " ";
var pathY = String(y);
var pathEnd = " Z";
var path = mainPath.concat(pathX, space, pathY, pathEnd);
trace3 = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Freq",
      text: level,
      hoverinfo: "text+name"
    },
    {
      values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
      rotation: 90,
      text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          "rgba(0, 105, 11, .5)",
          "rgba(10, 120, 22, .5)",
          "rgba(14, 127, 0, .5)",
          "rgba(110, 154, 22, .5)",
          "rgba(170, 202, 42, .5)",
          "rgba(202, 209, 95, .5)",
          "rgba(210, 206, 145, .5)",
          "rgba(232, 226, 202, .5)",
          "rgba(240, 230, 215, .5)",
          "rgba(255, 255, 255, 0)"
        ]
      },
      labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }
  ];

//MY TRACE CODE
// var trace3 = { 
//     domain: { x: [0, 1], y: [0, 1]},
//     // values: defaultGauge.wfreq,
//     values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
//     // labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
//     title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week<br>",
//     delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//     type: "indicator",
//     mode: "gauge+number+delta",
//     gauge: {
//         axis: { range: [null, 9] },
//         steps: [
//           { range: [0, 1], color: "#F3FE42" },
//           { range: [1, 2], color: "#FFBF00" },
//           { range: [2, 3], color: "#FF7F50" },
//           { range: [3, 4], color: "#DE3163" },
//           { range: [4, 5], color: "#DAF7A6" },
//           { range: [5, 6], color: "#40E0D0" },
//           { range: [6, 7], color: "#6495ED" },
//           { range: [7, 8], color: "#CCCCFF" },
//           { range: [8, 9], color: "7718D7" },
//         ]
//     }
// }

// Create data variable		
var gaugeData = [trace3];


// BCS LAYOUT
var gaugeLayout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
    height: 1000,
    width: 1000,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

// //MY LAYOUT
// // Create layout variable
// var gaugeLayout = {  =
//     width: 500, 
//     height: 400, 
//     margin: { t: 0, b: 0 }, 
//     template: {
//         data: {
//           indicator: [
//             {
//               mode: "number+delta+gauge",
//               delta: { reference: 90 }
//             }
//           ]
//         }
//       }
// };

var GAUGE = document.getElementById('gauge')
Plotly.newPlot(GAUGE, gaugeData, gaugeLayout);
}