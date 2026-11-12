// assets/js/app.js
// -------------------------------------------------
// Main entry point – orchestrates KPIs, map, charts & filters
// -------------------------------------------------

import { loadDataset, calculateKPIs, renderKPIs } from './kpis.js';
import { initMap, updateMap } from './map.js';
import { initCharts, updateCharts } from './charts.js';

/* ---------- Global state ---------- */
let fullData = [];       // original dataset
let filteredData = [];   // after applying filters
let charts = null;       // chart instances

/* ---------- UI helpers ---------- */
function populateSelect(id, values, placeholder) {
  const select = document.getElementById(id);
  select.innerHTML = `<option value="all">${placeholder}</option>`;
  [...new Set(values)].sort().forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    select.appendChild(opt);
  });
}

/* ---------- Filter handling ---------- */
function applyFilters() {
  const island = document.getElementById('filter-island').value;
  const satellite = document.getElementById('filter-satellite').value;
  const cloud = document.getElementById('filter-cloud').value;

  filteredData = fullData.filter(r => {
    const matchIsland = island === 'all' || r.island === island;
    const matchSat = satellite === 'all' || r.satellite === satellite;
    let matchCloud = true;
    if (cloud !== 'all') {
      const [min, max] = cloud.split('-').map(Number);
      matchCloud = r.cloud_percentage >= min && r.cloud_percentage <= max;
    }
    return matchIsland && matchSat && matchCloud;
  });

  // Update UI components
  renderKPIs(calculateKPIs(filteredData));
  updateMap(filteredData);
  updateCharts(charts, filteredData);
}

/* ---------- Init ---------------------------------------------------------------- */
async function init() {
  console.log('🚀 Initialising PlasTrack dashboard');
  try {
    // 1️⃣ Load dataset
    fullData = await loadDataset();
    filteredData = fullData; // initial view (no filters)

    // 2️⃣ Render KPIs
    renderKPIs(calculateKPIs(fullData));

    // 3️⃣ Initialise map
    initMap(fullData);

    // 4️⃣ Initialise charts
    charts = initCharts(fullData);

    // 5️⃣ Populate filter dropdowns
    populateSelect('filter-island', fullData.map(r => r.island), 'Todas las islas');
    populateSelect('filter-satellite', fullData.map(r => r.satellite), 'Todos los satélites');

    // 6️⃣ Attach event listeners
    document.getElementById('filter-island').addEventListener('change', applyFilters);
    document.getElementById('filter-satellite').addEventListener('change', applyFilters);
    document.getElementById('filter-cloud').addEventListener('change', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', () => {
      document.getElementById('filter-island').value = 'all';
      document.getElementById('filter-satellite').value = 'all';
      document.getElementById('filter-cloud').value = 'all';
      applyFilters();
    });

    // 7️⃣ Última actualización (fecha más reciente del dataset)
    const latest = fullData.reduce((a, b) => (a.date > b.date ? a : b)).date;
    document.getElementById('update-date').textContent = latest;

  } catch (e) {
    console.error('❗ Error al iniciar la aplicación:', e);
    const main = document.querySelector('main');
    main.innerHTML = `
      <div style="background:#161b22;border:1px solid #f85149;padding:1.5rem;border-radius:8px;text-align:center;margin-top:1rem;">
        <p style="color:#ff7b72;font-size:1.1rem;font-weight:bold;">❗ Error al inicializar PlasTrack</p>
        <p style="color:#8b949e;margin-top:0.5rem;font-family:monospace;">${e.message || e}</p>
      </div>`;
  }
}

/* ---------- Run ---------- */
init();

