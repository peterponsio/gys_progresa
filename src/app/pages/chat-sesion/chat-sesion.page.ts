import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-sesion',
  templateUrl: './chat-sesion.page.html',
  styleUrls: ['./chat-sesion.page.scss'],
})
export class ChatSesionPage implements OnInit {

  constructor(private router: Router,private nav:NavController) { }

  chatSesion:any;

  ngOnInit() {
    this.chatSesion = this.router.getCurrentNavigation().extras.state.sesion;
    console.log(this.chatSesion);
  }

  onClickGoBack(){
    this.nav.back();
  }

  onClickChatOption(){
    
  }

}
