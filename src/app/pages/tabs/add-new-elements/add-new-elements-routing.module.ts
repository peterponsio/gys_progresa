import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewElementsPage } from './add-new-elements.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewElementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewElementsPageRoutingModule {}
