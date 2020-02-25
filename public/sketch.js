
/**
 * geo locate
 */
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition( async positon => {
        let lat, long, weather,air;
        try{
            console.log(positon);
            lat = positon.coords.latitude;
            long = positon.coords.longitude;

            document.getElementById("latitude").textContent = lat.toFixed(2);
            document.querySelector("#longitude").textContent = long.toFixed(2);
            /*
             * Call our custom endpoint in the server which acts as a proxy server to the dark sky API.
                Check server code index.js
            */
            const api_url = `weather/${lat},${long}`;
            //const api_url = `/weather`;
            const response = await fetch(api_url);
            const json = await response.json();
            console.log(json);

            weather = json.weather.currently;
            air = json.air_quality.results[0].measurements[0];
            //const city = json.air_quality.results[0].city;

            //summary and temperature element
            const summary = document.getElementById("summary");
            const temperature = document.getElementById("temperature");
            //adding the value from the api_url(which calls dark api) into the textcontent of the above elements
            summary.textContent = weather.summary;
            temperature.textContent = weather.temperature;

            document.getElementById('aq_parameter').textContent = air.parameter;
            document.getElementById('aq_value').textContent = air.value;
            document.getElementById('aq_units').textContent = air.unit;
            //document.getElementById('aq_city').textContent = city;
            document.getElementById('aq_date').textContent = air.lastUpdated;

            
        } catch(error){
            console.error(error);
            air = {value : -1};
            //console.log('Something went wrong');
        }
        const data = {lat, long, weather, air};
            const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                };
            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
            console.log(db_json);





    });
} else {
console.log("Geolocation Not Available");
}



        

 