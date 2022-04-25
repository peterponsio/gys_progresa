import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBasicComponent } from './header-basic/header-basic.component';
import { SlideSugeridosComponent } from './slide-sugeridos/slide-sugeridos.component';


@NgModule({
  declarations: [
    HeaderBasicComponent,
    SlideSugeridosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HeaderBasicComponent,
    SlideSugeridosComponent
  ]
})
export class ComponentsModule { }
