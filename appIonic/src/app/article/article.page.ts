import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { People } from '../models/People';
import { Planet } from '../models/Planet';
import { Species } from '../models/Species';
import { Starship } from '../models/Starship';
import { FavoriteArticle } from '../models/Article';
import { WikiService } from '../services/wiki.service';
import { StorageService } from '../services/storage.service';

/** Clave bajo la que se persiste la lista de favoritos. */
const FAVORITES_KEY = 'favorites';

/**
 * Página de detalle de un recurso de SWAPI.
 *
 * Lee `:cat/:id` de la ruta, recupera el recurso vía `WikiService` y lo
 * deserializa en el modelo tipado correspondiente (`People`, `Planet`,
 * `Species`, `Starship`). Además, consulta `StorageService` para
 * determinar si está marcado como favorito y expone `toggleFavorite()`
 * para alternar el estado y notificar con un `Toast`.
 */
@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: false,
})
export class ArticlePage implements OnInit {
  /** Título visible en la cabecera y en la card. */
  title: string = '';
  /** Identificador (uid) del recurso. */
  id: string = '';
  /** Categoría tal como llega en la URL (`People`, `Planets`, ...). */
  category: string = '';
  /** Indica si el recurso está marcado como favorito. */
  isFavorite: boolean = false;

  people: People = new People();
  planet: Planet = new Planet();
  species: Species = new Species();
  starship: Starship = new Starship();

  constructor(
    private route: ActivatedRoute,
    private srv: WikiService,
    private storage: StorageService,
    private toastCtrl: ToastController
  ) {}

  /**
   * Lee los parámetros de ruta, descarga el detalle desde SWAPI y
   * actualiza `isFavorite` consultando el storage.
   * @returns void — el resultado es la actualización de las propiedades.
   */
  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('cat') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    this.srv.getArticle(this.category, this.id).subscribe((result: any) => {
      const properties = result?.result?.properties;
      if (!properties) {
        return;
      }
      switch (this.category) {
        case 'People':
          this.people = properties;
          this.title = this.people.name;
          break;
        case 'Planets':
          this.planet = properties;
          this.title = this.planet.name;
          break;
        case 'Species':
          this.species = properties;
          this.title = this.species.name;
          break;
        case 'Starships':
          this.starship = properties;
          this.title = this.starship.name;
          break;
      }
      // Una vez tenemos el título podemos persistirlo si se marca favorito
      this.refreshFavoriteFlag();
    });

    // Pre-cálculo inmediato para que el icono refleje el estado aunque
    // SWAPI aún no haya respondido.
    this.refreshFavoriteFlag();
  }

  /**
   * Recalcula `isFavorite` leyendo el array persistido y buscando por
   * la combinación única `id + category`.
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
   *  - Si ya existe (mismo `id + category`), lo elimina del array.
   *  - Si no existe, lo añade con `id`, `name` y `category`.
   * Persiste el array actualizado y muestra un `Toast` informativo.
   * @returns Promesa que resuelve tras persistir y presentar el toast.
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
      message = 'Article removed from favorites successfully';
    } else {
      favorites.push({
        id: this.id,
        name: this.title || this.id,
        category: this.category,
      });
      this.isFavorite = true;
      message = 'Article stored as favorite successfully';
    }

    await this.storage.set(FAVORITES_KEY, favorites);
    await this.presentToast(message);
  }

  /**
   * Presenta un toast con el mensaje indicado, tal como exige el
   * cuaderno de la Práctica 4.
   * @param text Mensaje a mostrar.
   * @returns Promesa que resuelve cuando el toast se ha presentado.
   */
  private async presentToast(text: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000,
    });
    await toast.present();
  }
}
