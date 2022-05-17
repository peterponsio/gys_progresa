import { DataService } from 'src/app/services/data.service';
import { IonContent, Platform, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ofertas } from 'src/app/interfaces/models';

@Component({
  selector: 'app-mis-anuncios',
  templateUrl: './mis-anuncios.page.html',
  styleUrls: ['./mis-anuncios.page.scss'],
})
export class MisAnunciosPage implements OnInit {

  constructor(private platform: Platform,private data:DataService,private nav:NavController,private router:Router) { }

  @ViewChild(IonContent) content: IonContent;
  showGoTopBtn:boolean=false;
  currentUser:any
  listOferts:Ofertas[] = []

  ngOnInit() { 
    this.currentUser =  this.router.getCurrentNavigation().extras.state.userData;
   
    this.data.getUserOferts(this.currentUser).subscribe(res=>{
      this.listOferts = res
      console.log("cosas",res);
      
    })

  }

  onClickSeeElementDetails(item: any){
    this.nav.navigateForward("element-details",{state: { details : item}});
  }

  gotToTop() {
    this.content.scrollToTop(800);
  }

  getScrollPosition(event :any){
    event.detail.scrollTop > this.platform.height() ? this.showGoTopBtn = true : this.showGoTopBtn = false;
  }

}
