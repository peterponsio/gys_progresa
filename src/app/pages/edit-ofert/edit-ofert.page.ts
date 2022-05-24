import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { StorageService } from './../../services/storage.service';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { DataService } from 'src/app/services/data.service';
import { VisualsService } from './../../services/visuals.service';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { NavController, ModalController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Ofertas } from './../../interfaces/models';
import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { Paises } from 'src/app/interfaces/countryJson';

@Component({
  selector: 'app-edit-ofert',
  templateUrl: './edit-ofert.page.html',
  styleUrls: ['./edit-ofert.page.scss'],
})
export class EditOfertPage implements OnInit {


  @Input() title;
  @Input() category : Ofertas;
  showBtn: boolean = true;

  listPhotos: any[] = []
  listProvincias: any[] ;
  currentUser:any

  userData: any 
  ofertData:any  =""

  showLocations:boolean = false

  locationSet: boolean = false

  task: AngularFireUploadTask;
  taskRef: AngularFireStorageReference;

  formAddNew: FormGroup 

  constructor(private router:Router,private nav:NavController,private keyboard:Keyboard,private modalController: ModalController, private formBuilder: FormBuilder,private chooser:Chooser,private visuals:VisualsService,private data:DataService,private keyb:Keyboard,private zg: NgZone,private camera:Camera,private storage:StorageService,private storageFire:AngularFireStorage) {
        
  }


  ngOnInit() {
    this.ofertData =  this.router.getCurrentNavigation().extras.state.ofert;
    console.log(this.ofertData);
    this.currentUser = this.ofertData.created_by
    this.listProvincias = Paises.paises

    this.formAddNew = this.formBuilder.group(
      {
        titulo: [this.ofertData.title,[Validators.required,Validators.minLength(1)]],
        descripcion: [this.ofertData.description,[Validators.required,Validators.minLength(15)]],
        precio: [this.ofertData.price,[Validators.required,Validators.minLength(1),Validators.pattern(/^[0-9]*$/)]],
        location: [this.ofertData.location,[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      }
    ) 
    
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
    console.log("tecla",tecla);
    
    if(tecla === 13){
      this.keyboard.hide();
    }
  }
  

  onClickGoBackModal(){
    this.visuals.alertDontSave("Quieres salir sin guardar datos?","Cancelar","Salir").then(res=>{
      this.nav.back()
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

    this.listPhotos = this.ofertData.listImg

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
      this.visuals.loadingProcess()
      let ofert: Ofertas = {
        id: "" + this.ofertData.id,
        title: this.formAddNew.getRawValue().titulo || this.ofertData.title,
        category: this.ofertData.category,
        price: this.formAddNew.getRawValue().precio || this.ofertData.price,
        listImg: [...this.listPhotos],
        location: this.formAddNew.getRawValue().location || this.ofertData.location,
        description: this.formAddNew.getRawValue().descripcion || this.ofertData.description,
        views: this.ofertData.views,
        created_at: this.ofertData.created_at,
        reports: this.ofertData.reports,
        created_by: this.ofertData.created_by,
        isFav:this.ofertData.isFav || false
      }      
      
      try {
        if(this.currentUser){
          console.log("oferta",ofert);
          this.formAddNew.reset()
          this.listPhotos= []
          this.data.editOfert(ofert).then(()=>{
            this.visuals.dissMissLoaders()
            this.visuals.alertInfoBasic("Oferta Actualizada").finally(()=>{
              this.nav.navigateBack("mis-anuncios")
            })
          })
         
        }else{
          this.visuals.alertInfoBasic("Algo salio mal inicie sesion")
          this.formAddNew.reset()
        }
       
      } catch (error) {
        this.visuals.alertInfoBasic("Algo salio mal, intentelo de nuevo")
        console.log("error add", error);
        this.visuals.dissMissLoaders()
      }
      
    }else{
      this.visuals.alertInfoBasic("Datos Erroneos");
    }
  }

}
