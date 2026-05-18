import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitPage } from './exit.page';
import { ExitPageRoutingModule } from './exit-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExitPageRoutingModule
  ],
  declarations: [ExitPage]
})
export class ExitPageModule {}
