var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var pieChartController = require('./controller/pieChartController');
var lineChartController = require('./controller/lineChartController');
var columnChartController = require('./controller/columnChartController');



var http = require('http');
const puppeteer = require('puppeteer');
const fs = require("fs");
var app = express();
var server = http.createServer(app);

app.use('/graph', express.static(path.join(__dirname, 'graph')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.post('/',
    // var service = server.listen('127.0.0.1:8080', function(request, response) {    //its for local purpose
    (req, res) => {    // its for live purpose

        (async () => {
            const browser = await puppeteer.launch({
                headless: true,
                ignoreDefaultArgs: ['--disable-extensions'],
                args: ["--no-sandbox", "--disabled-setupid-sandbox"],
            });
            const page = await browser.newPage();

            console.log(req.body.data)

            let profile_id = req.body.profile_id ? req.body.profile_id : "";
            let filename = req.body.filename ? req.body.filename : "";
            let folder0 = req.body.folder0 ? req.body.folder0 : "";
            let folder1 = req.body.folder1 ? req.body.folder1 : "";
            let folder2 = req.body.folder2 ? req.body.folder2 : "";
            let mainFolder = req.body.mainFolder ? req.body.mainFolder : "";
            let width = req.body.width ? req.body.width : "";
            let height = req.body.height ? req.body.height : "";
            let graph = req.body.graph ? req.body.graph : "";
            let data = req.body.data ? req.body.data : "";
            let graphName = req.body.graphName ? req.body.graphName : "";


            let chartType = ""
            let chartHtml = "";
            if (graphName == "mode_graph") {
                chartType = 'pie'
                chartHtml = pieChartController.pieChartCreate(req)
            }

            if (graph == "pie" && graphName == "weekly") {
                chartHtml = pieChartController.pieMultiplechart(req);
            }

            if (graph == "pie" && graphName == "monthly") {
                chartHtml = pieChartController.pieMonthlyMultiplechart(req);
            }
            if (graph == "column" && graphName == "historical_lead_graph") {
                chartHtml = columnChartController.monthlyLeadTrend(req);
            }
            if (graph == "column" && graphName == "historical_visit_graph") {
                chartHtml = columnChartController.monthlyVisitTrend(req);

            }
            if (graph == "line" && graphName == "monthly") {
                chartHtml = lineChartController.monthlyLinechart(req);

            }




            console.log(chartHtml);

            await page.setViewport({ width: width, height: height, deviceScaleFactor: 1 });


            await page.setContent(chartHtml);
            await page.evaluate(() => {
                // Example: Scroll to top-left corner of the page to prevent scroll bars
                window.scrollTo(0, 0);

                // You can also adjust CSS to handle overflow
                document.body.style.overflow = 'hidden';
            });
            await new Promise(resolve => setTimeout(resolve, 2000));

            // const basePath = './home/adlgec/public_html/core/graph/weekly-report';

            const fullPath = `${mainFolder}\\${folder0}\\${folder1}\\${folder2}`;


            fs.mkdir(fullPath, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating folders:', err);
                } else {
                    console.log('Folders created successfully'); 3
                }
            });

            console.log(fullPath + "/" + filename)

            await page.screenshot({ path: fullPath + "/" + filename });
            await browser.close();
        })();
    });


server.listen(5000, 'localhost');
server.on('listening', function () {
    console.log('Express server started on port', server.address().port);
});