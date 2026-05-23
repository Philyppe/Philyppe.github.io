---
title: "Normalización – Tabla 4: Rentals Netflix (3FN y BCNF)"
excerpt: Análisis de dependencias funcionales, normalización a 3FN y evaluación de la Forma Normal de Boyce-Codd sobre la tabla de alquileres de DVD de Netflix.
publishDate: '2026-05-22'
tags: ['normalizacion', '3FN', 'BCNF']
---

## Contexto del ejercicio

Se tiene la siguiente tabla `Rentals` de alquileres de DVD. La clave primaria compuesta es **(RentalID, Title)**:

| RentalID | Title | CustomerID | MailedOutDate | Director | MovieCategory | Price |
|---|---|---|---|---|---|---|
| 1 | Die Hard | 1001 | 3/3/2010 | John McTiernan | Old | $4.25 |
| 1 | The Last Man Standing | 1001 | 3/3/2010 | Walter Hill | Old | $4.25 |
| 1 | Wedding Crashers | 1001 | 3/3/2010 | David Dobkin | New | $5.50 |
| 2 | Dodgeball | 1002 | 3/4/2010 | Rawson Marshall Thurber | New | $5.50 |
| 2 | Die Hard | 1002 | 3/4/2010 | John McTiernan | Old | $4.25 |
| 3 | As Good as It Gets | 1003 | 1/7/2011 | James Brooks | Old | $4.25 |
| 4 | Forest Gump | 1001 | 1/7/2011 | Robert Zemeckis | Old | $4.25 |

Se pide verificar dependencias funcionales, plantear el esquema relacional, diagramar dependencias para 1FN y convertir a 3FN y BCNF.

---

## 1. Verificación de dependencias funcionales

*(Justifica si son verdaderas o falsas las siguientes dependencias a partir de los datos:)*

| Dependencia | ¿Verdadera? | Justificación |
|---|---|---|
| RentalID → CustomerID | | |
| RentalID → MailedOutDate | | |
| Director → Title | | |

---

## 2. Dependencias directas — Cierre X⁺

*(Calcula el cierre de los atributos clave y define todas las dependencias funcionales identificadas.)*

---

## 3. Redefinición de la llave con X⁺

*(Confirma o redefine la clave primaria tras calcular los cierres.)*

---

## 4. Separación a 2FN — Eliminación de dependencias parciales

*(Muestra las tablas resultantes al eliminar dependencias parciales de la clave compuesta.)*

---

## 5. Dependencias transitivas

*(Identifica dependencias transitivas que permanecen tras la 2FN.)*

| Dependencia transitiva | Tabla afectada |
|---|---|
| MovieCategory → Price | MOVIE |

---

## 6. Separación a 3FN — Eliminación de dependencias transitivas

*(Muestra las tablas finales en 3FN.)*

---

## 7. Análisis BCNF

*(Evalúa si las tablas en 3FN también cumplen BCNF. Si no, muestra la descomposición adicional necesaria y justifica los cambios respecto a la 3FN.)*

---

## 8. Modelo final

*(Escribe el esquema relacional final con nombre de tabla, atributos, PK y FK.)*
