import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { UserService } from '../services/user.service';

/**
 * Página de inicio de sesión.
 *
 * Cumple los requisitos literales del cuaderno de la Práctica 3:
 *  - `FormBuilder` y `Router` inyectados.
 *  - Propiedad `formLogin` con dos controles (email + clave).
 *  - Variable `error: string` para los mensajes de credenciales
 *    incorrectas.
 *  - Método `doLogin()` que invoca `UserService.login()` y, según el
 *    resultado, navega a la ruta `tabs` o asigna el mensaje de error.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  /** Formulario reactivo (`any` según la convención del cuaderno). */
  formLogin: any;

  /** Mensaje mostrado en el `<ion-alert>` cuando el login falla. */
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSrv: UserService,
    private menuCtrl: MenuController
  ) {}

  /**
   * Hook de Ionic — deshabilita el menú lateral mientras el usuario
   * no esté autenticado (requisito Práctica 4).
   * @returns void
   */
  ionViewWillEnter(): void {
    this.menuCtrl.enable(false, 'principal');
  }

  /**
   * Construye el formulario reactivo con los validadores exigidos:
   *  - email: requerido + formato email.
   *  - clave: requerida + mínimo 6 caracteres.
   * @returns void
   */
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Handler del botón de envío. Toma los valores del formulario,
   * pregunta a `UserService` y, en función del resultado:
   *  - Si devuelve un `User` válido → navega a `/tabs`.
   *  - Si devuelve `null` → asigna mensaje de error que disparará
   *    el `<ion-alert>` del template.
   * @returns Promesa que resuelve tras la navegación o tras asignar el error.
   */
  async doLogin(): Promise<void> {
    const { email, password } = this.formLogin.value;
    const user = await this.userSrv.login(email, password);
    if (user) {
      this.error = '';
      await this.router.navigateByUrl('/tabs');
    } else {
      this.error = 'Email o contraseña incorrectos.';
    }
  }

  /**
   * Cierra el `<ion-alert>` vaciando la variable de error.
   * @returns void
   */
  dismissError(): void {
    this.error = '';
  }
}
