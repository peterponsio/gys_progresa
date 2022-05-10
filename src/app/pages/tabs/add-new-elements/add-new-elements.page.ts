import { StorageService } from './../../../services/storage.service';
import { Category } from './../../../interfaces/models';
import { AddFormComponent } from './../../../components/add-form/add-form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

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


  constructor(private formBuilder: FormBuilder,private platform:Platform,private modalController: ModalController,private data:DataService,private storage:StorageService) {
    setTimeout(() => {
      this.currentUser =  storage.get('user')
    }, 1000);  
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
    this.presentModal(cat);
  }

  async presentModal(category) {
    const modal = await this.modalController.create({
    component: AddFormComponent,
    componentProps: { category: category,title : "Publica tu oferta" }
    });
  
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

}
