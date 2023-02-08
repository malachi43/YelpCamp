

mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom


});

new mapboxgl.Marker({ color: 'black' })
    .setLngLat(coordinates)
    .addTo(map);