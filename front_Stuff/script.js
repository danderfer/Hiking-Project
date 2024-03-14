let map;
let startMarker;
let destinationMarker;

async function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.0522, lng: -118.2437 }, // Default center (Los Angeles)
        zoom: 12, // Default zoom level
    });

    google.maps.event.addListener(map, 'click', function(event) {
        if (!startMarker) {
            startMarker = placeMarker(event.latLng); // Place start marker
        } else if (!destinationMarker) {
            destinationMarker = placeMarker(event.latLng); // Place destination marker
        } else {
            // If both start and destination markers are set, remove all markers and reset
            clearMarkers();
            startMarker = placeMarker(event.latLng); // Place start marker
        }
    });
}

function placeMarker(location) {
    // Create a marker
    let marker = new google.maps.Marker({
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
    }
    if (destinationMarker) {
        destinationMarker.setMap(null);
        destinationMarker = null;
    }
}

function calculateRoute() {
    // Fetch start and end points, walking speed from input fields
    const startPoint = document.getElementById("startPoint").value;
    const endPoint = document.getElementById("endPoint").value;
    const walkingSpeed = document.getElementById("walkingSpeed").value;
    calculateRoute(startPoint,endPoint,walkingSpeed);

   
}

function calculateRoute(start, end, speed) {
    // Implement route calculation logic here

    // (This is just a placeholder)
    return {
        start,
        end,
        speed,
        route: "Sample route data"
    };
}

const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');

    slider.addEventListener('input', function() {
        sliderValue.textContent = this.value;
    });

    // Additional event listener for 'change' event because firefox
    slider.addEventListener('change', function() {
        sliderValue.textContent = this.value;
    });