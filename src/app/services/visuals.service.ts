import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AlertController, ModalController, NavController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

//Firebase imports
import { AngularFireAuth } from '@angular/fire/compat/auth';

//lottie

import Lottie from 'lottie-web';
import { DoLoginComponent } from '../components/do-login/do-login.component';

@Injectable({
  providedIn: 'root'
})
export class VisualsService {

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private authAccess:AngularFireAuth,
    private nav:NavController,
    private loadingController:LoadingController
    ) 
    { }


  async alertInfoBasic(msg:string) {
    const alert = await this.alertController.create({
      message:  msg,
      buttons: ['Aceptar'],
      cssClass: 'basicInfoAlert',
      backdropDismiss: true,
      keyboardClose:true,
      mode: "ios"
    });
  
    await alert.present();
      setTimeout(() => {
         this.alertController.dismiss()
      }, 2200);
  }

  async alertInfoRecover(msg:string) {
    const alert = await this.alertController.create({
      message:  msg,
      buttons: ['Aceptar'],
      cssClass: 'basicInfoAlert',
      backdropDismiss: true,
      keyboardClose:true,
      mode: "ios"
    });
  
    await alert.present();
  }

  async alertLogout() {
    const alert = await this.alertController.create({
      message:  "Seguro que quieres cerrar sesión?",
      mode: "ios",
      buttons: [
        {
          role : "Cancel",
          text : "Cancelar",
          cssClass:"btnCancelAlertLogout"
        },
        {
          role: "OK",
          text: "Salir",
          handler : () =>{
            return this.authAccess.signOut().then(() => {
              localStorage.removeItem('user');
              this.nav.navigateBack(['login']);
            });
          }
        }
      ],
      cssClass: 'basicInfoAlert',
      backdropDismiss: true,
      keyboardClose:true
    });

    alert.present()
  }

   alertDontSave(text:any,cancelBtn:any,okbtn:any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const alert =  await this.alertController.create({
        message: text,
        mode: "ios",
        buttons: [
          {
            role: "Cancel",
            text: cancelBtn,
            cssClass: "btnCancelAlertLogout",
            handler: () => {
              reject(false);
            }
          },
          {
            role: "OK",
            text: okbtn,
            handler: () => {
              resolve(true);
            }
          }
        ],
        cssClass: 'basicInfoAlert',
        backdropDismiss: true,
        keyboardClose: true
      });
      alert.present();
    });
  }

  async loadingStartApp() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: "loader",
    });
    await loading.present();
  }

  async loadingStartAppWithoutAcc() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: "loader",
    });
    await loading.present();

    setTimeout(() => {
      this.loadingController.dismiss()
    }, 2000);
  }

  async loadingProcess() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'transparent',
    });
    await loading.present();
  }

  dissMissLoaders(){
    this.loadingController.dismiss();
  }

  

  async modalNotLoggedNormal() {
    const modal = await this.modalController.create({
    component: DoLoginComponent,
    componentProps: {page:"normal"}
    });
  
    await modal.present();
  
  }


  alertNotLogged(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const alert =  await this.alertController.create({
        message: "Para acceder a esta funcionalidad debe iniciar sesion",
        mode: "ios",
        buttons: [
          {
            role: "Cancel",
            text: "Cerrar",
            cssClass: "btnCancelAlertLogout",
            handler: () => {
              reject(false);
            }
          },
          {
            role: "OK",
            text: "Iniciar Sesion",
            handler: () => {
              resolve(true);
              this.nav.navigateBack("login")
            }
          }
        ],
        cssClass: 'basicInfoAlert',
        backdropDismiss: true,
        keyboardClose: true
      });
      alert.present();
    });
  }

}
