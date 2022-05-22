import { SwiperModule } from 'swiper/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementDetailsUserPageRoutingModule } from './element-details-user-routing.module';

import { ElementDetailsUserPage } from './element-details-user.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElementDetailsUserPageRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [ElementDetailsUserPage]
})
export class ElementDetailsUserPageModule {}
