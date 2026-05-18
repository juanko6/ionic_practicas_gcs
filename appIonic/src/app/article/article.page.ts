import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { WikiService } from '../services/wiki.service';
import {
  FavoriteArticle,
  SwapiCategory,
} from '../models/Article';

/** Clave bajo la que se persiste la lista de favoritos. */
const FAVORITES_KEY = 'favorites';

/**
 * Detalle de un recurso de SWAPI (un person, planet, species o starship).
 *
 * Esta página combina:
 *  - Carga del recurso vía `WikiService`.
 *  - Determinación inicial de `isFavorite` consultando `StorageService`.
 *  - Toggle de favorito que actualiza el array persistido y muestra un
 *    `Toast` confirmando la acción.
 */
@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: false,
})
export class ArticlePage implements OnInit {
  /** Identificador del recurso dentro de su categoría (uid de SWAPI). */
  id: string = '';
  /** Categoría a la que pertenece el recurso. */
  category: SwapiCategory = 'people';
  /** Nombre legible del recurso, mostrado en el header del detalle. */
  name: string = '';
  /** Propiedades arbitrarias devueltas por SWAPI para este recurso. */
  properties: Record<string, unknown> | null = null;
  /** Indica si el recurso actual está marcado como favorito. */
  isFavorite: boolean = false;
  /** Bandera para mostrar el spinner mientras se carga el recurso. */
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private wikiSrv: WikiService,
    private storage: StorageService,
    private toastCtrl: ToastController
  ) {}

  /**
   * Ciclo de vida Angular. Lee los parámetros de ruta, recupera el
   * recurso desde SWAPI y comprueba si está en favoritos.
   * @returns Promesa que resuelve cuando la página está poblada.
   */
  async ngOnInit(): Promise<void> {
    this.category = this.route.snapshot.paramMap.get('category') as SwapiCategory;
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    await this.fetchArticle();
    await this.refreshFavoriteFlag();
  }

  /**
   * Recupera el detalle del recurso desde SWAPI.
   * Si la API falla, deja `properties` a `null` y `loading` a `false`
   * para que la vista muestre un mensaje en lugar de quedarse colgada.
   * @returns Promesa que resuelve cuando termina el fetch.
   */
  private async fetchArticle(): Promise<void> {
    this.loading = true;
    try {
      const result: any = await this.wikiSrv
        .getArticle(this.category, this.id)
        .toPromise();
      // SWAPI v2 devuelve { result: { properties, uid, description } }
      this.properties = result?.result?.properties ?? null;
      this.name = (this.properties as any)?.name ?? this.id;
    } catch (err) {
      console.error('No se pudo cargar el artículo', err);
      this.properties = null;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Recalcula `isFavorite` consultando el array persistido.
   * La combinación `id + category` es la clave única.
   * @returns Promesa que resuelve cuando `isFavorite` está actualizado.
   */
  private async refreshFavoriteFlag(): Promise<void> {
    const favorites = (await this.storage.get<FavoriteArticle[]>(FAVORITES_KEY)) ?? [];
    this.isFavorite = favorites.some(
      f => f.id === this.id && f.category === this.category
    );
  }

  /**
   * Alterna el estado de favorito del recurso actual:
   *  - Si existe (mismo id + category) → lo elimina del array.
   *  - Si no existe → lo añade con `id`, `name` y `category`.
   * Persiste el array y notifica con un `Toast`.
   * @returns Promesa que resuelve tras persistir y mostrar el toast.
   */
  async toggleFavorite(): Promise<void> {
    const favorites = (await this.storage.get<FavoriteArticle[]>(FAVORITES_KEY)) ?? [];
    const index = favorites.findIndex(
      f => f.id === this.id && f.category === this.category
    );

    let message: string;
    if (index >= 0) {
      favorites.splice(index, 1);
      this.isFavorite = false;
      message = 'Eliminado de favoritos';
    } else {
      favorites.push({
        id: this.id,
        name: this.name || this.id,
        category: this.category,
      });
      this.isFavorite = true;
      message = 'Añadido a favoritos';
    }

    await this.storage.set(FAVORITES_KEY, favorites);
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: 'dark',
    });
    await toast.present();
  }

  /**
   * Devuelve los pares clave/valor del recurso para iterar en el template.
   * Filtra entradas no primitivas (arrays/objetos) para no romper el render.
   * @returns Lista de pares legibles ordenados.
   */
  get displayProperties(): Array<{ key: string; value: string }> {
    if (!this.properties) {
      return [];
    }
    return Object.entries(this.properties)
      .filter(([, v]) => typeof v === 'string' || typeof v === 'number')
      .map(([key, value]) => ({ key, value: String(value) }));
  }
}
