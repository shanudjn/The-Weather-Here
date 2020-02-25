const mymap = L.map('checkinMap').setView([30, 30], 2);
const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const marker = L.marker([item.lat, item.long]).addTo(mymap);
        let txt = `I am sitting out here at ${item.lat}&deg;,${item.long}&deg; 
        on this ${item.weather.summary} day and it feels like ${item.weather.temperature}&deg; C outside.
        </br></br>`

        if(item.air.value < 0){
            txt += `No air quality information`;
        }
        else{   
            txt+= `The concentration of small carcinogenic particles(${item.air.parameter}) I'm breathing is in 
            ${item.air.value} ${item.air.unit}<!--measured from <span id="aq_city"></span>-->  on ${item.air.lastUpdated}.`;
        } 
        marker.bindPopup(txt);

        // const root = document.createElement('p');
        // const latitude = document.createElement('div');
        // const longitude = document.createElement('div');
        // const date = document.createElement('div');

        // latitude.textContent = `${item.lat}`;
        // longitude.textContent = `${item.long}`;
        // const dateString = new Date(item.timestamp).toLocaleString();
        // date.textContent = dateString;

        // root.append(latitude, longitude, date);
        // document.body.append(root);
        //document.body.append(document.createElement('br'));
    }

    console.log(data);

}