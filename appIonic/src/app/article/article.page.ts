import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { People } from '../models/People';
import { Planet } from '../models/Planet';
import { Species } from '../models/Species';
import { Starship } from '../models/Starship';
import { WikiService } from '../services/wiki.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: false,
})
export class ArticlePage implements OnInit {
  title: string = '';
  id: string = '';
  category: string = '';

  people: People = new People();
  planet: Planet = new Planet();
  species: Species = new Species();
  starship: Starship = new Starship();

  constructor(private route: ActivatedRoute, private srv: WikiService) {}

  ngOnInit() {
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
    });
  }
}
