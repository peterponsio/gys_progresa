import { VisualsService } from './../../services/visuals.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Ofertas } from 'src/app/interfaces/models';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {


  @Input() title;
  @Input() category : Ofertas;
  showBtn: boolean = true;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,private visuals:VisualsService,private keyb:Keyboard,private zg: NgZone) { }

  formAddNew: FormGroup = this.formBuilder.group(
    {
      titulo: [''],
      descripcion: [''],
      precio: [''],
      location: [''],
      listPhotos: [],
    }

    // id:string,
    // title:string,
    // category:string,
    // listImg: [],
    // location:any,
    // description:string,
    // views:number,
    // created_at:any,
    // reports:number,
    // created_by:Users,
  )

  ngOnInit() {
    this.keyb.onKeyboardWillShow().subscribe((res)=>{
      this.zg.run(() => {
        this.showBtn=false;
      });
    });
    this.keyb.onKeyboardWillHide().subscribe((res)=>{
  
      this.zg.run(() => {
        this.showBtn=true;
      });
    })
  }

  onClickGoBackModal(){
    this.visuals.alertDontSave().then(res=>{
      this.modalController.dismiss(this.formAddNew.getRawValue());
    })
  } 

  createNewOfert(){
    //this.modalController.dismiss(this.formAddNew.getRawValue());
  }

}
