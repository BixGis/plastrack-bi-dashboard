# Ficha Técnica de Indicadores Clave de Desempeño (KPIs) — PlasTrack

## 1. Contexto y Propósito

El sistema **PlasTrack** procesa observaciones satelitales multiespectrales simuladas de las misiones Sentinel-2 (A/B) y Landsat 9 sobre el archipiélago de Galápagos. Los KPIs aquí definidos permiten a los tomadores de decisiones evaluar la viabilidad de adquisiciones ópticas para monitoreo ambiental y priorizar recursos en campo.

---

## 2. Catálogo de Indicadores

### KPI 1: Pasadas Analizadas (Volumen Operativo)
- **Definición:** Número total de adquisiciones satelitales contenidas en el subconjunto filtrado.
- **Fórmula de cálculo:**  
  $$N = \sum_{i=1}^{n} 1$$
- **Unidad de medida:** Registros enteros (adquisiciones).
- **Interpretación:** Refleja la cobertura temporal y muestral de la observación. A mayor número de pasadas analizadas, mayor representatividad estadística.
- **Submétrica calculada:** Diversidad geográfica ($U_{islas}$) y de plataformas ($U_{plataformas}$).

---

### KPI 2: Nubosidad Promedio (Calidad Atmosférica)
- **Definición:** Media aritmética del porcentaje de obstrucción nubosa sobre el área observada.
- **Fórmula de cálculo:**  
  $$\overline{C} = \frac{1}{N} \sum_{i=1}^{N} \text{nubosidad\_pct}_i$$
- **Unidad de medida:** Porcentaje (%).
- **Umbral de referencia:**  
  - $\le 20\%$: Excelente (Óptima visibilidad).
  - $21\% - 50\%$: Aceptable (Adquisición utilizable con corrección).
  - $> 50\%$: Crítica (Obstrucción severa).
- **Interpretación:** Menor valor indica mejores condiciones de visibilidad de la superficie terrestre e insular.

---

### KPI 3: Aptitud Promedio del Sensor (Idoneidad Espectral)
- **Definición:** Puntuación normalizada de idoneidad del sensor en función de la resolución espacial, ángulo de incidencia solar y visibilidad libre de nubes.
- **Fórmula de cálculo:**  
  $$\overline{A} = \frac{1}{N} \sum_{i=1}^{N} \text{aptitud\_pct}_i$$
- **Unidad de medida:** Puntuación porcentual ($0 - 100\%$).
- **Interpretación:** Métrica agregada que resume la utilidad operativa del sensor óptico. Valores altos ($\ge 80\%$) garantizan escenas de alta fidelidad para índices espectrales (NDVI, NDWI).

---

### KPI 4: Pasadas Aptas (Tasa de Éxito Operativo)
- **Definición:** Proporción de adquisiciones que superan el umbral mínimo operativo de aptitud ($\ge 70\%$).
- **Fórmula de cálculo:**  
  $$\text{Tasa Aptas} = \frac{\sum_{i=1}^{N} [\,\text{aptitud\_pct}_i \ge 70\,]}{N} \times 100$$
- **Unidad de medida:** Porcentaje y conteo absoluto ($k \text{ de } N$).
- **Interpretación:** Porcentaje de pasadas que pueden ser enviadas a cadenas de procesamiento automatizado sin descarte manual.

---

### KPI 5: Cobertura Territorial Monitoreada (Área Total)
- **Definición:** Sumatoria del área terrestre y marina cubierta por las pasadas analizadas.
- **Fórmula de cálculo:**  
  $$\text{Área Total} = \sum_{i=1}^{N} \text{area\_km2}_i$$
- **Unidad de medida:** Kilómetros cuadrados ($\text{km}^2$).
- **Submétrica:** Promedio de área por pasada ($\text{km}^2/\text{pasada}$) y valor promedio de NDVI registrado en la zona.

---

## 3. Matriz de Resumen y Correlación

| Indicador | Dirección Óptima | Valor Global (Línea Base) | Sensibilidad a Filtros |
|:---|:---:|:---:|:---:|
| Pasadas Analizadas | Maximizar | 15 pasadas | Alta |
| Nubosidad Promedio | Minimizar | 30.6% | Muy Alta |
| Aptitud del Sensor | Maximizar | 72.7% | Muy Alta |
| Pasadas Aptas | Maximizar | 8 de 15 (53.3%) | Alta |
| Área Monitoreada | Maximizar | 6,896.0 km² | Alta |

> **Correlación de Pearson ($r$):** Se registra una correlación negativa perfecta e inversa ($r = -1.000$) entre nubosidad y aptitud del sensor en el conjunto de control, demostrando que la nubosidad es el factor determinante en la degradación de la idoneidad espectral en el archipiélago.
