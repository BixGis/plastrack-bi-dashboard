// assets/js/charts.js
// -------------------------------------------------
// Chart.js visualisations for PlasTrack dashboard
// Generates 4 charts from satellite pass data:
//   1. Cloud percentage over time (line)
//   2. Sensor suitability over time (line)
//   3. Observations per island (bar)
//   4. Cloud condition distribution (doughnut)
// -------------------------------------------------

/**
 * Creates a <canvas> inside a chart-card wrapper and appends it to #charts.
 * @param {string} id    Unique id for the canvas element
 * @param {string} title Chart heading
 * @returns {HTMLCanvasElement}
 */
function createChartCanvas(id, title) {
  const wrapper = document.createElement('div');
  wrapper.className = 'chart-card';
  wrapper.innerHTML = `<h3 style="margin-bottom:0.5rem;color:#c9d1d9;">${title}</h3><canvas id="${id}"></canvas>`;
  document.getElementById('charts').appendChild(wrapper);
  return document.getElementById(id);
}

/**
 * Sorts data by date (ascending) and returns a shallow copy.
 * @param {Array<Object>} data
 * @returns {Array<Object>}
 */
function sortByDate(data) {
  return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Counts observations per island.
 * @param {Array<Object>} data
 * @returns {{labels: string[], values: number[]}}
 */
function countByIsland(data) {
  const map = {};
  data.forEach(r => { map[r.island] = (map[r.island] || 0) + 1; });
  return { labels: Object.keys(map), values: Object.values(map) };
}

/**
 * Bins cloud_percentage into three ranges.
 * @param {Array<Object>} data
 * @returns {{labels: string[], values: number[]}}
 */
function cloudBins(data) {
  const bins = { '0–20 %': 0, '21–50 %': 0, '51–100 %': 0 };
  data.forEach(r => {
    if (r.cloud_percentage <= 20) bins['0–20 %']++;
    else if (r.cloud_percentage <= 50) bins['21–50 %']++;
    else bins['51–100 %']++;
  });
  return { labels: Object.keys(bins), values: Object.values(bins) };
}

// ──────────────── Public API ────────────────

/**
 * Builds the four charts and returns their Chart instances.
 * @param {Array<Object>} data  Full (or filtered) dataset
 * @returns {Object}  { cloudChart, suitChart, islandChart, distChart }
 */
function initCharts(data) {
  const sorted = sortByDate(data);

  // 1️⃣ Cloud percentage – line
  const c1 = createChartCanvas('chart-cloud', 'Nubosidad (%) – Evolución temporal');
  const cloudChart = new Chart(c1, {
    type: 'line',
    data: {
      labels: sorted.map(r => r.date),
      datasets: [{
        label: 'Nubosidad (%)',
        data: sorted.map(r => r.cloud_percentage),
        borderColor: '#58a6ff',
        backgroundColor: 'rgba(88,166,255,0.15)',
        tension: 0.3,
        fill: true,
        pointRadius: 4
      }]
    },
    options: { responsive: true, plugins: { legend: { labels: { color: '#c9d1d9' } } },
      scales: { x: { ticks: { color: '#8b949e' } }, y: { ticks: { color: '#8b949e' }, beginAtZero: true } } }
  });

  // 2️⃣ Sensor suitability – line
  const c2 = createChartCanvas('chart-suit', 'Aptitud del sensor – Evolución temporal');
  const suitChart = new Chart(c2, {
    type: 'line',
    data: {
      labels: sorted.map(r => r.date),
      datasets: [{
        label: 'Aptitud del sensor',
        data: sorted.map(r => r.sensor_suitability),
        borderColor: '#3fb950',
        backgroundColor: 'rgba(63,185,80,0.15)',
        tension: 0.3,
        fill: true,
        pointRadius: 4
      }]
    },
    options: { responsive: true, plugins: { legend: { labels: { color: '#c9d1d9' } } },
      scales: { x: { ticks: { color: '#8b949e' } }, y: { ticks: { color: '#8b949e' }, beginAtZero: true } } }
  });

  // 3️⃣ Observations per island – bar
  const isl = countByIsland(data);
  const c3 = createChartCanvas('chart-island', 'Observaciones por isla');
  const islandChart = new Chart(c3, {
    type: 'bar',
    data: {
      labels: isl.labels,
      datasets: [{
        label: '# pasadas',
        data: isl.values,
        backgroundColor: ['#ff7b72', '#ffa657', '#79c0ff', '#d2a8ff']
      }]
    },
    options: { responsive: true, plugins: { legend: { labels: { color: '#c9d1d9' } } },
      scales: { x: { ticks: { color: '#8b949e' } }, y: { ticks: { color: '#8b949e' }, beginAtZero: true } } }
  });

  // 4️⃣ Cloud condition distribution – doughnut
  const bins = cloudBins(data);
  const c4 = createChartCanvas('chart-dist', 'Distribución de condiciones');
  const distChart = new Chart(c4, {
    type: 'doughnut',
    data: {
      labels: bins.labels,
      datasets: [{
        data: bins.values,
        backgroundColor: ['#3fb950', '#d29922', '#f85149']
      }]
    },
    options: { responsive: true, plugins: { legend: { labels: { color: '#c9d1d9' } } } }
  });

  return { cloudChart, suitChart, islandChart, distChart };
}

/**
 * Updates all four charts with a new (filtered) dataset.
 * @param {Object} charts  Object returned by initCharts
 * @param {Array<Object>} data
 */
function updateCharts(charts, data) {
  const sorted = sortByDate(data);

  // Line – cloud
  charts.cloudChart.data.labels = sorted.map(r => r.date);
  charts.cloudChart.data.datasets[0].data = sorted.map(r => r.cloud_percentage);
  charts.cloudChart.update();

  // Line – suitability
  charts.suitChart.data.labels = sorted.map(r => r.date);
  charts.suitChart.data.datasets[0].data = sorted.map(r => r.sensor_suitability);
  charts.suitChart.update();

  // Bar – island
  const isl = countByIsland(data);
  charts.islandChart.data.labels = isl.labels;
  charts.islandChart.data.datasets[0].data = isl.values;
  charts.islandChart.update();

  // Doughnut – distribution
  const bins = cloudBins(data);
  charts.distChart.data.labels = bins.labels;
  charts.distChart.data.datasets[0].data = bins.values;
  charts.distChart.update();
}

export { initCharts, updateCharts };

