import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOfertPage } from './edit-ofert.page';

const routes: Routes = [
  {
    path: '',
    component: EditOfertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOfertPageRoutingModule {}
