import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { VisualsService } from 'src/app/services/visuals.service';

@Component({
  selector: 'app-slide-sugeridos',
  templateUrl: './slide-sugeridos.component.html',
  styleUrls: ['./slide-sugeridos.component.scss'],
})
export class SlideSugeridosComponent implements OnInit {

  @Input() listItems:any;

   slideOpts:any;

  constructor(private nav:NavController,private visual:VisualsService) {
    this.slideOpts = {
      slidesPerView: 2.6,
      freeMode: true,
      spaceBetween: -10
    };
  
  }

  ngOnInit() {}

  onClickSeeElementDetails(item: any){
    console.log("dasdad");
    this.visual.loadingStartApp()
    this.nav.navigateForward("element-details",{state: { details : item, listOferts:this.listItems}}).then(()=>{
      window.location.reload()
      this.visual.dissMissLoaders()
    });
  }

}
