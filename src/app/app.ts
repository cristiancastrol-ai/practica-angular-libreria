import { Component, computed, signal } from '@angular/core';

// Interfaz que define la forma de un producto de la tienda.
// Debe declararse antes del decorador @Component.
export interface Producto {
  nombre: string;
  precio: number;
  disponible: boolean;
}

// Artículo del catálogo: extiende Producto con datos solo visuales.
interface Articulo extends Producto {
  id: number;
  categoria: string;
  detalle: string;
  portada: string;
  tinta: string;
}

interface LineaCarrito {
  articulo: Articulo;
  cantidad: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // --- Datos de la tienda (los de la práctica) ---
  nombreTienda: string = 'Librería El Cuadernito';
  encargado: string = 'Cristian Castro Lima';
  numeroSucursal: number = 3;
  tiendaAbierta: boolean = true;
  categorias: string[] = ['Cuadernos', 'Bolígrafos', 'Mochilas'];

  // Producto destacado: cumple con la interfaz Producto
  producto: Producto = {
    nombre: 'Cuaderno artesanal A5',
    precio: 35,
    disponible: true,
  };

  // --- Catálogo (extra para que la página tenga vida) ---
  readonly catalogo: Articulo[] = [
    {
      id: 1,
      nombre: 'Cuaderno artesanal A5',
      precio: 35,
      disponible: true,
      categoria: 'Cuadernos',
      detalle: 'Tapa dura, 120 hojas punteadas',
      portada: '#b5651d',
      tinta: '#fff6e8',
    },
    {
      id: 2,
      nombre: 'Cuaderno cosido B6',
      precio: 28,
      disponible: true,
      categoria: 'Cuadernos',
      detalle: 'Costura a hilo, 96 hojas lisas',
      portada: '#2f5d3a',
      tinta: '#eef6ea',
    },
    {
      id: 3,
      nombre: 'Bolígrafo de gel 0.5 mm',
      precio: 12,
      disponible: true,
      categoria: 'Bolígrafos',
      detalle: 'Tinta negra de secado rápido',
      portada: '#24364f',
      tinta: '#edf2f8',
    },
    {
      id: 4,
      nombre: 'Set de 6 resaltadores',
      precio: 22,
      disponible: true,
      categoria: 'Bolígrafos',
      detalle: 'Punta biselada, colores pastel',
      portada: '#d9a326',
      tinta: '#2b2418',
    },
    {
      id: 5,
      nombre: 'Mochila de lona',
      precio: 145,
      disponible: false,
      categoria: 'Mochilas',
      detalle: 'Lona encerada, bolsillo para laptop',
      portada: '#5b4636',
      tinta: '#f4ece0',
    },
    {
      id: 6,
      nombre: 'Mochila mini urbana',
      precio: 98,
      disponible: true,
      categoria: 'Mochilas',
      detalle: 'Compacta, correas ajustables',
      portada: '#7a3b2e',
      tinta: '#fbece6',
    },
  ];

  // --- Estado de la interfaz ---
  readonly categoriaActiva = signal<string>('Todas');
  readonly carrito = signal<LineaCarrito[]>([]);
  readonly carritoAbierto = signal(false);
  readonly aviso = signal<string | null>(null);

  readonly visibles = computed(() => {
    const categoria = this.categoriaActiva();
    if (categoria === 'Todas') {
      return this.catalogo;
    }
    return this.catalogo.filter((articulo) => articulo.categoria === categoria);
  });

  readonly unidades = computed(() =>
    this.carrito().reduce((total, linea) => total + linea.cantidad, 0),
  );

  readonly total = computed(() =>
    this.carrito().reduce(
      (total, linea) => total + linea.articulo.precio * linea.cantidad,
      0,
    ),
  );

  // --- Panel de la práctica (paso 3) ---
  categoriaDemo: boolean = false;
  productoDemo: boolean = false;

  private temporizador?: ReturnType<typeof setTimeout>;

  // --- Acciones ---
  cambiarEstadoTienda(): void {
    this.tiendaAbierta = !this.tiendaAbierta;
    this.avisar(
      this.tiendaAbierta ? 'Tienda abierta de nuevo.' : 'Tienda cerrada (demostración).',
    );
  }

  cambiarDisponibilidad(): void {
    this.producto.disponible = !this.producto.disponible;
  }

  agregarCategoriaDemo(): void {
    if (!this.categorias.includes('Cartucheras')) {
      this.categorias = [...this.categorias, 'Cartucheras'];
    }
    this.categoriaDemo = true;
  }

  cambiarProductoDemo(): void {
    this.productoDemo = !this.productoDemo;
    this.producto = this.productoDemo
      ? { nombre: 'Cuaderno cosido B6', precio: 42, disponible: this.producto.disponible }
      : { nombre: 'Cuaderno artesanal A5', precio: 35, disponible: this.producto.disponible };
  }

  filtrar(categoria: string): void {
    this.categoriaActiva.set(categoria);
  }

  agregar(articulo: Articulo): void {
    if (!this.tiendaAbierta) {
      this.avisar('La tienda está cerrada. Vuelve pronto 🍞');
      return;
    }
    if (!articulo.disponible) {
      this.avisar('Ese artículo está agotado.');
      return;
    }

    this.carrito.update((lineas) => {
      const existente = lineas.find((linea) => linea.articulo.id === articulo.id);
      if (existente) {
        return lineas.map((linea) =>
          linea.articulo.id === articulo.id
            ? { ...linea, cantidad: linea.cantidad + 1 }
            : linea,
        );
      }
      return [...lineas, { articulo, cantidad: 1 }];
    });
    this.avisar(`${articulo.nombre} se añadió al carrito.`);
  }

  cambiarCantidad(id: number, delta: number): void {
    this.carrito.update((lineas) =>
      lineas
        .map((linea) =>
          linea.articulo.id === id ? { ...linea, cantidad: linea.cantidad + delta } : linea,
        )
        .filter((linea) => linea.cantidad > 0),
    );
  }

  vaciar(): void {
    this.carrito.set([]);
  }

  reservar(): void {
    if (this.carrito().length === 0) {
      this.avisar('Tu carrito está vacío.');
      return;
    }
    const total = this.total();
    this.carrito.set([]);
    this.carritoAbierto.set(false);
    this.avisar(`Pedido reservado por Bs ${total}. Te esperamos en la sucursal ${this.numeroSucursal}.`);
  }

  cerrarAviso(): void {
    this.aviso.set(null);
  }

  private avisar(mensaje: string): void {
    this.aviso.set(mensaje);
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => this.aviso.set(null), 3200);
  }
}
