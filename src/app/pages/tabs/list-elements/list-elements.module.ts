import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListElementsPageRoutingModule } from './list-elements-routing.module';

import { ListElementsPage } from './list-elements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListElementsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListElementsPage]
})
export class ListElementsPageModule {}
