# Benchmarking de Herramientas de Business Intelligence y Librerías Web

## 1. Herramientas comerciales de Business Intelligence

| Herramienta | Representación de mapas geoespaciales | Generación de mapas de calor | Integración con JSON/CSV | Integración con Copernicus | Facilidad de implementación | Personalización visual | Rendimiento en navegadores | Diseño adaptable (responsive) | Costos de licenciamiento | Escalabilidad | Ventajas | Desventajas | Limitaciones técnicas |
|-------------|----------------------------------------|-----------------------------|--------------------------|---------------------------|-----------------------------|------------------------|----------------------------|------------------------------|--------------------------|---------------|----------|-------------|-----------------------|
| **Microsoft Power BI** | ✅ (via ArcGIS Maps, mapas integrados) | ✅ (visualizaciones de densidad) | ✅ (importa CSV/JSON mediante Power Query) | ❌ (no hay conector nativo, requiere pasos manuales) | 🟢 Muy fácil (interfaz drag‑and‑drop) | 🎨 Buena (temas, colores) | ⚡️ Alto (optimizado en la nube) | 📱 Sí (dashboard responsive) | **Licencia**: gratuito con limitaciones; Pro: $9.99/mes por usuario; Premium: desde $20/mes por capacidad. | 🔼 Alta (servicio en la nube) | Integración con Microsoft ecosystem; amplio soporte. | Necesita suscripción para publicar; limitaciones en versión gratuita. | Dependencia de la nube; no funciona offline sin Power BI Desktop.
| **Google Looker Studio** (antes Data Studio) | ✅ (Google Maps, capas GeoJSON) | ✅ (capas de calor mediante GeoJSON) | ✅ (conexión a archivos CSV/JSON vía Cloud Storage) | ❌ (no hay conector nativo a Copernicus, requiere ETL externo) | 🟢 Muy fácil (basado en navegador) | 🎨 Media (personalización mediante CSS limitada) | ⚡️ Medio (renderiza en navegador) | 📱 Sí (diseños adaptables) | **Gratuito** (sin límite de usuarios, con límites de cuota); Enterprise disponible bajo contrato. | 🔼 Alta (Google Cloud infraestructura) | Sin coste en la mayoría de casos; integración con Google services. | Menos opciones avanzadas de visualización comparado con Power BI. | Requiere datos en fuentes compatibles (Google Sheets, BigQuery, etc.). |

## 2. Librerías web de visualización

| Librería | Representación de mapas geoespaciales | Generación de mapas de calor | Integración con JSON/CSV | Integración con Copernicus | Facilidad de implementación | Personalización visual | Rendimiento en navegadores | Diseño adaptable (responsive) | Costos de licenciamiento | Escalabilidad | Ventajas | Desventajas | Limitaciones técnicas |
|----------|----------------------------------------|-----------------------------|--------------------------|---------------------------|-----------------------------|------------------------|----------------------------|------------------------------|--------------------------|---------------|----------|-------------|-----------------------|
| **Leaflet.js** | ✅ (biblioteca dedicada a mapas) | ✅ (plugins como Leaflet.heat) | ✅ (fetch JSON, parsing) | ✅ (puede cargar datos de Copernicus en GeoJSON) | 🟢 Muy fácil (API ligera) | 🎨 Muy alta (tiles, estilos, marcadores personalizados) | ⚡️ Alto (≈ 39 KB gzipped) | 📱 Nativo (tiles responsivos) | **Libre** (MIT) | 🔼 Alta (se pueden añadir capas dinámicas) | Ligera, gran comunidad, extensible con plugins. | No incluye datos base; depende de proveedores de tiles. | Necesita servidor para servir archivos estáticos (GitHub Pages funciona). |
| **Chart.js** | ❌ (no es mapa) | ❌ (no es mapa) | ✅ (datasets JSON/CSV) | ✅ (visualiza métricas de Copernicus) | 🟢 Fácil (configuración JSON) | 🎨 Alta (temas, colores, estilos) | ⚡️ Alto (≈ 70 KB gzipped) | 📱 Responsive por defecto | **Libre** (MIT) | 🔼 Alta (muchas series) | Gráficos interactivos, fácil de usar. | No maneja coordenadas geográficas directamente. | No soporta mapas, requiere combinar con Leaflet para mapas. |
| **JavaScript/HTML5/CSS3** | ✅ (con Leaflet) | ✅ (con Leaflet.heat) | ✅ (fetch) | ✅ (cualquier JSON) | 🟢 Muy fácil (no requiere compilación) | 🎨 Total (control total de UI) | ⚡️ Muy alto (solo código estático) | 📱 100 % (media queries) | **Libre** | 🔼 Muy alta (cualquier número de usuarios) | Máxima flexibilidad, sin costes de licencia. | Necesita desarrollo manual; mayor carga cognitiva. | Depende de la calidad del código; sin componentes listos‑para‑usar.

## 3. Elección de arquitectura para **PlasTrack**

### Requisitos clave
- **Sitio estático** (compatible con GitHub Pages). 
- **Visualización geoespacial** (mapa de Galápagos). 
- **Gráficos dinámicos** basados en datos JSON. 
- **Sin costes de licencia** para un prototipo académico. 
- **Fácil implementación y mantenimiento** por estudiantes.

### Evaluación de opciones
| Opción | Descripción | Cumple requisitos | Comentario |
|-------|-------------|-------------------|-----------|
| **Power BI / Looker Studio** | Plataformas SaaS con conectores, pero requieren suscripción o importación a la nube. | ❌ (no funciona como sitio estático, necesita backend o suscripción) | No apto para GitHub Pages. |
| **Leaflet + Chart.js + HTML/JS** | Arquitectura 100 % cliente: HTML + CSS + JavaScript consumen `data_copernicus_sample.json`. | ✅ (cumple perfectamente) | Requiere únicamente archivos estáticos; licencia MIT/Apache; sin coste. |
| **Frameworks (React, Vue, Angular)** | Necesitan proceso de compilación, bundling y a veces servidor para despliegue. | ❌ (complican el proyecto, no permitidos por la regla de “sin compilación”). |
| **D3.js** | Poderosa pero más compleja que Chart.js; no ofrece mapa integrado. | ✅ (pero añade complejidad) | No necesario para los requerimientos actuales. |

### Decisión final
**Se adoptará la arquitectura basada en HTML5, CSS3, JavaScript puro, Leaflet.js y Chart.js**.  Esta solución:
- Es **totalmente estática** → GitHub Pages.
- Permite **mapas interactivos** y **gráficos** sin dependencias de servidor.
- No implica **costes de licencia**.
- Es **educativa**: los estudiantes trabajan directamente con tecnologías web fundamentales.
- Facilita **personalización** y **expansión futura** (p.ej., añadir más gráficos o filtros). 

---

## 4. Próximos pasos después del benchmarking
1. **Crear el dataset JSON** con 15 registros simulados (Fase 4).  
2. **Desarrollar los componentes** del dashboard (KPIs, mapa, gráficos) (Fase 5).  
3. **Integrar y probar** la funcionalidad (Fase 6).  
4. **Redactar el reporte técnico** (Fase 7) y demás documentos.  
5. **Publicar en GitHub Pages** y validar (Fase 10).

---

*Este documento se ha generado basándose en la documentación oficial y fuentes públicas de cada herramienta. No se inventan precios ni funcionalidades inexistentes.*

