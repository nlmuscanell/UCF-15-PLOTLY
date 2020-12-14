
// Include a dropdown menu to display the top 10 OTUs found in that individual
// Use `sample_values` as the values for the bar chart
// Use `otu_ids` as the labels for the bar chart
// Use `otu_labels` as the hovertext for the chart

// Use the D3 library to read in `samples.json`
d3.json("data/samples.json").then(function(data) {
    console.log(data);

// Grab top ten values for each id number
// NOTE: Only works for one individual right now
     var id = data.names.slice(0, 10);
     console.log(id)

     var otu_ids =  data.samples[0].otu_ids.slice(0, 10);
     console.log(otu_ids);
     
     var values = data.samples[0].sample_values.slice(0, 10);
     console.log(values);
     
     var labels =  data.samples[0].otu_labels.slice(0, 10);
     console.log (labels);

// Create a horizontal bar chart
// NOTE: Bar formatting is off and needs to be fixed (bar width and sort desc)
// NOTE: Need to add in hover text
var trace1 = {
      x: values,
      y: otu_ids,
      //text: need hover text ,
      orientation: "h",
      type: "bar",
      marker: {
        color: 'blue'} 
 };

// create data variable
var data = [trace1];

// create layout variable to set plots layout
var layout = {
    title: 'OTU Frequency by OTU type (ID)',
    barmode: 'stack'
};

Plotly.newPlot("bar", data, layout);

});



// Bubble Chart (Metadata)

// Demographic Table 