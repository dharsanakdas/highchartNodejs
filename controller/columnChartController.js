function monthlyVisitTrend(req) {

    let width = req.body.width ? req.body.width : "";
    let height = req.body.height ? req.body.height : "";
    let xAxis = req.body.xAxis ? req.body.xAxis : [];
    let series = req.body.series ? req.body.series : [];
    xAxis = xAxis.map((elements) => {
        const parts = elements.split(' '); // Split month and year
        return parts[0] + '<br>' + parts[1]
    })

    let chartData = JSON.stringify({
        chart: {
            type: 'column',
            width: width,
            height: height,
        },
        title: "",
        xAxis: {
            categories: xAxis,
            // categories: ['01-Feb-17 12 AM', '01-Feb-17 01 AM', '01-Feb-17 02 AM', '02-Feb-17 04 AM', '02-Feb-17 05 AM', '02-Feb-17 06 AM', '02-Feb-17 07 AM'],
            "labels": {

                formatter: function () {
                    const parts = this.value.split(' '); // Split month and year
                    return '<div style="text-align: center;"><div>' + parts[0] + '</div><div>' + parts[1] + '</div></div>'; // Align year below month
                }

            }

        },

        yAxis: {
            min: 0,
            title: {
                text: 'Visits'
            },
            stackLabels: {
                enabled: true
            }
        },
      
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: series,
        legend:{
          enabled:false
        }


    });



    const chartHtml = `
    <style>
    .highcharts-credits {
        display: none !important;
        }
    </style>
                    <div id="container"></div>
          
                    <script src="https://code.highcharts.com/highcharts.js"></script> 

            <script>
            Highcharts.chart('container',${chartData})
            </script>`

    return chartHtml;

}

function monthlyLeadTrend(req) {

    let width = req.body.width ? req.body.width : "";
    let height = req.body.height ? req.body.height : "";
    let xAxis = req.body.xAxis ? req.body.xAxis : [];
    let series = req.body.series ? req.body.series : [];
    let yAxis = req.body.yAxis ? req.body.yAxis : {};
    xAxis = xAxis.map((elements) => {
        const parts = elements.split(' '); // Split month and year
        return parts[0] + '<br>' + parts[1]
    })


    let yAxisText = yAxis.title;

    const chartHtml = `
    <!DOCTYPE html>
  <html lang="en">
                
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body>
    <style>
    .highcharts-credits {
        display: none !important;
        }
        .highcharts-title{
            display:none;
          }
    </style>
    <script src="https://code.highcharts.com/highcharts.js"></script>
  
    <div id="container" ></div>
  
    <script>
      Highcharts.chart('container', {
        "chart": {
          "type": "column",
          "width": ${width},
          "height":  ${height},
          "spacingBottom": 140,
          events: {
            load: function(event) {
              // this.series[7].legendGroup.attr({
              //     transform: 'translate(8,24)'
              // });
              // this.series[8].legendGroup.attr({
              //     transform: 'translate(100,24)'
              // });
              // this.series[9].legendGroup.attr({
              //     transform: 'translate(170,24)'
              // });
              // ===========
              var label1 = this.renderer.label("***Note: All leads sources are grouped into the below 3 categories to align with GURU departments:")
                .css({
                  width: '580px',
                  color: '#444',
                  fontSize: '12px'
                })
                .attr({
                  // 'stroke': 'silver',
                  // 'stroke-width': 2,
                  // 'r': 5,
                  'padding': 0
                })
                .add();
              var label2 = this.renderer.label("All Organic = Organic + Direct + Referral + Others")
                .css({
                  width: '400px',
                  color: '#444',
                  fontSize: '12px'
                })
                .add();
              var label3 = this.renderer.label("Paid = Paid")
                .css({
                  width: '250px',
                  color: '#444',
                  fontSize: '12px'
                })
                .add();
              var label4 = this.renderer.label("Social = Social")
                .css({
                  width: '250px',
                  color: '#444',
                  fontSize: '12px'
                })
                .add();
              label1.align(Highcharts.extend(label1.getBBox(), {
                align: 'left',
                x: 8, // offset
                verticalAlign: 'bottom',
                y: 70 // offset
              }), null, 'spacingBox');
              label2.align(Highcharts.extend(label2.getBBox(), {
                align: 'left',
                x: 8, // offset
                verticalAlign: 'bottom',
                y: 95 // offset
              }), null, 'spacingBox');
              label3.align(Highcharts.extend(label3.getBBox(), {
                align: 'left',
                x: 8, // offset
                verticalAlign: 'bottom',
                y: 112 // offset
              }), null, 'spacingBox');
              label4.align(Highcharts.extend(label4.getBBox(), {
                align: 'left',
                x: 8, // offset
                verticalAlign: 'bottom',
                y: 130 // offset
              }), null, 'spacingBox');
              // ======================
            }
          }
        },
        "title": {
          "text": ""
        },
        "xAxis": {
          "categories": ${JSON.stringify(xAxis)},
          useHTML: true,
				labelFormatter: function() {
					var total = 0;
					var i=this.yData.length;  total = this.yData[i-1]; 
					var clr = '#646464';
					if(this.name == 'Last Month')clr = this.color;
					return '<div style="float:left;border-radius: 2px;font-weight:bold;color:'+this.color+';background:'+this.color+';padding:3px 3px 2px 3px;margin:8px 5px 0px 0px;width:14px;height:8px;"></div><div style="color:#575748;padding:2px;margin:0px 0px 0px 0px;font-size:13px;">' + this.name + '<font style="color:'+clr+';font-size:16px;padding-left:5px;">'+ total +'</font></div>';
					//return '<div style="text-align: left; ">' + this.name + '</div>';
				}
        },
        "yAxis": {
          "min": 0,
          "title": {
            "text": "Leads"
          },
          "stackLabels": {
            "enabled": true
          }
        },
        legend: {  
            "borderWidth": 0,
            "y": -10,
            "symbolWidth": 16,
            "symbolRadius": 0,
            "squareSymbol": false
        },
        
        "tooltip": {
          "headerFormat": "<b>{point.x}</b><br/>",
          "pointFormat": "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
        },
        "plotOptions": {
          "column": {
            "stacking": "normal",
            "dataLabels": {
              "enabled": true
            }
          }
        },
        "series":${JSON.stringify(series)}
      });
    </script>
  </body>
  
  </html> `;

    return chartHtml;

}




module.exports = { monthlyVisitTrend, monthlyLeadTrend };

