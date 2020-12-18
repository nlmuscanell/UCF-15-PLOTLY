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
};
});