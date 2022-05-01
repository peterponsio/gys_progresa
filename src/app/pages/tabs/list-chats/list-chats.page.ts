import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.page.html',
  styleUrls: ['./list-chats.page.scss'],
})
export class ListChatsPage implements OnInit {

  constructor(private nav:NavController) { }

  ngOnInit() {
  }

  onClickOpemToSesion(sesion: any){
    this.nav.navigateForward(['chat-sesion'],{animated: false,state:{sesion: sesion}})
  }

}
