import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatSesionPageRoutingModule } from './chat-sesion-routing.module';

import { ChatSesionPage } from './chat-sesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatSesionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ChatSesionPage]
})
export class ChatSesionPageModule {}
