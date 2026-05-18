/**
 * Categorías SWAPI tal como aparecen en la URL del detalle
 * (`/tabs/wiki/article/<cat>/<id>`) y en el switch de `ArticlePage`.
 * Se mantienen capitalizadas para coincidir con `Category.name`.
 */
export type SwapiCategory = 'People' | 'Planets' | 'Species' | 'Starships';

/**
 * Estructura mínima de un recurso devuelto por SWAPI v2 dentro de
 * `results`. SWAPI devuelve más metadatos (`uid`, `url`, etc.) pero
 * solo necesitamos los campos identificativos para favoritos.
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
  /** Categoría a la que pertenece (formato `People`, `Planets`, ...). */
  category: string;
}
