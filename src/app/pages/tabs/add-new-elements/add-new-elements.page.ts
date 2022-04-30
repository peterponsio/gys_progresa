import { AddFormComponent } from './../../../components/add-form/add-form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-add-new-elements',
  templateUrl: './add-new-elements.page.html',
  styleUrls: ['./add-new-elements.page.scss'],
})
export class AddNewElementsPage implements OnInit {

  isFilterSearchOn:boolean=false;
  typeView:string = "list";

  lisItems:any[] = [
    [ 
       {icon:"loqusea",text:"hohla"},
       {icon:"loqusea",text:"hohla"},
       {icon:"loqusea",text:"hohla"},
    ],
    [ 
      {icon:"loqusea",text:"hohla"},
      {icon:"loqusea",text:"hohla"},
      {icon:"loqusea",text:"hohla"},
    ],
    [ 
      {icon:"loqusea",text:"hohla"},
      {icon:"loqusea",text:"hohla"},
      {icon:"loqusea",text:"hohla"},
    ],
    [  
      {icon:"loqusea",text:"hohla"},
      {icon:"loqusea",text:"hohla"},
      
    ],
      
   
  ]

  categoryForm: FormGroup = this.formBuilder.group({
    searchBar: [''],
    category: [''],
    });



  constructor(private formBuilder: FormBuilder,private platform:Platform,private modalController: ModalController) { }

  ngOnInit() {    
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

  onClickAddNewByCat(cat: string){
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
