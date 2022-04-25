import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementDetailsPageRoutingModule } from './element-details-routing.module';

import { ElementDetailsPage } from './element-details.page';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElementDetailsPageRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [ElementDetailsPage]
})
export class ElementDetailsPageModule {}
