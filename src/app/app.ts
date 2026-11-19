import { Component } from '@angular/core';

// Interfaz que define la forma de un producto de la tienda.
// Debe declararse antes del decorador @Component.
export interface Producto {
  nombre: string;
  precio: number;
  disponible: boolean;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Datos de la tienda
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
}
