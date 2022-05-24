import { Ofertas } from 'src/app/interfaces/models';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IonContent, Platform, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { VisualsService } from 'src/app/services/visuals.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mis-favoritos',
  templateUrl: './mis-favoritos.page.html',
  styleUrls: ['./mis-favoritos.page.scss'],
})
export class MisFavoritosPage implements OnInit {

  constructor(private storage:StorageService,private cd: ChangeDetectorRef,private platform: Platform,private data:DataService,private nav:NavController,private router:Router,private visual:VisualsService) { }

  @ViewChild(IonContent) content: IonContent;
  showGoTopBtn:boolean=false;
  currentUser:any
  listOferts:Ofertas[] = []


  ionViewWillEnter() {
    this.currentUser =  this.router.getCurrentNavigation().extras.state.userData;
  }

  ngOnInit() { 
    this.data.getUsersFavs(this.currentUser).subscribe(res=>{
      this.listOferts = res
      console.log("cosas",res);
      
    })
  }

  onClickGoBack(){
    this.nav.navigateBack("/tabs/profile",{animated:false});
  } 

  onClickSeeElementDetails(item: any){
    this.nav.navigateForward("element-details",{state: { details : item, listOferts:this.listOferts}});
  }

  gotToTop() {
    this.content.scrollToTop(800);
  }

  getScrollPosition(event :any){
    event.detail.scrollTop > this.platform.height() ? this.showGoTopBtn = true : this.showGoTopBtn = false;
  }

  async onClickRemovefav(ofert:Ofertas){
    this.visual.loadingProcess()    
    let user  =  await this.storage.get('user'); 
    ofert.isFav = false
    try {
      this.data.removeFavorite(ofert,this.currentUser)
      this.cd.detectChanges()
      this.visual.dissMissLoaders()
    } catch (error) {
      this.visual.dissMissLoaders()
      console.log(error);      
    }
  }
}
