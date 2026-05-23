---
title: "Normalización – Tabla Estudiantes: 1FN a 3FN"
excerpt: Análisis de la Primera Forma Normal sobre una tabla de estudiantes con atributos multivaluados (cursos y calificaciones), y proceso completo de normalización hasta 3FN.
publishDate: '2026-05-22'
tags: ['normalizacion', '1FN', '2FN', '3FN']
---

## Contexto del ejercicio

Se tiene la siguiente tabla de estudiantes:

| Cod | Name | Email | Courses | GradePoints |
|---|---|---|---|---|
| 100111 | John Doe | doe@usna.edu | NN204, SI204, IT221 | 2, 3, 3 |
| 092244 | Matt Smith | smith@usna.edu | SM223, EE301 | 4, 4 |
| 113221 | Melinda Black | black@usna.edu | SI204 | 3 |
| 090112 | Tom Johnson | johnson@usna.edu | NN204, SI204, IT221 | 4, 2, 3 |

Se pide determinar si la tabla está en 1FN y, si no lo está, rediseñarla hasta alcanzar la 3FN mostrando el paso a paso.

---

## Forma normal actual

La tabla **no se encuentra en 1FN** porque los atributos `Courses` y `GradePoints` son **multivaluados**: cada celda contiene múltiples valores separados por comas. La Primera Forma Normal exige que todos los atributos sean atómicos (un solo valor por celda). La tabla se encuentra en forma **no normalizada (0FN)**.

---

## 1. Dependencias directas — Cierre X⁺ (tabla original)

| Atributo | Depende de |
|---|---|
| Cod | X+, PK |
| Name | Cod |
| Email | Cod |
| Courses | no |
| GradePoints | no |

`Courses` y `GradePoints` no tienen dependencia funcional válida porque son multivaluados; no es posible establecer una relación funcional hasta no descomponerlos.

---

## 2. Redefinición de la llave con X⁺ — Conversión a 1FN

Para cumplir la 1FN se expande la tabla: cada fila tendrá un único curso y su calificación correspondiente. La nueva clave primaria compuesta es **(Cod, Course)**.

**STUDENT** *(tabla en 1FN)*

| **Cod** | **Course** | Name | Email | GradePoint |
|---|---|---|---|---|
| 100111 | NN204 | John Doe | doe@usna.edu | 2 |
| 100111 | SI204 | John Doe | doe@usna.edu | 3 |
| 100111 | IT221 | John Doe | doe@usna.edu | 3 |
| 092244 | SM223 | Matt Smith | smith@usna.edu | 4 |
| 092244 | EE301 | Matt Smith | smith@usna.edu | 4 |
| 113221 | SI204 | Melinda Black | black@usna.edu | 3 |
| 090112 | NN204 | Tom Johnson | johnson@usna.edu | 4 |
| 090112 | SI204 | Tom Johnson | johnson@usna.edu | 2 |
| 090112 | IT221 | Tom Johnson | johnson@usna.edu | 3 |

Nueva tabla de dependencias con la clave compuesta **(Cod, Course)**:

| Atributo | Depende de |
|---|---|
| Cod | X+, PK |
| Course | X+, PK |
| Name | Cod |
| Email | Cod |
| GradePoint | (Cod, Course) |

`Name` y `Email` son dependencias **parciales** (dependen solo de `Cod`). `GradePoint` depende completamente de la clave compuesta. La tabla está en **1FN pero no en 2FN**.

---

## 3. Separación a 2FN — Eliminación de dependencias parciales

Se separan `Name` y `Email` (que dependen solo de `Cod`) en una tabla independiente:

**STUDENT**

| **Cod** | Name | Email |
|---|---|---|
| 100111 | John Doe | doe@usna.edu |
| 092244 | Matt Smith | smith@usna.edu |
| 113221 | Melinda Black | black@usna.edu |
| 090112 | Tom Johnson | johnson@usna.edu |

**ENROLLMENT**

| **Cod** | **Course** | GradePoint |
|---|---|---|
| 100111 | NN204 | 2 |
| 100111 | SI204 | 3 |
| 100111 | IT221 | 3 |
| 092244 | SM223 | 4 |
| 092244 | EE301 | 4 |
| 113221 | SI204 | 3 |
| 090112 | NN204 | 4 |
| 090112 | SI204 | 2 |
| 090112 | IT221 | 3 |

Las dos tablas están en **2FN**: todos los atributos no-clave dependen completamente de su clave primaria.

---

## 4. Dependencias transitivas

Revisando las tablas en 2FN:

- **STUDENT**: `Cod → Name` y `Cod → Email`. No existe ningún atributo que determine a otro dentro de la tabla. No hay dependencias transitivas.
- **ENROLLMENT**: `(Cod, Course) → GradePoint`. No hay dependencias transitivas.

| Atributo | Depende de |
|---|---|
| Name | no |
| Email | no |
| GradePoint | no |

No se detectan dependencias transitivas. Ambas tablas ya están en **3FN**.

---

## 5. Tablas en 3FN — Sin cambios respecto a 2FN

**STUDENT** *(sin cambios)*

| **Cod** | Name | Email |
|---|---|---|
| 100111 | John Doe | doe@usna.edu |
| 092244 | Matt Smith | smith@usna.edu |
| 113221 | Melinda Black | black@usna.edu |
| 090112 | Tom Johnson | johnson@usna.edu |

**ENROLLMENT** *(sin cambios)*

| **Cod** | **Course** | GradePoint |
|---|---|---|
| 100111 | NN204 | 2 |
| 100111 | SI204 | 3 |
| 100111 | IT221 | 3 |
| 092244 | SM223 | 4 |
| 092244 | EE301 | 4 |
| 113221 | SI204 | 3 |
| 090112 | NN204 | 4 |
| 090112 | SI204 | 2 |
| 090112 | IT221 | 3 |

---

## 6. Modelo final

**STUDENT** ( **Cod**, Name, Email )

**ENROLLMENT** ( **Cod** → *FK a STUDENT*, **Course**, GradePoint )
