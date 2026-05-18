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
   * Segmento de ruta normalizado de la categoría (people, planets, ...).
   * Se usa como parámetro `:category` del routerLink al detalle.
   */
  get categoryRoute(): string {
    return this.theCategory.name.toLowerCase();
  }

  getArticles(category: string) {
    this.wikiSrv.getAllArticles(category).subscribe((result: any) => {
      this.articles = result.results;
    });
  }

  click() {
    this.clicked.emit(this.theCategory.name);
    this.getArticles(this.theCategory.name);
  }
}
