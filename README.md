# Práctica Angular — Librería El Cuadernito 📓

Práctica de Angular: presentación de un producto de una tienda, en este caso una
librería sencilla.

El proyecto muestra los datos de la tienda, el estado (abierta/cerrada), la lista de
categorías y una tarjeta con el producto destacado, incluyendo su precio y si está
disponible o agotado.

## Requisitos

- Node.js 22.12 o superior
- npm

> Nota: se usó Angular 21 porque el CLI 22 pide Node 22.22.3 y este equipo tiene
> 22.22.2. El código de la práctica es el mismo (`app.ts`, `app.html`, `app.css`).

## Cómo ejecutarlo

```bash
npm install
npm start
```

Abrir <http://localhost:4200>.

## Compilar para producción

```bash
npm run build
```

El resultado queda en `dist/practica-angular-libreria/`.

## Estructura

```
src/app/
├── app.ts      → interfaz Producto, clase App y datos de la tienda
├── app.html    → plantilla con {{ }}, @if y @for
└── app.css     → estilos del componente
```

### `app.ts`

- Interfaz `Producto` declarada **antes** de `@Component`.
- Clase `App` con `nombreTienda`, `encargado`, `numeroSucursal`, `tiendaAbierta` y
  `categorias`.
- Objeto `producto` que cumple la interfaz.

### `app.html`

- Nombre de la tienda e info del encargado y la sucursal.
- Mensaje **Tienda abierta / Tienda cerrada** con `@if`.
- Categorías en lista con `@for`.
- Nombre, precio y estado del producto (**Producto disponible / Producto agotado**).

## Prueba de funcionamiento (paso 3)

Se hicieron los cuatro cambios pedidos y se verificó que la página los refleja:

| Cambio | Resultado |
|---|---|
| `tiendaAbierta = false` | Se muestra **Tienda cerrada** |
| `producto.disponible = false` | Se muestra **Producto agotado** |
| Se agrega una cuarta categoría | Aparece **Cartucheras** en la lista |
| Se cambia nombre y precio | Se muestra **Cuaderno cosido B6 — Bs 42** |

Capturas en `entrega/capturas/`:

- `01-inicial.png` — estado original
- `02-cambios.png` — con los cuatro cambios aplicados
- `03-movil.png` — vista responsive (390 px)
- `04-final.png` — estado final restaurado

## Respuestas teóricas

En [`entrega/RESPUESTAS.md`](entrega/RESPUESTAS.md) están las respuestas a las cinco
preguntas de la práctica.
