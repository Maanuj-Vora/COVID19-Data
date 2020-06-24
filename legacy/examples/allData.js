function startScript() {

    // Basically do anything you want before you get all the data

    getAllData();
}

function getAllData() {
    fetch("https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/currentData.json")
        .then(response => response.json())
        .then(data => {
            var id = [];
            var displayName = [];
            var totalConfirmed = [];
            var totalDeaths = [];
            var totalRecovered = [];
            var lastUpdated = [];
            var lat = [];
            var long = [];
            var parentId = [];

            id.push(data.id);
            displayName.push(data.displayName);
            totalConfirmed.push(data.totalConfirmed);
            totalDeaths.push(data.totalDeaths);
            totalRecovered.push(data.totalRecovered);
            lastUpdated.push(data.lastUpdated);
            lat.push(data.lat);
            long.push(data.long);
            parentId.push(data.parentId);

            for (y = 0; y < data["areas"].length; y++) {

                id.push(data["areas"][y].id);
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

                        id.push(data["areas"][y]["areas"][z].id);
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
