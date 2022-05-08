import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListElementsPageRoutingModule } from './list-elements-routing.module';

import { ListElementsPage } from './list-elements.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListElementsPageRoutingModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [ListElementsPage]
})
export class ListElementsPageModule {}
