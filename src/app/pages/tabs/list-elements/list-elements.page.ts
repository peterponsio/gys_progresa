import { DataService } from './../../../services/data.service';
import { NavController, IonContent,Platform } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Ofertas } from 'src/app/interfaces/models';


@Component({
  selector: 'app-list-elements',
  templateUrl: './list-elements.page.html',
  styleUrls: ['./list-elements.page.scss'],
})
export class ListElementsPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  isFilterSearchOn:boolean=false;
  typeView:string = "list";

  showGoTopBtn:boolean=false;

  filterText:any;
  filterCategoty:any = "";

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

    listCategory: Category[] = []
    listOferts: Ofertas[] = []
    listOfertsOriginal: Ofertas[] = []

  constructor(private formBuilder: FormBuilder,private nav:NavController,private platform: Platform,private data:DataService) { }

  ngOnInit() {
    this.data.listCategory.subscribe(res=>{
      this.listCategory = res;
    })
    this.data.listOferts.subscribe(res=>{
      this.listOfertsOriginal = res;
      this.listOferts =res.reverse();
    })
    
  }

  onSearchChange(){
    this.filterText = this.searchForm.getRawValue().searchBar
  }

  onClickFilterbyCategory(category:any){
    this.filterCategoty = category.title.toLowerCase()
    this.listOferts =  this.listOferts.filter(res => res.category.toLowerCase().includes(this.filterCategoty.toLowerCase()))
    console.log("lisrta dasd",this.listOferts);
    
  }

  onClickClearCategoryFilter(){
    this.filterCategoty =""
    this.listOferts = this.listOfertsOriginal
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
    this.nav.navigateForward("element-details",{state: { details : item, listOferts:this.listOferts}});
  }

  gotToTop() {
    this.content.scrollToTop(800);
  }

  getScrollPosition(event :any){
    event.detail.scrollTop > this.platform.height() ? this.showGoTopBtn = true : this.showGoTopBtn = false;
  }

  onClickAddFav(ofert:any){

  }

}
