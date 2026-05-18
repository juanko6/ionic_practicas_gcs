import { Component } from '@angular/core';

@Component({
  selector: 'app-wiki',
  templateUrl: 'wiki.page.html',
  styleUrls: ['wiki.page.scss'],
  standalone: false,
})
export class WikiPage {

  readonly categories: string[] = ['People', 'Planets', 'Species', 'Starships'];

  constructor() {}
}
