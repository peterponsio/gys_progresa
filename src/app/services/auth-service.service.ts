import { NavController, Platform } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';

import * as auth from 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { VisualsService } from './visuals.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userData:any;

  constructor(private firestore: AngularFirestore,private authAccess: AngularFireAuth,private nav:NavController,private ngZone:NgZone,private platform:Platform,private google: GooglePlus,private alertService:VisualsService) {
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
   return this.authAccess.createUserWithEmailAndPassword(data.email,data.password1).then(res=>{
    this.SetUserDataDB(res.user);
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
        this.alertService.alertInfoBasic("El correo para restablecer su contraseña ha sido enviado")
      })
      .catch((error) => {
        this.alertService.alertInfoBasic("El correo es incorrecto o no existe")
      });
  }

  //Google

  loginGoogle() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
      console.log("sing android ");
      
    } else {
      console.log("log web");
      this.GoogleAuth();
    }
  }

  async loginGoogleAndroid() {
    const loginG = await this.google.login({
      'webClientId': '639695285204-srn65vvlu37hbc07c6p8fanujv9u0k3u.apps.googleusercontent.com',
      'offline': true
    }).catch(err=>{
      console.log(err);
    })
    console.log(loginG);
    
    const resConfirmed = await this.authAccess.signInWithCredential(auth.GoogleAuthProvider.credential(loginG.idToken));
    const user = resConfirmed.user;
    this.SetUserDataDB(user).then(res=>{
      //this.nav.navigateForward("tabs/list-elements",{animated:false});
    });
  }


///Google login
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.authAccess
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          //this.nav.navigateForward("tabs/list-elements",{animated:false});
        });
        this.SetUserDataDB(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  SetUserDataDB(data:any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${data.uid}`
    );
    const userData={
      uid: data.uid,
      email: data.email,
      displayName: data.displayName,
      photoURL: data.photoURL,
      //emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
 
}
