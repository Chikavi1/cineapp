import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'guardados', loadChildren: './guardados/guardados.module#GuardadosPageModule' },
  { path: 'fechascut', loadChildren: './fechascut/fechascut.module#FechascutPageModule' },
  { path: 'noticias', loadChildren: './noticias/noticias.module#NoticiasPageModule' },
  { path: 'evento/:id', loadChildren: './evento/evento.module#EventoPageModule' },
  { path: 'eventos', loadChildren: './eventos/eventos.module#EventosPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
