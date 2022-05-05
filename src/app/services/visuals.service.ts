import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';

//Firebase imports
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class VisualsService {

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private authAccess:AngularFireAuth,
    private nav:NavController
    ) 
    { }


  async alertInfoBasic(msg:string) {
    const alert = await this.alertController.create({
      message:  msg,
      buttons: ['Aceptar'],
      cssClass: 'basicInfoAlert',
      backdropDismiss: true,
      keyboardClose:true
    });
  
    await alert.present();
      setTimeout(() => {
         this.alertController.dismiss()
      }, 1500);
  }

  async alertLogout() {
    const alert = await this.alertController.create({
      message:  "Seguro que quieres cerrar sesión?",
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
}
