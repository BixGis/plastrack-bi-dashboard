// assets/js/map.js
// -------------------------------------------------
// Leaflet map initialization and update for PlasTrack
// -------------------------------------------------

let map = null;
let markersGroup = null;
let heatLayer = null;

/**
 * Returns a colour based on cloud percentage.
 * @param {number} cloud
 * @returns {string}
 */
function getColor(cloud) {
  if (cloud <= 20) return '#3fb950'; // Verde: Condiciones óptimas
  if (cloud <= 50) return '#d29922'; // Amarillo/Naranja: Condiciones medias
  return '#f85149';                   // Rojo: Alta nubosidad / desfavorable
}

/**
 * Initialise the Leaflet map and render the initial dataset.
 * @param {Array<Object>} data
 */
function initMap(data) {
  if (typeof L === 'undefined') {
    console.error('Leaflet no está cargado.');
    return;
  }

  // Centro geográfico de las Islas Galápagos
  map = L.map('map').setView([-0.75, -90.5], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | PlasTrack BI',
    maxZoom: 18
  }).addTo(map);

  markersGroup = L.layerGroup().addTo(map);

  // Capa de calor con fallback defensivo si leaflet-heat está disponible
  if (typeof L.heatLayer === 'function') {
    heatLayer = L.heatLayer([], {
      radius: 28,
      blur: 18,
      maxZoom: 11,
      gradient: { 0.2: '#3fb950', 0.5: '#d29922', 0.8: '#f85149' }
    }).addTo(map);
  }

  // Leyenda técnica informativa
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info-legend');
    div.style.background = 'rgba(22, 27, 34, 0.92)';
    div.style.padding = '10px 14px';
    div.style.borderRadius = '8px';
    div.style.border = '1px solid #30363d';
    div.style.color = '#c9d1d9';
    div.style.fontSize = '12px';
    div.style.lineHeight = '18px';
    div.innerHTML = `
      <div style="font-weight:bold;margin-bottom:6px;color:#58a6ff;border-bottom:1px solid #30363d;padding-bottom:3px;">Niveles de Nubosidad</div>
      <div style="display:flex;align-items:center;margin-bottom:3px;"><span style="background:#3fb950;width:11px;height:11px;display:inline-block;border-radius:50%;margin-right:7px;"></span>0 - 20% (Óptima)</div>
      <div style="display:flex;align-items:center;margin-bottom:3px;"><span style="background:#d29922;width:11px;height:11px;display:inline-block;border-radius:50%;margin-right:7px;"></span>21 - 50% (Aceptable)</div>
      <div style="display:flex;align-items:center;"><span style="background:#f85149;width:11px;height:11px;display:inline-block;border-radius:50%;margin-right:7px;"></span>51 - 100% (Crítica)</div>
    `;
    return div;
  };
  legend.addTo(map);

  renderMap(data);
}

/** Render markers and heat points for the supplied data */
function renderMap(data) {
  if (!map || !markersGroup) return;

  markersGroup.clearLayers();
  const heatPoints = [];

  data.forEach(rec => {
    const color = getColor(rec.cloud_percentage);
    const marker = L.circleMarker([rec.latitude, rec.longitude], {
      radius: 9,
      fillColor: color,
      color: '#ffffff',
      weight: 1.5,
      opacity: 0.9,
      fillOpacity: 0.85
    }).bindPopup(`
      <div style="font-family:sans-serif;color:#1f2328;min-width:180px;">
        <h4 style="margin:0 0 6px 0;color:#0969da;border-bottom:1px solid #d0d7de;padding-bottom:3px;">${rec.id} &bull; ${rec.satellite}</h4>
        <p style="margin:3px 0;"><b>Sensor:</b> ${rec.sensor}</p>
        <p style="margin:3px 0;"><b>Fecha:</b> ${rec.date}</p>
        <p style="margin:3px 0;"><b>Isla:</b> ${rec.island}</p>
        <p style="margin:3px 0;"><b>Nubosidad:</b> ${rec.cloud_percentage}%</p>
        <p style="margin:3px 0;"><b>Aptitud del sensor:</b> ${rec.sensor_suitability}/100</p>
        <p style="margin:3px 0;"><b>Área observada:</b> ${rec.observation_area}</p>
        <p style="margin:3px 0;"><b>Estado:</b> <span style="text-transform:uppercase;font-weight:bold;color:${rec.status === 'valid' ? '#1a7f37' : '#9a6700'}">${rec.status}</span></p>
      </div>
    `);
    marker.addTo(markersGroup);
    heatPoints.push([rec.latitude, rec.longitude, rec.cloud_percentage / 100]);
  });

  if (heatLayer && typeof heatLayer.setLatLngs === 'function') {
    heatLayer.setLatLngs(heatPoints);
  }
}

/** Update the map when filters change */
function updateMap(data) {
  renderMap(data);
}

export { initMap, updateMap };

