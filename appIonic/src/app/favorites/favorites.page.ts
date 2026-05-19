import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

/**
 * Página "My Favorites".
 *
 * Cumple el contrato literal del cuaderno de la Práctica 4:
 *  - `public favorites: any[]` declarado en la clase.
 *  - `ngOnInit` recupera del storage la clave `'favorites'`.
 *  - `generateURL(cat, id)` devuelve `/tabs/wiki/article/<cat>/<id>`.
 * El template renderiza cada favorito con `{{name}} ({{category}})`
 * y enlaza al detalle mediante `[href]`.
 */
@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {
  /** Lista de favoritos cargada desde el storage. */
  public favorites: any[] = [];

  constructor(private storageSrv: StorageService) {}

  /**
   * Carga inicial de favoritos al entrar en la página.
   * @returns void
   */
  ngOnInit(): void {
    this.storageSrv.get('favorites').then(data => {
      this.favorites = (data as any[]) ?? [];
    });
  }

  /**
   * Recarga la lista cada vez que la pestaña pasa a primer plano
   * (para que aparezcan los favoritos añadidos desde la página de
   * artículo sin recargar la app).
   * @returns void
   */
  ionViewWillEnter(): void {
    this.storageSrv.get('favorites').then(data => {
      this.favorites = (data as any[]) ?? [];
    });
  }

  /**
   * Construye la URL al detalle del artículo guardado.
   * @param cat Categoría (`People`, `Planets`, `Species`, `Starships`).
   * @param id Identificador (uid de SWAPI) del recurso.
   * @returns Ruta absoluta lista para `href`.
   */
  generateURL(cat: string, id: string): string {
    return '/tabs/wiki/article/' + cat + '/' + id;
  }
}
