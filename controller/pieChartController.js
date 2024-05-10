function pieChartCreate(req) {


    let width = req.body.width ? req.body.width : "";
    let height = req.body.height ? req.body.height : "";


    let chartData = JSON.stringify({
        chart: {
            type: 'pie', // Specify the chart type as 'pie'
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            margin: [0, 140, 0, 0],
            width: width,
            height: height,
        },
        title: {
            text: '',
        },
        tooltip: {
            "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Leads',
            colorByPoint: true,
            data: req.body.data,
            dataLabels: {
                enabled: false
            }
        }]
    })
    // Your Highcharts code goes here (e.g., create the chart HTML).
    // console.log(req.body.data)

    let graphData = req.body.data;
    let legendForm = {}
    let legendPhone = {}
    let legendOffline = {}
    for (let i = 0; i < graphData.length; i++) {

        console.log(graphData[i])
        if (graphData[i].name == "Form") {
            legendForm = graphData[i];
        }
        else if (graphData[i].name == "Phone") {
            legendPhone = graphData[i];
        }
        else if (graphData[i].name == "Offline") {
            legendOffline = graphData[i];
        }
    }
    console.log(legendForm, legendPhone, legendOffline)
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
      .highcharts-credits {
        display: none !important;
        }
    body {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .chart_wrap {
        width: fit-content;
        display: flex;
        align-items: center;
        position: relative;
    }
    
    .red,
    .green,
    .gray {
        background: red;
        padding: 3px 10px;
        border-radius: 4px;
        color: #fff;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
    }
    
    .green {
        background: green;
    }
    
    .gray {
        background: gray;
    }
    
    .wrap {
        margin-bottom: 10px;
        display: flex;
        font-size: 11px;
        align-items: center
    }
    
    .wrap.last {
        margin-bottom: 0;
    }
    
    .outer_wrap {
        border: 1px solid #000;
        padding: 7px;
        border-radius: 4px;
        width: 85px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        right: 30px;
        
    }
    </style>
    
        <div class="chart_wrap">
        <div id="container"></div>
        <div class="outer_wrap">            
            <div class="wrap">
                <span class="red" style="background: ${legendForm.color};">${legendForm.y}%</span>Form
            </div>
            <div class="wrap">
                <span class="red" style="background:${legendPhone.color};">${legendPhone.y}%</span>Phone
            </div>
            <div class="wrap last">
                <span class="red" style="background:${legendOffline.color};">${legendOffline.y}%</span>Offline
            </div>
            </div>
            </div>
            
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script>
        Highcharts.chart('container', ${chartData})
        </script>
        </body>
    </html>
        
    `;

    console.log(chartHtml);

    return chartHtml;


}

function pieMultiplechart(req) {

    let width = req.body.width ? req.body.width : "";
    let height = req.body.height ? req.body.height : "";
    // let leadsCount = req.body.totalLeads ? req.body.totalLeads : "";
    // let visitCount = req.body.visitCount ? req.body.visitCount : "";
    let label_name = req.body.label_name ? req.body.label_name : "";
    let total = req.body.total ? req.body.total : "";


    let chartData = JSON.stringify({
        chart: {
            renderTo: 'container',
            width: width,
            height: height,
            margin: [0, 500, 0, 0]
        },

        // title: {
        //     text: 'Total Leads : ' + leadsCount,
        //     x: 18,
        //     y: 40
        // },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            },
            series: {
                enableMouseTracking: false,
                shadow: false,
                animation: false
            }
        },
        series: [{
            type: 'pie',
            name: 'Leads',
            data: req.body.data,

            // showInLegend: true,
            dataLabels: {
                enabled: false
            }
        }]
    });

    let graphData = req.body.data;
    let legendOrganic = {}
    let legendPaid = {}
    let legendDirect = {}
    let legendReferral = {}
    let legendSocial = {}
    let legendEmail = {}
    let legendOthers = {}

    for (let i = 0; i < graphData.length; i++) {

        console.log(graphData[i])
        if (graphData[i].name == "Organic") {
            legendOrganic = graphData[i];
        }
        else if (graphData[i].name == "Paid") {
            legendPaid = graphData[i];
        }
        else if (graphData[i].name == "Direct") {
            legendDirect = graphData[i];
        }
        else if (graphData[i].name == "Referral") {
            legendReferral = graphData[i];
        }
        else if (graphData[i].name == "Social") {
            legendSocial = graphData[i];
        }
        else if (graphData[i].name == "Email") {
            legendEmail = graphData[i];
        }
        else if (graphData[i].name == "Others") {
            legendOthers = graphData[i];
        }

    }

    // let fieldName = "";
    // let fieldValue = "";
    // if (leadsCount != "") {
    //     fieldName = "Leads";
    //     fieldValue = leadsCount;
    // }
    // if (visitCount != "") {
    //     fieldName = "Visits";
    //     fieldValue = visitCount;

    // }


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
    .highcharts-credits {
        display: none !important;
        }
                .chart_wrap{
                    width: fit-content;
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .red{
                    background:red;
                    padding:3px 10px;
                    border-radius:4px;
                    color:#fff;
                    margin-right:10px;
                    display:flex;
                    align-items:center;
                    justify-content:flex-start;
                    width:30px;
                }
                .wrap{
                    margin-bottom: 10px;
                    display:flex;
                    font-size: 11px;
                    align-items:center
                }
                .wrap.last{
                    margin-bottom:0;
                }
                .outer_wrap{
                        border: 1px solid#000;
                padding: 7px;
                border-radius: 4px;
                width: fit-content;
                display: flex;
                position: absolute;
                left: 45%;
                top: 60px;
                font-family: sans-serif;


                }
            .title{
                    position: absolute;
                left: 45%;
                top: 35px;
                color: #658098;
                font-weight: 600;
                font-style: normal;
                font-family: sans-serif;
            }
            text.highcharts-title {
                display: none;
            }
                .left_s{
                    margin-right:15px;
                }
                </style>
                
                <div class="chart_wrap">
                    <div id="container" ></div>
                    <div class="title">Total ${label_name}: ${total}</div>
                    <div class="outer_wrap">
                        <div class="left_s">
                        <div class="wrap"><span class="red" style="background: ${legendOrganic.color};">${legendOrganic.y}%</span><span class="red" style="background: ${legendOrganic.color};">${legendOrganic.count}</span>Organic</div>
                        <div class="wrap"><span class="red" style="background: ${legendDirect.color};">${legendDirect.y}%</span><span class="red" style="background: ${legendDirect.color};">${legendDirect.count}</span>Direct</div>
                        <div class="wrap"><span class="red" style="background: ${legendSocial.color};">${legendSocial.y}%</span><span class="red" style="background: ${legendSocial.color};">${legendSocial.count}</span>Social</div>
                        <div class="wrap"><span class="red" style="background: ${legendOthers.color};">${legendOthers.y}%</span><span class="red" style="background: ${legendOthers.color};">${legendOthers.count}</span>Others</div>

                        </div>
                        <div class="right_s">
                        <div class="wrap"><span class="red" style="background: ${legendPaid.color};">${legendPaid.y}%</span><span class="red" style="background: ${legendPaid.color};">${legendPaid.count}</span>Paid</div>
                        <div class="wrap"><span class="red" style="background: ${legendReferral.color};">${legendReferral.y}%</span><span class="red" style="background: ${legendReferral.color};">${legendReferral.count}</span>Referral</div>
                        <div class="wrap"><span class="red" style="background: ${legendEmail.color};">${legendEmail.y}%</span><span class="red" style="background: ${legendEmail.color};">${legendEmail.count}</span>Email</div>
                        </div>
                    </div>
                    </div>                
            </div>
            <script src="https://code.highcharts.com/highcharts.js"></script>
            <script>
            Highcharts.chart('container',${chartData})
            </script>
            </body>
    </html>
`

    return chartHtml;

}

function pieMonthlyMultiplechart(req) {

    let width = req.body.width ? req.body.width : "";
    let height = req.body.height ? req.body.height : "";
    let totalCurrent = req.body.totalCurrent ? req.body.totalCurrent : "";
    let totalPrev = req.body.totalPrev ? req.body.totalPrev : "";
    let label_name = req.body.label_name ? req.body.label_name : "";
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    var currentMonth = monthNames[d.getMonth() - 1];

    let chartData = JSON.stringify({
        chart: {
            renderTo: 'container',
            width: width,
            height: height,
            margin: [0, 500, 0, 0]
        },


        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            },
            series: {
                enableMouseTracking: false,
                shadow: false,
                animation: false
            }
        },
        series: [{
            type: 'pie',
            name: 'Leads',
            data: req.body.data,

            // showInLegend: true,
            dataLabels: {
                enabled: false
            }
        }]
    });

    let graphData = req.body.legendData;
    let legendOrganic = {}
    let legendPaid = {}
    let legendDirect = {}
    let legendReferral = {}
    let legendSocial = {}
    let legendEmail = {}
    let legendOthers = {}

    for (let i = 0; i < graphData.length; i++) {

        console.log(graphData[i])
        if (graphData[i].name == "Organic") {
            legendOrganic = graphData[i];
            if (legendOrganic.trend == "up") {
                legendOrganic.trend = "up_arrow";
                legendOrganic.sign = "";
            }
            if (legendOrganic.trend == "down") {
                legendOrganic.trend = "down_arrow";
                legendOrganic.sign = "";
            }
            if (legendOrganic.trend == "equal") {
                legendOrganic.trend = "eql_icon";
                legendOrganic.sign = "=";
            }
        }
        else if (graphData[i].name == "Paid") {
            legendPaid = graphData[i];
            if (legendPaid.trend == "up") {
                legendPaid.trend = "up_arrow";
                legendPaid.sign = ""

            }
            if (legendPaid.trend == "down") {
                legendPaid.trend = "down_arrow";
                legendPaid.sign = "";

            }
            if (legendPaid.trend == "equal") {
                legendPaid.trend = "eql_icon";
                legendPaid.sign = "=";

            }
        }
        else if (graphData[i].name == "Direct") {
            legendDirect = graphData[i];
            if (legendDirect.trend == "up") {
                legendDirect.trend = "up_arrow";
                legendDirect.sign = "";

            }
            if (legendDirect.trend == "down") {
                legendDirect.trend = "down_arrow";
                legendDirect.sign = "";

            }
            if (legendDirect.trend == "equal") {
                legendDirect.trend = "eql_icon";
                legendDirect.sign = "=";

            }
        }
        else if (graphData[i].name == "Referral") {
            legendReferral = graphData[i];
            if (legendReferral.trend == "up") {
                legendReferral.trend = "up_arrow";
                legendReferral.sign = "";

            }
            if (legendReferral.trend == "down") {
                legendReferral.trend = "down_arrow";
                legendReferral.sign = "";

            }
            if (legendReferral.trend == "equal") {
                legendReferral.trend = "eql_icon";
                legendReferral.sign = "=";

            }
        }
        else if (graphData[i].name == "Social") {
            legendSocial = graphData[i];
            if (legendSocial.trend == "up") {
                legendSocial.trend = "up_arrow";
                legendSocial.sign = "";

            }
            if (legendSocial.trend == "down") {
                legendSocial.trend = "down_arrow";
                legendSocial.sign = "";

            }
            if (legendSocial.trend == "equal") {
                legendSocial.trend = "eql_icon";
                legendSocial.sign = "=";

            }
        }
        else if (graphData[i].name == "Email") {
            legendEmail = graphData[i];
            if (legendEmail.trend == "up") {
                legendEmail.trend = "up_arrow";
                legendEmail.sign = "";

            }
            if (legendEmail.trend == "down") {
                legendEmail.trend = "down_arrow";
                legendEmail.sign = "";

            }
            if (legendEmail.trend == "equal") {
                legendEmail.trend = "eql_icon";
                legendEmail.sign = "=";

            }
        }
        else if (graphData[i].name == "Others") {
            legendOthers = graphData[i];
            if (legendOthers.trend == "up") {
                legendOthers.trend = "up_arrow";
                legendOthers.sign = "";

            }
            if (legendOthers.trend == "down") {
                legendOthers.trend = "down_arrow";
                legendOthers.sign = "";

            }
            if (legendOthers.trend == "equal") {
                legendOthers.trend = "eql_icon";
                legendOthers.sign = "=";

            }
        }

    }

    // let fieldName = "";
    // let fieldValueCurrent = "";
    // let fieldValuePrev = ""
    // if (totalLeadsCurrent != "") {
    //     fieldName = "Leads";
    //     fieldValueCurrent = totalLeadsCurrent;
    //     fieldValuePrev = totalLeadsPrev;
    // }
    // if (totalVisitsCurrent != "") {
    //     fieldName = "Visits";
    //     fieldValueCurrent = totalVisitsCurrent;
    //     fieldValuePrev = totalVisitsPrev;

    // }




    const chartHtml = `
                    <style>
                    .highcharts-credits {
                        display: none !important;
                        }
                    .chart_wrap{
                        width: fit-content;
                        display: flex;
                        align-items: center;
                        position: relative;
                    }
                    .red{
                        background:red;
                        padding:3px 10px;
                        border-radius:4px;
                        color:#fff;
                        margin-right:10px;
                        display:flex;
                        align-items:right;
                        justify-content:flex-start;
                        width:30px;
                      }
                      .wrap{
                        display:flex;
                        font-size: 11px;
                        align-items:right
                      }
                      .wrap.last{
                        margin-bottom:0;
                      }
                      .outer_wrap{
                            border: 1px solid #ddd;
                  
                          border-radius: 4px;
                          width: fit-content;
                          display: flex;
                          position: absolute;
                          left: 32%;
                          top: 60px;
                          width:400px;
                
                      }
                  table{
                    width:100%
                  }
                  .title{
                         position: absolute;
                    left: 37%;
                    top: 10px;
                    color: #658098;
                    font-weight: 500;
                    font-style: normal;
                    text-transform:capitalize;
                    font-family: sans-serif;
                    font-size:15px;
                    line-height:1.2;
                  }
                  span{
                    font-size:11px
                    align:right;
                  }
                  .title2{
                        position: absolute;
                    left: 66%;
                    top: 10px;
                    color: #658098;
                    font-weight: 500;
                    font-style: normal;
                    font-family: sans-serif;
                    font-size:15px;
                    line-height:1.2;
                  }
                  text.highcharts-title {
                    display: none;
                }
                      .left_s{
                        margin-right:15px;
                      }
                  .down_arrow{
                       border-left: 9px solid transparent;
                    border-right: 9px solid transparent;
                    border-top: 10px solid #f19300;
                    transform: rotate(0deg);
                    width: 0px;
                         
                  }
                   .up_arrow{
                       border-left: 9px solid transparent;
                    border-right: 9px solid transparent;
                    border-top: 10px solid #589c10;
                    transform: rotate(180deg);
                     width: 0px;
                        
                  }
                  .center{
                    background:#efefef;
                    padding: 5px 10px;
                    margin-right:10px;
                    border-radius:5px;
                  }
                  .eql_icon{
                    font-size: 18px;
                    text-align: center;
                    line-height: 0.3;
                    color:#698298;
                    font-weight:700;
                  }
                  th{
                    width:30%;
                    font-weight:400;
                    color:#698298;
                    text-transform:capitalize;
                    text-align:start;
                    padding:7px 5px;
                    border-bottom: 1px solid #698298;
                    font-family: sans-serif;
                    font-size:11px;
                    line-height:1.2;
                    display:none;
                  }
                  th:nth-child(2){
                    width:20%;
                  }
                  td:nth-child(2){
                    background:#efefef;
                  }
                  td{
                    font-style: normal;
                    font-family: sans-serif;
                    padding:10px 5px;
                    text-align: right;
                  }
                  .down_arrow{
                    width: 0px;
                  }
                </style>
                
                <div class="chart_wrap">
                    <div id="container"></div>
                    <div class="title">${currentMonth}<br> Total ${label_name}: ${totalCurrent}</div>
                    <div class="title2"> Previous Month<br> Total ${label_name}: ${totalPrev}</div>
                    <div class="outer_wrap">
                    <table>
                    <thead>
                      <tr>
                        <th>
                        </th>
                        <th></th>
                        <th>
                        </th>
                      </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendOrganic.color};">${legendOrganic.currentPerc}%</span><span class="red" style="background: ${legendOrganic.color};">${legendOrganic.current}</span>Organic</div>
                                </td>
                                <td>
                                    <div class="${legendOrganic.trend}"> ${legendOrganic.sign} </div> 
                                </td>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendOrganic.color};">${legendOrganic.previousPerc}%</span><span class="red" style="background: ${legendOrganic.color};"> ${legendOrganic.previous}</span>Organic</div> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendPaid.color};">${legendPaid.currentPerc}%</span><span class="red" style="background: ${legendPaid.color};"> ${legendPaid.current}</span>Paid</div>
                                </td>
                                <td>
                                    <div class="${legendPaid.trend}"> ${legendPaid.sign} </div>  
                                </td>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendPaid.color};">${legendPaid.previousPerc}%</span><span class="red" style="background: ${legendPaid.color};"> ${legendPaid.previous}</span>Paid</div> 
                                </td>
                            </tr>
                           <tr>
                                <td>
                                    <div class="wrap"><span class="red" style="background:  ${legendDirect.color};">${legendDirect.currentPerc}%</span><span class="red" style="background:  ${legendDirect.color};"> ${legendDirect.current}</span>Direct</div>
                                </td>
                                <td>
                                    <div class="${legendDirect.trend}"> ${legendDirect.sign}</div> 
                                </td>
                                <td>
                                    <div class="wrap"><span class="red" style="background:  ${legendDirect.color};">${legendDirect.previousPerc}%</span><span class="red" style="background:  ${legendDirect.color};"> ${legendDirect.previous}</span>Direct</div> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendReferral.color};">${legendReferral.currentPerc}%</span><span class="red" style="background: ${legendReferral.color};">${legendReferral.current}</span>Referral</div>
                                </td>
                                <td>
                                    <div class="${legendReferral.trend}">${legendReferral.sign}</div>  
                                </td>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendReferral.color};">${legendReferral.previousPerc}%</span><span class="red" style="background: ${legendReferral.color};">${legendReferral.previous}</span>Referral</div> 
                                </td>
                            </tr>
                           <tr>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendSocial.color};"> ${legendSocial.currentPerc}%</span><span class="red" style="background: ${legendSocial.color};">${legendSocial.current}</span>Social</div>
                                </td>
                                <td>
                                    <div class="${legendSocial.trend}">${legendSocial.sign}</div> 
                                </td>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendSocial.color};"> ${legendSocial.previousPerc}%</span><span class="red" style="background: ${legendSocial.color};">${legendSocial.previous}</span>Social</div> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendEmail.color};"> ${legendEmail.currentPerc}%</span><span class="red" style="background: ${legendEmail.color};">${legendEmail.current}</span>Email</div>
                                </td>
                                <td>
                                    <div class="${legendEmail.trend}">${legendEmail.sign}</div>  
                                </td>
                                <td>
                                    <div class="wrap"><span class="red" style="background: ${legendEmail.color};"> ${legendEmail.previousPerc}%</span><span class="red" style="background: ${legendEmail.color};">${legendEmail.previous}</span>Email</div> 
                                </td>
                            </tr>
                           <tr>
                                <td>
                                    <div class="wrap"><span class="red" style="background:  ${legendOthers.color};">${legendOthers.currentPerc}%</span><span class="red" style="background:  ${legendOthers.color};">${legendOthers.current}</span>Others</div>
                                </td>
                                <td>
                                    <div class="${legendOthers.trend}">${legendOthers.sign}</div> 
                                </td>
                                <td>
                                    <div class="wrap"><span class="red" style="background:  ${legendOthers.color};">${legendOthers.previousPerc}%</span><span class="red" style="background:  ${legendOthers.color};">${legendOthers.previous}</span>Others</div> 
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                    </div>
                                    
            </div>
            <script src="https://code.highcharts.com/highcharts.js"></script>
            <script>
            Highcharts.chart('container',${chartData})
            </script>`

    return chartHtml;

}


/*function pieMonthlyMultipleLinechart(req) {

    let width = req.body.width ? req.body.width : "";
    let height = req.body.height ? req.body.height : "";
    let series = req.body.series ? req.body.series : "";

    let chartData = JSON.stringify({
        chart: {
            type: 'line',
            height: 208,
            width: 709,
            plotBackgroundColor: '#F8F8F8',
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            "min": 1,
            "max": 31,
            "tickInterval": 1,
            "title": {
                "text": "Date",
                "align": "left",
                "offset": 2,
                "x": 5,
                "style": {
                    "color": "#717171",
                    "fontSize": "12px",
                    "fontFamily": "Trebuchet MS, Verdana, sans-serif"
                }
            },
            "lineColor": "#C9C9C9"


        },
        yAxis: {
            "min": 0,
            "title": {
                "text": "Leads",
                "enabled": true
            },
            "lineWidth": 1,
            "lineColor": "#C9C9C9",
            "stackLabels": {
                "enabled": true
            }
        },
        "legend": {
            "align": "left",
            "x": -15,
            "y": 10,
            "floating": true,
            "borderWidth": 0,
            "symbolWidth": 0,
            "symbolPadding": 0,
            "margin": 30,
            "width": 700,
            "itemWidth": 200,
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: false
            }
        },
        series: series
    });


    const chartHtml = `
    
    <style>
    .highcharts-legend-item span {
        padding-left: 40px !important;
        height: 30px;
        padding-top: 5px;
        margin-top: 20px !important;
        position: absolute;
        font-family: Helvetica, Arial, sans-serif !important;
        font-size: 0.8em !important;
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
    
      .highcharts-legend-item span:before {
        position: absolute;
        width: 25px;
        height: 15px;
        background: #5f9ea0;
        content: '';
        left: 7px;
        top: 3px;
      }
    
      .highcharts-series-1 span:before {
        position: absolute;
        width: 25px;
        height: 15px;
        background: #6a5acd;
        content: '';
        left: 7px;
        top: 3px;
      }
    
      .highcharts-series-0 span:after {
        position: absolute;
        width: 9px;
        height: 9px;
        background: #5f9ea0;
        content: '';
        left: 3px;
        top: 1px;
        border-radius: 50px;
      }
    
      .highcharts-series-1 span:after {
        position: absolute;
        width: 7px;
        height: 7px;
        background: #6a5acd;
        content: '';
        left: 4px;
        top: 2px;
        transform: rotate(45deg);
      }
    
    
    
    
    </style>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
                        <div id="container"></div>

            <script>
            Highcharts.chart('container',${chartData})
            </script>`

    return chartData;

}

function monthlyMultipleColumnchart(req) {

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
                text: 'Lead'
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
        series: series


    });


    const chartHtml = `

    <script src="https://code.highcharts.com/highcharts.js"></script>
             
                <div id="container"></div>
                   
            <script>
            Highcharts.chart('container',${chartData})
            </script>`

    return chartHtml;

}
*/

module.exports = { pieChartCreate, pieMultiplechart, pieMonthlyMultiplechart };

