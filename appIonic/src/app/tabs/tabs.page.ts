import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  constructor(private menuCtrl: MenuController) {}

  /**
   * Hook de Ionic ejecutado antes de mostrar el layout con pestañas.
   * Habilita el menú lateral una vez el usuario está dentro del flujo
   * autenticado (post-login).
   * @returns void
   */
  ionViewWillEnter(): void {
    this.menuCtrl.enable(true, 'principal');
  }
}
