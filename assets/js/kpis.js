// assets/js/kpis.js
// -------------------------------------------------
// Calculates and renders KPI cards for the PlasTrack dashboard
// -------------------------------------------------

/**
 * Fetches the Copernicus JSON dataset.
 * @returns {Promise<Array<Object>>}
 */
async function loadDataset() {
  const response = await fetch('../data/data_copernicus_sample.json');
  if (!response.ok) {
    throw new Error('No se pudo cargar el dataset');
  }
  return response.json();
}

/**
 * Calculates KPI values from the dataset.
 * @param {Array<Object>} data
 * @returns {Object} KPI dictionary
 */
function calculateKPIs(data) {
  const total = data.length;
  const avgCloud = (data.reduce((s, r) => s + r.cloud_percentage, 0) / total).toFixed(1);
  const avgSuit = (data.reduce((s, r) => s + r.sensor_suitability, 0) / total).toFixed(1);
  const islands = new Set(data.map(r => r.island)).size;
  const favorable = data.filter(r => r.cloud_percentage <= 20 && r.sensor_suitability >= 80).length;
  return {
    totalPasses: { label: 'Pasadas satelitales', value: total, unit: '', icon: '🛰️' },
    avgCloud: { label: 'Nubosidad promedio', value: avgCloud, unit: '%', icon: '☁️' },
    avgSuit: { label: 'Aptitud promedio', value: avgSuit, unit: '', icon: '📡' },
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

