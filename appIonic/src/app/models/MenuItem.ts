/**
 * Representa una entrada del menú lateral cargada desde
 * `assets/data/menu.json`.
 *
 * El menú está completamente desacoplado del código: añadir o quitar
 * entradas se hace editando el JSON, no el componente.
 */
export interface MenuItem {
  /** Texto visible en el menú. */
  title: string;
  /** Ruta de navegación (router) a la que apunta la entrada. */
  url: string;
  /** Nombre del icono de Ionicons mostrado a la izquierda del título. */
  icon: string;
}
