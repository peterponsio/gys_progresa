import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementDetailsPage } from './element-details.page';

const routes: Routes = [
  {
    path: '',
    component: ElementDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementDetailsPageRoutingModule {}
