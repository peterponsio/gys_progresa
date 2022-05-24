import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOfertPageRoutingModule } from './edit-ofert-routing.module';

import { EditOfertPage } from './edit-ofert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOfertPageRoutingModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [EditOfertPage]
})
export class EditOfertPageModule {}
