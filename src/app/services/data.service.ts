import { StorageService } from 'src/app/services/storage.service';
import { Users } from './../interfaces/models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection 
} from '@angular/fire/compat/firestore';
import { Category, Ofertas } from '../interfaces/models';
import * as moment from 'moment';
import { VisualsService } from './visuals.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser:any

  private categoryCollection: AngularFirestoreCollection<Category> = this.firestore.collection<Category>('categorys');
  private ofertsCollection: AngularFirestoreCollection<Ofertas> = this.firestore.collection<Ofertas>('oferts');
  private usersCollection:AngularFirestoreCollection<Users> = this.firestore.collection<Users>('Users');

  listCategory: Observable<Category[]>;
  listOferts: Observable<Ofertas[]>;
  listOfertsUser: Observable<Ofertas[]>

  constructor(private firestore: AngularFirestore ,private storage:StorageService,private visuals:VisualsService) {
    this.getCategoryList()
    this.getOfertsList()
    this.getUserLoged()
   }

   generateIds():number{
    //console.log( moment().toDate().getTime());
    return moment().toDate().getTime()
   }

   async getUserLoged(){
    this.currentUser = await this.storage.get('user')
   }

   getUser(id :string){
    return this.firestore.collection<Users>("Users").doc(id)
   }

  getCategoryList(){
    this.listCategory = this.categoryCollection.valueChanges();
  }

  getOfertsList(){
    this.listOferts = this.ofertsCollection.valueChanges();
  }

  getUserOferts(user:string){
    let uri = `Users/${user}/MyOferts`
    console.log("uri",uri);
    
    this.listOfertsUser = this.firestore.collection<Ofertas>(uri).valueChanges();
    return this.listOfertsUser
  }

  addOfert(ofert:Ofertas){
    let id = this.generateIds()
    ofert.id = id.toString()
    console.log("inserto ",ofert);
    let ofertUri =  `Users/${ofert.created_by.id}/MyOferts/${ofert.id}` 
    this.ofertsCollection.doc(ofert.id).set(ofert);
    this.firestore.doc(ofertUri).set(ofert)
  }

  ReportOfert(ofert:Ofertas){
    ofert.reports += 1
    let ofertUri =  `Users/${ofert.created_by.id}/MyOferts/${ofert.id}` 
    this.ofertsCollection.doc(ofert.id).set(ofert).then(res=>{
      console.log(res);
    });
    this.firestore.doc(ofertUri).set(ofert).then(()=>{
      this.visuals.alertInfoBasic("Reporte enviado")
    })
  }

  addViews(ofert:Ofertas){
    ofert.views += 1
    let ofertUri =  `Users/${ofert.created_by.id}/MyOferts/${ofert.id}` 
    this.ofertsCollection.doc(ofert.id).set(ofert).then(res=>{
      console.log(res);
    });
    this.firestore.doc(ofertUri).set(ofert).then((res)=>{
      console.log(res);
    })
  }








  callNumber(){
    
  }

}
