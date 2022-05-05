import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { VisualsService } from 'src/app/services/visuals.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private nav:NavController,private visualService:VisualsService) { }

  ngOnInit() {
  }

  onClickCloseSesion(){
    this.visualService.alertLogout()
  }

}
