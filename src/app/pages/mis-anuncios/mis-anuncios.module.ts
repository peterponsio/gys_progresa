import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisAnunciosPageRoutingModule } from './mis-anuncios-routing.module';

import { MisAnunciosPage } from './mis-anuncios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisAnunciosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MisAnunciosPage]
})
export class MisAnunciosPageModule {}
