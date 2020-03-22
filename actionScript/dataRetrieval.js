'use strict';
const fs = require("fs");
const path = require("path");

const WORKSPACE = process.env.GITHUB_WORKSPACE;
const DATA_REPO = "data";
const MAIN_REPO = "main";

const outputPath = path.join(WORKSPACE, MAIN_REPO, "docs", "data.json");

let d = new Date();
const outputPathDaily = path.join(WORKSPACE, MAIN_REPO, "docs", ((d.toLocaleDateString() + ".json").replace("/", "-")).replace("/", "-"));

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
        });
    });
    req.end();
});
module.exports = get;