/**
 * Modelo de un usuario tal y como se persiste en `assets/data/users.json`
 * y como lo devuelve `UserService.login()` cuando la autenticación es
 * correcta. Mantiene las propiedades exactas exigidas por el cuaderno
 * de la Práctica 3.
 */
export class User {
  /** Nombre legible del usuario. */
  name: string = '';
  /** Email — clave usada para identificar al usuario en el login. */
  email: string = '';
  /** Contraseña en texto plano (solo para fines didácticos). */
  password: string = '';
}
