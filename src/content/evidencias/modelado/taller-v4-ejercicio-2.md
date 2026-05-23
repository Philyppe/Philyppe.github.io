---
title: 'Taller MER/EER – Ejercicio 2: Sistema de Gestión "Soluciones Innova"'
excerpt: Diseño del modelo Entidad-Relación Extendido para el sistema de gestión interno de la empresa de servicios tecnológicos "Soluciones Innova", contemplando clientes corporativos, servicios, contratos, gerentes de proyecto y equipos.
publishDate: '2026-05-22'
tags: ['ER', 'EER', 'modelado', 'taller-v4']
---

## Contexto del ejercicio

La empresa de servicios tecnológicos **"Soluciones Innova"** ha decidido modernizar su sistema de gestión interno. Se encarga el desarrollo de un nuevo sistema de información con las siguientes especificaciones:

### Requisitos del sistema

- **Clientes corporativos**: se registra nombre de empresa, dirección, NIT y múltiples números de teléfono de contacto.
- **Servicios**: pueden ser contratados por uno o varios clientes. El precio lo define el gerente de proyecto para cada contrato en particular. Cada servicio tiene un costo interno independiente del precio de venta y una descripción con sus objetivos principales.
- **Contratos**: registran las fechas de inicio y finalización planificadas, y el precio pactado para ese contrato específico.
- **Gerentes de proyecto**: identificados por un código de empleado. Tienen un salario fijo (que puede diferir del sueldo recomendado para su rango profesional) y un nombre. Cada gerente puede tener un superior directo de rango inmediatamente más alto.
- **Equipos de proyecto**: formados por varios gerentes de proyecto que mantienen su independencia y pueden participar en varios equipos en paralelo. Si un servicio se cancela, el equipo asociado deja de existir, pero los gerentes continúan en la base de datos (dependencia de existencia con el servicio).

---

## Diagrama EER

> 📌 **Reemplaza la imagen y el enlace a continuación con los de tu diagrama real.**

![Diagrama EER Ejercicio 2](../../../assets/images/modelodatos-ejercicio2-v4.drawio.png)

🔗 [Ver diagrama en draw.io](https://ENLACE-DEL-DIAGRAMA-AQUI)

---

## Justificación del diseño

*(Agrega aquí la justificación de las decisiones de modelado tomadas por el grupo.)*
