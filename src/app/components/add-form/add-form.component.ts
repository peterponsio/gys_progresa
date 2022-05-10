import { DataService } from './../../services/data.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { VisualsService } from './../../services/visuals.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Ofertas } from 'src/app/interfaces/models';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { StorageService } from 'src/app/services/storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {


  @Input() title;
  @Input() category : Ofertas;
  showBtn: boolean = true;

  listPhotos: any[] = []

  currentUser:any

  userData: any 

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,private visuals:VisualsService,private data:DataService,private keyb:Keyboard,private zg: NgZone,private camera:Camera,private storage:StorageService) {
        
  }

  async ionViewDidEnter() {
    this.currentUser = await this.storage.get('user')
    this.data.getUser(this.currentUser).valueChanges().subscribe(res=>{
      console.log(res);
      this.userData = res
      console.log(res);
    });
  }

  formAddNew: FormGroup = this.formBuilder.group(
    {
      titulo: ['',[Validators.required,Validators.minLength(1)]],
      descripcion: ['',[Validators.required,Validators.minLength(15)]],
      precio: ['',[Validators.required,Validators.minLength(1),Validators.pattern(/^[0-9]*$/)]],
      location: ['',[Validators.required,Validators.minLength(2)]],
    }
  )

  ngOnInit() {
     
    console.log("moment", moment().local().format());
    
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
  
  onClickAddListImg(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      this.listPhotos.push(base64Image)
     }, (err) => {
        console.log("error camera ",err);
     });

  }

  createNewOfert(){
    if(this.formAddNew.valid){

      let ofert: Ofertas = {
        id: this.data.generateIds(),
        title: this.formAddNew.getRawValue().titulo,
        category: this.category.title.trim().toLowerCase(),
        listImg: this.listPhotos,
        location: this.formAddNew.getRawValue().location,
        description: this.formAddNew.getRawValue().descripcion,
        views: 0,
        created_at: moment().local().format('YYYY-MM-DD[T]HH:mm:ss'),
        reports: 0,
        created_by: this.userData
      }
      try {
        this.data.addOfert(ofert);
        console.log("entro ",ofert);
      } catch (error) {
        this.visuals.alertInfoBasic("Algo salio mal, intentelo de nuevo")
        console.log("error add", error);
        
      }
     
    }else{
      this.visuals.alertInfoBasic("Datos Erroneos");
    }
  }

  

}
