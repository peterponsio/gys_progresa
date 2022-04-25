import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  seePass:boolean = false;
  passType:string = "password";

  constructor(private nav:NavController) { }

  ngOnInit() {
  }

  onClickRecoverPass(){
    this.nav.navigateForward("recover-pass",{animated:false});
  }
  
  onClickSeePass(){
    this.seePass == false ? this.passType = "text" : this.passType = "password";
    this.seePass = !this.seePass;
  }

  onClickLoginMail(){
    this.nav.navigateForward("login",{animated:false});
  }

  onClickGoRegister(){
    this.nav.navigateForward("register",{animated:false});
  }


}
