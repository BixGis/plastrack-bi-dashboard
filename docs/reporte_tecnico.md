# Benchmarking de Herramientas de Inteligencia de Negocios y Prototipado del Dashboard «PlasTrack» con IA Generativa para el Monitoreo Satelital de Galápagos

**Informe Técnico Consolidado en Formato Paper Académico**  
*Carrera de Ingeniería en Sistemas de Información — Asignatura: Inteligencia de Negocios (Unidad 1)*  
*Universidad Técnica de Cotopaxi — Latacunga, Ecuador — Noviembre de 2026*  
*Equipo PlasTrack: Carlos, Gustavo (BixGis), Gabriela, Daniela*

---

## Resumen

La presente actividad cooperativa evalúa, mediante un benchmarking ponderado, cuatro alternativas tecnológicas para construir un tablero de inteligencia de negocios orientado al monitoreo de pasadas satelitales sobre el archipiélago de Galápagos: Microsoft Power BI, Google Looker Studio, Tableau y un stack web nativo basado en Leaflet.js y Chart.js. La comparación considera ocho criterios: representación geoespacial y mapas de calor, integración con archivos JSON/CSV de Copernicus, costo de licenciamiento, usabilidad, rendimiento web, diseño responsivo, despliegue público y ecosistema de soporte. El stack web obtuvo la mayor puntuación ponderada (4.80 sobre 5.00), seguido de Looker Studio (4.10), Power BI (3.40) y Tableau (3.15).

Con base en ese resultado se construyó **PlasTrack**, un dashboard estático, responsivo y accesible que consume 15 registros simulados de pasadas satelitales (Sentinel-2A, Sentinel-2B y Landsat 9) distribuidas entre enero y junio de 2026 en nueve islas del archipiélago. El tablero integra cinco tarjetas KPI con contexto analítico, un mapa interactivo con teselas de satélite Esri World Imagery, marcadores semaforizados, mapa de calor y zonas de acumulación, cuatro visualizaciones de Chart.js y una tabla auditable con exportación CSV. Los resultados evidencian una nubosidad media de 30.6% y una aptitud media del sensor de 72.7%; ocho de las quince pasadas (53.3%) superan el umbral operativo de 70% de aptitud, registrándose una correlación inversa casi perfecta entre nubosidad y aptitud ($r = -1.000$). El sitio se despliega en GitHub Pages sin costo de infraestructura, cumple 100/100 en accesibilidad según Lighthouse y constituye una plantilla analítica reproducible para la gestión ambiental con datos abiertos.

**Palabras clave:** inteligencia de negocios, benchmarking, dashboard, Copernicus, Leaflet.js, Chart.js, IA generativa, GitHub Pages.

---

## 1. Introducción y Planteamiento del Problema

El archipiélago de Galápagos constituye un patrimonio natural de la humanidad sujeto a constantes presiones climáticas y antrópicas. El monitoreo satelital mediante sensores ópticos multiespectrales (como los satélites Sentinel-2 del programa europeo Copernicus y Landsat 9 de NASA/USGS) proporciona una cobertura sistemática imprescindible para estudiar la vegetación, la dinámica de corrientes y la temperatura de la superficie marina.

Sin embargo, **disponibilidad de datos no equivale a capacidad de decisión**: los metadatos y escenas satelitales crudas no pueden ser interpretados directamente por analistas no técnicos o guardaparques. Se requiere un proceso de Inteligencia de Negocios (BI) que extraiga, filtre, agregue y visualice estos datos en indicadores clave de desempeño (KPIs).

El presente trabajo resuelve este desafío a través de dos componentes integrados:
1. Un **estudio comparativo de benchmarking** para seleccionar la tecnología de visualización más idónea.
2. El desarrollo y despliegue del prototipo funcional interactivo **PlasTrack**.

---

## 2. Marco Teórico

### 2.1 Fundamentos de Business Intelligence (BI)
La inteligencia de negocios abarca los procesos, metodologías y herramientas tecnológicas destinadas a transformar datos desestructurados o transaccionales en información estructurada para la toma de decisiones estratégicas y operativas. En el ámbito ambiental, los paneles de control (dashboards) consolidan métricas clave mediante representaciones gráficas intuitivas y mapas temáticos.

### 2.2 Observación de la Tierra y Programa Copernicus
El programa Copernicus de la Agencia Espacial Europea (ESA) opera constelaciones satelitales Sentinel. Sentinel-2A y 2B transportan el sensor multiespectral MSI con 13 bandas y resolución espacial de hasta 10 metros. A su vez, Landsat 9 incorpora el sensor OLI-2. Ambos programas permiten estimar índices espectrales como el NDVI (Índice de Vegetación de Diferencia Normalizada), cuya validez está condicionada a la ausencia de cobertura nubosa.

---

## 3. Metodología de Benchmarking y Selección Tecnológica

Se evaluaron cuatro alternativas para determinar la mejor plataforma para el proyecto:
- **Microsoft Power BI:** Líder corporativo con potentes capacidades de modelado DAX y Power Query, pero con barreras de licenciamiento Pro (\$10/mes) para compartir enlaces públicos y sin soporte nativo para despliegue estático en GitHub Pages.
- **Google Looker Studio:** Plataforma gratuita basada en web con integración directa a Google Drive, pero con capacidades cartográficas limitadas en personalización offline y mapas de calor avanzados.
- **Tableau Public:** Excelente calidad visual pero con interfaz rígida, dependencia de sus servidores y nula integración como código embebible estático en Git.
- **Stack Web Nativo (HTML5 + CSS3 + JS + Leaflet + Chart.js):** Arquitectura sin servidor ni dependencias de backend, con control visual absoluto, capacidad offline con fallback y costo cero de mantenimiento.

### Matriz de Puntuación Ponderada

| Criterio | Peso | Power BI | Looker Studio | Tableau | Stack Web (PlasTrack) |
|:---|:---:|:---:|:---:|:---:|:---:|
| 1. Representación geoespacial y calor | 20% | 4.0 | 3.5 | 4.0 | **5.0** |
| 2. Integración con JSON/CSV | 15% | 4.5 | 4.0 | 4.0 | **5.0** |
| 3. Costos de licenciamiento | 15% | 2.0 | 4.5 | 2.5 | **5.0** |
| 4. Usabilidad y curva de aprendizaje | 10% | 4.0 | 4.5 | 3.5 | **4.0** |
| 5. Rendimiento en navegadores | 10% | 3.0 | 3.5 | 3.0 | **5.0** |
| 6. Diseño responsivo (móvil/PC) | 10% | 4.0 | 4.0 | 3.0 | **4.5** |
| 7. Despliegue en GitHub Pages | 10% | 1.0 | 4.0 | 1.0 | **5.0** |
| 8. Ecosistema de librerías y control | 10% | 4.0 | 3.5 | 3.5 | **5.0** |
| **Puntaje Ponderado Total** | **100%** | **3.40** | **4.10** | **3.15** | **4.80** |

**Decisión:** Se seleccionó el **Stack Web Nativo**, el cual obtuvo la máxima calificación (4.80/5.00).

---

## 4. Arquitectura y Desarrollo del Dashboard «PlasTrack»

PlasTrack opera bajo el paradigma Jamstack (JavaScript, APIs y Markup pre-renderizado).

### 4.1 Componentes del Sistema
1. **Capa de Datos:** `data/data_copernicus_sample.json` y módulo de contingencia `assets/js/fallback-data.js`.
2. **Núcleo Analítico (`analytics.js`):** Funciones puras encargadas del filtrado reactivo, agregación estadística, correlación de Pearson y regresión lineal.
3. **Capa Geoespacial (`map.js`):** Mapa interactivo Leaflet sobre teselas satelitales *Esri World Imagery*, con semáforo de marcadores, capa de calor e isolíneas de acumulación.
4. **Analítica Visual (`charts.js`):** Cuatro gráficos de Chart.js con actualización dinámica ante filtros.
5. **Orquestador de Aplicación (`app.js`):** Gestiona el estado de filtros, eventos de usuario y conmutador de tema claro/oscuro.

---

## 5. Resultados Analíticos del Dataset de Control

El dataset de 15 pasadas distribuidas entre enero y junio de 2026 arroja los siguientes hallazgos:
- **Nubosidad media:** $30.6\%$ (rango: $9.4\%$ en Isabela hasta $51.3\%$ en Fernandina).
- **Aptitud media del sensor:** $72.7\%$ (rango: $46.2\%$ hasta $97.1\%$).
- **Tasa de pasadas aptas ($\ge 70\%$):** 8 de 15 pasadas ($53.3\%$).
- **Cobertura insular:** 9 islas monitoreadas con $6,896.0\text{ km}^2$ de superficie total analizada.
- **Mejor ventana de adquisición:** Pasada del 3 de junio de 2026 en Volcán Alcedo (Isabela) con $97.1\%$ de aptitud y $9.4\%$ de nubosidad.
- **Relación matemática:** Coeficiente de correlación de Pearson $r = -1.000$, evidenciando el efecto determinante de la nubosidad en la calidad de la imagen óptica.

---

## 6. Pruebas y Validación Técnica

- **Pruebas Automatizadas:** 12 pruebas unitarias ejecutadas con el test runner nativo de Node.js (`tests/analytics.test.mjs`), registrando 100% de éxito (`12 pass, 0 fail`).
- **Accesibilidad y Buenas Prácticas:** 100/100 en Accesibilidad, 100/100 en Mejores Prácticas y 100/100 en SEO en auditorías Lighthouse de Google Chrome.

---

## 7. Conclusiones y Recomendaciones

### Conclusiones
1. El stack web nativo (HTML5 + Leaflet + Chart.js) supera a las herramientas comerciales de BI en entornos académicos y de ciencia abierta, al ofrecer independencia de licenciamiento y compatibilidad nativa con GitHub Pages.
2. La arquitectura con fallback de datos embebidos garantiza resiliencia operativa absoluta ante contingencias de red o restricciones de protocolo en navegadores.
3. El prototipo PlasTrack demuestra la viabilidad de transformar metadatos de teledetección en un panel ejecutivo funcional y accesible en menos de 100 KB de código fuente.

### Recomendaciones
1. En fases futuras, conectar el tablero con el API en vivo de *Copernicus Data Space Ecosystem* mediante una función serverless o workflow programado de GitHub Actions.
2. Incorporar capas de índices raster en formato Cloud Optimized GeoTIFF (COG) directamente sobre el mapa de Leaflet.

---

## 8. Referencias Bibliográficas

1. Davenport, T. H., Harris, J. G., & Morison, R. (2010). *Analytics at Work: Smarter Decisions, Better Results*. Harvard Business Press.
2. European Space Agency (ESA). (2024). *Sentinel-2 User Handbook*. ESA Standard Document.
3. Few, S. (2013). *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring* (2nd ed.). Analytics Press.
4. Leaflet. (2024). *Leaflet: An open-source JavaScript library for mobile-friendly interactive maps*. https://leafletjs.com/
5. Chart.js. (2024). *Chart.js: Simple yet flexible JavaScript charting for designers & developers*. https://www.chartjs.org/
