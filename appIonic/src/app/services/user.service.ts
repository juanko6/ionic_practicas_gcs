import { Injectable } from '@angular/core';
import { User } from '../models/User';

/**
 * Servicio de autenticación contra el mockup local `users.json`.
 *
 * El cuaderno de la Práctica 3 exige:
 *  - Que el fichero de datos se cargue **en el constructor** del servicio.
 *  - Que exponga un método `login(email, password)` que devuelva un
 *    objeto `User` si las credenciales son correctas o `null` en caso
 *    contrario.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  /** Ruta al mockup de usuarios. */
  private readonly USERS_URL = './assets/data/users.json';

  /** Cache en memoria del listado de usuarios. */
  private users: User[] = [];

  /** Promesa de carga compartida — evita cargas concurrentes. */
  private loaded: Promise<void>;

  constructor() {
    this.loaded = this.loadUsers();
  }

  /**
   * Descarga el mockup `users.json` y lo persiste en memoria.
   * Si la petición falla, deja `users` vacío para que `login`
   * devuelva `null` y la UI muestre el error correspondiente.
   * @returns Promesa que resuelve cuando termina la carga.
   */
  private async loadUsers(): Promise<void> {
    try {
      const res = await fetch(this.USERS_URL);
      const json = (await res.json()) as User[];
      this.users = Array.isArray(json) ? json : [];
    } catch (err) {
      console.error('UserService: no se pudo cargar users.json', err);
      this.users = [];
    }
  }

  /**
   * Comprueba credenciales contra el mockup.
   *
   * @param email Email introducido por el usuario.
   * @param password Contraseña introducida.
   * @returns Promesa que resuelve con el `User` correspondiente o
   *          `null` si no hay coincidencia.
   */
  async login(email: string, password: string): Promise<User | null> {
    // Garantizamos que el JSON está cargado antes de comparar.
    await this.loaded;
    const match = this.users.find(
      u => u.email === email && u.password === password
    );
    return match ?? null;
  }
}
