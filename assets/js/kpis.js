// assets/js/kpis.js
// -------------------------------------------------
// Calculates and renders KPI cards for the PlasTrack dashboard
// -------------------------------------------------

/**
 * Fetches the Copernicus JSON dataset.
 * @returns {Promise<Array<Object>>}
 */
async function loadDataset() {
  const paths = [
    './data/data_copernicus_sample.json',
    'data/data_copernicus_sample.json',
    '../data/data_copernicus_sample.json'
  ];

  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      // Intentar con la siguiente ruta
    }
  }

  throw new Error('No se pudo cargar el dataset desde ninguna de las rutas relativas');
}

/**
 * Calculates KPI values from the dataset.
 * @param {Array<Object>} data
 * @returns {Object} KPI dictionary
 */
function calculateKPIs(data) {
  const total = data.length;
  const avgCloud = total > 0 ? (data.reduce((s, r) => s + r.cloud_percentage, 0) / total).toFixed(1) : '0.0';
  const avgSuit = total > 0 ? (data.reduce((s, r) => s + r.sensor_suitability, 0) / total).toFixed(1) : '0.0';
  const islands = new Set(data.map(r => r.island)).size;
  const favorable = data.filter(r => r.cloud_percentage <= 20 && r.sensor_suitability >= 80).length;
  return {
    totalPasses: { label: 'Pasadas satelitales', value: total, unit: '', icon: '🛰️' },
    avgCloud: { label: 'Nubosidad promedio', value: avgCloud, unit: '%', icon: '☁️' },
    avgSuit: { label: 'Aptitud promedio', value: avgSuit, unit: '/100', icon: '📡' },
    islandsMonitored: { label: 'Islas monitoreadas', value: islands, unit: '', icon: '🏝️' },
    favorablePasses: { label: 'Pasadas favorables', value: favorable, unit: '', icon: '✅' }
  };
}

/**
 * Renders KPI cards inside the #kpis container.
 * @param {Object} kpis
 */
function renderKPIs(kpis) {
  const container = document.getElementById('kpis');
  container.innerHTML = '';
  Object.values(kpis).forEach(kpi => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="icon">${kpi.icon}</div>
      <div class="value">${kpi.value}${kpi.unit}</div>
      <div class="label">${kpi.label}</div>
    `;
    container.appendChild(card);
  });
}

// Exported for app.js
export { loadDataset, calculateKPIs, renderKPIs };

