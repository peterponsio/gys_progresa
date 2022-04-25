import { Component, OnInit,ViewEncapsulation  } from '@angular/core';

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar]);

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.page.html',
  styleUrls: ['./element-details.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElementDetailsPage implements OnInit {

  listItems: any[] = [
    {price:200,title:"titulo"},
    {price:200,title:"titulo"},
    {price:200,title:"titulo"},
    {price:200,title:"titulo"},
    {price:200,title:"titulo"},
    {price:200,title:"titulo"},
    {price:200,title:"titulo"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
