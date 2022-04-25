import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  seePass:boolean = false;
  passType:string = "password";

  seePass2:boolean = false;
  passType2:string = "password";

  constructor(private nav:NavController) { }

  ngOnInit() {
  }

  onClickSeePass(){
    this.seePass == false ? this.passType = "text" : this.passType = "password";
    this.seePass = !this.seePass;
  }
  onClickSeePass2(){
    this.seePass2 == false ? this.passType2 = "text" : this.passType2 = "password";
    this.seePass2 = !this.seePass2;
  }

  onClickLoginMail(){
    this.nav.navigateForward("tabs/list-elements",{animated:false});
  }

}
