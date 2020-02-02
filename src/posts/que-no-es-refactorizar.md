---
title: "Que no es refactorizar"
date: 2020-01-26
author: arthur
tags: [refactorizacion]
description: Las diferencias entre refactoring, clean code y reestructurar codigo.
---

> Basado en [Refactoring Malapropism](https://martinfowler.com/bliki/RefactoringMalapropism.html)

"Refactoring" (o refactorización) ahora se utiliza comúnmente en la industria informática, aunque hace algún tiempo era tan solo un término conocido por poca gente.

Sin embargo, al igual que con muchas otras palabras [1], el término "refactoring" es a menudo usado cuando no es apropiado:

Usar el término **refactorizacion**:

- cuando se **reestructura** muchas cosas a la vez para que el código quede limpio (**clean code**).
- cuando luego de una supuesta "refactorización" se tiene que corregir los errores los errores que introdujo la "refactorización".
- cuando se habla de refactorizar la documentación...

Ninguna es refactorizar, todas son **reestructurar**.

Refactorizar es una técnica especifica para reestructurar, la cual es una actividad más general. Reestructurar es reordenar partes, partes de un todo, pero **puede ser hecho de distintas maneras**. Es un término muy general que no implica una forma particular de reestructurar, mientras que refactoring si.

Refactoring es una técnica muy especifica, fundada en usar transformaciones pequeñas que preservan el comportamiento (tambien llamados refactorings), y sino mira la definición exacta de refactoring [5]. Si refactorizas tu sistema no deberías generar errores al sistema, claro deberías tener errores mientras refactorizas por unos minutos, pero cuando acabas de refactorizar no deberías tener errores [...]. Mientras que clean code simplemente es el resultado de refactorizar, al igual que usar patrones de diseño es muchas veces la salida de aplicar una serie de refactorizaciones [2,3].

Existen otras técnicas de reestructurar, pero son diferentes.

## Ver tambien

- [La premisa de las prioridades de transformaciones](http://blog.cleancoder.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html)

## Referencias

1. Fowler, M. (2006) [Perdida del concepto original por mala difusión](https://martinfowler.com/bliki/semanticdiffusion.html)
2. Martin, R. C. (2009). Clean code: a handbook of agile software craftsmanship.
3. Kerievsky, J. (2005). Refactoring to patterns. Pearson Deutschland GmbH.
4. Fowler, M. Refactoring Malapropism
5. Fowler, M. [Definición de refactorizar](https://martinfowler.com/bliki/DefinitionOfRefactoring.html)
