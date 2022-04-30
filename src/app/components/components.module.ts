import { AddFormComponent } from './add-form/add-form.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBasicComponent } from './header-basic/header-basic.component';
import { SlideSugeridosComponent } from './slide-sugeridos/slide-sugeridos.component';


@NgModule({
  declarations: [
    HeaderBasicComponent,
    SlideSugeridosComponent,
    AddFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HeaderBasicComponent,
    SlideSugeridosComponent,
    AddFormComponent
  ]
})
export class ComponentsModule { }
