import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementDetailsUserPage } from './element-details-user.page';

const routes: Routes = [
  {
    path: '',
    component: ElementDetailsUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementDetailsUserPageRoutingModule {}
