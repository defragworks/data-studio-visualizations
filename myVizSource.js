var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'radarChart';
document.body.appendChild(canvasElement);

function drawViz(data) {
  let rowData = data.tables.DEFAULT;

  var labels = [];
  var values = [];

  var dataSets = [];
  
  var metricLength = 0;
  rowData.forEach(function(row){
    metricLength = row['radarMetric'].length;
  });

  for (var i = 0; i < metricLength; i++) {
    var color = 'rgba(0, 0, 0, 0.1)';

    var fillColor = data.style['fillColor' + (i+1).toString()];
    color = fillColor.value ? fillColor.value.color + '1E' : fillColor.defaultValue + '1E';

    dataSets.push({
      label: data.fields['radarMetric'][i].name,
      data: [],
      backgroundColor: color
    });
  }
  
  rowData.forEach(function(row){
    labels.push(row['radarDimension'][0]);
    values.push(row['radarMetric'][0]);
    
    for (var i = 0; i < metricLength; i++) {
      dataSets[i].data.push(row['radarMetric'][i]);
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
  var radarChart = new Chart(canvasElement, {
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
