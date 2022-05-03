import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';
import * as auth from 'firebase/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authAccess: AngularFireAuth,private navC:NavController,private loadingController:LoadingController) {
    this.authAccess.authState.subscribe(user=>{
      if (user) {
        this.presentLoading();
        navC.navigateForward("tabs/list-elements",{animated:false}).then(()=>{
         loadingController.dismiss();
        });
      }  
    })

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: "loader",
    });
    await loading.present();
  }



}
