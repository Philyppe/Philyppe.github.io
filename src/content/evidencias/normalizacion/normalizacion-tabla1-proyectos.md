---
title: "Normalización – Tabla 1: Proyectos y Empleados"
excerpt: Proceso de normalización hasta 3FN de una tabla que almacena información de proyectos y empleados asignados, identificando dependencias funcionales parciales y transitivas.
publishDate: '2026-05-22'
tags: ['normalizacion', '3FN', '2FN']
---

## Contexto del ejercicio

Se tiene la siguiente tabla sin normalizar que almacena la relación entre proyectos y empleados:

| cod_proyecto | nom_proyecto | cod_empleado | nom_empleado | profesion | vlr_hora | hrs_asignadas |
|---|---|---|---|---|---|---|
| 1010 | ERP | 2010 | Sandra | Ingeniero | 100000 | 20 |
| 1010 | ERP | 2020 | Claudia | Analista | 50000 | 10 |
| 1010 | ERP | 2030 | Yamyle | Programador | 20000 | 10 |
| 1020 | CRM | 2010 | Sandra | Ingeniero | 100000 | 10 |
| 1020 | CRM | 2020 | Claudia | Analista | 50000 | 15 |
| 1020 | CRM | 2030 | Yamile | Programador | 20000 | 20 |
| 1030 | BI | 2010 | Sandra | Ingeniero | 100000 | 10 |
| 1030 | BI | 2020 | Claudia | Analista | 50000 | 15 |
| 1030 | BI | 2030 | Llamile | Programador | 20000 | 10 |
| 1010 | ERP | 2040 | Andrea | Ingeniero | 100000 | 40 |

La clave primaria compuesta es **(cod_proyecto, cod_empleado)**. Se pide indicar en qué forma normal se encuentra y convertirla a 3FN paso a paso.

---

## 1. Dependencias directas — Cierre X⁺

*(Escribe aquí la tabla de dependencias funcionales identificadas y calcula el cierre de cada atributo o conjunto de atributos.)*

| Dependencia | Tipo |
|---|---|
| cod_proyecto → nom_proyecto | Parcial |
| cod_empleado → nom_empleado, profesion, vlr_hora | Parcial |
| cod_proyecto, cod_empleado → hrs_asignadas | Completa |

---

## 2. Redefinición de la llave con X⁺

*(Describe aquí cómo queda definida la superllave y la clave candidata tras calcular los cierres.)*

---

## 3. Separación a 2FN — Eliminación de dependencias parciales

*(Muestra aquí las tablas resultantes al eliminar las dependencias parciales de la clave compuesta.)*

---

## 4. Dependencias transitivas

*(Identifica aquí las dependencias transitivas que permanecen tras la 2FN.)*

| Dependencia | Tabla afectada |
|---|---|
| profesion → vlr_hora | EMPLEADO |

---

## 5. Separación a 3FN — Eliminación de dependencias transitivas

*(Muestra aquí las tablas finales tras eliminar las dependencias transitivas.)*

---

## 6. Modelo final

*(Escribe aquí el esquema relacional resultante con nombre de tabla, atributos, PK y FK.)*
