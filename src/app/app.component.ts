import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, NgZone } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private authAccess: AngularFireAuth,private navC:NavController,private loadingController:LoadingController,private ngZ:NgZone) {
    this.loadingStartApp();
      this.authAccess.authState.subscribe(user=>{
        if (user) {
          console.log(user);
            navC.navigateForward("tabs/list-elements",{animated:false}).then(()=>{
              loadingController.dismiss();
             });
        }else {
          loadingController.dismiss();
        } 
      })  
  }

  async loadingStartApp() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: "loader",
    });
    await loading.present();
  }



}
