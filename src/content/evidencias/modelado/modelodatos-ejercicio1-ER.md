---
title: 'Modelo ER – Residuos Tóxicos'
excerpt: Diseño del Modelo Entidad-Relación para la gestión de residuos tóxicos y peligrosos, desde su producción por empresas productoras hasta su traslado y tratamiento en lugares seguros.
publishDate: '2026-05-22'
tags: ['ER', 'modelado']
---

## Contexto del ejercicio

Se desea abordar la problemática ambiental de los **residuos tóxicos y peligrosos** cuya incorrecta gestión produce daños de gran importancia en el medio ambiente y en la salud del ser humano.

La información a contemplar es la que corresponde desde que es producido el residuo por un centro o empresa productora hasta que éste se encuentra en lugar seguro, en donde recibe un tratamiento especial como puede ser la incineración, almacenamiento en depósitos de seguridad, etc.

En el sistema de información se desea considerar la información de los **productores** de residuos, los **residuos**, las **empresas transportistas** y el **traslado** de los residuos teniendo en cuenta el tipo de transporte, el envase, etc.

### Supuestos semánticos

- **Supuesto 1**: Una empresa productora produce un número amplio de residuos constituidos por un número variable de constituyentes químicos.
- **Supuesto 2**: Más de una empresa productora puede producir residuos con igual número de constituyentes químicos y con las mismas o distintas cantidades.
- **Supuesto 3**: Las empresas productoras asignan un código único a los residuos que producen. Sin embargo, más de una empresa puede asignar el mismo código a los residuos que produce.
- **Supuesto 4**: Los residuos pueden ser trasladados en su totalidad, en partes, o no ser trasladados nunca.
- **Supuesto 5**: En cada traslado la cantidad que se traslada es enviada a un único destino.
- **Supuesto 6**: En una misma fecha las empresas productoras pueden ordenar más de un traslado de un mismo o distinto residuo a un mismo o distinto destino.
- **Supuesto 7**: En cada traslado puede intervenir más de una empresa transportista; interesa conocer el medio de transporte, los kilómetros realizados y el coste del trabajo.
- **Supuesto 8**: El residuo se traslada en un tipo de envase determinado por la empresa productora que no varía a lo largo del traslado.
- **Supuesto 9**: Es interesante conocer la fecha de llegada a destino y el tratamiento al que se someten los residuos.
- **Supuesto 10**: En un traslado sólo puede trasladarse un residuo de una empresa productora.
