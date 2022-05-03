import { NavController, Platform } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';

import * as auth from 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userData:any;

  constructor(private firestore: AngularFirestore,private authAccess: AngularFireAuth,private nav:NavController,private ngZone:NgZone,private platform:Platform,private google: GooglePlus) {
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
     console.log(err);
   });
  }

  login(data: any){
    return this.authAccess.signInWithEmailAndPassword(data.mail,data.password).then(res=>{

    }).catch(err=>{
      console.log(err);
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
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  //Google

  loginGoogle() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
    } else {
      this.GoogleAuth();
    }
  }

  async loginGoogleAndroid() {
    const res = await this.google.login({
      'webClientId': '639695285204-srn65vvlu37hbc07c6p8fanujv9u0k3u.apps.googleusercontent.com',
      'offline': true
    });
    const resConfirmed = await this.authAccess.signInWithCredential(auth.GoogleAuthProvider.credential(res.idToken));
    const user = resConfirmed.user;
    this.SetUserDataDB(user).then(res=>{
      this.nav.navigateForward("tabs/list-elements",{animated:false});
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
          this.nav.navigateForward("tabs/list-elements",{animated:false});
        });
        this.SetUserDataDB(result.user);
      })
      .catch((error) => {
        window.alert(error);
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
