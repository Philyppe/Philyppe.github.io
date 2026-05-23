---
title: 'Taller MER/EER – Ejercicio 4: Discoteca "La Facultad"'
excerpt: Diseño del modelo Entidad-Relación para la gestión del catálogo musical de la taberna "La Facultad", incluyendo grabaciones, formatos, artistas y productoras.
publishDate: '2026-05-22'
tags: ['ER', 'modelado', 'taller-v4']
---

## Contexto del ejercicio

**"La Facultad"**, una taberna icónica frente a la Universidad El Bosque, es conocida por su vasta colección musical. Su dueño, *Don Juan*, desea organizar su catálogo a través de una base de datos que gestione toda su discoteca.

### Requisitos del sistema

- **Grabaciones Musicales**: se registra el título (identificador único), el género musical (rock, jazz, salsa, etc.), la cantidad de canciones y un campo de notas para detalles especiales (edición limitada, en vivo, etc.).
- **Formatos**: cada grabación puede existir en diferentes formatos (CD, vinilo, digital). Para cada formato se registra el estado de conservación (excelente, bueno, regular, etc.). Una misma grabación puede estar en varios formatos, cada uno con su propio estado de conservación.
- **Artistas**: se registra el nombre del artista y una breve biografía con sus logros más importantes. También se registra en qué grabaciones ha participado cada artista y la **fecha** de dicha participación.
- **Productoras**: toda grabación está asociada a una productora. Se registra el nombre y la dirección de la productora, identificada de forma única por un **ID de compañía**.

---

## Diagrama ER

> 📌 **Reemplaza la imagen y el enlace a continuación con los de tu diagrama real.**

![Diagrama ER Ejercicio 4](../../../assets/images/modelodatos-ejercicio4-v4.drawio.png)

🔗 [Ver diagrama en draw.io](https://ENLACE-DEL-DIAGRAMA-AQUI)

---

## Justificación del diseño

*(Agrega aquí la justificación de las decisiones de modelado tomadas por el grupo.)*
