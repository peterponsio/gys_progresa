import { StorageService } from './../../../services/storage.service';
import { Category } from './../../../interfaces/models';
import { AddFormComponent } from './../../../components/add-form/add-form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavController, Platform } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { VisualsService } from 'src/app/services/visuals.service';

@Component({
  selector: 'app-add-new-elements',
  templateUrl: './add-new-elements.page.html',
  styleUrls: ['./add-new-elements.page.scss'],
})
export class AddNewElementsPage implements OnInit {

  isFilterSearchOn:boolean=false;
  typeView:string = "list";

  listCategory: Category[] = [];
  lisItems:any[] = [];

  categoryForm: FormGroup = this.formBuilder.group({
    searchBar: [''],
    category: [''],
    });

    currentUser: any

  constructor(private formBuilder: FormBuilder,private platform:Platform,private modalController: ModalController,private data:DataService,private storage:StorageService,private nav:NavController,private visual:VisualsService) {
   }

   async ionViewWillEnter() {
     this.currentUser = await this.storage.get('user')
     console.log("user profile",this.currentUser);
   }

  ngOnInit() {    
    this.data.listCategory.subscribe(res=>{
      this.listCategory = res;
      let rows = 0
      for (let index = 0; index < this.listCategory.length; index++) {
        index % 3 == 0 
        this.lisItems[rows] = [...this.listCategory]  
      }
    })
  }

  
  searchGotFocus(){
    this.isFilterSearchOn=true;
  }

  searchLoseFocus(){
    this.isFilterSearchOn=false;
  }

  onClickClearSerchBar(){
    this.isFilterSearchOn=false;
    this.categoryForm.controls['searchBar'].setValue("");
  }

  onClickAddNewByCat(cat: any){
    if(this.currentUser !=undefined){
      this.presentModal(cat);
    }else{
     this.visual.alertNotLogged()
    }
   
  }

  async presentModal(category) {
    const modal = await this.modalController.create({
    component: AddFormComponent,
    componentProps: { category: category,title : "Publica tu oferta" }
    });
  
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    if(data.accion=="close"){
      this.visual.dissMissLoaders()
    }
  }

}
