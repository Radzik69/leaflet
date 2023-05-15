var map = L.map('map').setView([52.19573619983883, 21.45132551542424], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const szkola = L.marker([52.18669636428679, 21.571630424686333]).addTo(map).bindPopup("SZKOLA");

map.on("click", addMarker);

var idk = null;
var line = null;

function addMarker(e) {
    idk = e;
    console.log(e.latlng);
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

    var tab = [
        [szkola.getLatLng().lat, szkola.getLatLng().lng],
        [e.latlng.lat, e.latlng.lng]
    ];

    
    line = L.polyline(tab).addTo(map);
    updateDistance(); // Aktualizuj wyświetlany dystans
}

var lat1 = 52.18669636428679;
var lon1 = 21.571630424686333;

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371; // Średni promień Ziemi w kilometrach

    // Zamiana stopni na radiany
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    // Różnice pomiędzy współrzędnymi
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    // Obliczanie odległości przy użyciu wzoru Haversine
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function updateDistance() {
    if (idk) {
        const distance = calculateDistance(lat1, lon1, idk.latlng.lat, idk.latlng.lng);
        console.log(distance); // Wyświetli obliczoną odległość w kilometrach
        line.bindPopup(`Distance: ${distance.toFixed(2)} km`); // Aktualizuj treść dymku z dystansem
    }
}

for(let i=0;i<=woje.features.length-1;i++){
    L.geoJSON(woje.features[i]).addTo(map)
}