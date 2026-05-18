import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { ArticlePageRoutingModule } from './article-routing.module';
import { ArticlePage } from './article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ArticlePageRoutingModule,
  ],
  declarations: [ArticlePage],
})
export class ArticlePageModule {}
