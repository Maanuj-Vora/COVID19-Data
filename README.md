# Bing COVID-19 Current Data and Past Data

### Retrieves the current data and stores past data shown on [Bing's COVID-19 Tracker](https://www.bing.com/covid) and made into JSONs.

##### Past data from date of first case in each area to present

---

![Issues](https://img.shields.io/github/issues/Maanuj-Vora/Bing-COVID-19-Current-Data?style=for-the-badge)
![Forks](https://img.shields.io/github/forks/Maanuj-Vora/Bing-COVID-19-Current-Data?style=for-the-badge)
![Stars](https://img.shields.io/github/stars/Maanuj-Vora/Bing-COVID-19-Current-Data?style=for-the-badge)
![Watchers](https://img.shields.io/github/watchers/Maanuj-Vora/Bing-COVID-19-Current-Data?style=for-the-badge)

![Retrieve Data Hourly](https://img.shields.io/github/workflow/status/Maanuj-Vora/Bing-COVID-19-Current-Data/Retrieve%20Data%20Hourly?label=Retrieve%20Data%20Hourly&style=for-the-badge)

![Contributors](https://img.shields.io/github/contributors/Maanuj-Vora/Bing-COVID-19-Current-Data?style=for-the-badge)
![License](https://img.shields.io/github/license/Maanuj-Vora/Bing-COVID-19-Current-Data?logo=MIT&style=for-the-badge)
![Repo Size](https://img.shields.io/github/repo-size/Maanuj-Vora/Bing-COVID-19-Current-Data?style=for-the-badge)

![Made With Javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)

---

#### All data will be updated hourly, if the 'Retrieve Data Hourly' badge has the value 'passing'.

#### Site Implementation [Here](https://maanuj-vora.github.io/coronavirus-statistics/currentData.html).

## 🚩 Table of Contents

- [Used By](#used-by)
- [Link for all JSONs](#link-for-all-jsons)
- [Usage Info](#usage-info)
- [License](#license)

---

Bing retrieves their data from multiple sources including
 - [CDC](https://www.cdc.gov/coronavirus/2019-ncov/index.html)
 - [WHO](https://www.who.int/emergencies/diseases/novel-coronavirus-2019)
 - [ECDC](https://www.ecdc.europa.eu/en/novel-coronavirus-china)

---

### Used By

[COVID-19 in the US Statistics](https://maanuj-vora.github.io/covid19us/)

[+ Add yours](https://github.com/Maanuj-Vora/Bing-COVID-19-Current-Data/edit/master/README.md)

---

### Link for all JSONs

[All Data](https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/allData.json)


[Current Data](https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/currentData.json)


[All Names and IDs](https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/allNamesIDs.json)**


[Major(Country) Names and IDs](https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/countryNamesIDs.json)*

*If you use the Major(Country) Names and IDs, the order of the countrys/areas are in from most impacted to least impacted

**Please note that if you want to report at the county level, I would suggest using the [Current Data](https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/currentData.json) file as it provides, as per my knowledge, almost, if not all counties in the US, whereas the [All Data](https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/allData.json) only does for a selected few.

This is what I have done on my demo site: [here](https://maanuj-vora.github.io/coronavirus-statistics/currentData.html)
Note: I have done this with the US in mind
```javascript

// This method is to check if a state has counties in the database and if so, the names and ids of them
function hasminorMinorArea(id) {
    // id is name of state in the form found in currentData.json
    // id = "stateName_countryName";
    // ex. id = "california_unitedstates";
    fetch("https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/currentData.json")
        .then(response => response.json())
        .then(data => {

            let area = [];

            loop1:
            for (y = 0; y < data["areas"].length; y++) {
                for (x = 0; x < data["areas"][y]["areas"].length; x++) {
                    if (id == data["areas"][y]["areas"][x].id) {
                        area = data["areas"][y]["areas"][x]["areas"];
                        break loop1;
                    }
                }
            }

            if (area.length > 0) {
                var done = false;
                while (!done) {
                    done = true;
                    for (var i = 1; i < area.length; i += 1) {
                        if (area[i - 1].displayName > area[i].displayName) {
                            done = false;
                            var tmp = area[i - 1];
                            area[i - 1] = area[i];
                            area[i] = tmp;
                        }
                    }
                }

                for (x = 0; x < area.length; x++) {
                    console.log(area[x].id);
                    console.log(area[x].displayName);
                    // This will log all counties' ids and their names
                }
            }
        });
}

function getMinorMinorArea(id) {
    // id is name of state in the form found in currentData.json
    // id = "stateName_countryName";
    // ex. id = "california_unitedstates";

    fetch("https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/currentData.json")
        .then(response => response.json())
        .then(data => {

            if (id != "N/A") {

                var displayName;
                var totalConfirmed;
                var totalDeaths;
                var totalRecovered;
                var lastUpdated;
                var lat;
                var long;
                var parentId;

                else {
                    loop1:
                    for (y = 0; y < data["areas"].length; y++) {

                        if (data["areas"][y]["areas"].length != 0) {
                            loop2:
                            for (z = 0; z < data["areas"][y]["areas"].length; z++) {

                                if (data["areas"][y]["areas"][z]["areas"].length != 0) {
                                    loop3:
                                    for (x = 0; x < data["areas"][y]["areas"][z]["areas"].length; x++) {

                                        if (id == data["areas"][y]["areas"][z]["areas"][x].id) {
                                            displayName = (data["areas"][y]["areas"][z]["areas"][x].displayName);
                                            totalConfirmed = (data["areas"][y]["areas"][z]["areas"][x].totalConfirmed);
                                            totalDeaths = (data["areas"][y]["areas"][z]["areas"][x].totalDeaths);
                                            totalRecovered = (data["areas"][y]["areas"][z]["areas"][x].totalRecovered);
                                            lastUpdated = (data["areas"][y]["areas"][z]["areas"][x].lastUpdated);
                                            lat = (data["areas"][y]["areas"][z]["areas"][x].lat);
                                            long = (data["areas"][y]["areas"][z]["areas"][x].long);
                                            parentId = (data["areas"][y]["areas"][z]["areas"][x].parentId);
                                            break loop1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                console.log(`Data Shown for: ${displayName}`);
                if (lastUpdated != null) {
                    console.log(`Last Updated: ${lastUpdated}`);
                } else {
                    console.log(`Last Updated: N/A`);
                }
                console.log(`Confirmed Cases: ${totalConfirmed}`);
                console.log(`Active Cases: ${totalConfirmed - totalRecovered - totalDeaths}`);
                console.log(`Deaths: ${totalDeaths}`);
                console.log(`Recovered: ${totalRecovered}`);
            }
        });

}
```


Some areas may not be accounted for the in [allData.json](https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/allData.json), but all countries will be, as well as all states in the US.


If you would like old date, you can do so with the following code
```javascript
fetch("https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/allData.json")
    .then(response => response.json())
    .then(data => {
        var id = data["italy"];

        console.log(id[0].date);
    }); 
```
That logs '2020-01-31' to the console which is the date that Italy had its first case of COVID-19

All timestamps done are in GMT(UTC)

---

Examples of data retrieval can be found in the [examples](examples/) directory

Usage samples and formatting for jsons can be found at the bottom of the README.md

---

If you have any suggestions, feel free to open up an issue, or make a pull request

---

### Usage Info

Sample Usage of Retrieving Data of Specific Area using either [all ids](docs/allNamesIDs.json) or [major ids](docs/countryNamesIDs.json).
```javascript
function getAreaData(id) {
    fetch("https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/currentData.json")
        .then(response => response.json())
        .then(data => {

            var displayName;
            var totalConfirmed;
            var totalDeaths;
            var totalRecovered;
            var lastUpdated;
            var lat;
            var long;
            var parentId;

            if (id == data.id) {
                displayName = (data.displayName);
                totalConfirmed = (data.totalConfirmed);
                totalDeaths = (data.totalDeaths);
                totalRecovered = (data.totalRecovered);
                lastUpdated = (data.lastUpdated);
                lat = (data.lat);
                long = (data.long);
                parentId = (data.parentId);
            }

            else {
                loop1:
                for (y = 0; y < data["areas"].length; y++) {

                    if (id == data["areas"][y].id) {
                        displayName = (data["areas"][y].displayName);
                        totalConfirmed = (data["areas"][y].totalConfirmed);
                        totalDeaths = (data["areas"][y].totalDeaths);
                        totalRecovered = (data["areas"][y].totalRecovered);
                        lastUpdated = (data["areas"][y].lastUpdated);
                        lat = (data["areas"][y].lat);
                        long = (data["areas"][y].long);
                        parentId = (data["areas"][y].parentId);
                        break loop1;
                    }

                    if (data["areas"][y]["areas"].length != 0) {
                        loop2:
                        for (z = 0; z < data["areas"][y]["areas"].length; z++) {

                            if (id == data["areas"][y]["areas"][z].id) {
                                displayName = (data["areas"][y]["areas"][z].displayName);
                                totalConfirmed = (data["areas"][y]["areas"][z].totalConfirmed);
                                totalDeaths = (data["areas"][y]["areas"][z].totalDeaths);
                                totalRecovered = (data["areas"][y]["areas"][z].totalRecovered);
                                lastUpdated = (data["areas"][y]["areas"][z].lastUpdated);
                                lat = (data["areas"][y]["areas"][z].lat);
                                long = (data["areas"][y]["areas"][z].long);
                                parentId = (data["areas"][y]["areas"][z].parentId);
                                break loop1;
                            }
                        }
                    }
                }
            }

            console.log(id);
            console.log(displayName);
            console.log(totalConfirmed);
            console.log(totalDeaths);
            console.log(totalRecovered);
            console.log(lastUpdated);
            console.log(lat);
            console.log(long);
            console.log(parentId);
        });
}
```

Usage for getting all ids and accompanying displayNames
```javascript
fetch("https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/allNamesIDs.json")
        .then(response => response.json())
        .then(data => {
            var id = data["id"];
            var displayName = data["displayName"];
            
            console.log(id);
            console.log(displayName);
        });
```

Format for data json
```
{
  "id": "world",
  "displayName": "Global",
  "areas": [
    {
      "id": "italy",
      "displayName": "Italy",
      "areas": [],
      "totalConfirmed": 59138,
      "totalDeaths": 5476,
      "totalRecovered": 7024,
      "lastUpdated": "2020-03-22T22:59:14.807Z",
      "lat": 43.529028,
      "long": 12.162184,
      "parentId": "world"
    },
    {
      "id": "unitedstates",
      "displayName": "United States",
      "areas": [
        {
          "id": "alabama_unitedstates",
          "displayName": "Alabama",
          "areas": [
            {
              "id": "baldwin_alabama_unitedstates",
              "displayName": "Baldwin",
              "areas": [],
              "totalConfirmed": 2,
              "totalDeaths": 0,
              "totalRecovered": 0,
              "lat": 30.688270568847656,
              "long": -87.74720764160156,
              "parentId": "alabama_unitedstates"
            }...
        }
      ],
      "totalConfirmed": 33382,
      "totalDeaths": 417,
      "totalRecovered": 178,
      "lastUpdated": "2020-03-22T22:59:14.807Z",
      "lat": 39.495915,
      "long": -98.989979,
      "parentId": "world"
    }...
    ],
  "totalConfirmed": 335403,
  "totalDeaths": 14611,
  "totalRecovered": 97636,
  "lastUpdated": "2020-03-22T22:59:14.807Z"
}
```

Format for id and displayNames json
```
{
  "id": [
    "world",
    "chinamainland",
    "italy",
    "unitedstates",
    ...
  ],
  "displayName": [
    "Global",
    "China (mainland)",
    "Italy",
    "United States",
    ...
  ]
}
```

---

### License

```
MIT License

Copyright (c) 2020 Maanuj Vora

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---
