import { SesionChat } from './../../../interfaces/models';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { VisualsService } from 'src/app/services/visuals.service';

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.page.html',
  styleUrls: ['./list-chats.page.scss'],
})
export class ListChatsPage implements OnInit {

  constructor(private nav:NavController,private storage:StorageService,private data:DataService,private visual:VisualsService) { }

  currentUserId:any

  listChats:SesionChat[] = []

  async ionViewWillEnter() {
    this.visual.loadingStartApp()
    this.currentUserId = await this.storage.get('user')

    this.data.getUsersChats(this.currentUserId).subscribe(res=>{
      this.listChats = res
      this.visual.dissMissLoaders()
    })

    setTimeout(() => {
      this.visual.dissMissLoaders()
    }, 500);
    
  }

    ngOnInit(): void {
      
    }

  onClickOpemToSesion(sesion: any){
    this.nav.navigateForward(['chat-sesion'],{animated: false,state:{sesion: sesion}})
  }

  async onClickDeleteSesion(item:SesionChat){
    this.visual.loadingProcess()
    try {
      let user  =  await this.storage.get('user');
      this.data.deleteSesionChat(item,user).then(()=>{
        this.visual.dissMissLoaders()
        this.visual.alertInfoBasic("Sesion Eliminada").then(()=>{
         
        })
      
      })
    } catch (error) {
      this.visual.dissMissLoaders()
      this.visual.alertInfoBasic("Algo salio mal, intentelo de nuevo")
    }
    
  }

}
