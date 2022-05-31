import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { VisualsService } from 'src/app/services/visuals.service';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from "rxjs/operators";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private nav:NavController,private visualService:VisualsService,private storage:StorageService,private data:DataService,private chooser:Chooser,private storageFire:AngularFireStorage,private loadingController:LoadingController) {
  
   }

  currentUser: any = "undefined"
  currentUserId: any


  ngOnInit() {  
  }

  async ionViewWillEnter() {
    this.currentUserId = await this.storage.get('user')
    try {
      this.data.getUser(this.currentUserId).valueChanges().subscribe(res=>{
        this.currentUser = res
        console.log(res);
      });
    } catch (error) {
      console.log(error);
      this.currentUser = ""
    }
 
  }

  onClickCloseSesion(){
    this.visualService.alertLogout()
  }

  onClickMyOferts(){
    if(this.currentUserId !=undefined){
      this.nav.navigateForward("mis-anuncios", {animated:false,state:{userData:this.currentUserId}})
    }else{
      this.visualService.alertNotLogged()
    }
  }
  onClickMyFavs(){
    if(this.currentUserId !=undefined){
      this.nav.navigateForward("mis-favoritos", {animated:false,state:{userData:this.currentUserId}})
    }else{
      this.visualService.alertNotLogged()
    }
  }
  onClickSettings(){
    if(this.currentUserId !=undefined){
      this.nav.navigateForward("ajustes", {animated:true,state:{userData:this.currentUserId}})
    }else{
      this.visualService.alertNotLogged()
    }
  }

  onClickSuport(){
    if(this.currentUserId !=undefined){
      this.nav.navigateForward("support-form", {animated:true,state:{userData:this.currentUser}})
    }else{
      this.visualService.alertNotLogged()
    }
  }

  onClickAddProfileImg(){

    if(this.currentUser != ""){
      this.chooser.getFile().then((fileData)=>{
        this.visualService.loadingProcess()
        let base64Image = fileData.data;
          let path = `ofertsImgs/${this.data.generateIds()}`;
          const fileRef = this.storageFire.ref(path)
          const customMetadata = {type: 'image/jpeg'}
         
         const task =  fileRef.put(base64Image,{customMetadata}).snapshotChanges().pipe(
            finalize(()=>{
              fileRef.getDownloadURL().subscribe((img)=>{
                this.currentUser.profileImg = img
                this.data.updateUser(this.currentUser)
                this.visualService.dissMissLoaders()
              })
            })
          ).subscribe();
        
       }).catch(err=>{
         window.alert("Algo salio mal")
       })
    }else{
      this.visualService.alertNotLogged()
    }
  }

  onClickTerms(){
    this.nav.navigateForward("terms",{animated:false})
  }

  onClickLogin(){
    this.nav.navigateBack("login",{animated:false})
  }

}
