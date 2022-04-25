import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-sugeridos',
  templateUrl: './slide-sugeridos.component.html',
  styleUrls: ['./slide-sugeridos.component.scss'],
})
export class SlideSugeridosComponent implements OnInit {

  @Input() listItems:any;

   slideOpts:any;

  constructor() {
    this.slideOpts = {
      slidesPerView: 2.6,
      freeMode: true,
      spaceBetween: -25
    };
  
  }

  ngOnInit() {}

  

}
