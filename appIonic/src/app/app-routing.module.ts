import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /**
   * Práctica 3 — el router principal arranca en la pantalla de login.
   * `UserService.login` decide después si la app navega al shell de tabs.
   */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
  },
  /**
   * El módulo de tabs ya define internamente `path: 'tabs'`, por eso lo
   * cargamos a nivel raíz: `/tabs/wiki`, `/tabs/favorites`, …
   */
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
