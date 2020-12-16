// Belly Button Diversity Data

///////////////////////////////////////////////////////////////////////////////////////
// Append names to dropdown menu
d3.json("data/samples.json").then(function(data) {
    data.names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name).property("value", name);
});
});
///////////////////////////////////////////////////////////////////////////////////////
// Grab top ten values for the first individual (default data to be loaded)
d3.json("data/samples.json").then(function(data) {
    var samples = data.samples;
    console.log(samples);
    var meta = data.metadata
    console.log(meta);

// First 10 values for the default data to be disaplayed upon page load (id 940)
    var defaultOTUs = samples[0].otu_ids.slice(0, 10);
    console.log(defaultOTUs);

    var defaultValues = samples[0].sample_values.slice(0, 10);
    console.log(defaultValues);
     
    var defaultLabels =  samples[0].otu_labels.slice(0, 10);
    console.log (defaultLabels);

    // OTU ids with string "otu" added to number
    var defaultOTU_labels = defaultOTUs.map(otu => `OTU ${otu}`);
    console.log (defaultOTU_labels);

///////////////////////////////////////////////////////////////////////////////////////
// Default Horizontal Bar Chart (display upon intitial page load)
var trace1 = {
      x: defaultValues,
      y: defaultOTU_labels,
      text: defaultLabels,
      orientation: "h",
      type: "bar",
      marker: {
        color: 'deeppink'} 
 };

// Create data variable
var barData = [trace1];

// Create layout variable
var layout = {
    title: 'Bacteria Frequency by Operational Taxonomic Unit',
};

// Plot bar chart
Plotly.newPlot("bar", barData, layout);
///////////////////////////////////////////////////////////////////////////////////////

// Default Demographic Table (Metadata)
defaultMeta = meta.filter(meta => meta.id === 940)[0];
console.log(defaultMeta);

Object.entries(defaultMeta).forEach(([key, value]) => {
    d3.select("#sample-metadata").append("p").text(`${key.toUpperCase()}: ${value}`);

});
///////////////////////////////////////////////////////////////////////////////////////

// Create an event handler for updates via dropdown menu selection
d3.selectAll("#selDataset").on("change", updateCharts);

// Create function to display OTU data for id that is selected in the dropdown
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

    // Store top 10 values for the id selected in the drop down
    filteredValues = filteredData.sample_values.slice(0, 10);
    console.log("filtered values");
    console.log(filteredValues);

    filteredOTUs = filteredData.otu_ids.slice(0, 10);
    console.log("filtered otu ids");
    console.log(filteredOTUs);

    filteredLabels = filteredData.otu_labels.slice(0, 10);
    console.log("filtered otu labels");
    console.log(filteredLabels);

     // OTU ids with string "otu" added to number
     var filteredOTU_labels = filteredOTUs.map(otu => `OTU ${otu}`);
     console.log("filtered bacteria labels for bar plot hover text")
     console.log (filteredOTU_labels);
///////////////////////////////////////////////////////////////////////////////////////

// Update Horizontal Bar Chart
Plotly.restyle("bar", "x", [filteredValues]);
Plotly.restyle("bar", "y", [filteredOTU_labels]);
Plotly.restyle("bar", "text", [filteredLabels]);

// Update Demographic Table (Metadata)
metaUpdate = data.metadata.filter(samples => samples.id == inputValue)[0];
d3.select("#sample-metadata").html("");

Object.entries(metaUpdate).forEach(([key, value]) => {
    d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
});
};
});
///////////////////////////////////////////////////////////////////////////////////////