import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { VisualsService } from 'src/app/services/visuals.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private nav:NavController,private visualService:VisualsService,private storage:StorageService) {
  
   }

  currentUser: any

  ngOnInit() {  
  }

  async ionViewWillEnter() {
    this.currentUser = await this.storage.get('user')
    console.log("user profile",this.currentUser);
    
  }

  onClickCloseSesion(){
    this.visualService.alertLogout()
  }

  onClickMyOferts(){
    this.nav.navigateForward("mis-anuncios", {animated:false,state:{userData:this.currentUser}})
  }

}
