---
title: "Normalización – Tabla Member_Dinner: 1FN a 3FN"
excerpt: Proceso completo de normalización de la tabla de cenas de un restaurante nocturno, desde la identificación de valores multivaluados hasta la tercera forma normal.
publishDate: '2026-05-22'
tags: ['normalizacion', '3FN', '1FN']
---

## Contexto del ejercicio

El gerente de un restaurante nocturno desea un sistema para planificar comidas y hacer seguimiento de asistencia. La siguiente tabla **Member_Dinner** almacena la información. La clave primaria es la combinación **(Número de miembro + Número de cena)**. Las cenas pueden tener muchos platos.

Se pide:
- Indicar si existe algún valor multivaluado y justificar.
- Plantear el esquema relacional de la tabla `Member_Dinner`.
- Diagramar las dependencias funcionales para la 1FN.
- Convertir a 3FN mostrando el paso a paso.

---

## 1. Dependencias directas — Cierre X⁺

*(Identifica las dependencias funcionales de la tabla y calcula el cierre de la clave compuesta.)*

---

## 2. Análisis de valores multivaluados

*(Justifica si existen atributos multivaluados. Los platos de cada cena son un ejemplo clave.)*

---

## 3. Redefinición de la llave con X⁺

*(Describe cómo queda la clave primaria tras resolver los valores multivaluados.)*

---

## 4. Separación a 2FN — Eliminación de dependencias parciales

*(Muestra las tablas resultantes al eliminar dependencias parciales respecto a la clave compuesta.)*

---

## 5. Dependencias transitivas

*(Identifica dependencias transitivas que permanecen tras la 2FN.)*

---

## 6. Separación a 3FN — Eliminación de dependencias transitivas

*(Muestra las tablas finales tras eliminar las dependencias transitivas.)*

---

## 7. Modelo final

*(Escribe el esquema relacional con nombre de tabla, atributos, PK y FK.)*
