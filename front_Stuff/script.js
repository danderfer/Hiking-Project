let map;
let startMarker;
let destinationMarker;
let start;
let end;

async function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.0522, lng: -118.2437 }, // Default center (Los Angeles)
        zoom: 12, // Default zoom level
    });

    google.maps.event.addListener(map, 'click', function(event) {
        if (!startMarker) {
            start = event.latLng;
            startMarker = placeMarker(event.latLng); // Place start marker
        } else if (!destinationMarker) {
            end = event.latLng;
            destinationMarker = placeMarker(event.latLng); // Place destination marker
        } else {
            // If both start and destination markers are set, remove all markers and reset
            clearMarkers();
            start = event.latLng;
            startMarker = placeMarker(event.latLng); // Place start marker
        }
    });
}

function placeMarker(location) {
    // Create a marker
    let marker = new google.maps.marker.AdvancedMarkerElement({
        position: location,
        map: map
    });

    // Get coordinates and display them
    let lat = location.lat();
    let lng = location.lng();
    return marker;
}

function clearMarkers() {
    if (startMarker) {
        startMarker.setMap(null);
        startMarker = null;
        start = null;
    }
    if (destinationMarker) {
        destinationMarker.setMap(null);
        destinationMarker = null;
        end = null;
    }
}

function calculateRoute() {
    // Fetch start and end points, walking speed from input fields
    const startPoint = start;
    const endPoint = end;
    const walkingSpeed = document.getElementById("sliderValue").value;
    calculateRoute(startPoint,endPoint,walkingSpeed);

   
}

function calculateRoute(start, end, speed) {
    const directionsService = new google.maps.DirectionsService();
    const request = {
        origin: start, // Get start position
        destination: end, // Get destination position
        travelMode: google.maps.TravelMode.WALKING, // Specify travel mode
    };

    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            const route = response.routes[0]; // Get the first route
            const duration = route.legs[0].duration.text; // Get duration of the route
            const distance = route.legs[0].distance.text; // Get distance of the route

            // Calculate estimated time based on walking speed
            const estimatedTime = (parseFloat(distance) / speed).toFixed(1); // in hours

            // Display route information
            document.getElementById("speed").innerHTML = speed;
            document.getElementById("miles").innerHTML = distance;
            document.getElementById("time").innerHTML = duration;

            // Display route on map
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(response);
        } else {
            alert("Error: " + status); // Display error message if route calculation fails
        }
    });
}


function updateValue(value) {
    document.getElementById("sliderValue").innerText = value; // Update span text with slider value
  }