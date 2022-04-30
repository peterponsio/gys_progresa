import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {


  @Input() title;
  @Input() category;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder) { }

  formAddNew: FormGroup = this.formBuilder.group(
    {
      titulo: [''],
      descripcion: [''],
      precio: [''],
      location: [''],
      listPhotos: [''],
    }
  )

  ngOnInit() {}

  onClickGoBackModal(){
    this.modalController.dismiss(this.formAddNew.getRawValue());
  } 

}
