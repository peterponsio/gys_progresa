import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { NavController } from '@ionic/angular';
import { Ofertas } from 'src/app/interfaces/models';
import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';


import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import * as moment from 'moment';
import { VisualsService } from 'src/app/services/visuals.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar]);

@Component({
  selector: 'app-element-details-user',
  templateUrl: './element-details-user.page.html',
  styleUrls: ['./element-details-user.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElementDetailsUserPage implements OnInit {

  ofertData:Ofertas
  ofertDataOriginal:Ofertas
  listOferts:Ofertas[] = []

  slideOpts:any;
  dateshow:any

  constructor(private data:DataService,private nav:NavController,private router:Router,private visual:VisualsService,private social:SocialSharing) { 
    this.slideOpts = {
      slidesPerView: 2.6,
      freeMode: true,
      spaceBetween: -25
    };
  }

  ngOnInit() {
    this.ofertData =  this.router.getCurrentNavigation().extras.state.details;
    this.ofertDataOriginal = this.router.getCurrentNavigation().extras.state.details;
    this.listOferts =  this.router.getCurrentNavigation().extras.state.listOferts;
    this.listOferts = this.listOferts.filter(res=> res.category == this.ofertData.category && res.id != this.ofertData.id)
    this.dateshow =  moment(this.ofertData.created_at).format("DD-MM-yyyy")  
  }


  onClickSeeStats(){

  }

  onClickShareSocial(){
    this.social.share(this.ofertData.title,this.ofertData.category,'../../../assets/imgSources/Group (2).svg','http://localhost:8100/tabs/list-elements')
  }

  onEdit(){
    this.nav.navigateForward("edit-ofert",{animated:false,state:{ofert:this.ofertData}})
  }

  onClickDelete(){
    this.visual.loadingProcess()
    try {
      this.data.deleteOfert(this.ofertData).then(()=>{
        this.visual.dissMissLoaders()
        this.visual.alertInfoBasic("Oferta Eliminada").then(()=>{
          this.nav.back()
        })
      
      })
    } catch (error) {
      this.visual.dissMissLoaders()
      this.visual.alertInfoBasic("Algo salio mal, intentelo de nuevo")
    }
    
  }

}
