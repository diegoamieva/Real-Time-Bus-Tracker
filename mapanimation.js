var busMarkers = [];
const colorMarkers = ['#3498DB ','#27AE60'];

mapboxgl.accessToken = 'pk.eyJ1IjoiZGllZ29hOTciLCJhIjoiY2w2bzB6MXF3MDZhNDNkcjMxcjk2dGZneCJ9.mrAq1uWFk0xERPcLcFBzAA';
  
  // This is the map instance
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
  });
  
  
async function run(){
    // get bus data    
	const locations = await getBusLocations();
    locations.forEach((bus,i) => {
        var marker = new mapboxgl.Marker()
        .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
        .setPopup(new mapboxgl.Popup({offset: 25, closeOnClick: false, closeButton: false}).setHTML(`<h3>Bus ID <br>
		${bus.attributes.label}</h3>`))
        .addTo(map)
        
        busMarkers.push(marker)

    });

    function deleteMarker(){
		if (busMarkers!==null) {
		for (var i = busMarkers.length - 1; i >= 0; i--) {
		busMarkers[i].remove();
		}
	}
	}

	// timer
    setTimeout(deleteMarker, 15000);
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();

  