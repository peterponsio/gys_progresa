import { Msg } from './../../interfaces/models';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat, SesionChat } from 'src/app/interfaces/models';
import * as moment from 'moment';
import { VisualsService } from 'src/app/services/visuals.service';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chat-sesion',
  templateUrl: './chat-sesion.page.html',
  styleUrls: ['./chat-sesion.page.scss'],
})
export class ChatSesionPage implements OnInit {

  constructor(private router: Router,private nav:NavController,private visual:VisualsService,private storage:StorageService,private data:DataService) { }

  chatSesion:SesionChat;

  msgChat:string

  currentUserId:any

  currentUser:any

  listMsg:any[] = []

  async ionViewWillEnter() {
    this.currentUserId = await this.storage.get('user')
    this.visual.loadingStartApp()
    
    try {
      this.data.getUser(this.currentUserId).valueChanges().subscribe(res=>{
        this.currentUser = res
        console.log(res);
      });

      this.data.getListMsg(this.currentUserId,this.chatSesion).subscribe(res=>{
        this.listMsg = res
        console.log(res);
      });


    } catch (error) {
      console.log(error);
      this.currentUser = ""
      this.visual.alertInfoBasic("Algo salio mal").finally(()=>{
        this.nav.back()
      })
    }

    setTimeout(() => {
      this.visual.dissMissLoaders()
    }, 1000);
    
  }

  ngOnInit() {
    this.chatSesion = this.router.getCurrentNavigation().extras.state.sesion;
    console.log(this.chatSesion);

    setTimeout(() => {
      this.visual.dissMissLoaders()
    }, 3000);
    
  }

  generateIds():number{
    return moment().toDate().getTime()
   }

  onClickGoBack(){
    this.nav.back();
  }

  onClickChatOption(){
    
  }

  onClickAddMsg(){
    let currentMsgDateArray = []
    if(this.msgChat.length != 0){
      let msg:any = {
        id: "" +this.generateIds(),
        text: this.msgChat.toString(),
        sendByGuest: this.currentUser,
        created_at: moment().local().format('YYYY-MM-DD[T]HH:mm:ss')
      }

      if(this.listMsg.length != 0){

        let existArrayMsg = !!this.listMsg.find(data => data.id == moment().local().format('DD-MM-yyyy'))
        if(existArrayMsg){
          let arrayToUpdate:Chat = this.listMsg.find(data => data.id == moment().local().format('DD-MM-yyyy'))
          currentMsgDateArray = [...arrayToUpdate.listMsg]
          currentMsgDateArray.push(msg)
        }else{
          currentMsgDateArray.push(msg)
        }

      }else{
        currentMsgDateArray.push(msg)
      }
  
      let msgCons:Chat = {
        id: moment().local().format('DD-MM-yyyy'),
        created_at: moment().local().format('YYYY-MM-DD[T]HH:mm:ss'),
        listMsg: currentMsgDateArray
      }

      try {
        this.data.addChatMsg(msgCons,this.chatSesion)
      } catch (error) {
        
      }
      

    }else{
      this.visual.alertInfoBasic("Escribe tu mensaje en el campo de texto")
    }

    this.msgChat = ""
  }

}
