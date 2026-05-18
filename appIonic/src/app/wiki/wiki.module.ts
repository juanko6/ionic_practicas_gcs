import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { WikiPage } from './wiki.page';
import { WikiPageRoutingModule } from './wiki-routing.module';
import { CategoryComponent } from '../category/category.component';
import { WikiService } from '../services/wiki.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    WikiPageRoutingModule,
    HttpClientModule
  ],
  providers: [WikiService],
  declarations: [WikiPage, CategoryComponent]
})
export class WikiPageModule {}
