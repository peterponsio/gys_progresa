import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewElementsPageRoutingModule } from './add-new-elements-routing.module';

import { AddNewElementsPage } from './add-new-elements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewElementsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddNewElementsPage]
})
export class AddNewElementsPageModule {}
