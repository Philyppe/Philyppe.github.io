---
title: "Normalizacion - Tabla 4: Rentals Netflix (3FN y BCNF)"
excerpt: Analisis de dependencias funcionales, normalizacion a 3FN y evaluacion de la Forma Normal de Boyce-Codd sobre la tabla de alquileres de DVD de Netflix.
publishDate: '2026-05-22'
tags: ['normalizacion', '3FN', 'BCNF']
---

## Contexto del ejercicio

Se tiene la tabla `Rentals` de alquileres de DVD de Netflix. La clave primaria compuesta es **(RentalID, Title)**:

| RentalID | Title | CustomerID | MailedOutDate | Director | MovieCategory | Price |
|---|---|---|---|---|---|---|
| 1 | Die Hard | 1001 | 3/3/2010 | John McTiernan | Old | $4.25 |
| 1 | The Last Man Standing | 1001 | 3/3/2010 | Walter Hill | Old | $4.25 |
| 1 | Wedding Crashers | 1001 | 3/3/2010 | David Dobkin | New | $5.50 |
| 2 | Dodgeball | 1002 | 3/4/2010 | Rawson Marshall Thurber | New | $5.50 |
| 2 | Die Hard | 1002 | 3/4/2010 | John McTiernan | Old | $4.25 |
| 3 | As Good as It Gets | 1003 | 1/7/2011 | James Brooks | Old | $4.25 |
| 4 | Forest Gump | 1001 | 1/7/2011 | Robert Zemeckis | Old | $4.25 |

---

## 1. Verificacion de dependencias funcionales

**i. RentalID -> CustomerID**
Verdadera. En todos los registros de la muestra, cada `RentalID` tiene un unico `CustomerID` asociado: RentalID=1 siempre corresponde a CustomerID=1001, RentalID=2 a 1002, etc. Un alquiler pertenece a un unico cliente.

**ii. RentalID -> MailedOutDate**
Verdadera. Cada `RentalID` tiene una unica fecha de envio en la muestra: RentalID=1 siempre tiene fecha 3/3/2010, RentalID=2 tiene 3/4/2010, etc. Un paquete de alquiler se envia en una sola fecha.

**iii. Director -> Title**
Falsa como regla de negocio general, aunque parece verdadera en la muestra. En los datos, John McTiernan siempre aparece con Die Hard. Sin embargo, esta dependencia no es valida en el dominio real porque un director puede dirigir multiples peliculas. Es un artefacto del tamano reducido de la muestra y no debe considerarse una dependencia funcional del sistema.

---

## 2. Esquema relacional de la tabla Rentals (1FN)

La tabla en su estado actual representa el esquema en 1FN. Todos los atributos son atomicos, por lo que cumple la Primera Forma Normal. Sin embargo, existen dependencias parciales que impiden que este en 2FN.

**Rentals** ( **RentalID**, **Title**, CustomerID, MailedOutDate, Director, MovieCategory, Price )

---

## 3. Dependencias funcionales — Cierre X+

| Atributo | Depende de |
|---|---|
| RentalID | X+, PK |
| Title | X+, PK |
| CustomerID | RentalID |
| MailedOutDate | RentalID |
| Director | Title |
| MovieCategory | Title |
| Price | MovieCategory |

`CustomerID` y `MailedOutDate` dependen parcialmente de `RentalID`. `Director` y `MovieCategory` dependen parcialmente de `Title`. `Price` depende directamente de `MovieCategory`, generando la cadena transitiva `Title -> MovieCategory -> Price`.

**{RentalID, Title}+** = { RentalID, Title, CustomerID, MailedOutDate, Director, MovieCategory, Price }

El cierre abarca todos los atributos, confirmando **(RentalID, Title)** como clave candidata.

---

## 4. Diagrama de dependencias funcionales para 1FN

| Determinante | Atributos que determina | Tipo |
|---|---|---|
| RentalID | CustomerID, MailedOutDate | Parcial |
| Title | Director, MovieCategory | Parcial |
| MovieCategory | Price | Transitiva |
| (RentalID, Title) | Todos | Completa |

---

## 5. Descomposicion a 3FN

**Paso 1 — Separacion a 2FN: eliminacion de dependencias parciales**

**RENTAL**

| **RentalID** | CustomerID | MailedOutDate |
|---|---|---|
| 1 | 1001 | 3/3/2010 |
| 2 | 1002 | 3/4/2010 |
| 3 | 1003 | 1/7/2011 |
| 4 | 1001 | 1/7/2011 |

**MOVIE**

| **Title** | Director | MovieCategory | Price |
|---|---|---|---|
| Die Hard | John McTiernan | Old | $4.25 |
| The Last Man Standing | Walter Hill | Old | $4.25 |
| Wedding Crashers | David Dobkin | New | $5.50 |
| Dodgeball | Rawson Marshall Thurber | New | $5.50 |
| As Good as It Gets | James Brooks | Old | $4.25 |
| Forest Gump | Robert Zemeckis | Old | $4.25 |

**RENTAL_MOVIE**

| **RentalID** | **Title** |
|---|---|
| 1 | Die Hard |
| 1 | The Last Man Standing |
| 1 | Wedding Crashers |
| 2 | Dodgeball |
| 2 | Die Hard |
| 3 | As Good as It Gets |
| 4 | Forest Gump |

**Paso 2 — Dependencias transitivas en 2FN**

| Atributo | Depende de |
|---|---|
| CustomerID | no |
| MailedOutDate | no |
| Director | no |
| Price | MovieCategory |

En MOVIE persiste `Title -> MovieCategory -> Price`. `Price` no depende directamente de `Title` sino de `MovieCategory`.

**Paso 3 — Separacion a 3FN: eliminacion de dependencias transitivas**

**RENTAL** *(sin cambios)*

| **RentalID** | CustomerID | MailedOutDate |
|---|---|---|
| 1 | 1001 | 3/3/2010 |
| 2 | 1002 | 3/4/2010 |
| 3 | 1003 | 1/7/2011 |
| 4 | 1001 | 1/7/2011 |

**CATEGORY** *(nueva)*

| **MovieCategory** | Price |
|---|---|
| Old | $4.25 |
| New | $5.50 |

**MOVIE** *(actualizada)*

| **Title** | Director | MovieCategory |
|---|---|---|
| Die Hard | John McTiernan | Old |
| The Last Man Standing | Walter Hill | Old |
| Wedding Crashers | David Dobkin | New |
| Dodgeball | Rawson Marshall Thurber | New |
| As Good as It Gets | James Brooks | Old |
| Forest Gump | Robert Zemeckis | Old |

**RENTAL_MOVIE** *(sin cambios)*

| **RentalID** | **Title** |
|---|---|
| 1 | Die Hard |
| 1 | The Last Man Standing |
| 1 | Wedding Crashers |
| 2 | Dodgeball |
| 2 | Die Hard |
| 3 | As Good as It Gets |
| 4 | Forest Gump |

**Esquema relacional en 3FN:**

**RENTAL** ( **RentalID**, CustomerID, MailedOutDate )

**CATEGORY** ( **MovieCategory**, Price )

**MOVIE** ( **Title**, Director, MovieCategory -> *FK a CATEGORY* )

**RENTAL\_MOVIE** ( **RentalID** -> *FK a RENTAL*, **Title** -> *FK a MOVIE* )

---

## 6. Descomposicion en BCNF en lugar de 3FN

La diferencia fundamental entre 3FN y BCNF es que la 3FN permite dependencias transitivas directas siempre que el atributo del que se depende forme parte de alguna llave candidata. BCNF es mas estricta: exige que todo determinante sea una superllave, lo que incluye eliminar las **dependencias pseudo-transitivas**.

Una dependencia pseudo-transitiva ocurre cuando existe una cadena del tipo `X -> Y` y `WY -> Z`, de donde se puede inferir `WX -> Z` sin que `WX` sea necesariamente una superllave. En la tabla MOVIE, si se aceptara `Director -> Title` como valida (Director como llave candidata alternativa), se generaria la cadena:

`Title -> Director` y `Director -> MovieCategory`

Lo que implica pseudo-transitivamente `Title -> MovieCategory` a traves de Director. En 3FN esto se permite porque `MovieCategory` ya fue extraida como tabla independiente y `Director` queda como atributo de MOVIE. En BCNF, como `Director` seria determinante pero no superllave de MOVIE, se forzaria una descomposicion adicional:

**DIRECTOR** *(nueva en BCNF)*

| **Director** | Title |
|---|---|
| John McTiernan | Die Hard |
| Walter Hill | The Last Man Standing |
| David Dobkin | Wedding Crashers |
| Rawson Marshall Thurber | Dodgeball |
| James Brooks | As Good as It Gets |
| Robert Zemeckis | Forest Gump |

**MOVIE** *(en BCNF, sin Director)*

| **Title** | MovieCategory |
|---|---|
| Die Hard | Old |
| The Last Man Standing | Old |
| Wedding Crashers | New |
| Dodgeball | New |
| As Good as It Gets | Old |
| Forest Gump | Old |

**Esquema relacional en BCNF:**

**RENTAL** ( **RentalID**, CustomerID, MailedOutDate )

**DIRECTOR** ( **Director**, Title -> *FK a MOVIE* )

**MOVIE** ( **Title**, MovieCategory -> *FK a CATEGORY* )

**CATEGORY** ( **MovieCategory**, Price )

**RENTAL\_MOVIE** ( **RentalID** -> *FK a RENTAL*, **Title** -> *FK a MOVIE* )

Lo que BCNF resuelve especificamente frente a 3FN es precisamente la pseudo-transitividad: garantiza que ningun determinante que no sea superllave permanezca en la tabla, eliminando rutas de inferencia indirectas entre atributos que en 3FN podrian quedar sin descomponer.
