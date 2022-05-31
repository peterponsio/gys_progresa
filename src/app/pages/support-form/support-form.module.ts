import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportFormPageRoutingModule } from './support-form-routing.module';

import { SupportFormPage } from './support-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportFormPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [SupportFormPage]
})
export class SupportFormPageModule {}
