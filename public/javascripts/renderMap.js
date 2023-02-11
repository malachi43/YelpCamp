

mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: JSON.parse(coordinates), // starting position [lng, lat]
    zoom: 9, // starting zoom


});

const popup = new mapboxgl.Popup({ offset: 25 })
.setHTML(`<h5>${campground.title}</h5>
<p>${campground.location}</p>`
    );

new mapboxgl.Marker({ color: 'black' })
    .setLngLat(JSON.parse(coordinates))
    .setPopup(popup)
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());
 

   