import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatSesionPage } from './chat-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: ChatSesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatSesionPageRoutingModule {}
