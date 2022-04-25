import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewElementsPageRoutingModule } from './add-new-elements-routing.module';

import { AddNewElementsPage } from './add-new-elements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewElementsPageRoutingModule
  ],
  declarations: [AddNewElementsPage]
})
export class AddNewElementsPageModule {}
