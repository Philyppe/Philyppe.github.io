---
title: 'Modelo EER – Taller de Reparación de Vehículos (v4)'
excerpt: Diseño del Modelo Entidad-Relación Extendido para un taller de reparación de vehículos en la Universidad El Bosque, gestionando clientes, automóviles, técnicos, órdenes de trabajo, facturas y componentes especializados.
publishDate: '2026-05-22'
tags: ['EER', 'modelado', 'taller-v4']
---

## Contexto del ejercicio

En el estacionamiento de la Universidad El Bosque se piensa implementar un espacio para la reparación de vehículos de los estudiantes, profesores y visitantes al centro médico Los Cobos. Se requiere diseñar el modelo de datos de una base de datos relacional que maneje la información de clientes, automóviles, técnicos especializados y los componentes usados en cada servicio.

### Proceso de servicio

1. Al llegar al taller se registran los datos del **propietario**: número de identificación (NI), nombre completo, dirección postal y teléfono. Del **automóvil** se registran la placa, la marca y el color. También se registra la fecha y hora de ingreso.
2. Se asigna un **técnico principal** disponible para realizar el diagnóstico de los daños.
3. El técnico principal puede solicitar el apoyo de otros **especialistas** para asistirlo en la reparación.
4. Los técnicos participantes registran en una **orden de trabajo** los componentes utilizados y el costo de la mano de obra.
5. Al finalizar, se genera la **factura** con: información del cliente, datos del técnico, desglose de componentes con precio unitario, costo de mano de obra, impuesto del 21 % y el total expresado en USD y EUR.
6. Todos los **componentes** comparten código, nombre y precio, pero se diferencian en categorías con atributos propios:
   - **Aceites**: densidad.
   - **Filtros**: tipo (aire, aceite, combustible).
   - **Baterías**: amperaje y voltaje.
   - **Neumáticos**: ancho, perfil y diámetro.
