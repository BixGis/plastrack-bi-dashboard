# Guía de Exposición y Balotario de Defensa Técnica — PlasTrack

Este documento prepara al estudiante para la sustentación oral individual y la ronda de preguntas ante el docente evaluador, garantizando el dominio conceptual y técnico del proyecto **PlasTrack**.

---

## 1. Síntesis Ejecutiva del Proyecto (Pitch de 2 minutos)

> *"PlasTrack es una plataforma de Business Intelligence estática diseñada para resolver la brecha entre la abundancia de datos satelitales abiertos (Copernicus y Landsat) y la toma de decisiones ambientales oportunas en las Islas Galápagos. Mediante una arquitectura ligera en HTML5, CSS3, JavaScript modular, Leaflet y Chart.js, procesamos 15 observaciones satelitales para evaluar condiciones de nubosidad, aptitud espectral y cobertura territorial en tiempo real. Demostramos una correlación inversa perfecta ($r = -1.00$) entre nubosidad y aptitud, proporcionando filtros dinámicos, mapas de calor, analítica visual y exportación auditable, todo desplegado sin costo en GitHub Pages."*

---

## 2. Balotario de 20 Preguntas Técnicas y Respuestas Justificadas

### Eje 1: Fundamentos de Business Intelligence y Benchmarking
1. **¿Qué es Business Intelligence (BI) y cómo se aplica en PlasTrack?**  
   *Respuesta:* BI es el conjunto de metodologías, arquitecturas y tecnologías que transforman datos sin procesar en información significativa y accionable. En PlasTrack, convierte metadatos satelitales crudos (nubosidad, sensores, coordenadas) en métricas de decisión rápida (KPIs de pasadas aptas y ventanas óptimas de adquisición).

2. **¿En qué consistió la metodología de benchmarking aplicada?**  
   *Respuesta:* Se realizó un benchmarking técnico ponderado comparando Power BI, Looker Studio, Tableau y un stack web nativo (Leaflet + Chart.js) bajo 8 criterios ponderados: soporte geoespacial, ingesta de archivos JSON/CSV, costo de licenciamiento, usabilidad, rendimiento en navegador, adaptabilidad móvil, despliegue público y ecosistema.

3. **¿Por qué Power BI no fue la opción definitiva para este prototipo?**  
   *Respuesta:* Porque requiere cuentas corporativas/educativas de Microsoft, licenciamiento Pro (\$10/mes/usuario) para compartir tableros de forma pública, y no puede desplegarse de manera nativa y autónoma como un sitio estático en GitHub Pages sin dependencias de la nube propietaria de Microsoft.

4. **¿Cuáles son las ventajas de Looker Studio y por qué quedó en segundo lugar?**  
   *Respuesta:* Looker Studio es gratuito y muy fácil de conectar con Google Drive. Sin embargo, su capacidad geoespacial está limitada frente a Leaflet (no permite mapas de calor personalizados ni capas complejas de acumulación offline) y depende totalmente de la conectividad con los servicios de Google.

5. **¿Por qué se seleccionó el stack web nativo (HTML5 + JS + Leaflet + Chart.js)?**  
   *Respuesta:* Porque garantiza 100% de autonomía técnica, costo cero de licenciamiento e infraestructura, portabilidad absoluta, rendimiento óptimo en navegador y compatibilidad directa con GitHub Pages.

---

### Eje 2: Datos, Copernicus y Procesamiento Analítico
6. **¿Qué es el programa Copernicus y qué sensores se incluyeron en el estudio?**  
   *Respuesta:* Copernicus es el programa de observación terrestre de la Unión Europea. En el proyecto se simularon observaciones de la constelación Sentinel-2 (satélites 2A y 2B con el sensor óptico multiespectral MSI de 10 m de resolución) junto con Landsat 9 (sensor OLI-2 de 30 m de la NASA/USGS).

7. **¿Por qué se aclara expresamente que los datos son simulados?**  
   *Respuesta:* Por rigor ético y metodológico. Aunque las coordenadas, rangos espectrales y comportamientos climáticos son realistas y reproducen la geografía de Galápagos, se generaron con fines académicos de prototipado sin constituir observaciones certificadas en tiempo real de la ESA.

8. **¿Cómo funciona el mecanismo de resiliencia de datos (fallback)?**  
   *Respuesta:* `app.js` intenta cargar `data_copernicus_sample.json` vía `fetch()`. Si la llamada HTTP se bloquea (por ejemplo, al abrir el archivo localmente con doble clic bajo el protocolo `file://` o por fallos temporales de red), el sistema conmuta automáticamente a `FALLBACK_RECORDS` en `fallback-data.js`, asegurando que el dashboard siempre funcione.

9. **¿Qué es la correlación de Pearson y qué significa el valor obtenido en el tablero?**  
   *Respuesta:* Es una medida estadística que cuantifica la fuerza y dirección de la relación lineal entre dos variables continuas. En PlasTrack obtenemos un coeficiente cercano a $r = -1.00$, lo cual evidencia una relación lineal inversa: a mayor porcentaje de cobertura de nubes, menor idoneidad y calidad útil del sensor.

10. **¿Cómo se calculó la línea de tendencia en el gráfico de dispersión?**  
    *Respuesta:* Mediante una regresión lineal simple por mínimos cuadrados ordinarios ($y = mx + b$), donde la pendiente negativa ($m < 0$) confirma matemáticamente el deterioro de la aptitud ante el incremento de nubosidad.

---

### Eje 3: KPIs y Lógica de Negocio
11. **¿Qué criterio define a una «pasada apta»?**  
    *Respuesta:* Toda adquisición satelital que alcance una aptitud del sensor $\ge 70\%$, umbral estándar para garantizar que la reflectancia de la superficie sea aprovechable para índices de vegetación como NDVI.

12. **¿Cómo se recalculan los KPIs al interactuar con los filtros?**  
    *Respuesta:* A través de un enfoque funcional puro en `analytics.js`. Cuando el usuario cambia un selector (isla, plataforma o fechas), la función `filterRecords()` genera un subconjunto filtrado y `buildKpis()` recalcula inmediatamente los totales, medias y deltas ($\Delta$) respecto a la línea base global.

13. **¿Qué representa el área monitoreada y cómo se relaciona con el NDVI?**  
    *Respuesta:* Es la suma acumulada de la superficie insular y marina cubierta por las pasadas filtradas ($6,896\text{ km}^2$ en el total). Se acompaña del NDVI (Índice de Vegetación de Diferencia Normalizada) promedio para verificar la salud vegetal de las zonas escaneadas.

14. **¿Por qué los KPIs muestran comparativas con flechas (▲/▼)?**  
    *Respuesta:* Es una buena práctica de visualización en BI: contextualizar el dato filtrado frente al promedio global del dataset (por ejemplo, si el filtro muestra una nubosidad 5 puntos porcentuales menor al promedio, se resalta como condición favorable).

---

### Eje 4: Visualización Geoespacial con Leaflet
15. **¿Qué proveedor de mapas se utiliza como capa base y por qué?**  
    *Respuesta:* Se emplea *Esri World Imagery*, un servicio de mosaicos satelitales de alta resolución que permite visualizar el relieve volcánico real de las islas, reforzando la estética de observatorio espacial.

16. **¿Cómo se representan las diferentes condiciones en el mapa?**  
    *Respuesta:* Mediante un semáforo visual en los marcadores circulares: Verde para aptitud alta ($\ge 80\%$), Amarillo para media ($60\text{--}79\%$) y Rojo para baja ($< 60\%$).

17. **¿Qué diferencia técnica existe entre la capa de calor y las zonas de acumulación?**  
    *Respuesta:* La capa de calor (`leaflet.heat`) renderiza un gradiente continuo de densidad de pasadas ponderado por la aptitud espectral, mientras que las zonas de acumulación representan polígonos de amortiguamiento geográfico que delimitan el alcance espacial de cada isla.

18. **¿Por qué la barra de herramientas del mapa permite alternar capas?**  
    *Respuesta:* Para evitar la saturación visual (*chart junk*), permitiendo al analista aislar marcadores puntuales, ver el calor de cobertura o analizar áreas consolidadas según su necesidad de evaluación.

---

### Eje 5: Despliegue, Accesibilidad y Buenas Prácticas
19. **¿Por qué es indispensable el archivo `.nojekyll` en GitHub Pages?**  
    *Respuesta:* Por defecto, GitHub Pages procesa los repositorios con Jekyll. Jekyll ignora automáticamente directorios que inician con punto o guion bajo y puede interferir con la resolución de archivos estáticos. `.nojekyll` desactiva este comportamiento, asegurando que todos los assets se sirvan directamente.

20. **¿Cómo se validó la calidad del software antes del despliegue?**  
    *Respuesta:* Se ejecutó una suite automatizada de 12 pruebas unitarias con el ejecutor nativo de Node.js (`node --test tests/analytics.test.mjs`), superando el 100% de casos de prueba sobre media, Pearson, filtros, agregaciones y validación de esquema, complementada con una auditoría Lighthouse con 100/100 en Accesibilidad y SEO.
