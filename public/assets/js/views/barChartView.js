define([
  'jquery',
  'underscore',
  'backbone',
  'chartsmin',
  'collections/getBarGraphDataCollection'
], function ($, _, Backbone,chartsmin,getBarGraphDataCollection) {
  'use strict';
  var syringesView = Backbone.View.extend({
    tagName: 'div',
    myBarChart:null,
    initialize: function(){
    },
    render: function(){
      if(this.myBarChart!=null){
          this.myBarChart.destroy();
          }
      var ctx, data, myBarChart, option_bars;
      Chart.defaults.global.responsive = true;
      ctx = $('#bar-chart').get(0).getContext('2d');
      option_bars = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: false,
        barShowStroke: true,
        barStrokeWidth: 1,
        barValueSpacing: 5,
        barDatasetSpacing: 3,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      };
      data = {
        labels: getBarGraphDataCollection.models[0].attributes.label, //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: "Active Users",
            fillColor: "rgba(26, 188, 156,0.6)",
            strokeColor: "#1ABC9C",
            pointColor: "#1ABC9C",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#1ABC9C",
            data:  getBarGraphDataCollection.models[0].attributes.activeUsers//[1,2,3,5,6,7]
          }, {
            label: "Expired Users",
            fillColor: "rgba(34, 167, 240,0.6)",
            strokeColor: "#22A7F0",
            pointColor: "#22A7F0",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#22A7F0",
            data: getBarGraphDataCollection.models[0].attributes.expiredUsers
          }
        ]
      };
      this.myBarChart = new Chart(ctx).Bar(data, option_bars);
      // this.myBarChart.destroy();
  
    },

   

  });
    return syringesView;
});
