import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverPassPageRoutingModule } from './recover-pass-routing.module';

import { RecoverPassPage } from './recover-pass.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverPassPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RecoverPassPage]
})
export class RecoverPassPageModule {}
