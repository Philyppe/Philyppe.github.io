---
title: "Normalización – Tabla 2: Visitas Médicas"
excerpt: Proceso de normalización hasta 3FN de una tabla de visitas médicas con dependencias funcionales dadas, identificando la forma normal inicial, eliminando dependencias parciales y transitivas paso a paso.
publishDate: '2026-05-22'
tags: ['normalizacion', '2FN', '3FN']
---

## Contexto del ejercicio

Se tiene la siguiente tabla de visitas médicas con clave primaria compuesta **(VisitaNo, ProvNo)**:

| VisitaNo | DiaVisita | PacNo | PacEdad | PacCiudad | ProvNo | ProvEspecialidad | Diagnostico |
|---|---|---|---|---|---|---|---|
| V10020 | 1/13/2019 | P1 | 35 | BOGOTA | D1 | INTERNISTA | INFECCIÓN DE OÍDO |
| V10020 | 1/13/2019 | P1 | 35 | BOGOTA | D2 | PRACTICANTE ENFERMERÍA | INFLUENZA |
| V93030 | 1/20/2019 | P3 | 17 | CALI | D2 | PRACTICANTE ENFERMERÍA | EMBARAZO |
| V82110 | 1/18/2019 | P2 | 60 | CUCUTA | D3 | CARDIÓLOGO | SOPLO CARDIACO |

Las dependencias funcionales dadas son:

| Dependencia |
|---|
| PacNo → PacEdad, PacCiudad |
| ProvNo → ProvEspecialidad |
| VisitaNo → PacNo, DiaVisita, PacEdad, PacCiudad |
| VisitaNo, ProvNo → Diagnóstico |

---

## Forma normal actual

La tabla se encuentra en **Primera Forma Normal (1FN)** porque todos los atributos son atómicos. Sin embargo, **no cumple la 2FN** porque existen dependencias parciales: `DiaVisita`, `PacNo`, `PacEdad` y `PacCiudad` dependen únicamente de `VisitaNo`, y `ProvEspecialidad` depende únicamente de `ProvNo`, sin necesitar la clave compuesta completa.

---

## 1. Dependencias directas — Cierre X⁺

| Atributo | Depende de |
|---|---|
| VisitaNo | X+, PK |
| DiaVisita | VisitaNo |
| PacNo | VisitaNo |
| PacEdad | PacNo |
| PacCiudad | PacNo |
| ProvNo | X+, PK |
| ProvEspecialidad | ProvNo |
| Diagnostico | (VisitaNo, ProvNo) |

`PacEdad` y `PacCiudad` dependen directamente de `PacNo`, no de `VisitaNo`. Sin embargo, como `VisitaNo → PacNo`, existe una cadena transitiva: `VisitaNo → PacNo → PacEdad, PacCiudad`. Esto se resolverá en la 3FN.

---

## 2. Redefinición de la llave con X⁺

Calculando el cierre de la clave compuesta:

**{VisitaNo, ProvNo}⁺** = { VisitaNo, DiaVisita, PacNo, PacEdad, PacCiudad, ProvNo, ProvEspecialidad, Diagnostico }

El cierre abarca todos los atributos, confirmando que **(VisitaNo, ProvNo)** es la clave candidata. Las dependencias parciales obligan a descomponer para alcanzar la 2FN.

---

## 3. Separación a 2FN — Eliminación de dependencias parciales

Se extraen los grupos de atributos con dependencias parciales:

**VISITA**

| **VisitaNo** | DiaVisita | PacNo | PacEdad | PacCiudad |
|---|---|---|---|---|
| V10020 | 1/13/2019 | P1 | 35 | BOGOTA |
| V93030 | 1/20/2019 | P3 | 17 | CALI |
| V82110 | 1/18/2019 | P2 | 60 | CUCUTA |

**PROVEEDOR**

| **ProvNo** | ProvEspecialidad |
|---|---|
| D1 | INTERNISTA |
| D2 | PRACTICANTE ENFERMERÍA |
| D3 | CARDIÓLOGO |

**ATENCION**

| **VisitaNo** | **ProvNo** | Diagnostico |
|---|---|---|
| V10020 | D1 | INFECCIÓN DE OÍDO |
| V10020 | D2 | INFLUENZA |
| V93030 | D2 | EMBARAZO |
| V82110 | D3 | SOPLO CARDIACO |

Las tres tablas están en **2FN**: ningún atributo no-clave depende parcialmente de su clave primaria.

---

## 4. Dependencias transitivas

Revisando las tablas en 2FN se detecta que en **VISITA** persiste la cadena transitiva identificada en el paso 1:

`VisitaNo → PacNo → PacEdad, PacCiudad`

`PacEdad` y `PacCiudad` no dependen directamente de `VisitaNo` sino de `PacNo`, que a su vez depende de `VisitaNo`.

| Atributo | Depende de |
|---|---|
| PacEdad | PacNo |
| PacCiudad | PacNo |

Las tablas **PROVEEDOR** y **ATENCION** no presentan dependencias transitivas.

---

## 5. Separación a 3FN — Eliminación de dependencias transitivas

Se extrae `PacNo → PacEdad, PacCiudad` a su propia tabla. La tabla VISITA pierde `PacEdad` y `PacCiudad`, conservando `PacNo` como FK.

**PACIENTE** *(nueva)*

| **PacNo** | PacEdad | PacCiudad |
|---|---|---|
| P1 | 35 | BOGOTA |
| P2 | 60 | CUCUTA |
| P3 | 17 | CALI |

**VISITA** *(actualizada)*

| **VisitaNo** | DiaVisita | PacNo |
|---|---|---|
| V10020 | 1/13/2019 | P1 |
| V93030 | 1/20/2019 | P3 |
| V82110 | 1/18/2019 | P2 |

**PROVEEDOR** *(sin cambios)*

| **ProvNo** | ProvEspecialidad |
|---|---|
| D1 | INTERNISTA |
| D2 | PRACTICANTE ENFERMERÍA |
| D3 | CARDIÓLOGO |

**ATENCION** *(sin cambios)*

| **VisitaNo** | **ProvNo** | Diagnostico |
|---|---|---|
| V10020 | D1 | INFECCIÓN DE OÍDO |
| V10020 | D2 | INFLUENZA |
| V93030 | D2 | EMBARAZO |
| V82110 | D3 | SOPLO CARDIACO |

---

## 6. Modelo final

**PACIENTE** ( **PacNo**, PacEdad, PacCiudad )

**VISITA** ( **VisitaNo**, DiaVisita, PacNo → *FK a PACIENTE* )

**PROVEEDOR** ( **ProvNo**, ProvEspecialidad )

**ATENCION** ( **VisitaNo** → *FK a VISITA*, **ProvNo** → *FK a PROVEEDOR*, Diagnostico )
