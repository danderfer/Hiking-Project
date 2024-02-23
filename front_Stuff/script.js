let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.0522, lng: -118.2437 }, // Default center (Los Angeles)
        zoom: 12, // Default zoom level
    });
}

function calculateRoute() {
    // Fetch start and end points, walking speed from input fields
    const startPoint = document.getElementById("startPoint").value;
    const endPoint = document.getElementById("endPoint").value;
    const walkingSpeed = document.getElementById("walkingSpeed").value;

    // Call backend API to calculate route based on inputs
    // (This part should be implemented in the backend)
    fetch(`/calculate-route?start=${startPoint}&end=${endPoint}&speed=${walkingSpeed}`)
        .then(response => response.json())
        .then(data => {
            // Handle response data and display route on map
        })
        .catch(error => console.error("Error:", error));
}
