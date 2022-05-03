import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-basic',
  templateUrl: './header-basic.component.html',
  styleUrls: ['./header-basic.component.scss'],
})
export class HeaderBasicComponent implements OnInit {

  constructor(private nav:NavController) { }

  @Input() title:any;

  ngOnInit() {
  
  }

  onClickGoBack(){
    this.nav.back();
  } 

}
