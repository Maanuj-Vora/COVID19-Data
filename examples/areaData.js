function startScript() {

    // Basically do anything you want before you get all the data

    id = "unitedstates"

    getAreaData(id);
}

function getAreaData(id) {
    fetch("https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/data.json")
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

            postScript(id, displayName, totalConfirmed, totalDeaths, totalRecovered, lastUpdated, lat, long, parentId);

        });
}

function postScript(id, displayName, totalConfirmed, totalDeaths, totalRecovered, lastUpdated, lat, long, parentId) {

    // Do anything you want with all the data provided as parameters

    console.log(id);
    console.log(displayName);
    console.log(totalConfirmed);
    console.log(totalDeaths);
    console.log(totalRecovered);
    console.log(lastUpdated);
    console.log(lat);
    console.log(long);
    console.log(parentId);

}
