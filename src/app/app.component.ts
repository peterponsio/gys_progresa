import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authAccess: AngularFireAuth,private navC:NavController,private loadingController:LoadingController,private ngZ:NgZone) {
    let userData;
    ngZ.run(()=>{
      this.authAccess.authState.subscribe(user=>{
        if (user) {
          console.log(user);
          this.loadingStartApp().then(()=>{
            navC.navigateForward("tabs/list-elements",{animated:false}).then(()=>{
              //loadingController.dismiss();
             });
          });
        }  
      })  
    })

  }

  getIsUserLogged(){

  }

  async loadingStartApp() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: "loader",
      duration: 2000
    });
    await loading.present();
  }



}
