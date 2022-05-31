import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportFormPage } from './support-form.page';

const routes: Routes = [
  {
    path: '',
    component: SupportFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportFormPageRoutingModule {}
