# Bitácora de Prompts e Intervenciones con IA Generativa — PlasTrack

Esta bitácora documenta de manera transparente y verificable el uso de Inteligencia Artificial Generativa durante el ciclo de vida del proyecto **PlasTrack** (Unidad 1 - Inteligencia de Negocios).

---

## Registro Sistemático de Intervenciones

### Intervención 1: Definición de la Identidad y Especificaciones
- **Fecha:** 11 de noviembre de 2026
- **Herramienta:** Asistente IA (ChatGPT / Antigravity)
- **Objetivo:** Definir la estructura base del dashboard BI, paleta cromática científica oscura y selección inicial de tecnologías de visualización.
- **Prompt:**
  > *"Diseña una arquitectura de Business Intelligence estática para monitorear pasadas satelitales de Copernicus sobre Galápagos. Debe usar HTML5, CSS3, JavaScript nativo, Leaflet.js y Chart.js sin requerir backend ni frameworks de compilación."*
- **Resultado generado:** Estructura modular del proyecto con carpetas `assets/`, `data/` y `docs/`, junto con la matriz inicial de benchmarking.
- **Validación:** Se comprobó que el enfoque cumplía con las restricciones de GitHub Pages.

---

### Intervención 2: Creación del Dataset de Control
- **Fecha:** 11 de noviembre de 2026
- **Herramienta:** Asistente IA
- **Objetivo:** Generar 15 registros simulados coherentes con las misiones Sentinel-2 y Landsat sobre Galápagos.
- **Prompt:**
  > *"Genera un archivo data_copernicus_sample.json con exactamente 15 registros simulados de pasadas satelitales en Galápagos. Incluye coordenadas reales de las islas, fecha, porcentaje de nubosidad, aptitud del sensor, área observada y plataforma."*
- **Resultado generado:** Dataset JSON con coordenadas válidas de Isabela, Santa Cruz, San Cristóbal, Fernandina, etc., con fechas ordenadas cronológicamente.
- **Validación:** Verificado mediante script Node.js (`JSON.parse` y validación de tipos).

---

### Intervención 3: Corrección Crítica de Carga y Resiliencia Offline
- **Fecha:** 11 de noviembre de 2026
- **Herramienta:** Antigravity (Claude / Gemini)
- **Objetivo:** Resolver el error *"❗ Error al cargar los datos. Verifica la consola del navegador"* y adaptar la interfaz a la referencia ejecutiva de alta fidelidad.
- **Prompt:**
  > *"El dashboard presenta fallo de carga en GitHub Pages debido a restricciones de fetch y errores de SRI. Reorganiza el código para que sea 100% funcional, implementa fallback de datos embebidos, mapa satelital Esri con capas de acumulación y panel del analista con correlación de Pearson."*
- **Resultado generado:** 
  1. Adición de `assets/js/fallback-data.js` para asegurar disponibilidad 100% libre de fallos de red.
  2. Implementación de `assets/js/analytics.js` con pruebas unitarias (`tests/analytics.test.mjs`).
  3. Integración de teselas de satélite Esri World Imagery en `assets/js/map.js`.
  4. Adición de archivo `.nojekyll` para evitar bloqueos en GitHub Pages.
- **Validación:** Ejecución de 12 pruebas unitarias automatizadas (`12 pass, 0 fail`).

---

### Intervención 4: Elaboración de Documentos Técnicos para la Rúbrica
- **Fecha:** 11 de noviembre de 2026
- **Herramienta:** Antigravity
- **Objetivo:** Elaborar el paper académico (`reporte_tecnico.md`), ficha técnica de KPIs, arquitectura, bitácora y banco de 20 preguntas docentes para alcanzar el nivel Excelente (100%).
- **Prompt:**
  > *"Genera la documentación académica rigurosa para el proyecto PlasTrack: Ficha de KPIs con fórmulas LaTeX, documento de arquitectura con diagrama Mermaid y balotario de 20 preguntas técnicas con respuestas justificadas."*
- **Resultado generado:** Conjunto documental completo en formato Markdown y enlaces a los documentos consolidados en PDF/DOCX.
- **Validación:** Revisión contra los criterios de evaluación de la Unidad 1.
