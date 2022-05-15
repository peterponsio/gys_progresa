import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../services/data.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { VisualsService } from './../../services/visuals.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Component, Input, OnInit, NgZone,ViewEncapsulation } from '@angular/core';
import { Ofertas } from 'src/app/interfaces/models';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { StorageService } from 'src/app/services/storage.service';
import * as moment from 'moment';
import {Paises} from '../../interfaces/countryJson'

import { finalize } from "rxjs/operators";

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
  listProvincias: any[] ;
  currentUser:any

  userData: any 

  showLocations:boolean = false

  locationSet: boolean = false

  constructor(private nav:NavController,private modalController: ModalController, private formBuilder: FormBuilder,private visuals:VisualsService,private data:DataService,private keyb:Keyboard,private zg: NgZone,private camera:Camera,private storage:StorageService,private storageFire:AngularFireStorage) {
        
  }

  async ionViewDidEnter() {
    this.currentUser = await this.storage.get('user')
    this.data.getUser(this.currentUser).valueChanges().subscribe(res=>{
      console.log(res);
      this.userData = res
      console.log(res);
    });
    this.listProvincias = Paises.paises
  }

  formAddNew: FormGroup = this.formBuilder.group(
    {
      titulo: ['',[Validators.required,Validators.minLength(1)]],
      descripcion: ['',[Validators.required,Validators.minLength(15)]],
      precio: ['',[Validators.required,Validators.minLength(1),Validators.pattern(/^[0-9]*$/)]],
      location: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
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
  onClickSelectRegion(location:any){
    this.showLocations = false
    console.log("location", location);
    this.formAddNew.controls['location'].setValue(location)
    this.showLocations = false
  }

  SetingLocation(event:any){
    event.detail.value != "" ? this.showLocations = true : this.showLocations =false
  }
 
  onClickAddListImg(){
     const options: CameraOptions = {
       quality: 100,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.ALLMEDIA,
       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
     }

      this.camera.getPicture(options).then((imageData) => {
 
        let base64Image = 'data:image/jpeg;base64,' + imageData;
  
        this.listPhotos.unshift(base64Image)

        if(this.listPhotos.length == 4){
          this.listPhotos.pop()
        }
     
       }, (err) => {
          console.log("error camera ",err);
       });
  }

  createNewOfert(){
    if(this.formAddNew.valid){


      let ofert: Ofertas = {
        id: "" + this.data.generateIds(),
        title: this.formAddNew.getRawValue().titulo,
        category: this.category.title.trim().toLowerCase(),
        price: this.formAddNew.getRawValue().precio,
        listImg: this.listPhotos,
        location: this.formAddNew.getRawValue().location,
        description: this.formAddNew.getRawValue().descripcion,
        views: 0,
        created_at: moment().local().format('YYYY-MM-DD[T]HH:mm:ss'),
        reports: 0,
        created_by: this.userData
      }       
        let ruta = this.data.generateIds();
        let route = `/ofertsImgs/${ruta}`;
      
        if(ofert.listImg[0]){
          const storageRef = this.storageFire.ref(route);
          const uploadTask = storageRef.putString(ofert.listImg[0],"data_url");
          uploadTask.snapshotChanges().pipe(
            finalize(() => {
              storageRef.getDownloadURL().subscribe( downloadURL => {
                ofert.listImg[0] =  downloadURL;
              });
            })
          )
        }
    
      try {
        if(this.userData){
          this.data.addOfert(ofert);
          this.visuals.modalNotLoggedAdd()
          this.formAddNew.reset()
          console.log("entro ",ofert);
        }else{
          this.visuals.modalNotLoggedNormal()
          this.formAddNew.reset()
        }
       
      } catch (error) {
        this.visuals.alertInfoBasic("Algo salio mal, intentelo de nuevo")
        console.log("error add", error);
      }
     
    }else{
      this.visuals.alertInfoBasic("Datos Erroneos");
    }
  }

  

}
