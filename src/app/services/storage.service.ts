import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init()
  }

  async init() {
     // If using, define drivers here: await this.storage.defineDriver(/*...*/);
     const storage = await this.storage.create();
     this._storage = storage;
  }

   async set(key: string, value: any) {  
   await this._storage?.set(key, value);
  }

  async removeItem(key:string){
   await this._storage.remove(key)
  }

  async get(key:string){
    const datos = await this._storage.get(key).then(res=>{
      return res;
    })
    return datos
    console.log(datos);
   
  }


}
