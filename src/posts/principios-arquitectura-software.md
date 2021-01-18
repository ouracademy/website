---
title: "Principios a considerar en la arquitectura de software"
date: 2021-01-17
author: diana
tags: [Arquitectura Software, Diseño, Principios, El arte de la escalabilidad]
description: Que tener en cuenta cuando diseñas tu arquitectura
image: /images/principlesArquitecture.png

isPublic: true
---

<Image
  size="large"
  direction="left"
  src="/images/principlesArquitecture.png"
  alt="Wordcloud Principios de arquitecture"
  description="Wordcloud de sección AKF’s Twelve Architectural Principles del libro The art of scalability"
/>

Diseñar la arquitectura de un software es una tarea intensiva de toma de decisiones, decisiones que resulta con un software que cumple con los atributos de calidad solicitados por el cliente.

Para esta tarea, tener un conocimiento amplio, es muy beneficioso. En este sentido te diria que te pongas a pensar en: las **cosas que sabes**, las cosas que **sabes que no sabes** y las cosas que **no sabes** que **no sabes** (es donde dices wau no sabía que existia esta tecnologia o técnica). Te deja pensando no, bueno en este [link](http://nealford.com/memeagora/2015/09/08/knowledge-breadth-versus-depth.html) puedes profundizar en este tema.

Bueno, ¿porqué te hablo del conocimiento? Porque sucede que a la vez que lo vas adquiriendo, vas generando un esquema mental, de reglas y relaciones, al igual como un sistema experto funciona. Es en este contexto, que espero que los principios de arquitectura, que te menciona el titulo del post, cuya fuente es el libro [The art of scalability](https://akfpartners.com/books/the-art-of-scalability), se sume a tu esquema mental al momento de diseñar la arquitectura de tu software.

Ahora ya yendo al tema en si, el libro nos da a conocer 12 principios, los cuales estan relacionados a la **escalabilidad**, **disponibilidad** y **costo**.

- Principio 1: N+1 Design

  Para garantizar la disponibilidad de tu software, ten al menos una instancia adicional en tu esquema de despliegue.

- Principio 2: Design for rollback

  Para garantizar también la disponibilidad, asegurate que todo cambio en tu software sea facilmente revertible.

- Principio 3: Design to Be Disabled

  Cuando dependes de un sistema, y este no se encuentre disponible, esteblece un mecanismo que garantize un normal funcionamiento.

- Principio 4: Design to Be Monitored

  Además de monitorear cuándo el sistema no está funcionando correctamente, debes obtener indicadores que permita identificar cuándo se está desempeñando de manera diferente a lo normal.

- Principio 5: Design for Multiple Live Sites

- Principio 6: Use Mature Technologies

  Si usas una tecnología emergente se consciente que al hallar errores, la comunidad a consultar sera muy pequeña. Si quieres evitar eso trata de usar tecnologias ya probadas y con una gran comunidad.

- Principio 7: Asynchronous Design

  Siempre que sea posible, los sistemas deben comunicarse de forma asincrónica, ya que son más tolerantes a fallas y no caen facilmente a cargas extremas.

- Principio 8: Stateless Systems

  Trate de evitar el estado siempre que sea posible, ya que almacenarlo requiere memoria lo que aumenta el costo de su sistema.

- Principio 9: Scale Out Not Up

  Escale horizontalmente en lugar de verticalmente, si el adquirir un hardware más rápido, más grande y más caro, no sea indispensable para el crecimiento de su negocio.

- Principio 10: Design for at Least Two Axes of Scale

  Los arquitectos no diseñan para hoy, sino que intentan armar un sistema que se pueda utilizar, con algunas modificaciones, durante algún tiempo. Para esto consideran el escalamiento en ejes, lo que se conoce como el [cubo de la escalabilidad](https://akfpartners.com/growth-blog/scale-cube), **eje x** (clonancion y replicación), **eje y** (divide componentes diferentes) y **eje z** (divide componentes no diferentes)

- Principio 11: Buy when non core

  Independientemente de lo inteligente que sea su equipo, simplemente no son los mejores en todo. Construya cosas cuando sea realmente bueno en eso y haga una diferencia significativa en su producto, plataforma o sistema. Y compre cuando no sea el caso.

- Principio 12: Use Commodity Hardware

  No diseñes una solución que dependa de un hardware específico.
