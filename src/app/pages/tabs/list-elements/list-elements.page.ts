import { DataService } from './../../../services/data.service';
import { NavController, IonContent,Platform } from '@ionic/angular';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Ofertas } from 'src/app/interfaces/models';
import { StorageService } from 'src/app/services/storage.service';
import { VisualsService } from 'src/app/services/visuals.service';


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
    listFavs:Ofertas[] = []
    currentUserId:any;

  constructor(private cd: ChangeDetectorRef,private formBuilder: FormBuilder,private nav:NavController,private platform: Platform,private data:DataService,private storage:StorageService,private visual:VisualsService) { }

   async ionViewWillEnter() {
    this.currentUserId = await this.storage.get('user')

    this.data.listCategory.subscribe(res=>{
      this.listCategory = res;
    })


    this.data.listOferts.subscribe(res=>{
      this.listOferts =res.reverse();
      this.listOfertsOriginal = res;
    })


     this.data.getUsersFavs(this.currentUserId).subscribe( res=>{
      this.listFavs = res
      console.log("dad",res);
      
      if (this.listFavs.length!=0) {
        console.log("entro for");
        
        this.listOferts.forEach((data) => {
          this.listFavs.forEach((favorites) => {
            if (favorites.id == data.id) {
              data.isFav = true;
            } 
          });
        });
        this.listOfertsOriginal.forEach((announcement) => {
          this.listFavs.forEach((favorites) => {
            if (favorites.id == announcement.id) {
              announcement.isFav = true;
            }
          });
        });
      }
      
    })
  }


  ngOnInit() {
  
  }

  onSearchChange(){
    this.filterText = this.searchForm.getRawValue().searchBar
  }

  onClickFilterbyCategory(category:Category){
    this.filterCategoty = "" + category.title.toLowerCase()
    this.listOferts =  this.listOferts.filter(res => res.category.toLowerCase().includes(this.filterCategoty))
    this.filterCategoty == "todas"  ? this.filterCategoty = "" : this.filterCategoty
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

   async onClickAddFav(ofert:Ofertas){
    this.visual.loadingProcess()  
    
    let user  =  await this.storage.get('user');
    
    try {
      this.data.addToFavorites(ofert,user)
      this.visual.dissMissLoaders()
    } catch (error) {
      this.visual.dissMissLoaders()
      console.log(error);      
    }
  }

  async onClickRemovefav(ofert:Ofertas){
    this.visual.loadingProcess()    

    let user  =  await this.storage.get('user');

    ofert.isFav = false
    try {
      this.data.removeFavorite(ofert,user)
      this.cd.detectChanges()
      this.visual.dissMissLoaders()
    } catch (error) {
      this.visual.dissMissLoaders()
      console.log(error);      
    }
  }

}
