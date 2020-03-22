function startScript() {

    // Basically do anything you want before you get all the data

    getAllCountryData();
}

function getAllCountryData() {
    fetch("https://maanuj-vora.github.io/Bing-COVID-19-Current-Data/data.json")
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
