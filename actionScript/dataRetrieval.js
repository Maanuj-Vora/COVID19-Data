'use strict';
const fs = require("fs");
const path = require("path");

const WORKSPACE = process.env.GITHUB_WORKSPACE;
const DATA_REPO = "data";
const MAIN_REPO = "main";

let d = new Date();

const outputPath = path.join(WORKSPACE, MAIN_REPO, "docs", "currentData.json");
const outputPathDaily = path.join(WORKSPACE, MAIN_REPO, "docs", "archived", ((d.toLocaleDateString() + ".json").replace("/", "-")).replace("/", "-"));
const outputPathAllID = path.join(WORKSPACE, MAIN_REPO, "docs", "allId.json");

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

            allid(data);

        });
    });
    req.end();
});
module.exports = get;

function allid(data) {

    var id = [];

    id.push(data.id);

    for (let y = 0; y < data["areas"].length; y++) {

        id.push(data["areas"][y].id);

        if (data["areas"][y]["areas"].length != 0) {
            for (let z = 0; z < data["areas"][y]["areas"].length; z++) {

                id.push(data["areas"][y]["areas"][z].id);
            }
        }
    }
    fs.writeFile(outputPathAllID, JSON.stringify(id, null, 2), { flag: 'w' }, function (err) {
        if (err) throw err;
        console.log("It worked?");
    });

}