import { VisualsService } from 'src/app/services/visuals.service';
import { PopoverDetailsComponent } from './../../components/popover-details/popover-details.component';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Ofertas } from './../../interfaces/models';
import { DataService } from './../../services/data.service';
import { NavController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit,ViewEncapsulation  } from '@angular/core';

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import * as moment from 'moment';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar]);

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.page.html',
  styleUrls: ['./element-details.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElementDetailsPage implements OnInit {

  ofertData:Ofertas
  listOferts:Ofertas[] = []
  ofertDate:any
  slideOpts:any;

  slideOptsSuggested:any;

  constructor(private visual:VisualsService,private data:DataService,private nav:NavController,private router:Router,private social:SocialSharing,private popoverController:PopoverController) { 
    this.slideOpts = {
      slidesPerView: 2.6,
      freeMode: true,
      spaceBetween: -25
    };
    this.slideOptsSuggested = {
      slidesPerView: 2.6,
      freeMode: true,
      spaceBetween: -10
    };
  }

  ngOnInit() {
    this.ofertData =  this.router.getCurrentNavigation().extras.state.details;
    this.listOferts =  this.router.getCurrentNavigation().extras.state.listOferts;
    this.listOferts = this.listOferts.filter(res=> res.category == this.ofertData.category && res.id != this.ofertData.id)
    //this.ofertData.created_at =  moment(this.ofertData.created_at).format("DD-MM-yyyy")  
    this.ofertDate = moment(this.ofertData.created_at).format("DD-MM-yyyy")    
  }

  ngAfterViewInit() {
    this.data.addViews(this.ofertData)
  }

  onClickDenunciar(){
    this.data.ReportOfert(this.ofertData)
  }

  onClickSeeStats(){

  }

  onClickCall(){
   // this.data.callNumber(this.ofertData.created_by.name)
  }
  onClickOpenChat(){

  }

  onClickShareSocial(){
    this.social.share(this.ofertData.title,this.ofertData.category,'../../../assets/imgSources/Group (2).svg','http://localhost:8100/tabs/list-elements')
  }

  onClickSeeElementDetails(item: any){
    console.log("dasdad");
    this.visual.loadingStartApp()
    this.nav.navigateForward("element-details",{state: { details : item, listOferts:this.listOferts}}).then(()=>{
      window.location.reload()
      this.visual.dissMissLoaders()
    });
  }
  

}
