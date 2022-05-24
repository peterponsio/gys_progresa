import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { VisualsService } from 'src/app/services/visuals.service';
import { PopoverDetailsComponent } from './../../components/popover-details/popover-details.component';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Ofertas } from './../../interfaces/models';
import { DataService } from './../../services/data.service';
import { NavController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import * as moment from 'moment';
import { StorageService } from 'src/app/services/storage.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar]);

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.page.html',
  styleUrls: ['./element-details.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElementDetailsPage implements OnInit {

  ofertData:Ofertas
  dataShow:Ofertas
  listOferts:Ofertas[] = []
  ofertDate:any
  slideOpts:any;
  onSuggested:boolean = false

  slideOptsSuggested:any;
  currentUserId:any;

  constructor(private cd: ChangeDetectorRef,private storage:StorageService,private callNumber:CallNumber,private visual:VisualsService,private data:DataService,private nav:NavController,private router:Router,private social:SocialSharing,private popoverController:PopoverController) { 
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
  async ionViewWillEnter() {
    this.currentUserId = await this.storage.get('user')
  }

  ngOnInit() {
    this.ofertData =  this.router.getCurrentNavigation().extras.state.details;
    this.dataShow = this.router.getCurrentNavigation().extras.state.details;
    this.listOferts =  this.router.getCurrentNavigation().extras.state.listOferts;
    this.listOferts = this.listOferts.filter(res=> res.category == this.ofertData.category && res.id != this.ofertData.id)
    this.ofertDate = moment(this.ofertData.created_at).format("DD-MM-yyyy")    
  }

  ngAfterViewInit() {
    this.data.addViews(this.ofertData)
  }

  onClickGoBack(){
    this.nav.back();
    this.dataShow = this.ofertData
  }

  onClickDenunciar(){
    this.visual.alertDontSave("Seguro que desea denunciar esta oferta","Cerrar","Si").then(res=>{
      this.data.ReportOfert(this.ofertData)
    })
  }

  onClickSeeStats(){

  }

  onClickCall(){
   
    if(this.currentUserId !=undefined){
      this.callNumber.callNumber("661130581",true).then(()=>{
      }).catch(err=>{
        this.visual.alertInfoBasic("Servicio no disponible")
      })
    }else{
      this.visual.alertNotLogged()
    }
  }

  onClickOpenChat(){
  if(this.currentUserId !=undefined){
    
    }else{
      this.visual.alertNotLogged()
    }
  }

  onClickShareSocial(){
    this.social.share(this.ofertData.title,this.ofertData.category,'../../../assets/imgSources/Group (2).svg','http://localhost:8100/tabs/list-elements')
  }

  onClickSeeElementDetails(item: any){
    this.visual.loadingStartApp()
    this.dataShow = item
    setTimeout(() => {
      this.visual.dissMissLoaders()
    }, 1500);
   
    this.onSuggested = true
  }

  async onClickAddFav(){
    this.visual.loadingProcess()   
    let user  =  await this.storage.get('user'); 
    try {
      this.data.addToFavorites(this.ofertData,user)
      this.visual.dissMissLoaders()
    } catch (error) {
      this.visual.dissMissLoaders()
      console.log(error);      
    }
  }

  async onClickRemovefav(){
    this.visual.loadingProcess()    
    let user  =  await this.storage.get('user');
    try {
      this.data.removeFavorite(this.ofertData,user)
      this.cd.detectChanges()
      this.visual.dissMissLoaders()
    } catch (error) {
      this.visual.dissMissLoaders()
      console.log(error);      
    }
  }

  

}
