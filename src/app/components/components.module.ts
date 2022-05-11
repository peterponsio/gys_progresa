import { AddFormComponent } from './add-form/add-form.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBasicComponent } from './header-basic/header-basic.component';
import { SlideSugeridosComponent } from './slide-sugeridos/slide-sugeridos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DoLoginComponent } from './do-login/do-login.component';


@NgModule({
  declarations: [
    HeaderBasicComponent,
    SlideSugeridosComponent,
    AddFormComponent,
    DoLoginComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderBasicComponent,
    SlideSugeridosComponent,
    AddFormComponent,
    DoLoginComponent
  ]
})
export class ComponentsModule { }
