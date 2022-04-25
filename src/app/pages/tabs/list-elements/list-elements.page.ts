import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-elements',
  templateUrl: './list-elements.page.html',
  styleUrls: ['./list-elements.page.scss'],
})
export class ListElementsPage implements OnInit {

  isFilterSearchOn:boolean=false;
  typeView:string = "list";

  searchForm: FormGroup = this.formBuilder.group({
    searchBar: [''],
    category: [''],
    });

    slidesOptions = {
      initialSlide: 0,
      direction: 'horizontal',
      speed: 300,
      spaceBetween: 8,
      slidesPerView: 4.5,
      freeMode: true,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    };

  constructor(private formBuilder: FormBuilder,private nav:NavController) { }

  ngOnInit() {
  }

  onSearchChange(event:any){

  }
  searchGotFocus(){
    this.isFilterSearchOn=true;
  }

  searchLoseFocus(){
    this.isFilterSearchOn=false;
  }

  onClickClearSerchBar(){
    this.isFilterSearchOn=false;
    this.searchForm.controls['searchBar'].setValue("");
  }

  onClickChangeView(view:string){
    view == "list" ? this.typeView = "list" : this.typeView = "cards";
  }

  onClickSeeElementDetails(item: any){
    this.nav.navigateForward("element-details",{state: { details : item}});
  }


}
