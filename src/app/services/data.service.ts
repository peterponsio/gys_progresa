import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection 
} from '@angular/fire/compat/firestore';
import { Category, Ofertas } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private categoryCollection: AngularFirestoreCollection<Category> = this.firestore.collection<Category>('categorys');
  private ofertsCollection: AngularFirestoreCollection<Ofertas> = this.firestore.collection<Ofertas>('oferts');
  listCategory: Observable<Category[]>;
  listOferts: Observable<Ofertas[]>;

  constructor(private firestore: AngularFirestore) {
    this.getCategoryList()
    this.getOfertsList()
   }

  getCategoryList(){
    this.listCategory = this.categoryCollection.valueChanges();
  }

  getOfertsList(){
    this.listOferts = this.ofertsCollection.valueChanges();
  }

  addOfert(ofert:Ofertas){
    let id = this.firestore.createId()
    ofert.id = id
    let ofertUri =  `Users/${ofert.created_by.id}/MyOferts/${ofert.id}` 
    this.ofertsCollection.add(ofert)
    this.firestore.collection(ofertUri).add(ofert)
  }
}
