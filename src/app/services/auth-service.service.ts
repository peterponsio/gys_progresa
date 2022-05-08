
import { NavController, Platform } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';

import * as auth from 'firebase/auth';


import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { VisualsService } from './visuals.service';
import { Users } from '../interfaces/models';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userData:any;
  windowRef: any;
  recaptchaVerifier:any
  
  constructor(private firestore: AngularFirestore,private authAccess: AngularFireAuth,private nav:NavController,private alertService:VisualsService) {
    this.getUserState();
   }


  getUserState(){
    this.authAccess.authState.subscribe(user=>{
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  register(data: any) {
    console.log(data);
    
   return this.authAccess.createUserWithEmailAndPassword(data.email,data.password1).then(res=>{
    this.SetUserDataDB(res.user,data);
   }).catch(err=>{
     console.log(err)
     this.alertService.alertInfoBasic("Datos Erroneos")
   });
  }

  login(data: any){
    return this.authAccess.signInWithEmailAndPassword(data.mail,data.password).then(res=>{
    }).catch(err=>{
      console.log(err)
      this.alertService.alertInfoBasic("Datos Erroneos")
    });
  }

  SignOut() {
    return this.authAccess.signOut().then(() => {
      localStorage.removeItem('user');
      this.nav.navigateBack(['login']);
    });
  }

  PasswordRecover(passwordResetEmail) {
    return this.authAccess
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.alertService.alertInfoRecover("El correo para restablecer su contraseña ha sido enviado")
      })
      .catch((error) => {
        this.alertService.alertInfoBasic("El correo es incorrecto o no existe")
      });
  }

  SetUserDataDB(user:any,data:Users) {
    console.log("users uid", user);
    console.log("data", data);
    
    
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `Users/${user.uid}`
    );
    const userData={
      id: user.uid,
      mail: user.email,
      name: data.name,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
