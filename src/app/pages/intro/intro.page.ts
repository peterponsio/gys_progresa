import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private nav:NavController,private authService:AuthServiceService) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
  }

  onClickGoLIst(){
    this.nav.navigateForward("tabs",{animated:false});
  }

  onClickLoginPhone(){
    this.nav.navigateForward("phone-login",{animated:false});
  }

  onClickLoginMail(){
    this.nav.navigateForward("login",{animated:false});
  }

}
