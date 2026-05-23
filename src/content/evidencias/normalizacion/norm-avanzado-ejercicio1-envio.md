---
title: "Normalizacion Avanzada – Ejercicio 1: Sistema de Envio Internacional (LOGISTIC SYSTEMS)"
excerpt: Normalizacion desde 0FN hasta 3FN de un sistema de envio internacional con 43 atributos, grupos repetidos de paquetes y grupos repetidos anidados de eventos de rastreo.
publishDate: '2026-05-22'
tags: ['normalizacion', '1FN', '2FN', '3FN', 'avanzado']
---

## Contexto del ejercicio

La empresa **LOGISTIC SYSTEMS S.A.S.** presta servicios de envio puerta a puerta entre ciudades y paises. Cada guia de envio puede amparar varios paquetes, es despachada por un empleado en un vehiculo determinado y va asociada a un plan tarifario que depende de la zona de destino. El sistema registra cada evento de rastreo (recogida, transito, aduana, entrega) y el medio de pago del cliente remitente.

Toda la informacion se encuentra en una unica relacion sin normalizar:

```
ENVIO(num_guia, fecha_guia, hora_guia,
      orgn_nit, orgn_nombre, orgn_actividad, orgn_ciudad, orgn_pais,
      orgn_direccion, orgn_telefono, orgn_celular,
      dest_id, dest_nombre, dest_cod_ciudad, dest_ciudad, dest_pais,
      dest_direccion, dest_telefono, dest_km_desde_origen,
      cod_zona, nombre_zona, tarifa_base_zona,
      cod_empleado, nombre_empleado, licencia_empleado,
      placa_vehiculo, tipo_vehiculo, capacidad_vehiculo,
      cod_paquete, tipo_paquete, nombre_paquete, descripcion_paquete,
      peso_paquete, valor_declarado, cant_unidades, valor_flete_paquete,
      cod_evento, fecha_evento, estado_evento, descripcion_evento,
      cod_pago, metodo_pago, valor_pagado)
```

**Muestra de datos:**

| num_guia | fecha | orgn_nit | orgn_ciudad | dest_id | dest_ciudad | cod_zona | cod_paquete | tipo_paquete | peso | flete | cod_evento | estado_evento |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G-5001 | 02/03/26 | 900111 | Bogota | D-77 | Madrid | Z3 | P-10 | Documento | 0.5 | 85.000 | E1 | Recogido |
| G-5001 | 02/03/26 | 900111 | Bogota | D-77 | Madrid | Z3 | P-10 | Documento | 0.5 | 85.000 | E2 | En aduana |
| G-5001 | 02/03/26 | 900111 | Bogota | D-77 | Madrid | Z3 | P-11 | Caja pequena | 3.0 | 210.000 | E1 | Recogido |
| G-5001 | 02/03/26 | 900111 | Bogota | D-77 | Madrid | Z3 | P-11 | Caja pequena | 3.0 | 210.000 | E3 | Entregado |
| G-5002 | 03/03/26 | 800234 | Medellin | D-88 | Lima | Z2 | P-15 | Caja mediana | 8.0 | 340.000 | E1 | Recogido |
| G-5003 | 03/03/26 | 900111 | Bogota | D-90 | Cali | Z1 | P-20 | Sobre | 0.2 | 28.000 | E3 | Entregado |

---

## Forma normal actual

La relacion se encuentra en **forma no normalizada (0FN)** porque contiene dos niveles de grupos repetidos:

- **Grupo repetido de primer nivel**: `cod_paquete` y sus atributos (`tipo_paquete`, `nombre_paquete`, `descripcion_paquete`, `peso_paquete`, `valor_declarado`, `cant_unidades`, `valor_flete_paquete`). Una guia puede amparar varios paquetes.
- **Grupo repetido anidado**: `cod_evento` y sus atributos (`fecha_evento`, `estado_evento`, `descripcion_evento`). Cada paquete puede tener varios eventos de rastreo dentro de la misma guia.

Adicionalmente, incluso si se eliminaran los grupos repetidos, la relacion tampoco cumpliria 2FN ni 3FN por las multiples cadenas de dependencias parciales y transitivas que se detallan a continuacion.

---

## 1. Llave primaria y dependencias directas — Cierre X+

La llave primaria minima compuesta es **(num_guia, cod_paquete, cod_evento)** porque:
- `num_guia` solo no es suficiente: una guia tiene multiples paquetes.
- `(num_guia, cod_paquete)` solo no es suficiente: un paquete tiene multiples eventos dentro de la misma guia.
- `(num_guia, cod_paquete, cod_evento)` identifica de forma unica cada fila de la muestra.

**{num_guia, cod_paquete, cod_evento}+** = todos los 43 atributos de la relacion.

| Atributo | Depende de |
|---|---|
| num_guia | X+, PK |
| fecha_guia | num_guia |
| hora_guia | num_guia |
| orgn_nit | num_guia |
| orgn_nombre | orgn_nit |
| orgn_actividad | orgn_nit |
| orgn_ciudad | orgn_nit |
| orgn_pais | orgn_nit |
| orgn_direccion | orgn_nit |
| orgn_telefono | orgn_nit |
| orgn_celular | orgn_nit |
| dest_id | num_guia |
| dest_nombre | dest_id |
| dest_cod_ciudad | dest_id |
| dest_ciudad | dest_cod_ciudad |
| dest_pais | dest_cod_ciudad |
| dest_direccion | dest_id |
| dest_telefono | dest_id |
| dest_km_desde_origen | dest_cod_ciudad |
| cod_zona | dest_cod_ciudad |
| nombre_zona | cod_zona |
| tarifa_base_zona | cod_zona |
| cod_empleado | num_guia |
| nombre_empleado | cod_empleado |
| licencia_empleado | cod_empleado |
| placa_vehiculo | num_guia |
| tipo_vehiculo | placa_vehiculo |
| capacidad_vehiculo | placa_vehiculo |
| cod_paquete | X+, PK |
| tipo_paquete | cod_paquete |
| nombre_paquete | cod_paquete |
| descripcion_paquete | cod_paquete |
| peso_paquete | cod_paquete |
| valor_declarado | cod_paquete |
| cant_unidades | cod_paquete |
| valor_flete_paquete | cod_paquete |
| cod_evento | X+, PK |
| fecha_evento | (num_guia, cod_paquete, cod_evento) |
| estado_evento | (num_guia, cod_paquete, cod_evento) |
| descripcion_evento | (num_guia, cod_paquete, cod_evento) |
| cod_pago | num_guia |
| metodo_pago | cod_pago |
| valor_pagado | cod_pago |

---

## 2. Separacion a 1FN — Eliminacion de grupos repetidos

Se eliminan los grupos repetidos creando tablas separadas con sus propias claves. La relacion plana resultante tiene clave **(num_guia, cod_paquete, cod_evento)**:

**ENVIO_1FN** (tabla plana con todos los atributos, PK compuesta)

| **num_guia** | **cod_paquete** | **cod_evento** | fecha_guia | orgn_nit | dest_id | cod_empleado | placa_vehiculo | cod_pago | tipo_paquete | peso_paquete | flete | fecha_evento | estado_evento |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G-5001 | P-10 | E1 | 02/03/26 | 900111 | D-77 | E01 | ABC123 | PAG01 | Documento | 0.5 | 85.000 | 02/03/26 | Recogido |
| G-5001 | P-10 | E2 | 02/03/26 | 900111 | D-77 | E01 | ABC123 | PAG01 | Documento | 0.5 | 85.000 | 03/03/26 | En aduana |
| G-5001 | P-11 | E1 | 02/03/26 | 900111 | D-77 | E01 | ABC123 | PAG01 | Caja pequena | 3.0 | 210.000 | 02/03/26 | Recogido |
| G-5001 | P-11 | E3 | 02/03/26 | 900111 | D-77 | E01 | ABC123 | PAG01 | Caja pequena | 3.0 | 210.000 | 05/03/26 | Entregado |

La tabla esta en 1FN pero presenta multiples **dependencias parciales** (atributos que dependen de solo una parte de la clave compuesta).

---

## 3. Separacion a 2FN — Eliminacion de dependencias parciales

Se identifican tres grupos de dependencias parciales:

**Parciales sobre num_guia**: `fecha_guia`, `hora_guia`, `orgn_nit` y todos sus atributos derivados, `dest_id` y todos sus derivados, `cod_zona` y derivados, `cod_empleado` y derivados, `placa_vehiculo` y derivados, `cod_pago` y derivados.

**Parciales sobre cod_paquete**: `tipo_paquete`, `nombre_paquete`, `descripcion_paquete`, `peso_paquete`, `valor_declarado`, `cant_unidades`, `valor_flete_paquete`.

**Dependencia completa**: `fecha_evento`, `estado_evento`, `descripcion_evento` dependen de los tres atributos de la clave.

Se generan las siguientes tablas en 2FN:

**GUIA** *(depende de num_guia)*

| **num_guia** | fecha_guia | hora_guia | orgn_nit | orgn_nombre | orgn_actividad | orgn_ciudad | orgn_pais | orgn_direccion | orgn_telefono | orgn_celular | dest_id | dest_nombre | dest_cod_ciudad | dest_ciudad | dest_pais | dest_direccion | dest_telefono | dest_km_desde_origen | cod_zona | nombre_zona | tarifa_base_zona | cod_empleado | nombre_empleado | licencia_empleado | placa_vehiculo | tipo_vehiculo | capacidad_vehiculo | cod_pago | metodo_pago | valor_pagado |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G-5001 | 02/03/26 | 08:00 | 900111 | Empresa A | Comercio | Bogota | Colombia | Cra 7 #1 | 3001111111 | 3002222222 | D-77 | Juan P. | C-MAD | Madrid | Espana | Calle Gran Via | 34900000001 | 9200 | Z3 | Europa | 180.000 | E01 | Carlos R. | LIC-001 | ABC123 | Furgo | 1200 | PAG01 | Transferencia | 295.000 |
| G-5002 | 03/03/26 | 10:30 | 800234 | Empresa B | Industria | Medellin | Colombia | Av. El Poblado | 3004444444 | 3005555555 | D-88 | Maria G. | C-LIM | Lima | Peru | Av. Larco | 51912345678 | 1900 | Z2 | Sudamerica | 95.000 | E02 | Laura M. | LIC-002 | XYZ789 | Camion | 5000 | PAG02 | Efectivo | 340.000 |
| G-5003 | 03/03/26 | 14:00 | 900111 | Empresa A | Comercio | Bogota | Colombia | Cra 7 #1 | 3001111111 | 3002222222 | D-90 | Pedro S. | C-CAL | Cali | Colombia | Cra 5 #15 | 3157778888 | 470 | Z1 | Nacional | 35.000 | E01 | Carlos R. | LIC-001 | ABC123 | Furgo | 1200 | PAG03 | Tarjeta | 93.000 |

**PAQUETE** *(depende de cod_paquete)*

| **cod_paquete** | tipo_paquete | nombre_paquete | descripcion_paquete | peso_paquete | valor_declarado | cant_unidades | valor_flete_paquete |
|---|---|---|---|---|---|---|---|
| P-10 | Documento | Contrato | Contrato firmado | 0.5 | 500.000 | 1 | 85.000 |
| P-11 | Caja pequena | Repuesto | Pieza mecanica | 3.0 | 1.200.000 | 2 | 210.000 |
| P-15 | Caja mediana | Ropa | Prendas de vestir | 8.0 | 800.000 | 5 | 340.000 |
| P-20 | Sobre | Factura | Documento comercial | 0.2 | 50.000 | 1 | 28.000 |

**GUIA_PAQUETE** *(relacion entre guia y paquetes que ampara)*

| **num_guia** | **cod_paquete** |
|---|---|
| G-5001 | P-10 |
| G-5001 | P-11 |
| G-5002 | P-15 |
| G-5003 | P-20 |
| G-5003 | P-21 |

**EVENTO** *(depende de la clave completa)*

| **num_guia** | **cod_paquete** | **cod_evento** | fecha_evento | estado_evento | descripcion_evento |
|---|---|---|---|---|---|
| G-5001 | P-10 | E1 | 02/03/26 | Recogido | Paquete recogido en origen |
| G-5001 | P-10 | E2 | 03/03/26 | En aduana | Retenido en aduana de Madrid |
| G-5001 | P-11 | E1 | 02/03/26 | Recogido | Paquete recogido en origen |
| G-5001 | P-11 | E3 | 05/03/26 | Entregado | Entregado al destinatario |
| G-5002 | P-15 | E1 | 03/03/26 | Recogido | Paquete recogido en origen |
| G-5003 | P-20 | E3 | 05/03/26 | Entregado | Entregado al destinatario |

Las cuatro tablas estan en **2FN**. Sin embargo, la tabla GUIA contiene multiples cadenas de dependencias transitivas.

---

## 4. Dependencias transitivas en 2FN

La tabla GUIA presenta las siguientes cadenas transitivas:

| Atributo | Depende de |
|---|---|
| orgn_nombre | orgn_nit |
| orgn_actividad | orgn_nit |
| orgn_ciudad | orgn_nit |
| orgn_pais | orgn_nit |
| orgn_direccion | orgn_nit |
| orgn_telefono | orgn_nit |
| orgn_celular | orgn_nit |
| dest_nombre | dest_id |
| dest_cod_ciudad | dest_id |
| dest_direccion | dest_id |
| dest_telefono | dest_id |
| dest_ciudad | dest_cod_ciudad |
| dest_pais | dest_cod_ciudad |
| dest_km_desde_origen | dest_cod_ciudad |
| cod_zona | dest_cod_ciudad |
| nombre_zona | cod_zona |
| tarifa_base_zona | cod_zona |
| nombre_empleado | cod_empleado |
| licencia_empleado | cod_empleado |
| tipo_vehiculo | placa_vehiculo |
| capacidad_vehiculo | placa_vehiculo |
| metodo_pago | cod_pago |
| valor_pagado | cod_pago |

Las tablas **PAQUETE**, **GUIA_PAQUETE** y **EVENTO** no presentan dependencias transitivas.

---

## 5. Separacion a 3FN — Eliminacion de dependencias transitivas

Se extraen todos los determinantes intermedios de GUIA a sus propias tablas:

**REMITENTE** *(nueva — extraida por orgn_nit)*

| **orgn_nit** | orgn_nombre | orgn_actividad | orgn_ciudad | orgn_pais | orgn_direccion | orgn_telefono | orgn_celular |
|---|---|---|---|---|---|---|---|
| 900111 | Empresa A | Comercio | Bogota | Colombia | Cra 7 #1 | 3001111111 | 3002222222 |
| 800234 | Empresa B | Industria | Medellin | Colombia | Av. El Poblado | 3004444444 | 3005555555 |

**CIUDAD_DESTINO** *(nueva — extraida por dest_cod_ciudad)*

| **dest_cod_ciudad** | dest_ciudad | dest_pais | dest_km_desde_origen | cod_zona |
|---|---|---|---|---|
| C-MAD | Madrid | Espana | 9200 | Z3 |
| C-LIM | Lima | Peru | 1900 | Z2 |
| C-CAL | Cali | Colombia | 470 | Z1 |

**ZONA** *(nueva — extraida por cod_zona)*

| **cod_zona** | nombre_zona | tarifa_base_zona |
|---|---|---|
| Z1 | Nacional | 35.000 |
| Z2 | Sudamerica | 95.000 |
| Z3 | Europa | 180.000 |

**DESTINATARIO** *(nueva — extraida por dest_id)*

| **dest_id** | dest_nombre | dest_cod_ciudad | dest_direccion | dest_telefono |
|---|---|---|---|---|
| D-77 | Juan P. | C-MAD | Calle Gran Via | 34900000001 |
| D-88 | Maria G. | C-LIM | Av. Larco | 51912345678 |
| D-90 | Pedro S. | C-CAL | Cra 5 #15 | 3157778888 |

**EMPLEADO** *(nueva — extraida por cod_empleado)*

| **cod_empleado** | nombre_empleado | licencia_empleado |
|---|---|---|
| E01 | Carlos R. | LIC-001 |
| E02 | Laura M. | LIC-002 |

**VEHICULO** *(nueva — extraida por placa_vehiculo)*

| **placa_vehiculo** | tipo_vehiculo | capacidad_vehiculo |
|---|---|---|
| ABC123 | Furgo | 1200 |
| XYZ789 | Camion | 5000 |

**PAGO** *(nueva — extraida por cod_pago)*

| **cod_pago** | metodo_pago | valor_pagado |
|---|---|---|
| PAG01 | Transferencia | 295.000 |
| PAG02 | Efectivo | 340.000 |
| PAG03 | Tarjeta | 93.000 |

**GUIA** *(actualizada — solo atributos directos)*

| **num_guia** | fecha_guia | hora_guia | orgn_nit | dest_id | cod_empleado | placa_vehiculo | cod_pago |
|---|---|---|---|---|---|---|---|
| G-5001 | 02/03/26 | 08:00 | 900111 | D-77 | E01 | ABC123 | PAG01 |
| G-5002 | 03/03/26 | 10:30 | 800234 | D-88 | E02 | XYZ789 | PAG02 |
| G-5003 | 03/03/26 | 14:00 | 900111 | D-90 | E01 | ABC123 | PAG03 |

**PAQUETE** *(sin cambios)*

| **cod_paquete** | tipo_paquete | nombre_paquete | descripcion_paquete | peso_paquete | valor_declarado | cant_unidades | valor_flete_paquete |
|---|---|---|---|---|---|---|---|
| P-10 | Documento | Contrato | Contrato firmado | 0.5 | 500.000 | 1 | 85.000 |
| P-11 | Caja pequena | Repuesto | Pieza mecanica | 3.0 | 1.200.000 | 2 | 210.000 |
| P-15 | Caja mediana | Ropa | Prendas de vestir | 8.0 | 800.000 | 5 | 340.000 |
| P-20 | Sobre | Factura | Documento comercial | 0.2 | 50.000 | 1 | 28.000 |

**GUIA_PAQUETE** *(sin cambios)*

| **num_guia** | **cod_paquete** |
|---|---|
| G-5001 | P-10 |
| G-5001 | P-11 |
| G-5002 | P-15 |
| G-5003 | P-20 |
| G-5003 | P-21 |

**EVENTO** *(sin cambios)*

| **num_guia** | **cod_paquete** | **cod_evento** | fecha_evento | estado_evento | descripcion_evento |
|---|---|---|---|---|---|
| G-5001 | P-10 | E1 | 02/03/26 | Recogido | Paquete recogido en origen |
| G-5001 | P-10 | E2 | 03/03/26 | En aduana | Retenido en aduana de Madrid |
| G-5001 | P-11 | E1 | 02/03/26 | Recogido | Paquete recogido en origen |
| G-5001 | P-11 | E3 | 05/03/26 | Entregado | Entregado al destinatario |
| G-5002 | P-15 | E1 | 03/03/26 | Recogido | Paquete recogido en origen |
| G-5003 | P-20 | E3 | 05/03/26 | Entregado | Entregado al destinatario |

---

## 6. Modelo final

Once tablas en **3FN**:

**ZONA** ( **cod_zona**, nombre_zona, tarifa_base_zona )

**CIUDAD_DESTINO** ( **dest_cod_ciudad**, dest_ciudad, dest_pais, dest_km_desde_origen, cod_zona -> *FK a ZONA* )

**REMITENTE** ( **orgn_nit**, orgn_nombre, orgn_actividad, orgn_ciudad, orgn_pais, orgn_direccion, orgn_telefono, orgn_celular )

**DESTINATARIO** ( **dest_id**, dest_nombre, dest_cod_ciudad -> *FK a CIUDAD_DESTINO*, dest_direccion, dest_telefono )

**EMPLEADO** ( **cod_empleado**, nombre_empleado, licencia_empleado )

**VEHICULO** ( **placa_vehiculo**, tipo_vehiculo, capacidad_vehiculo )

**PAGO** ( **cod_pago**, metodo_pago, valor_pagado )

**GUIA** ( **num_guia**, fecha_guia, hora_guia, orgn_nit -> *FK a REMITENTE*, dest_id -> *FK a DESTINATARIO*, cod_empleado -> *FK a EMPLEADO*, placa_vehiculo -> *FK a VEHICULO*, cod_pago -> *FK a PAGO* )

**PAQUETE** ( **cod_paquete**, tipo_paquete, nombre_paquete, descripcion_paquete, peso_paquete, valor_declarado, cant_unidades, valor_flete_paquete )

**GUIA_PAQUETE** ( **num_guia** -> *FK a GUIA*, **cod_paquete** -> *FK a PAQUETE* )

**EVENTO** ( **num_guia** -> *FK a GUIA*, **cod_paquete** -> *FK a PAQUETE*, **cod_evento**, fecha_evento, estado_evento, descripcion_evento )
