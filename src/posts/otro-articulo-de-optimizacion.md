---
title: Otro articulo más de optimización
author: arthur
tags: [optimizacion, codigo, practica, arquitectura]
description: Un articulo sobre los principios que debes tomar en cuenta antes de mejorar el performance de tu aplicación.
date: 2019-02-11
image: https://assets-keycdn.ej-technologies.com/products/jprofiler/top10/probes_fsa-3e9a30c402ac6f81612e2e291f0927f3.png
---

> Una traducción del articulo de Martin Fowler: [Yet another optimization article](https://martinfowler.com/ieeeSoftware/yetOptimization.pdf).

Este es un articulo un poco difícil de escribir. No tenia planeado escribir sobre optimización, porque lo que tengo que decir ya se ha dicho muchas veces por otras personas. Sin embargo, cuando doy charlas de software, aún sigo viendo un gran número de personas que no conocen, o no siguen los consejos que daré. Asi que ahi va!. (Muchos probablemente han visto este consejo antes- si eres de ellos, te invito a reflexionar sobre por que necesito otra vez dar este consejo).

Primero, **el performance importa**. Aunque la [ley de Moore](https://es.wikipedia.org/wiki/Ley_de_Moore) nos ayuda a que nuestros programas sean menos lentos, es fastidioso que un programa te pida mejorar tu máquina (sea tu memoria RAM o CPU) para poder usar su nueva versión 😠. La pregunta es, ¿Como lograr hacer programas veloces?

![alan kay sobre bloatware](/images/optimization.png)

Figura 1. Alan Kay hablando sobre como cargar un documento word, ahora tarda mucho más que hace 10 años.

Para muchos programadores, el performance es algo que ponemos **continua atención a medida que programamos**. Cada vez que escribimos algo de código, pensamos los problemas de performance que tiene y que podríamos hacer para mejorar ese performance (vemos un doble `for` y al instante estamos pensando como mejorarlo). Esto es una técnica obvia - lastima que no sea muy útil.

El performance no es algo que se pueda lograr de esta forma. Involucra una **disciplina**. Una parte de este trabajo viene de decisiones de arquitectura que tomemos, otra de actividades más tácticas de optimización (como ahora veremos). Pero lo que ambas comparten, es el hecho de que es difícil tomar decisiones de performance **por tan solo mirar el diseño**. En vez, lo que debes hacer es ejecutar tu código y mirar su performance.

## Pasos para optimizar

Para optimizar un programa se debe seguir una serie de pasos específicos. Primero, se necesita un **_profiler_** -un programa que puede analizar que tanto tiempo tu programa tarda en realizar cada una de sus funciones (métodos, rutinas...). El performance de un software tiene la regla famosa del 80/20: 80% del tiempo del programa se gasta en solo el 20% del código. Tratar de optimizar el performance de todo el código no vale la pena, asi que lo primero que se debe hacer es buscar ese 20% del código. Tratar de deducir donde el programa gasta la mayor parte de su tiempo, también no vale la pena. Sin embargo, conozco muchos programadores experimentados que siempre hacen eso. Debes usar un profiler!.

![Ejemplo de profiler](https://assets-keycdn.ej-technologies.com/products/jprofiler/top10/probes_fsa-3e9a30c402ac6f81612e2e291f0927f3.png)

Figura 2. Ejemplo de un profiler (JProfiler) donde una gran porción (75%) del tiempo se gasta en realizar un método remoto.

El profiler necesitara que ejecutes algo de código, para ello podríamos ejecutarlo en un código que simule el programa bajo situaciones comunes (de uso de tu sistema). Un test suite automatizado es un buen punto de inicio, pero recuerda estar seguro de que este simule situaciones comunes. Otro punto importante, es el punto que mi amigo [Dave Rice](https://www.thoughtworks.com/profiles/david-rice) recalca: "Nunca optimices un sistema multi-usuarios con tests que se centren en un solo usuario". Errores tras errores, nos han enseñado que un sistema (por ejemplo una Base de datos) tiene distintos cuellos de botella que un sistema para un único usuario - a menudo enfocados en transacciones. Un mal conjunto de pruebas fácilmente te puede conducir al equivocado 20% de código.

Una vez que hayas encontrado los cuellos de botellas, tienes 2 opciones: **mejorar el rendimiento de las partes lentas o que las partes lentas se ejecuten con menos frecuencia**, por lo tanto debes realizar algunos cambios. Aquí es donde tener un buen software diseñado realmente ayuda. **Es mucho más fácil optimizar módulos cohesivos y con bajo acoplamiento.** Dividir un sistema en muchas piezas pequeñas, ayuda a reducir el número de posibilidades donde encontrar los cuellos de botella. Además, tener un buen suite de pruebas automatizadas permite atrapar bugs que puedan suceder durante el proceso de optimizar.

Vale la pena además conocer algunos trucos de optimización, muchos de los cuales son particulares del lenguaje y ambiente de programación. Lo más importante que se debe recordar es que **los trucos no siempre funcionarán** como dice el dicho de los sastres: "Mide dos veces, recorta solo una vez". Sin embargo, a diferencia de un sastre, deberás medir 2 veces el rendimiento: antes y después de aplicar la optimización. Solo luego podrás saber si la optimización ha tenido un efecto. Es bastante común ver que tan poco efecto- o incluso uno negativo- tiene una optimización.

![Antes y despúes](https://cdn.amasty.com/media/extensions/google-page-speed-optimizer/magento-google-page-speed-optimizer.png)

Figura 3. Medir el antes y después de mejorar una página web usando Google Page Speed.

Esta doble medición es aún más importante en estos días. Muchas de los técnicas estándares de optimización, debido a compiladores, optimizadores y máquinas virtuales (VM) inteligentes, son no solo inefectivos sino también contra-intuitivos. Craig Larman me dio está idea cuando el me hablo de los comentarios que recibió después de haber dado una charla en JavaOne sobre optimización en Java. Uno de los desarrolladores de una VM le dijo, en efecto, "tus comentarios sobre usar thread pools (pool de hilos) fueron buenos, pero no deberías usar object pools por que lo único que harán es hacer lenta nuestra VM." Luego otro desarrollador de otra VM, dijo, "tus comentarios de object pools fueron buenos, pero no debería usar thread pools, ya que hará lento nuestro VM". Que contradicción 😧. Esto no solo refuerza la necesidad de medir el cambio que produce cada optimización, sino que también nos puede sugerir que **deberíamos registrar cada cambio hecho que se hizo en una optimización** (poner un comentario con una etiqueta en el código fuente es una buena opción) y volver a probar las optimizaciones que hayamos aplicado cada vez que actualicemos nuestro compilador o VM (o incluso cuando actualizamos la versión de alguna librería que usemos)

> Si optimizas tu código y no lo mides para confirmar la mejora en el rendimiento, todo lo que sabrás con certeza es que has hecho que tu código sea más difícil de leer.

**La optimización que hayamos hecho hace 6 meses atrás podría hoy ser un cuello de botella**.

Todo esto refuerza la regla principal, primero haz tu programa claro (limpio), bien organizado y modular. Solo cuando hayas hecho eso, deberías empezar a optimizar.

## Algunas excepciones

Aunque algunos problemas de performance se pueden tratar mejor con este tipo de optimizaciones, algunas veces otras formas de pensar son importantes -por ejemplo, durante etapas iniciales de la arquitectura del programa, cuando haces este tipo de decisiones que costarán mucho si es que se desean cambiar (por ejemplo, cambiar de framework o lenguaje de programación). De nuevo, la única forma de entender los problemas de performance es midiendo. En este caso, deberías construir un par de prototipos exploratorios para realizar simulaciones del performance en ambientes reales (asi como simulan en una maqueta, la resistencia de un edificio a los vientos), con ello tendrás una idea del performance que tendrá. Es por su puesto difícil tener una buena idea de lo que el ambiente real es, pero de igual forma, es probable que cualquier cosa con la que vayas a trabajar cambie antes de que el software sea lanzado. **Los experimentos son mucho mejores que adivinar al azar**.

Además hay otros casos donde existen reglas más amplias sobre cosas lentas. ¿Un poco confuso?. Un ejemplo, es la lentitud de las llamadas a procedimientos remotos (RPC). Debido a que los RPC son mucho más lentos que las llamadas a procedimientos dentro de la misma aplicación, es importante minimizarlas, lo que afecta grandemente el diseño de toda el sistema. Sin embargo, esto no significa que no haremos mediciones. Una vez me tope en una situación donde las personas optimizaban métodos remotos solo para que al final realmente los cuellos de botella estuvieran en otro lado. Sin embargo, minimizar las llamadas remotas ha demostrado ser una regla de oro.

![Procedimientos remotos](https://www.martinfowler.com/articles/images/distributed-objects-microservices/local-remote.png)

Figura 4. Distribuir cambia el enfoque de diseño, tal y como dice la [1ra ley de diseño de objetos distribuidos](http://www.drdobbs.com/errant-architectures/184414966)

Algunos han llevado esto más lejos, desarrollando modelos de performance que puedes usar para evaluar distintas decisiones de arquitectura. Aunque esto puede ser práctico, es difícil llevarlo más lejos. Dependerá de que tan bueno es el modelo de performance, usualmente ellas no predicen los factores clave del performance, incluso a un alto nivel. De nuevo, siempre realiza mediciones, siempre.

Al final, sin embargo, el performance no es algo que siempre se deba hacer, no es un absoluto. **Hacer que un programa sea rápido cuesta dinero, es una decisión de negocio el invertir en un programa en ello.** Una de las ganancias de tener una fase de optimización (dentro del proceso de desarrollo) es el hacer más explicito el costo de mejorar el performance, por lo que, según el negocio lo requiera se podrá escoger cambiarla por más funcionalidades o menos tiempo de lanzamiento al mercado. Además...cuando uno ve un software lento, uno puede tener una idea de como por dentro el negocio está.

Como he dicho, mucho de este consejo —en particular, el consejo de escribir el programa limpio primero y optimizarlo luego—está bien oxidado. (Para una descripción más amplia de este enfoque, puedes leer los capítulos 28 y 29 de Code Complete de Steve McConnell, Microsoft Press, 1993.) Existen muy buenos dichos sobre los peligros de realizar optimizaciones prematuras desde ya hace 20 años. Sin embargo, es una pena que algunas personas todavía se opongan cuando llamo a un método de consulta 2 veces en una rutina. [...]
