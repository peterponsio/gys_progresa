import { Router } from '@angular/router';
import { VisualsService } from 'src/app/services/visuals.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NavController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

import Lottie from 'lottie-web';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-do-login',
  templateUrl: './do-login.component.html',
  styleUrls: ['./do-login.component.scss'],
})
export class DoLoginComponent implements OnInit {
  constructor(private nav:NavController,private authService:AuthServiceService,private visual:VisualsService,private modalController: ModalController,private router:Router) { }

  public destroyed = new Subject<any>();

  @Input() page

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    var svganimationIntro = document.getElementById('svgContainerIntro');
    var animItemVerticalLine = Lottie.loadAnimation({
      path: "../../../assets/animations/dancer.json",
      container: svganimationIntro
    });
  }

  ngAfterViewInit() {
    
  }
  
  onClickGoLIst(){
    this.visual.loadingStartApp()
    this.modalController.dismiss({'accion':'close'}).then(res=>{
      this.nav.navigateBack("tabs",{animated:true}).then(()=>{
        window.location.reload()
        this.visual.dissMissLoaders()
      })
    })
  }

  onClickSeeMyOferts(){
    this.visual.loadingStartApp()
    this.modalController.dismiss().then(res=>{
      window.location.reload()
      this.visual.dissMissLoaders()
    })
   
  }

  onClickAddMore(){
    this.modalController.dismiss({'accion':'close'}).then(res=>{})
  }

  onClickLoginMail(){
    this.visual.loadingStartApp()
    this.router.navigateByUrl('/', {skipLocationChange: true})
    this.visual.dissMissLoaders()
  }

}
