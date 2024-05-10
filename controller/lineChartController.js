function monthlyLinechart(req) {

    // let width = req.body.width ? req.body.width : "";
    // let height = req.body.height ? req.body.height : "";
    // let lastMonth = req.body.data.lastMonth ? req.body.data.lastMonth : "";
    // let prevMonth = req.body.data.prevMonth ? req.body.data.prevMonth : "";

    var monthNames6 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d6 = new Date();
    var currentMonth6 = monthNames6[d6.getMonth() - 1];
    
    let series=[];
    if(req.body.series){
      series= req.body.series;

    }else{
      console.log("no series data available")
    }

    let seriesCurrent={};
    let seriesPrev={};
    series.forEach(element => {
      if(element.label == "current"){
        seriesCurrent=element;
      }
      else if(element.label == "previous"){
        seriesPrev=element;

      }
    });
    

    // let chartData = JSON.stringify({
    //     chart: {
    //         renderTo: 'container',
    //         width: width,
    //         height: height,
    //         type: 'line',
    //         plotBackgroundColor: '#F8F8F8',
    //         margin: [20, 0, 60, 50],
    //     },

    //     //xAxis: {categories: opt.month},
    //     xAxis: {
    //         "categories": currentMonth6,
    //         title: {
    //             text: 'Date',
    //             align: 'left',
    //             offset: 2,
    //             x: 5,
    //             style: {
    //                 color: '#717171',
    //                 fontSize: '12px',
    //                 fontFamily: 'Trebuchet MS, Verdana, sans-serif'
    //             }
    //         },
    //         lineColor: '#C9C9C9'
    //     },

    //     // "xAxis": {
    //     //     "min": 1,
    //     //     "max": 31,
    //     //     "tickInterval": 1,
    //     //     // Other properties...
    //     // },
    //     yAxis: {
    //         min: 0,
    //         text: 'Leads',
    //         title: {
    //             style: {
    //                 color: '#717171',
    //                 fontSize: '12px',
    //                 fontFamily: 'Trebuchet MS, Verdana, sans-serif'
    //             }
    //         },
    //         lineWidth: 1,
    //         lineColor: '#C9C9C9',
    //         stackLabels: { enabled: true }
    //     },
    //     /*yAxis: {
    //         min: 0,
    //         title: {
    //             text: 'Leads',
    //             enabled: true,
    //         },
    //         lineWidth: 1,
    //         lineColor: '#C9C9C9',
    //         stackLabels: { enabled: true }
    //     },*/
    //     exporting: {
    //         enabled: false
    //     },
    //     title: {
    //         text: ' '
    //     },
    //     legend: {
    //         "align": "left",
    //         "x": -15,
    //         "y": 10,
    //         "floating": true,
    //         "borderWidth": 0,
    //         "symbolWidth": 0,
    //         "symbolPadding": 0,
    //         "margin": 30,
    //         "width": 700,
    //         "itemWidth": 150,
    //         "useHTML": true

    //     },

    //     plotOptions: {
    //         column: {
    //             pointPadding: 0,
    //             borderWidth: 0
    //         },
    //         "fillColor": "transparent",
    //         line: {
    //             dataLabels: {
    //                 enabled: false
    //             },
    //             enableMouseTracking: false
    //         },
    //         series: {
    //             enableMouseTracking: false,
    //             shadow: false,
    //             animation: false
    //         }
    //     },


    //     series: [
    //         { name: currentMonth6, color: lastMonth.color, data: lastMonth.values },
    //         { name: 'Previous Month', color: prevMonth.color, data: prevMonth.values }
    //     ]
    // });


    const chartHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://code.highcharts.com/highcharts.js"></script>
    </head>
    <body>
    <style>
    .highcharts-title{
        display:none;
      }
    .highcharts-legend-item span{
    padding-left:40px!important;
    height:30px;
    padding-top:5px;
    margin-top: 20px!important;    position: absolute;
    font-family: Helvetica, Arial, sans-serif!important;
    font-size: 0.8em!important;
    white-space: nowrap;
    color: rgb(51, 51, 51);
    cursor: pointer;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 0px;
    margin-top: 0px;
    left: 0px;
    top: 5px;
    width: 130px;
    display: block;

      }
      .highcharts-credits {
        display: none !important;
        }
      .highcharts-legend-item span:before{
          position: absolute;
          width: 25px;
          height: 15px;
          background:${ seriesCurrent.color};
          content: '';
          left: 7px;
          top: 3px;
      }
      .highcharts-series-1 span:before{
          position: absolute;
          width: 25px;
          height: 15px;
          background:${ seriesPrev.color};
          content: '';
          left: 7px;
          top: 3px;
      }
      .highcharts-series-0 span:after{
         position: absolute;
          width: 9px;
          height: 9px;
          background: ${ seriesCurrent.color};
          content: '';
          left: 3px;
          top: 1px;
          border-radius: 50px;
      }
      .highcharts-series-1 span:after{
             position: absolute;
          width: 7px;
          height: 7px;
          background:${ seriesPrev.color};
          content: '';
          left: 4px;
          top: 2px;
          transform: rotate(45deg);
      }
      .highcharts-axis-labels{
        align:"center";
      }
    </style>
      <div id="container"></div>

      <script>
      
        Highcharts.chart('container', {
            chart: {
            type: 'line',
            height: ${req.body.height},
            margin: [20, 0, 60, 60]
            },
            
            xAxis: {
                categories: '${currentMonth6}',
                min:1,
                tickColor: '#C9C9C9',
                tickPositions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],  
                tickLength: 5,
                useHTML: true,                
                title: {
                  text: 'Date',
                  align: 'left',
                  offset: 2,
                  x: 5,
                  style: {
                      color: '#717171',
                      fontSize: '12px',
                      fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                  }
                },
                lineColor: '#C9C9C9'
              },
              yAxis: {
                "min": 0,
                "title": { "text": "Leads", "enabled": true },
                "lineWidth": 1,
                "stackLabels": { "enabled": true },
                "tickInterval": 25,
                lineColor: '#C9C9C9'

              },
            series: ${JSON.stringify(req.body.series)},
            legend: {

              align: 'left',
              x: -15,
              y: 10,
              floating: true,
              borderColor: '#CCCCCC', // Border color of the legend
              borderWidth: 0, // Border width of the legend
              symbolWidth: 0,
              symbolPadding: 0,
              margin: 30,
              width: 700,
              itemWidth: 150,
              useHTML: true,
                
            }
            });
      </script>
    </body>
    </html>
  `;

    return chartHtml;

}




module.exports = { monthlyLinechart };

