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

La clave primaria compuesta es **(cod_proyecto, cod_empleado)**.

---

## Forma normal actual

La tabla se encuentra en **Primera Forma Normal (1FN)** porque todos sus atributos son atómicos y no existen grupos repetitivos ni atributos multivaluados. Sin embargo, **no cumple la 2FN** porque existen dependencias parciales: varios atributos dependen únicamente de una parte de la clave compuesta y no de ella en su totalidad.

---

## 1. Dependencias directas — Cierre X⁺

| Atributo | Depende de |
|---|---|
| nom_proyecto | cod_proyecto |
| nom_empleado | cod_empleado |
| profesion | cod_empleado |
| vlr_hora | cod_empleado |
| hrs_asignadas | (cod_proyecto, cod_empleado) |

`nom_proyecto`, `nom_empleado`, `profesion` y `vlr_hora` son dependencias **parciales** porque dependen de un solo atributo de la clave. Solo `hrs_asignadas` depende completamente de la clave compuesta.

---

## 2. Redefinición de la llave con X⁺

Calculando el cierre de la clave compuesta:

**{cod_proyecto, cod_empleado}⁺** = { cod_proyecto, nom_proyecto, cod_empleado, nom_empleado, profesion, vlr_hora, hrs_asignadas }

El cierre abarca todos los atributos, por lo que **(cod_proyecto, cod_empleado)** es efectivamente la superllave y clave candidata de la tabla original. Las dependencias parciales confirman que se debe descomponer para alcanzar la 2FN.

---

## 3. Separación a 2FN — Eliminación de dependencias parciales

Se separan los atributos que dependen parcialmente de la clave en tablas independientes:

**PROYECTO**

| **cod_proyecto** | nom_proyecto |
|---|---|
| 1010 | ERP |
| 1020 | CRM |
| 1030 | BI |

**EMPLEADO**

| **cod_empleado** | nom_empleado | profesion | vlr_hora |
|---|---|---|---|
| 2010 | Sandra | Ingeniero | 100000 |
| 2020 | Claudia | Analista | 50000 |
| 2030 | Yamyle | Programador | 20000 |
| 2040 | Andrea | Ingeniero | 100000 |

**ASIGNACION**

| **cod_proyecto** | **cod_empleado** | hrs_asignadas |
|---|---|---|
| 1010 | 2010 | 20 |
| 1010 | 2020 | 10 |
| 1010 | 2030 | 10 |
| 1020 | 2010 | 10 |
| 1020 | 2020 | 15 |
| 1020 | 2030 | 20 |
| 1030 | 2010 | 10 |
| 1030 | 2020 | 15 |
| 1030 | 2030 | 10 |
| 1010 | 2040 | 40 |

Las tres tablas están ahora en **2FN**: ningún atributo no-clave depende parcialmente de la clave primaria.

---

## 4. Dependencias transitivas

Revisando las tablas en 2FN se detecta que en **EMPLEADO** existe una dependencia transitiva:

`cod_empleado → profesion → vlr_hora`

Es decir, `vlr_hora` no depende directamente de la clave sino de `profesion`, que a su vez depende de `cod_empleado`.

| Atributo | Depende de |
|---|---|
| vlr_hora | profesion |

Las tablas **PROYECTO** y **ASIGNACION** no presentan dependencias transitivas.

---

## 5. Separación a 3FN — Eliminación de dependencias transitivas

Se extrae `profesion → vlr_hora` a su propia tabla. La tabla EMPLEADO pierde `vlr_hora` y queda con `profesion` como FK hacia la nueva tabla.

**PROYECTO** *(sin cambios)*

| **cod_proyecto** | nom_proyecto |
|---|---|
| 1010 | ERP |
| 1020 | CRM |
| 1030 | BI |

**PROFESION** *(nueva)*

| **profesion** | vlr_hora |
|---|---|
| Ingeniero | 100000 |
| Analista | 50000 |
| Programador | 20000 |

**EMPLEADO** *(actualizada)*

| **cod_empleado** | nom_empleado | profesion |
|---|---|---|
| 2010 | Sandra | Ingeniero |
| 2020 | Claudia | Analista |
| 2030 | Yamyle | Programador |
| 2040 | Andrea | Ingeniero |

**ASIGNACION** *(sin cambios)*

| **cod_proyecto** | **cod_empleado** | hrs_asignadas |
|---|---|---|
| 1010 | 2010 | 20 |
| 1010 | 2020 | 10 |
| 1010 | 2030 | 10 |
| 1020 | 2010 | 10 |
| 1020 | 2020 | 15 |
| 1020 | 2030 | 20 |
| 1030 | 2010 | 10 |
| 1030 | 2020 | 15 |
| 1030 | 2030 | 10 |
| 1010 | 2040 | 40 |

---

## 6. Modelo final

Las cuatro tablas resultantes en **3FN**:

**PROYECTO** ( **cod_proyecto**, nom_proyecto )

**PROFESION** ( **profesion**, vlr_hora )

**EMPLEADO** ( **cod_empleado**, nom_empleado, profesion → *FK a PROFESION* )

**ASIGNACION** ( **cod_proyecto** → *FK a PROYECTO*, **cod_empleado** → *FK a EMPLEADO*, hrs_asignadas )
