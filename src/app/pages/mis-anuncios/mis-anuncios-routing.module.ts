import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisAnunciosPage } from './mis-anuncios.page';

const routes: Routes = [
  {
    path: '',
    component: MisAnunciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisAnunciosPageRoutingModule {}
