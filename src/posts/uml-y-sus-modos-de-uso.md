---
title: UML y sus modos de uso
author: arthur
tags: [uml, puntos de vista]
description: ¿UML no sirve? UML está muerto? o aún es muy útil? Un articulo que contesta el porque de las distintas opiniones sobre UML.
date: 2019-03-17
image: https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/UML_diagrams_overview.svg/600px-UML_diagrams_overview.svg.png
---

import { Figure } from "\$components/figure";

De vez en cuando, de algún compañero del trabajo o de la universidad, o en varios grupos de redes sociales veo preguntas como: ¿Usas UML? ¿Vale la pena aprender UML?, ¿UML sirve para aprender Orientación a Objetos? Si soy agile, debería usar UML? ¿UML solo se usa en la universidad?.

Y de ello veo distintas opiniones, y lo peor afirmaciones erradas de gente conocida del desarrollo de software, tales como: UML solo lo usan los universitarios, UML solo se usa para documentar proyectos, UML está en desuso, UML no se usa en proyectos serios modernos! o peor algunas barbaridades como UML es una **metodología**..., algunas en un grado ciertas (pero quizá la única verdadera es que se esta usando menos 😞).

En mucho grado esto refleja desconocimiento de UML, sin embargo creo que la principal razón de las diferencias de opiniones es la forma o modo en que UML es usado y enseñado.

Existen distintas [formas o modos de usar UML][4]. Usualmente en las universidades, enseñan UML a un nivel de bastante detalle, dicen cosas como: Haz un diagrama de clases y varios diagramas de secuencia bien detallados, de tal forma que estos representen las clases y objetos que tu código fuente tendrá. Claro esto no es tan malo, por que pues uno aprende a usar los diagramas...sin embargo esta no es la única forma de usar UML.

Del otro lado, otras personas usan UML a través de esbozos de algún flujo de negocio en un diagrama de actividades (o quizá usando BPMN), lo más rápido posible, sin prestar atención a la sintaxis de UML.

<Figure
  src="http://agilemodeling.com/images/models/activityDiagramEnroll.JPG"
  caption="Diagrama de actividades como un esbozo, de Scott Ambler"
/>

Ambas formas de usar son válidas, y así como estás formas de usar UML, existen otras. En general, existen 3 propósitos, que son los modos generales de como usar UML, siguiendo la clasificación de [Fowler](https://martinfowler.com).

- UML puede ser muy detallado y rígido, a tal [nivel que sirve como un lenguaje de programación][1], es decir, a un nivel que una herramienta pueda leer los gráficos de UML y generar un programa, tal y como lo hace [IBM Rational Software Architect](https://www.ibm.com/us-en/marketplace/rational-software-architect-designer) (esta forma de usar UML, en realidad es parte de lo que se conoce como Model Driven Architecture o MDA).
- [UML como plano de diseño o blueprint][2], de alguna forma es la forma más clásica de usar UML (y quizá la más odiada), donde los diagramas son trabajados por un grupo de personas distintos a los programadores, muy de la forma como los planos de diseño son usados al construir un puente (¿notas este enfoque en cascada?).
- Y [UML como bosquejos o sketchs][3], donde algún desarrollador o diseñador usa UML para explicar alguna parte del sistema. Haz usado esta forma, si es que alguna vez te encontraste explicando a algún compañero de trabajo en algún pizarrón, una hoja, una herramienta super ligera (como [UMLet](https://www.umlet.com/)) o incluso en una servilleta 😝 diciendo algo como....y esta clase Persona se enlaza con esta otra clase XYZ...

![Plano de diseño de un puente](https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/brisbane-story-bridge-erection-sequence-paul-doody.jpg)

Por supuesto, cada uno de estas formas de usar UML usualmente es usada más en algún sector que en otros. Por ejemplo, UML como lenguaje de programación se ve en comunidades de investigación, universidades y uno que otros centros de investigación. O por ejemplo, UML como plano de diseño, en organizaciones que usan algún método en cascada, ¿Alguna vez te has topado con alguna empresa donde antes de programar, realizan un documento de análisis o diseño donde usan muchos diagramas en UML? 🤔, o en métodos más formales que son usados en sistemas críticos (sistemas donde un error puede causar la muerte de una persona). Sin embargo, usar UML como bosquejos es usado en casos muy distintos, podemos usarlo en una sesión de capacitación a un grupo de compañeros de trabajo para explicarles algunas partes de un sistema, en un workshop para explicar distintos alternativas de diseño y muchos otros casos ...

Cabe decir que cada una de estas formas se puede dar antes o después de programar. Al leer un código legado (que posiblemente no tiene documentación) podemos usar diagramas de UML como bosquejos para entender como está funcionando el sistema (aquí otro de los otros muchos casos) o quizá si tenemos una herramienta avanzada, podremos generar automáticamente varios diagramas para documentar nuestro sistema (esto es, Ingeniería Reversa)

Y claro cada forma de uso tiene sus ventajas y desventajas. Creo que a muchos (me incluyo) nos es más lento programar usando herramientas sofisticadas (y muy pesadas) que son requisito al usar UML como un lenguaje de programación, donde aparte de escribir el código fuente debemos hacerlo con diagramas, otro punto más de lentitud (Si comparas escribir un algoritmo a hacer un diagrama de actividades!), además del poco soporte a frameworks y librerías que son parte de cada lenguaje de programación. Por el otro lado al usar UML como bosquejos podemos escribirlos tan informalmente que otros no entiendan lo que queremos decir (similar a escribir requisitos en lenguaje informal o hablar jergas muy bazingas 😅)

Hay muchos puntos que discutir para cada una, herramientas que se pueden usar en cada fase, más ventajas y desventajas a cada una, su solapamiento con los métodos de desarrollo, pero lamentablemente mi tiempo para este post acabo.

Puede ver más en:

- [UML como lenguaje de programación][1]
- [UML como planos de diseño][2]
- [UML como bosquejos][3]
- [Modos de UML][4]
- [Agile Modelling](http://agilemodeling.com/)
- [Model Driven Architecture, MDA](https://www.omg.org/mda/)

[1]: https://martinfowler.com/bliki/UmlAsProgrammingLanguage.html
[2]: https://martinfowler.com/bliki/UmlAsBlueprint.html
[3]: https://martinfowler.com/bliki/UmlAsSketch.html
[4]: https://martinfowler.com/bliki/UmlMode.html
