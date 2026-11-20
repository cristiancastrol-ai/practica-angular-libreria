# Práctica Angular — Librería El Cuadernito 📓

Práctica de Angular: presentación de un producto de una tienda. En este caso, una
librería con catálogo, filtros y carrito.

La página muestra los datos de la tienda, su estado (abierta/cerrada), las categorías,
el producto destacado y una vitrina con seis artículos. Además es interactiva: se puede
filtrar por categoría, añadir productos al carrito, cambiar cantidades y reservar un
pedido.

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
├── app.ts      → interfaz Producto, clase App, datos y lógica
├── app.html    → plantilla con {{ }}, @if y @for
└── app.css     → estilos del componente
```

### `app.ts`

- Interfaz `Producto` declarada **antes** de `@Component`.
- Clase `App` con `nombreTienda`, `encargado`, `numeroSucursal`, `tiendaAbierta` y
  `categorias`, tal como pide la consigna.
- Objeto `producto` que cumple la interfaz.
- Catálogo extra, carrito y filtros hechos con `signal`, `computed` y `update`.

### `app.html`

- Nombre de la tienda, encargado y sucursal.
- Mensaje **Tienda abierta / Tienda cerrada** con `@if`.
- Categorías en lista con `@for` (funcionan como filtros).
- Nombre, precio y estado del producto (**Producto disponible / Producto agotado**).
- Vitrina con `@for` y estado vacío con `@empty`.
- Carrito lateral con `@if`, cantidades y total.

## Interactividad

| Acción                       | Resultado                                      |
| ---------------------------- | ---------------------------------------------- |
| Clic en una categoría        | Filtra la vitrina al instante                  |
| Clic en la píldora de estado | Abre/cierra la tienda (con aviso)              |
| Clic en **Añadir**           | Suma el artículo al carrito y muestra un aviso |
| Clic en el carrito           | Abre el panel con líneas, cantidades y total   |
| **+ / −**                    | Cambia cantidades y recalcula el total         |
| **Reservar pedido**          | Vacía el carrito y confirma la reserva         |
| **Panel de la práctica**     | Aplica en vivo los cambios del paso 3          |

## Prueba de funcionamiento (paso 3)

El panel **Panel de la práctica · paso 3** tiene botones que hacen exactamente los
cuatro cambios pedidos:

| Cambio                         | Resultado esperado                  | Verificado |
| ------------------------------ | ----------------------------------- | ---------- |
| `tiendaAbierta = false`        | Se muestra **Tienda cerrada**       | ✅         |
| `producto.disponible = false`  | Se muestra **Producto agotado**     | ✅         |
| Se agrega una cuarta categoría | Aparece **Cartucheras** en la lista | ✅         |
| Se cambia nombre y precio      | **Cuaderno cosido B6 — Bs 42**      | ✅         |

Además se hicieron **36 comprobaciones automatizadas** con Chrome (clics reales sobre
filtros, carrito, cantidades, reserva, cierre de tienda, panel y vista móvil):
36/36 correctas, sin errores en consola y sin desborde horizontal a 390 px.

Capturas en `entrega/capturas/`:

- `01-inicio.png` — página completa
- `02-filtro.png` — filtro por categoría
- `03-carrito.png` — carrito abierto con dos productos
- `04-cerrada.png` — tienda cerrada y aviso al intentar añadir
- `05-panel.png` — panel de la práctica con los cambios aplicados
- `06-escritorio.png` — estado final en escritorio
- `07-movil.png` — vista responsive a 390 px

## Respuestas teóricas

En [`entrega/RESPUESTAS.md`](entrega/RESPUESTAS.md) están las respuestas a las cinco
preguntas de la práctica.
