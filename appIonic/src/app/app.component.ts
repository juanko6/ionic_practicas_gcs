import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MenuItem } from './models/MenuItem';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  /** Ruta del JSON con la definición del menú lateral. */
  readonly menuFile: string = './assets/data/menu.json';

  /** Entradas del menú cargadas desde JSON (data-driven). */
  menuOptions: MenuItem[] = [];

  constructor(private toastCtrl: ToastController) {}

  /**
   * Inicializa la pantalla:
   *  1. Carga el menú lateral desde JSON.
   *  2. Muestra un toast de bienvenida.
   * @returns Promesa que resuelve cuando ambas acciones terminan.
   */
  async ngOnInit(): Promise<void> {
    await this.loadMenu();
    await this.showWelcome();
  }

  /**
   * Recupera el JSON del menú y lo asigna a `menuOptions`.
   * Si la petición falla, deja el menú vacío para no romper el render.
   * @returns Promesa que resuelve tras el fetch (éxito o error).
   */
  private async loadMenu(): Promise<void> {
    try {
      const res = await fetch(this.menuFile);
      this.menuOptions = (await res.json()) as MenuItem[];
    } catch (err) {
      console.error('No se pudo cargar el menú lateral', err);
      this.menuOptions = [];
    }
  }

  /**
   * Muestra el toast de bienvenida al arrancar la app.
   * @returns Promesa que resuelve cuando el toast se ha presentado.
   */
  private async showWelcome(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Welcome to the Star Wars Wiki App!',
      duration: 3000,
      position: 'bottom',
      color: 'dark',
    });
    await toast.present();
  }
}
