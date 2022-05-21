import { VisualsService } from 'src/app/services/visuals.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import Lottie from 'lottie-web';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private nav:NavController,private authService:AuthServiceService,private visual:VisualsService) { }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
  }

  ngAfterViewInit() {
      var svganimationIntro = document.getElementById('svgContainerIntro');
      var animItemVerticalLine = Lottie.loadAnimation({
        path: "../../../assets/animations/dancer.json",
        container: svganimationIntro
      });
  }
  
  onClickGoLIst(){
    this.nav.navigateForward("tabs",{animated:false})
  }

  onClickLoginPhone(){
    this.nav.navigateForward("phone-login",{animated:false});
  }

  onClickLoginMail(){
    this.nav.navigateForward("login",{animated:false});
  }

}
