import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListElementsPage } from './list-elements.page';

const routes: Routes = [
  {
    path: '',
    component: ListElementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListElementsPageRoutingModule {}
