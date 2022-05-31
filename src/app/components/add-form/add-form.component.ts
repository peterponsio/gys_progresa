import { DoLoginComponent } from './../do-login/do-login.component';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
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

import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';



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

  task: AngularFireUploadTask;
  taskRef: AngularFireStorageReference;

  constructor(private nav:NavController,private keyboard:Keyboard,private modalController: ModalController, private formBuilder: FormBuilder,private chooser:Chooser,private visuals:VisualsService,private data:DataService,private keyb:Keyboard,private zg: NgZone,private camera:Camera,private storage:StorageService,private storageFire:AngularFireStorage) {
        
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
      titulo: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(15)]],
      descripcion: ['',[Validators.required,Validators.minLength(15)]],
      precio: ['',[Validators.required,Validators.minLength(1),Validators.pattern(/^[0-9]*$/)]],
      location: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
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

  close(tecla){
    if(tecla === 13){
      this.keyboard.hide();
    }
  }
  

  onClickGoBackModal(){
    this.visuals.alertDontSave("Quieres salir sin guardar datos?","Cancelar","Salir").then(res=>{
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

     this.chooser.getFile().then((fileData)=>{
      this.visuals.loadingProcess()
      let base64Image = fileData.data;
        let path = `ofertsImgs/${this.data.generateIds()}`;
        const fileRef = this.storageFire.ref(path)
        const customMetadata = {type: 'image/jpeg'}
       
       const task =  fileRef.put(base64Image,{customMetadata}).snapshotChanges().pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe((img)=>{
              if(this.listPhotos.length >= 3){
                this.listPhotos.pop()
                this.listPhotos.unshift(img)
              }else{
                this.listPhotos.unshift(img)
              }
              this.visuals.dissMissLoaders()
            })
          })
        ).subscribe();
      
     }).catch(err=>{
       window.alert("Algo salio mal")
     })
  }

  async createNewOfert(){
    if(this.formAddNew.valid){

      let ofert: Ofertas = {
        id: "" + this.data.generateIds(),
        title: this.formAddNew.getRawValue().titulo,
        category: this.category.title.trim().toLowerCase(),
        price: this.formAddNew.getRawValue().precio,
        listImg: [...this.listPhotos] ,
        location: this.formAddNew.getRawValue().location,
        description: this.formAddNew.getRawValue().descripcion,
        views: 0,
        created_at: moment().local().format('YYYY-MM-DD[T]HH:mm:ss'),
        reports: 0,
        created_by: this.userData,
        isFav: false
      }      
      
      try {
        if(this.userData){
          console.log("oferta",ofert);
          this.data.addOfert(ofert);
          this.formAddNew.reset()
          this.listPhotos= []
          this.modalNotLoggedAdd()
          
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


  async modalNotLoggedAdd() {
    const modal = await this.modalController.create({
    component: DoLoginComponent,
    componentProps: {page:"add"}
    });
  
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if(data.accion=="misAnuncios"){
      this.visuals.loadingStartApp()
      this.modalController.dismiss({'accion':'misAnuncios'})
      this.visuals.dissMissLoaders()
    }else if(data.accion=="close"){
      this.visuals.loadingStartApp()
      this.modalController.dismiss({'accion':'close'})
      this.visuals.dissMissLoaders()
    }
  
  }
}
