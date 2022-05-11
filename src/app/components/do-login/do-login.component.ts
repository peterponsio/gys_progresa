import { VisualsService } from 'src/app/services/visuals.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NavController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

import Lottie from 'lottie-web';

@Component({
  selector: 'app-do-login',
  templateUrl: './do-login.component.html',
  styleUrls: ['./do-login.component.scss'],
})
export class DoLoginComponent implements OnInit {
  constructor(private nav:NavController,private authService:AuthServiceService,private visual:VisualsService,private modalController: ModalController) { }


  @Input() page

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
    console.log("page",this.page);
    
  }

  ngAfterViewInit() {
      var svganimationIntro = document.getElementById('svgContainerIntro');
      var animItemVerticalLine = Lottie.loadAnimation({
        path: "../../../assets/animations/dancer.json",
        container: svganimationIntro
      });
  }
  
  onClickGoLIst(){
    console.log("dasd");
    this.modalController.dismiss().then(res=>{
      this.visual.loadingStartAppWithoutAcc()
      this.nav.navigateBack("tabs",{animated:true})
      window.location.reload();
    })
    
  }

  onClickSeeMyOferts(){
    this.nav.navigateForward("mis-anuncios",{animated:false});
  }

  onClickAddMore(){
    this.visual.dissMissLoaders()
  }

  onClickLoginMail(){

  }

}
