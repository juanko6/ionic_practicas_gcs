import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../models/Category';
import { WikiService } from '../services/wiki.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: false,
})
export class CategoryComponent implements OnInit {
  @Input() theCategory: Category = new Category();
  @Input() selected: boolean = false;
  @Output() clicked = new EventEmitter<string>();

  articles: any[] = [];

  constructor(private wikiSrv: WikiService) {}

  ngOnInit() {}

  /**
   * Recupera el listado de artículos de la categoría desde SWAPI.
   * @param category Categoría seleccionada (ej. "People").
   * @returns void — el resultado se asigna a `this.articles`.
   */
  getArticles(category: string): void {
    this.wikiSrv.getAllArticles(category).subscribe((result: any) => {
      this.articles = result.results;
    });
  }

  /**
   * Notifica al padre del cambio de selección y dispara la carga de
   * artículos de la categoría actual.
   * @returns void
   */
  click(): void {
    this.clicked.emit(this.theCategory.name);
    this.getArticles(this.theCategory.name);
  }

  /**
   * Construye la URL al detalle de un artículo concreto, usando la
   * convención fijada en `wiki-routing.module.ts` (`article/:cat/:id`).
   * @param cat Nombre de la categoría tal como viene de `Category.name`.
   * @param id Identificador (uid) del recurso en SWAPI.
   * @returns Ruta absoluta lista para usar como `href`.
   */
  generateURL(cat: string, id: string): string {
    return '/tabs/wiki/article/' + cat + '/' + id;
  }
}
