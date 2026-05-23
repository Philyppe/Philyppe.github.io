---
title: "Normalizacion Avanzada – Ejercicio 2: Sistema Integral de Video Club (STREAM&GO)"
excerpt: Normalizacion desde 0FN hasta 3FN de un sistema de alquiler de peliculas con 36 atributos, grupos repetidos de casetes, categorias multiples por pelicula y actores multiples por pelicula.
publishDate: '2026-05-22'
tags: ['normalizacion', '1FN', '2FN', '3FN', 'avanzado']
---

## Contexto del ejercicio

La cadena **STREAM&GO** administra varios locales fisicos que alquilan peliculas en formato DVD y Blu-ray. Cada pelicula puede tener varias copias fisicas (casetes), varios actores protagonicos con roles distintos, un director y pertenecer a una o mas categorias. Los clientes se afilian con una membresia que determina un plan tarifario y una tarifa por dia de alquiler. Cada alquiler registra los casetes entregados, fechas de prestamo, devolucion pactada, devolucion real y recargos por mora.

Toda la informacion esta contenida en una sola tabla sin normalizar:

```
ALQUILER(cod_alquiler, fecha_alquiler, num_membresia, cod_cliente,
         nom_cliente, dir_cliente, tel_cliente, email_cliente,
         cod_plan, nombre_plan, tarifa_dia_plan, dias_prestamo_max,
         cod_sucursal, nombre_sucursal, direccion_sucursal, ciudad_sucursal,
         cod_cassette, formato_cassette, estado_cassette,
         cod_pelicula, titulo_pelicula, anio_pelicula,
         cod_director, nombre_director, nacionalidad_director,
         cod_categoria, nombre_categoria, recargo_categoria,
         cod_actor, nombre_actor, fecha_nac_actor, rol_en_pelicula,
         fecha_prog_dev, fecha_real_dev, dias_retraso, recargo_mora)
```

**Muestra de datos:**

| cod_alq | num_memb | cod_plan | cod_suc | cod_cas | cod_peli | titulo | cod_dir | cod_cat | cod_actor | rol | recargo_mora |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A-100 | M-01 | PL-ORO | S1 | C-501 | P-900 | Inception | D-10 | CI-FI | AC-21 | Cobb | 0 |
| A-100 | M-01 | PL-ORO | S1 | C-501 | P-900 | Inception | D-10 | ACC | AC-21 | Cobb | 0 |
| A-100 | M-01 | PL-ORO | S1 | C-501 | P-900 | Inception | D-10 | CI-FI | AC-22 | Ariadne | 0 |
| A-100 | M-01 | PL-ORO | S1 | C-610 | P-901 | Titanic | D-11 | DRA | AC-30 | Jack | 0 |
| A-100 | M-01 | PL-ORO | S1 | C-610 | P-901 | Titanic | D-11 | DRA | AC-31 | Rose | 0 |
| A-101 | M-02 | PL-PLA | S2 | C-720 | P-902 | Toy Story | D-12 | ANI | AC-40 | Woody (voz) | 8.000 |
| A-102 | M-01 | PL-ORO | S1 | C-501 | P-900 | Inception | D-10 | CI-FI | AC-21 | Cobb | 0 |

---

## Forma normal actual

La relacion se encuentra en **forma no normalizada (0FN)** porque contiene tres grupos repetidos en paralelo:

- **Grupo repetido 1**: `cod_cassette` y sus atributos. Un alquiler puede incluir varios casetes.
- **Grupo repetido 2**: `cod_categoria` y sus atributos. Una pelicula puede pertenecer a varias categorias.
- **Grupo repetido 3**: `cod_actor` y sus atributos. Una pelicula puede tener varios actores protagonicos.

La combinacion de estos tres grupos es la razon por la que la llave primaria minima requiere cuatro atributos.

---

## 1. Llave primaria y dependencias directas — Cierre X+

La llave primaria minima compuesta es **(cod_alquiler, cod_cassette, cod_actor, cod_categoria)** porque:
- `(cod_alquiler, cod_cassette)` no es suficiente: un casete tiene multiples actores y categorias, generando filas repetidas.
- `(cod_alquiler, cod_cassette, cod_actor)` no es suficiente: el mismo actor puede aparecer en multiples filas si la pelicula tiene varias categorias (como AC-21 Cobb aparece en CI-FI y ACC para el mismo alquiler y casete).
- `(cod_alquiler, cod_cassette, cod_actor, cod_categoria)` identifica de forma unica cada fila de la muestra.

**{cod_alquiler, cod_cassette, cod_actor, cod_categoria}+** = todos los 36 atributos de la relacion.

| Atributo | Depende de |
|---|---|
| cod_alquiler | X+, PK |
| fecha_alquiler | cod_alquiler |
| num_membresia | cod_alquiler |
| cod_cliente | num_membresia |
| nom_cliente | cod_cliente |
| dir_cliente | cod_cliente |
| tel_cliente | cod_cliente |
| email_cliente | cod_cliente |
| cod_plan | num_membresia |
| nombre_plan | cod_plan |
| tarifa_dia_plan | cod_plan |
| dias_prestamo_max | cod_plan |
| cod_sucursal | cod_alquiler |
| nombre_sucursal | cod_sucursal |
| direccion_sucursal | cod_sucursal |
| ciudad_sucursal | cod_sucursal |
| cod_cassette | X+, PK |
| formato_cassette | cod_cassette |
| estado_cassette | cod_cassette |
| cod_pelicula | cod_cassette |
| titulo_pelicula | cod_pelicula |
| anio_pelicula | cod_pelicula |
| cod_director | cod_pelicula |
| nombre_director | cod_director |
| nacionalidad_director | cod_director |
| cod_categoria | X+, PK |
| nombre_categoria | cod_categoria |
| recargo_categoria | cod_categoria |
| cod_actor | X+, PK |
| nombre_actor | cod_actor |
| fecha_nac_actor | cod_actor |
| rol_en_pelicula | (cod_pelicula, cod_actor) |
| fecha_prog_dev | (cod_alquiler, cod_cassette) |
| fecha_real_dev | (cod_alquiler, cod_cassette) |
| dias_retraso | (cod_alquiler, cod_cassette) |
| recargo_mora | (cod_alquiler, cod_cassette, cod_categoria) |

---

## 2. Separacion a 1FN — Eliminacion de grupos repetidos

Se aplana la tabla incluyendo una fila por cada combinacion unica de alquiler, casete, actor y categoria. La clave compuesta es **(cod_alquiler, cod_cassette, cod_actor, cod_categoria)**. Todos los valores son atomicos: la tabla cumple 1FN.

Sin embargo, la tabla 1FN presenta multiples **dependencias parciales** sobre distintas partes de la clave de cuatro atributos.

---

## 3. Separacion a 2FN — Eliminacion de dependencias parciales

Se identifican los siguientes grupos de dependencias parciales:

**Parciales sobre cod_alquiler**: `fecha_alquiler`, `num_membresia`, y todos sus atributos derivados en cadena, `cod_sucursal` y todos sus derivados.

**Parciales sobre cod_cassette**: `formato_cassette`, `estado_cassette`, `cod_pelicula` y todos sus atributos derivados en cadena.

**Parciales sobre cod_categoria**: `nombre_categoria`, `recargo_categoria`.

**Parciales sobre cod_actor**: `nombre_actor`, `fecha_nac_actor`.

**Parciales sobre (cod_alquiler, cod_cassette)**: `fecha_prog_dev`, `fecha_real_dev`, `dias_retraso`, `recargo_mora`.

**Parciales sobre (cod_pelicula, cod_actor)**: `rol_en_pelicula`.

Se generan las siguientes tablas en 2FN:

**ALQUILER** *(parcial sobre cod_alquiler — aun con transitivas)*

| **cod_alquiler** | fecha_alquiler | num_membresia | cod_cliente | nom_cliente | dir_cliente | tel_cliente | email_cliente | cod_plan | nombre_plan | tarifa_dia_plan | dias_prestamo_max | cod_sucursal | nombre_sucursal | direccion_sucursal | ciudad_sucursal |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A-100 | 01/03/26 | M-01 | CLI-01 | Ana Torres | Cra 10 #5 | 3001234567 | ana@mail.com | PL-ORO | Oro | 5.000 | 7 | S1 | Norte | Calle 100 #15 | Bogota |
| A-101 | 02/03/26 | M-02 | CLI-02 | Luis Gomez | Av. 30 #8 | 3109876543 | luis@mail.com | PL-PLA | Plata | 3.500 | 5 | S2 | Sur | Calle 50 #20 | Medellin |
| A-102 | 05/03/26 | M-01 | CLI-01 | Ana Torres | Cra 10 #5 | 3001234567 | ana@mail.com | PL-ORO | Oro | 5.000 | 7 | S1 | Norte | Calle 100 #15 | Bogota |

**CASSETTE** *(parcial sobre cod_cassette — aun con transitivas)*

| **cod_cassette** | formato_cassette | estado_cassette | cod_pelicula | titulo_pelicula | anio_pelicula | cod_director | nombre_director | nacionalidad_director |
|---|---|---|---|---|---|---|---|---|
| C-501 | Blu-ray | Disponible | P-900 | Inception | 2010 | D-10 | Christopher Nolan | Britanico |
| C-610 | DVD | Alquilado | P-901 | Titanic | 1997 | D-11 | James Cameron | Canadiense |
| C-720 | DVD | Disponible | P-902 | Toy Story | 1995 | D-12 | John Lasseter | Estadounidense |

**CATEGORIA** *(parcial sobre cod_categoria)*

| **cod_categoria** | nombre_categoria | recargo_categoria |
|---|---|---|
| CI-FI | Ciencia Ficcion | 2.000 |
| ACC | Accion | 1.500 |
| DRA | Drama | 1.000 |
| ANI | Animacion | 500 |

**ACTOR** *(parcial sobre cod_actor)*

| **cod_actor** | nombre_actor | fecha_nac_actor |
|---|---|---|
| AC-21 | Leonardo DiCaprio | 11/11/1974 |
| AC-22 | Ellen Page | 21/02/1987 |
| AC-30 | Leonardo DiCaprio | 11/11/1974 |
| AC-31 | Kate Winslet | 05/10/1975 |
| AC-40 | Tom Hanks | 09/07/1956 |

**ALQUILER_CASSETTE** *(parcial sobre cod_alquiler, cod_cassette)*

| **cod_alquiler** | **cod_cassette** | fecha_prog_dev | fecha_real_dev | dias_retraso | recargo_mora |
|---|---|---|---|---|---|
| A-100 | C-501 | 08/03/26 | 08/03/26 | 0 | 0 |
| A-100 | C-610 | 08/03/26 | 08/03/26 | 0 | 0 |
| A-101 | C-720 | 07/03/26 | 09/03/26 | 2 | 8.000 |
| A-102 | C-501 | 12/03/26 | 12/03/26 | 0 | 0 |

**PELICULA_ACTOR** *(parcial sobre cod_pelicula, cod_actor)*

| **cod_pelicula** | **cod_actor** | rol_en_pelicula |
|---|---|---|
| P-900 | AC-21 | Cobb |
| P-900 | AC-22 | Ariadne |
| P-901 | AC-30 | Jack |
| P-901 | AC-31 | Rose |
| P-902 | AC-40 | Woody (voz) |

**PELICULA_CATEGORIA** *(bridge M:N entre pelicula y categoria)*

| **cod_pelicula** | **cod_categoria** |
|---|---|
| P-900 | CI-FI |
| P-900 | ACC |
| P-901 | DRA |
| P-902 | ANI |

Las siete tablas estan en **2FN**. Las tablas ALQUILER y CASSETTE contienen dependencias transitivas que se eliminan en el siguiente paso.

---

## 4. Dependencias transitivas en 2FN

**En ALQUILER:**

| Atributo | Depende de |
|---|---|
| cod_cliente | num_membresia |
| nom_cliente | cod_cliente |
| dir_cliente | cod_cliente |
| tel_cliente | cod_cliente |
| email_cliente | cod_cliente |
| cod_plan | num_membresia |
| nombre_plan | cod_plan |
| tarifa_dia_plan | cod_plan |
| dias_prestamo_max | cod_plan |
| nombre_sucursal | cod_sucursal |
| direccion_sucursal | cod_sucursal |
| ciudad_sucursal | cod_sucursal |

**En CASSETTE:**

| Atributo | Depende de |
|---|---|
| titulo_pelicula | cod_pelicula |
| anio_pelicula | cod_pelicula |
| cod_director | cod_pelicula |
| nombre_director | cod_director |
| nacionalidad_director | cod_director |

Las tablas CATEGORIA, ACTOR, ALQUILER_CASSETTE, PELICULA_ACTOR y PELICULA_CATEGORIA no presentan dependencias transitivas.

---

## 5. Separacion a 3FN — Eliminacion de dependencias transitivas

**PLAN** *(nueva — extraida de ALQUILER por cod_plan)*

| **cod_plan** | nombre_plan | tarifa_dia_plan | dias_prestamo_max |
|---|---|---|---|
| PL-ORO | Oro | 5.000 | 7 |
| PL-PLA | Plata | 3.500 | 5 |

**CLIENTE** *(nueva — extraida de ALQUILER por cod_cliente)*

| **cod_cliente** | nom_cliente | dir_cliente | tel_cliente | email_cliente |
|---|---|---|---|---|
| CLI-01 | Ana Torres | Cra 10 #5 | 3001234567 | ana@mail.com |
| CLI-02 | Luis Gomez | Av. 30 #8 | 3109876543 | luis@mail.com |

**MEMBRESIA** *(nueva — extraida de ALQUILER por num_membresia)*

| **num_membresia** | cod_cliente | cod_plan |
|---|---|---|
| M-01 | CLI-01 | PL-ORO |
| M-02 | CLI-02 | PL-PLA |

**SUCURSAL** *(nueva — extraida de ALQUILER por cod_sucursal)*

| **cod_sucursal** | nombre_sucursal | direccion_sucursal | ciudad_sucursal |
|---|---|---|---|
| S1 | Norte | Calle 100 #15 | Bogota |
| S2 | Sur | Calle 50 #20 | Medellin |

**ALQUILER** *(actualizada — solo atributos directos)*

| **cod_alquiler** | fecha_alquiler | num_membresia | cod_sucursal |
|---|---|---|---|
| A-100 | 01/03/26 | M-01 | S1 |
| A-101 | 02/03/26 | M-02 | S2 |
| A-102 | 05/03/26 | M-01 | S1 |

**DIRECTOR** *(nueva — extraida de CASSETTE por cod_director)*

| **cod_director** | nombre_director | nacionalidad_director |
|---|---|---|
| D-10 | Christopher Nolan | Britanico |
| D-11 | James Cameron | Canadiense |
| D-12 | John Lasseter | Estadounidense |

**PELICULA** *(nueva — extraida de CASSETTE por cod_pelicula)*

| **cod_pelicula** | titulo_pelicula | anio_pelicula | cod_director |
|---|---|---|---|
| P-900 | Inception | 2010 | D-10 |
| P-901 | Titanic | 1997 | D-11 |
| P-902 | Toy Story | 1995 | D-12 |

**CASSETTE** *(actualizada — solo atributos directos)*

| **cod_cassette** | formato_cassette | estado_cassette | cod_pelicula |
|---|---|---|---|
| C-501 | Blu-ray | Disponible | P-900 |
| C-610 | DVD | Alquilado | P-901 |
| C-720 | DVD | Disponible | P-902 |

**CATEGORIA** *(sin cambios)*

| **cod_categoria** | nombre_categoria | recargo_categoria |
|---|---|---|
| CI-FI | Ciencia Ficcion | 2.000 |
| ACC | Accion | 1.500 |
| DRA | Drama | 1.000 |
| ANI | Animacion | 500 |

**ACTOR** *(sin cambios)*

| **cod_actor** | nombre_actor | fecha_nac_actor |
|---|---|---|
| AC-21 | Leonardo DiCaprio | 11/11/1974 |
| AC-22 | Ellen Page | 21/02/1987 |
| AC-30 | Leonardo DiCaprio | 11/11/1974 |
| AC-31 | Kate Winslet | 05/10/1975 |
| AC-40 | Tom Hanks | 09/07/1956 |

**ALQUILER_CASSETTE** *(sin cambios)*

| **cod_alquiler** | **cod_cassette** | fecha_prog_dev | fecha_real_dev | dias_retraso | recargo_mora |
|---|---|---|---|---|---|
| A-100 | C-501 | 08/03/26 | 08/03/26 | 0 | 0 |
| A-100 | C-610 | 08/03/26 | 08/03/26 | 0 | 0 |
| A-101 | C-720 | 07/03/26 | 09/03/26 | 2 | 8.000 |
| A-102 | C-501 | 12/03/26 | 12/03/26 | 0 | 0 |

**PELICULA_ACTOR** *(sin cambios)*

| **cod_pelicula** | **cod_actor** | rol_en_pelicula |
|---|---|---|
| P-900 | AC-21 | Cobb |
| P-900 | AC-22 | Ariadne |
| P-901 | AC-30 | Jack |
| P-901 | AC-31 | Rose |
| P-902 | AC-40 | Woody (voz) |

**PELICULA_CATEGORIA** *(sin cambios)*

| **cod_pelicula** | **cod_categoria** |
|---|---|
| P-900 | CI-FI |
| P-900 | ACC |
| P-901 | DRA |
| P-902 | ANI |

---

## 6. Modelo final

Trece tablas en **3FN**:

**PLAN** ( **cod_plan**, nombre_plan, tarifa_dia_plan, dias_prestamo_max )

**CLIENTE** ( **cod_cliente**, nom_cliente, dir_cliente, tel_cliente, email_cliente )

**MEMBRESIA** ( **num_membresia**, cod_cliente -> *FK a CLIENTE*, cod_plan -> *FK a PLAN* )

**SUCURSAL** ( **cod_sucursal**, nombre_sucursal, direccion_sucursal, ciudad_sucursal )

**ALQUILER** ( **cod_alquiler**, fecha_alquiler, num_membresia -> *FK a MEMBRESIA*, cod_sucursal -> *FK a SUCURSAL* )

**DIRECTOR** ( **cod_director**, nombre_director, nacionalidad_director )

**PELICULA** ( **cod_pelicula**, titulo_pelicula, anio_pelicula, cod_director -> *FK a DIRECTOR* )

**CASSETTE** ( **cod_cassette**, formato_cassette, estado_cassette, cod_pelicula -> *FK a PELICULA* )

**CATEGORIA** ( **cod_categoria**, nombre_categoria, recargo_categoria )

**ACTOR** ( **cod_actor**, nombre_actor, fecha_nac_actor )

**ALQUILER_CASSETTE** ( **cod_alquiler** -> *FK a ALQUILER*, **cod_cassette** -> *FK a CASSETTE*, fecha_prog_dev, fecha_real_dev, dias_retraso, recargo_mora )

**PELICULA_ACTOR** ( **cod_pelicula** -> *FK a PELICULA*, **cod_actor** -> *FK a ACTOR*, rol_en_pelicula )

**PELICULA_CATEGORIA** ( **cod_pelicula** -> *FK a PELICULA*, **cod_categoria** -> *FK a CATEGORIA* )
