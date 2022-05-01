import { Injectable } from '@angular/core';

import * as auth from 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private firestore: AngularFirestore,private authAccess: AngularFireAuth,) { }


  register(data: any) {
   return this.authAccess.createUserWithEmailAndPassword(data.email,data.password1);
  }

  login(data: any){
    return this.authAccess.signInWithEmailAndPassword(data.mail,data.password).catch(err=>{
      console.log(err);
    });
  }
 
}
