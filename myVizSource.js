var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'myChart';
document.body.appendChild(canvasElement);

function drawViz(data) {
  const margin = {top: 10, bottom: 50, right: 10, left: 10 };
  const height = dscc.getHeight() - margin.top - margin.bottom;
  const width = dscc.getWidth() - margin.left - margin.right;

  let rowData = data.tables.DEFAULT;

  var labels = [];
  var values = [];

  var dataSets = [];
  
  var metricLength = 0;
  rowData.forEach(function(row){
    metricLength = row['barMetric'].length;
  });

  for (var i = 0; i < metricLength; i++) {
    var color = 'rgba(0, 0, 0, 0.1)';

    if (i == 0) {
      color = data.style.fillColor1.value ? data.style.fillColor1.value.color + '1E' : data.style.fillColor1.defaultValue + '1E';
    }
    else if (i == 1) {
      color = data.style.fillColor2.value ? data.style.fillColor2.value.color + '1E' : data.style.fillColor2.defaultValue + '1E';
    }

    dataSets.push({
      label: data.fields['barMetric'][i].name,
      data: [],
      backgroundColor: color
    });
  }
  
  rowData.forEach(function(row){
    labels.push(row['barDimension'][0]);
    values.push(row['barMetric'][0]);
    
    for (var i = 0; i < metricLength; i++) {
      dataSets[i].data.push(row['barMetric'][i]);
    }
  });

  // options
  var scale = {
    ticks: {}
  };
  
  if (data.style.suggestedMin.value && parseFloat(data.style.suggestedMin.value) > 0) {
    scale.ticks.suggestedMin = parseFloat(data.style.suggestedMin.value);
  }

  if (data.style.suggestedMax.value && parseFloat(data.style.suggestedMax.value) > 0) {
    scale.ticks.suggestedMax = parseFloat(data.style.suggestedMax.value);
  }
  

  var ctx = canvasElement.getContext('2d');
 
  var myChart = new Chart(canvasElement, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: dataSets
    },
    options: {
      responsive: true,
      scale: scale
    }
  });
}

dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});
