import { Ofertas } from './../../interfaces/models';
import { DataService } from './../../services/data.service';
import { NavController } from '@ionic/angular';
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

  slideOpts:any;

  constructor(private data:DataService,private nav:NavController,private router:Router) { 
    this.slideOpts = {
      slidesPerView: 2.6,
      freeMode: true,
      spaceBetween: -25
    };
  }

  ngOnInit() {
    this.ofertData =  this.router.getCurrentNavigation().extras.state.details;
    this.listOferts =  this.router.getCurrentNavigation().extras.state.listOferts;
    this.listOferts = this.listOferts.filter(res=> res.category == this.ofertData.category && res.id != this.ofertData.id)
    this.ofertData.created_at =  moment(this.ofertData.created_at).format("DD-MM-yyyy")  
  }

  onClickCall(){
   // this.data.callNumber(this.ofertData.created_by.name)
  }

}
