// assets/js/map.js
// -------------------------------------------------
// Leaflet map initialization and update for PlasTrack
// -------------------------------------------------

let map;
let markersGroup;
let heatLayer;

/**
 * Returns a colour based on cloud percentage.
 * @param {number} cloud
 * @returns {string}
 */
function getColor(cloud) {
  if (cloud <= 20) return 'green';
  if (cloud <= 50) return 'orange';
  return 'red';
}

/**
 * Initialise the Leaflet map and render the initial dataset.
 * @param {Array<Object>} data
 */
function initMap(data) {
  // centre of Galápagos archipelago
  map = L.map('map').setView([-0.75, -90.5], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  markersGroup = L.layerGroup().addTo(map);
  // heat layer expects [lat, lng, intensity]
  heatLayer = L.heatLayer([], { radius: 25, blur: 15, maxZoom: 10 }).addTo(map);

  renderMap(data);
}

/** Render markers and heat points for the supplied data */
function renderMap(data) {
  markersGroup.clearLayers();
  const heatPoints = [];

  data.forEach(rec => {
    const color = getColor(rec.cloud_percentage);
    const marker = L.circleMarker([rec.latitude, rec.longitude], {
      radius: 8,
      color,
      fillOpacity: 0.8
    }).bindPopup(`
      <b>ID:</b> ${rec.id}<br/>
      <b>Satélite:</b> ${rec.satellite}<br/>
      <b>Sensor:</b> ${rec.sensor}<br/>
      <b>Fecha:</b> ${rec.date}<br/>
      <b>Isla:</b> ${rec.island}<br/>
      <b>Nubosidad:</b> ${rec.cloud_percentage}%<br/>
      <b>Aptitud:</b> ${rec.sensor_suitability}
    `);
    marker.addTo(markersGroup);
    // intensity normalised 0‑1
    heatPoints.push([rec.latitude, rec.longitude, rec.cloud_percentage / 100]);
  });

  heatLayer.setLatLngs(heatPoints);
}

/** Update the map when filters change */
function updateMap(data) {
  renderMap(data);
}

export { initMap, updateMap };

