'use strict';
const fs = require("fs");
const path = require("path");

const WORKSPACE = process.env.GITHUB_WORKSPACE;
const DATA_REPO = "data";
const MAIN_REPO = "main";

const outputPath = path.join(WORKSPACE, MAIN_REPO, "docs", "data.json");
const outputPath1 = path.join(WORKSPACE, MAIN_REPO, "docs", "displayName.txt");

Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const get = new Promise((resolve, reject) => {
    const req = https_1.request('https://bing.com/covid/data', res => {
        let da = '';
        res.on('data', d => da += d);
        req.on('error', reject);
        res.on('end', () => {
            const data = JSON.parse(da);
            resolve(data);
            fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        });
    });
    req.end();
});
module.exports = get;


function getAllData() {
    fetch("https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/data.json")
        .then(response => response.json())
        .then(data => {
            var displayName = [];
            var totalConfirmed = [];
            var totalDeaths = [];
            var totalRecovered = [];
            var lastUpdated = [];
            var lat = [];
            var long = [];
            var parentId = [];

            displayName.push(data.displayName);
            totalConfirmed.push(data.totalConfirmed);
            totalDeaths.push(data.totalDeaths);
            totalRecovered.push(data.totalRecovered);
            lastUpdated.push(data.lastUpdated);
            lat.push(data.lat);
            long.push(data.long);
            parentId.push(data.parentId);

            for (y = 0; y < data["areas"].length; y++) {

                displayName.push(data["areas"][y].displayName);
                totalConfirmed.push(data["areas"][y].totalConfirmed);
                totalDeaths.push(data["areas"][y].totalDeaths);
                totalRecovered.push(data["areas"][y].totalRecovered);
                lastUpdated.push(data["areas"][y].lastUpdated);
                lat.push(data["areas"][y].lat);
                long.push(data["areas"][y].long);
                parentId.push(data["areas"][y].parentId);

                if (data["areas"][y]["areas"].length != 0) {
                    for (z = 0; z < data["areas"][y]["areas"].length; z++) {

                        displayName.push(data["areas"][y]["areas"][z].displayName);
                        totalConfirmed.push(data["areas"][y]["areas"][z].totalConfirmed);
                        totalDeaths.push(data["areas"][y]["areas"][z].totalDeaths);
                        totalRecovered.push(data["areas"][y]["areas"][z].totalRecovered);
                        lastUpdated.push(data["areas"][y]["areas"][z].lastUpdated);
                        lat.push(data["areas"][y]["areas"][z].lat);
                        long.push(data["areas"][y]["areas"][z].long);
                        parentId.push(data["areas"][y]["areas"][z].parentId);

                    }
                }
            }

            fs.writeFile('displayName.txt', displayName, (err) => {
                if (err) throw err;
            })
        });
}