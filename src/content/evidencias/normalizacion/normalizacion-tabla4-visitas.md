---
title: "Normalización – Tabla 2: Visitas Médicas"
excerpt: Proceso de normalización hasta 3FN de una tabla de visitas médicas con dependencias funcionales dadas, identificando la forma normal inicial y descomponiendo hasta eliminar toda redundancia.
publishDate: '2026-05-22'
tags: ['normalizacion', '3FN', '2FN']
---

## Contexto del ejercicio

Se tiene la siguiente tabla de visitas médicas:

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

Se pide: indicar la forma normal actual, plantear el esquema relacional, diagramar dependencias y convertir a 3FN.

---

## 1. Dependencias directas — Cierre X⁺

*(Calcula el cierre de cada atributo o conjunto clave usando las dependencias funcionales dadas.)*

| Conjunto | Cierre X⁺ |
|---|---|
| {VisitaNo}⁺ | VisitaNo, PacNo, DiaVisita, PacEdad, PacCiudad |
| {PacNo}⁺ | PacNo, PacEdad, PacCiudad |
| {ProvNo}⁺ | ProvNo, ProvEspecialidad |
| {VisitaNo, ProvNo}⁺ | Todos los atributos |

---

## 2. Forma normal actual y redefinición de la llave

*(Indica en qué forma normal se encuentra la tabla y define la clave primaria usando X⁺.)*

---

## 3. Separación a 2FN — Eliminación de dependencias parciales

*(Muestra las tablas resultantes al eliminar las dependencias parciales de la clave compuesta (VisitaNo, ProvNo).)*

---

## 4. Dependencias transitivas

*(Identifica dependencias transitivas que permanecen en las tablas de 2FN.)*

| Dependencia transitiva | Tabla afectada |
|---|---|
| VisitaNo → PacNo → PacEdad, PacCiudad | VISITA |

---

## 5. Separación a 3FN — Eliminación de dependencias transitivas

*(Muestra las tablas finales tras eliminar las dependencias transitivas.)*

---

## 6. Modelo final

*(Escribe el esquema relacional final con nombre de tabla, atributos, PK y FK.)*
