---
title: "Normalización – Tabla Estudiantes: 1FN"
excerpt: Análisis de la Primera Forma Normal sobre una tabla de estudiantes con atributos multivaluados (cursos y calificaciones), y rediseño para cumplir con 1FN.
publishDate: '2026-05-22'
tags: ['normalizacion', '1FN']
---

## Contexto del ejercicio

Se tiene la siguiente tabla de estudiantes:

| Cod | Name | Email | Courses | GradePoints |
|---|---|---|---|---|
| 100111 | John Doe | doe@usna.edu | NN204, SI204, IT221 | 2, 3, 3 |
| 092244 | Matt Smith | smith@usna.edu | SM223, EE301 | 4, 4 |
| 113221 | Melinda Black | black@usna.edu | SI204 | 3 |
| 090112 | Tom Johnson | johnson@usna.edu | NN204, SI204, IT221 | 4, 2, 3 |

Se pide:
- Indicar si la tabla está en 1FN y justificar la respuesta.
- Si no está en 1FN, rediseñarla para que lo esté, indicando nombre de tabla, columnas, PK y FK.

---

## 1. Dependencias directas — Cierre X⁺

*(Identifica las dependencias funcionales de la tabla original y calcula el cierre.)*

---

## 2. Análisis de 1FN — ¿Hay atributos multivaluados?

*(Justifica aquí si la tabla cumple o no la Primera Forma Normal. Identifica qué atributos violan la 1FN.)*

---

## 3. Redefinición de la llave con X⁺

*(Describe cómo se redefine la clave primaria tras descomponer los atributos multivaluados.)*

---

## 4. Separación a 1FN

*(Muestra las tablas resultantes tras eliminar los atributos multivaluados.)*

---

## 5. Dependencias transitivas

*(Identifica si existen dependencias transitivas en las tablas resultantes de la 1FN.)*

---

## 6. Separación a 3FN

*(Si aplica, muestra las tablas finales en 3FN.)*

---

## 7. Modelo final

*(Escribe aquí el esquema relacional con nombre de tabla, atributos, PK y FK.)*
