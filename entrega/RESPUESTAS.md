# Respuestas — Práctica Angular

**Alumno:** Cristian Castro Lima
**Práctica:** Presentación de un producto en Angular — Librería El Cuadernito

---

## 1. ¿Qué función cumple `@Component`?

`@Component` es un decorador que le indica a Angular que una clase es un componente y
le agrega la información que necesita para mostrarla. Dentro de él se define el
`selector` (la etiqueta HTML con la que se usa, en este caso `app-root`), la ruta del
template (`templateUrl`), la hoja de estilos (`styleUrl`) y los módulos o componentes
que necesita (`imports`). Sin ese decorador, Angular no sabría que la clase `App`
forma parte de la interfaz ni cómo renderizarla.

## 2. ¿Para qué sirve la interfaz `Producto`?

Sirve como contrato o molde: define qué propiedades debe tener un producto y de qué
tipo (`nombre: string`, `precio: number`, `disponible: boolean`). Así, cuando se crea
el objeto `producto`, TypeScript verifica que tenga exactamente esos campos con los
tipos correctos y avisa en compilación si falta alguno o si se escribe mal. Además,
se puede reutilizar para futuros productos sin repetir la estructura.

## 3. ¿Qué hace `{{ }}`?

Es la sintaxis de interpolación de Angular. Permite mostrar en el HTML el valor de una
propiedad o expresión definida en la clase. Por ejemplo, `{{ nombreTienda }}` imprime
el nombre de la tienda y `{{ producto.precio }}` muestra el precio. Angular evalúa la
expresión y actualiza automáticamente la vista cuando el valor cambia.

## 4. ¿Qué diferencia existe entre `@if` y `@for`?

`@if` es una estructura condicional: muestra un bloque de HTML solo si la expresión
es verdadera y puede combinarse con `@else`. Por ejemplo, muestra "Tienda abierta" o
"Tienda cerrada" según `tiendaAbierta`. En cambio, `@for` es un bucle: repite un bloque
una vez por cada elemento de una colección, como la lista de categorías, y usa `track`
para identificar cada elemento de forma única.

## 5. ¿Por qué `tiendaAbierta` utiliza el tipo `boolean`?

Porque el estado de la tienda es una situación de dos valores posibles: abierta o
cerrada. El tipo `boolean` solo acepta `true` o `false`, así se evita guardar valores
inválidos (como un texto o un número) y la propiedad se puede usar directamente en un
`@if` para decidir qué mensaje mostrar. Si se usara `string`, habría que comparar
textos y sería más fácil cometer errores.

---

## Evidencia de la prueba de funcionamiento

La página incluye un **Panel de la práctica · paso 3** con botones que aplican estos
mismos cambios en vivo, sin tocar el código.

| Cambio realizado | Resultado en la página |
|---|---|
| `tiendaAbierta` de `true` a `false` | Se muestra "Tienda cerrada" |
| `producto.disponible` de `true` a `false` | Se muestra "Producto agotado" |
| Se agrega la categoría `Cartucheras` | La lista pasa de 3 a 4 categorías |
| Nombre y precio del producto modificados | Se muestra "Cuaderno cosido B6 — Bs 42" |

Las capturas están en `capturas/` y el estado final del proyecto quedó con los datos
originales (tienda abierta, producto disponible, 3 categorías).
