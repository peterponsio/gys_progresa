import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(private nav:NavController) { }

  ngOnInit() {
  }

  onClickRecoverPassword(){
    this.nav.navigateForward("recover-pass",{animated:true})
  }

}
