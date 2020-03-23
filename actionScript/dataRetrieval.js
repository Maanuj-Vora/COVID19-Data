'use strict';
const fs = require("fs");
const path = require("path");

const WORKSPACE = process.env.GITHUB_WORKSPACE;
const DATA_REPO = "data";
const MAIN_REPO = "main";

let d = new Date();

const outputPath = path.join(WORKSPACE, MAIN_REPO, "docs", "currentData.json");
const outputPathDaily = path.join(WORKSPACE, MAIN_REPO, "docs", "archived", ((d.toLocaleDateString() + ".json").replace("/", "-")).replace("/", "-"));
const outputPathAllNamesIDs = path.join(WORKSPACE, MAIN_REPO, "docs", "allNamesIDs.json");
const outputPathCountryNamesIDs = path.join(WORKSPACE, MAIN_REPO, "docs", "countryNamesIDs.json");
const outputPathAllData = path.join(WORKSPACE, MAIN_REPO, "docs", "allData.json");

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
            fs.writeFile(outputPathDaily, JSON.stringify(data, null, 2), { flag: 'w' }, function (err) {
                if (err) throw err;
                console.log("It worked?");
            });

            allInfo(data);
            countryInfo(data);
        });
    });
    req.end();
});
module.exports = get;

Object.defineProperty(exports, "__esModule", { value: true });
const getAll = new Promise((resolve, reject) => {
    const reqAll = https_1.request('https://bing.com/covid/graphData', resAll => {
        let da = '';
        resAll.on('data', d => da += d);
        reqAll.on('error', reject);
        resAll.on('end', () => {
            const dataAll = JSON.parse(da);
            resolve(dataAll);
            fs.writeFile(outputPathAllData, JSON.stringify(dataAll, null, 2), { flag: 'w' }, function (err) {
                if (err) throw err;
                console.log("It worked?");
            });
        });
    });
    reqAll.end();
});
module.exports = getAll;

function allInfo(data) {

    var id = [];
    var displayName = [];

    id.push(data.id);
    displayName.push(data.displayName);

    for (let y = 0; y < data["areas"].length; y++) {

        id.push(data["areas"][y].id);
        displayName.push(data["areas"][y].displayName);

        if (data["areas"][y]["areas"].length != 0) {
            for (let z = 0; z < data["areas"][y]["areas"].length; z++) {

                id.push(data["areas"][y]["areas"][z].id);
                displayName.push(data["areas"][y]["areas"][z].displayName);

            }
        }
    }

    var item = {
        "id": id,
        "displayName": displayName
    };

    fs.writeFile(outputPathAllNamesIDs, JSON.stringify(item, null, 2), { flag: 'w' }, function (err) {
        if (err) throw err;
        console.log("It worked?");
    });

}

function countryInfo(data) {

    var id = [];
    var displayName = [];

    for (let y = 0; y < data["areas"].length; y++) {

        id.push(data["areas"][y].id);
        displayName.push(data["areas"][y].displayName);

    }

    var item = {
        "id": id,
        "displayName": displayName
    };

    fs.writeFile(outputPathCountryNamesIDs, JSON.stringify(item, null, 2), { flag: 'w' }, function (err) {
        if (err) throw err;
        console.log("It worked?");
    });

}