import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { FavoriteArticle } from '../models/Article';

/** Clave de storage compartida con `ArticlePage`. */
const FAVORITES_KEY = 'favorites';

/**
 * Lista los artículos marcados como favoritos por el usuario.
 * La lectura del storage se hace en `ionViewWillEnter` para garantizar
 * que al volver del detalle (donde se modifica el array) la lista
 * mostrada esté siempre actualizada.
 */
@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage {
  /** Lista actual de favoritos persistidos. */
  favorites: FavoriteArticle[] = [];

  constructor(private storage: StorageService) {}

  /**
   * Recarga la lista cada vez que la pestaña pasa a primer plano.
   * @returns Promesa que resuelve cuando `favorites` está poblado.
   */
  async ionViewWillEnter(): Promise<void> {
    await this.loadFavorites();
  }

  /**
   * Lee el array de favoritos desde el `StorageService`.
   * @returns Promesa que resuelve tras la lectura.
   */
  private async loadFavorites(): Promise<void> {
    this.favorites = (await this.storage.get<FavoriteArticle[]>(FAVORITES_KEY)) ?? [];
  }

  /**
   * Construye la ruta dinámica al detalle de un artículo guardado.
   * Sigue la convención unificada con `wiki-routing.module.ts`:
   * `/tabs/wiki/article/<cat>/<id>` (ej.: `/tabs/wiki/article/Planets/1`).
   * @param article Favorito desde el que generar la ruta.
   * @returns Cadena de ruta lista para usar como `href` / `routerLink`.
   */
  generateURL(article: FavoriteArticle): string {
    return `/tabs/wiki/article/${article.category}/${article.id}`;
  }

  /**
   * Elimina un favorito directamente desde la lista.
   * Útil para que el usuario no tenga que entrar al detalle para
   * quitar entradas obsoletas.
   * @param article Favorito a eliminar.
   * @returns Promesa que resuelve cuando el storage está actualizado.
   */
  async remove(article: FavoriteArticle): Promise<void> {
    this.favorites = this.favorites.filter(
      f => !(f.id === article.id && f.category === article.category)
    );
    await this.storage.set(FAVORITES_KEY, this.favorites);
  }
}
