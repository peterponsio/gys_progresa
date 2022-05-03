import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private nav:NavController,private authService:AuthServiceService) { }

  ngOnInit() {
  }

  onClickCloseSesion(){
    this.authService.SignOut();
  }

}
