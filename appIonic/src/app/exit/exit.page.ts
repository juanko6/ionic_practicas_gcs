import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { App as CapacitorApp } from '@capacitor/app';

/**
 * Página de salida.
 *
 * El cuaderno pide una pantalla de confirmación. La salida real depende
 * de la plataforma:
 *  - **Nativo (Android / iOS)** → `CapacitorApp.exitApp()` cierra la app.
 *  - **Web** → los navegadores no permiten cerrar una pestaña que no fue
 *    abierta por JS, así que hacemos *logout* navegando a `/login`,
 *    que es el comportamiento esperado en un contexto web.
 */
@Component({
  selector: 'app-exit',
  templateUrl: 'exit.page.html',
  styleUrls: ['exit.page.scss'],
  standalone: false,
})
export class ExitPage {
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {}

  /**
   * Confirma la intención del usuario y, tras pulsar OK, cierra la app
   * en nativo o desloguea en web.
   * @returns Promesa que resuelve cuando el alert se presenta.
   */
  async confirmExit(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Closing app',
      message: 'You have chosen to exit the app.',
      buttons: [
        {
          text: 'OK',
          handler: () => this.performExit(),
        },
      ],
    });
    await alert.present();
  }

  /**
   * Ejecuta la salida real según la plataforma.
   *  - En contenedor nativo (Capacitor) llama a `App.exitApp()`.
   *  - En navegador intenta `window.close()` y, si el navegador lo
   *    bloquea (caso habitual), redirige a `/login`.
   * @returns Promesa que resuelve cuando la acción ha terminado.
   */
  private async performExit(): Promise<void> {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      await CapacitorApp.exitApp();
      return;
    }
    // En navegador: intenta cerrar la pestaña; si no, logout a /login.
    try {
      window.close();
    } catch {
      /* ignored */
    }
    // Si la pestaña sigue abierta (caso esperado), redirigimos al login.
    this.router.navigateByUrl('/login');
  }

  /**
   * Cancela la salida y vuelve a la pestaña de Wiki.
   * @returns void
   */
  goToWiki(): void {
    this.router.navigateByUrl('/tabs/wiki');
  }
}
