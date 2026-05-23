---
title: "Normalización – Tabla 3: Member_Dinner"
excerpt: Proceso completo de normalización de la tabla de cenas de un restaurante nocturno empresarial, desde la forma no normalizada hasta la 3FN, eliminando atributos multivaluados, dependencias parciales y transitivas.
publishDate: '2026-05-22'
tags: ['normalizacion', '1FN', '2FN', '3FN']
---

## Contexto del negocio

El gerente del restaurante nocturno de una empresa desea un sistema de información para planificar las cenas y hacer seguimiento de la asistencia de los miembros. Las reglas del negocio son las siguientes:

- Un miembro puede asistir a **muchas cenas** a lo largo del tiempo.
- Un miembro **no asistirá a más de una cena en la misma fecha**.
- Cada cena puede tener **muchos platos**, desde uno hasta los que el chef defina.
- Por cada miembro se conoce su nombre, teléfono y dirección.
- Por cada cena se conoce la fecha y el lugar donde se realiza.

Dado que un miembro puede asistir a muchas cenas y una cena puede tener varios miembros, la clave primaria de la tabla es la combinación **(MemberNo, DinnerNo)**. Los platos de cada cena representan el valor multivaluado del sistema.

---

## Tabla original (sin normalizar)

| MemberNo | MemberName | MemberPhone | DinnerNo | DinnerDate | DinnerVenue | Dishes |
|---|---|---|---|---|---|---|
| M001 | Carlos Ruiz | 3001234567 | D001 | 2024-03-15 | Salón Principal | Sopa, Pollo, Postre |
| M001 | Carlos Ruiz | 3001234567 | D002 | 2024-04-20 | Terraza | Ensalada, Res, Helado |
| M002 | Ana López | 3109876543 | D001 | 2024-03-15 | Salón Principal | Sopa, Pollo, Postre |
| M003 | Pedro Gómez | 3207654321 | D002 | 2024-04-20 | Terraza | Ensalada, Res, Helado |
| M002 | Ana López | 3109876543 | D003 | 2024-05-10 | Jardín | Crema, Cerdo, Torta |

---

## Forma normal actual

La tabla **no se encuentra en 1FN** porque el atributo `Dishes` es **multivaluado**: cada celda contiene varios platos separados por comas, lo que viola la atomicidad exigida por la Primera Forma Normal. La tabla se encuentra en **forma no normalizada (0FN)**.

---

## 1. Dependencias directas — Cierre X⁺ (tabla original)

| Atributo | Depende de |
|---|---|
| MemberNo | X+, PK |
| MemberName | MemberNo |
| MemberPhone | MemberNo |
| DinnerNo | X+, PK |
| DinnerDate | DinnerNo |
| DinnerVenue | DinnerNo |
| Dishes | no |

`Dishes` no tiene dependencia funcional válida por ser multivaluado. `MemberName` y `MemberPhone` dependen parcialmente de `MemberNo`. `DinnerDate` y `DinnerVenue` dependen parcialmente de `DinnerNo`.

---

## 2. Redefinición de la llave con X⁺ — Conversión a 1FN

Para cumplir la 1FN se expande la tabla: cada fila tendrá un único plato. La nueva clave primaria compuesta es **(MemberNo, DinnerNo, Dish)**.

**MEMBER_DINNER** *(tabla en 1FN)*

| **MemberNo** | **DinnerNo** | **Dish** | MemberName | MemberPhone | DinnerDate | DinnerVenue |
|---|---|---|---|---|---|---|
| M001 | D001 | Sopa | Carlos Ruiz | 3001234567 | 2024-03-15 | Salón Principal |
| M001 | D001 | Pollo | Carlos Ruiz | 3001234567 | 2024-03-15 | Salón Principal |
| M001 | D001 | Postre | Carlos Ruiz | 3001234567 | 2024-03-15 | Salón Principal |
| M001 | D002 | Ensalada | Carlos Ruiz | 3001234567 | 2024-04-20 | Terraza |
| M001 | D002 | Res | Carlos Ruiz | 3001234567 | 2024-04-20 | Terraza |
| M001 | D002 | Helado | Carlos Ruiz | 3001234567 | 2024-04-20 | Terraza |
| M002 | D001 | Sopa | Ana López | 3109876543 | 2024-03-15 | Salón Principal |
| M002 | D001 | Pollo | Ana López | 3109876543 | 2024-03-15 | Salón Principal |
| M002 | D001 | Postre | Ana López | 3109876543 | 2024-03-15 | Salón Principal |
| M003 | D002 | Ensalada | Pedro Gómez | 3207654321 | 2024-04-20 | Terraza |
| M003 | D002 | Res | Pedro Gómez | 3207654321 | 2024-04-20 | Terraza |
| M003 | D002 | Helado | Pedro Gómez | 3207654321 | 2024-04-20 | Terraza |
| M002 | D003 | Crema | Ana López | 3109876543 | 2024-05-10 | Jardín |
| M002 | D003 | Cerdo | Ana López | 3109876543 | 2024-05-10 | Jardín |
| M002 | D003 | Torta | Ana López | 3109876543 | 2024-05-10 | Jardín |

Nueva tabla de dependencias con clave **(MemberNo, DinnerNo, Dish)**:

| Atributo | Depende de |
|---|---|
| MemberNo | X+, PK |
| DinnerNo | X+, PK |
| Dish | X+, PK |
| MemberName | MemberNo |
| MemberPhone | MemberNo |
| DinnerDate | DinnerNo |
| DinnerVenue | DinnerNo |

`MemberName` y `MemberPhone` dependen solo de `MemberNo`. `DinnerDate` y `DinnerVenue` dependen solo de `DinnerNo`. Ambas son dependencias **parciales**. La tabla está en **1FN pero no en 2FN**.

---

## 3. Separación a 2FN — Eliminación de dependencias parciales

Se extraen los atributos con dependencias parciales a sus propias tablas:

**MEMBER**

| **MemberNo** | MemberName | MemberPhone |
|---|---|---|
| M001 | Carlos Ruiz | 3001234567 |
| M002 | Ana López | 3109876543 |
| M003 | Pedro Gómez | 3207654321 |

**DINNER**

| **DinnerNo** | DinnerDate | DinnerVenue |
|---|---|---|
| D001 | 2024-03-15 | Salón Principal |
| D002 | 2024-04-20 | Terraza |
| D003 | 2024-05-10 | Jardín |

**MEMBER_DINNER**

| **MemberNo** | **DinnerNo** | **Dish** |
|---|---|---|
| M001 | D001 | Sopa |
| M001 | D001 | Pollo |
| M001 | D001 | Postre |
| M001 | D002 | Ensalada |
| M001 | D002 | Res |
| M001 | D002 | Helado |
| M002 | D001 | Sopa |
| M002 | D001 | Pollo |
| M002 | D001 | Postre |
| M003 | D002 | Ensalada |
| M003 | D002 | Res |
| M003 | D002 | Helado |
| M002 | D003 | Crema |
| M002 | D003 | Cerdo |
| M002 | D003 | Torta |

Las tres tablas están en **2FN**: ningún atributo no-clave depende parcialmente de su clave primaria.

---

## 4. Dependencias transitivas

Revisando las tablas en 2FN:

- **MEMBER**: `MemberNo → MemberName`, `MemberNo → MemberPhone`. Ningún atributo determina a otro dentro de la tabla.
- **DINNER**: `DinnerNo → DinnerDate`, `DinnerNo → DinnerVenue`. Ningún atributo determina a otro dentro de la tabla.
- **MEMBER_DINNER**: la clave compuesta `(MemberNo, DinnerNo, Dish)` no tiene atributos no-clave.

| Atributo | Depende de |
|---|---|
| MemberName | no |
| MemberPhone | no |
| DinnerDate | no |
| DinnerVenue | no |

No se detectan dependencias transitivas. Las tres tablas ya están en **3FN**.

---

## 5. Tablas en 3FN — Sin cambios respecto a 2FN

**MEMBER** *(sin cambios)*

| **MemberNo** | MemberName | MemberPhone |
|---|---|---|
| M001 | Carlos Ruiz | 3001234567 |
| M002 | Ana López | 3109876543 |
| M003 | Pedro Gómez | 3207654321 |

**DINNER** *(sin cambios)*

| **DinnerNo** | DinnerDate | DinnerVenue |
|---|---|---|
| D001 | 2024-03-15 | Salón Principal |
| D002 | 2024-04-20 | Terraza |
| D003 | 2024-05-10 | Jardín |

**MEMBER_DINNER** *(sin cambios)*

| **MemberNo** | **DinnerNo** | **Dish** |
|---|---|---|
| M001 | D001 | Sopa |
| M001 | D001 | Pollo |
| M001 | D001 | Postre |
| M001 | D002 | Ensalada |
| M001 | D002 | Res |
| M001 | D002 | Helado |
| M002 | D001 | Sopa |
| M002 | D001 | Pollo |
| M002 | D001 | Postre |
| M003 | D002 | Ensalada |
| M003 | D002 | Res |
| M003 | D002 | Helado |
| M002 | D003 | Crema |
| M002 | D003 | Cerdo |
| M002 | D003 | Torta |

---

## 6. Modelo final

**MEMBER** ( **MemberNo**, MemberName, MemberPhone )

**DINNER** ( **DinnerNo**, DinnerDate, DinnerVenue )

**MEMBER\_DINNER** ( **MemberNo** → *FK a MEMBER*, **DinnerNo** → *FK a DINNER*, **Dish** )
