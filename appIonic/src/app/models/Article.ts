/**
 * Categorías soportadas por SWAPI que se persisten como favoritos.
 * Coincide con los valores de `Category.url` (sin la barra final).
 */
export type SwapiCategory = 'people' | 'planets' | 'species' | 'starships';

/**
 * Estructura mínima de un recurso devuelto por SWAPI v2 dentro de
 * `results`. SWAPI devuelve más metadatos (`uid`, `url`, etc.) pero
 * solo necesitamos los campos identificativos para los favoritos.
 */
export interface SwapiResource {
  uid: string;
  name: string;
  url: string;
}

/**
 * Representación de un artículo persistido en la lista de favoritos.
 * La combinación `id + category` actúa como clave única.
 */
export interface FavoriteArticle {
  /** Identificador estable dentro de su categoría (uid de SWAPI). */
  id: string;
  /** Nombre del recurso para mostrarlo en la UI sin necesidad de re-fetch. */
  name: string;
  /** Categoría a la que pertenece. */
  category: SwapiCategory;
}
