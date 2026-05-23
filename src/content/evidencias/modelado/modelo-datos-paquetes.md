---
title: 'Modelo ER – Empresa de Transportes de Paquetes'
excerpt: Diseño del Modelo Entidad-Relación para una empresa de transportes que reparte paquetes por toda Colombia, gestionando conductores, camiones, paquetes y ciudades destino.
publishDate: '2026-05-22'
tags: ['ER', 'modelado']
---

## Contexto del ejercicio

Se desea informatizar la gestión de una empresa de transportes que reparte paquetes por toda Colombia.

De los **conductores** se quiere guardar el número de cédula de ciudadanía, nombre, teléfono, dirección, salario y ciudad en la que vive.

De los **paquetes** transportados interesa conocer el código de paquete, descripción, destinatario y dirección del destinatario. Un conductor distribuye muchos paquetes, y un paquete sólo puede ser distribuido por un conductor.

De las **ciudades** a las que llegan los paquetes interesa guardar el código de ciudad y el nombre. Un paquete sólo puede llegar a una ciudad; sin embargo, a una ciudad pueden llegar varios paquetes.

De los **camiones** que llevan los conductores interesa conocer la matrícula, modelo, tipo y potencia. Un conductor puede conducir diferentes camiones en fechas diferentes, y un camión puede ser conducido por varios conductores.
