import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExitPage } from './exit.page';

const routes: Routes = [
  {
    path: '',
    component: ExitPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExitPageRoutingModule {}
