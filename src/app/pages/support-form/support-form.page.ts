import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { DataService } from 'src/app/services/data.service';
import { VisualsService } from 'src/app/services/visuals.service';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.page.html',
  styleUrls: ['./support-form.page.scss'],
})
export class SupportFormPage implements OnInit {

  constructor(private keyb:Keyboard,private zg:NgZone,private formBuilder:FormBuilder,private data:DataService,private visual:VisualsService,private router:Router) { }

  formAddNew: FormGroup = this.formBuilder.group(
    {
      titulo: ['',[Validators.required,Validators.minLength(1)]],
      descripcion: ['',[Validators.required,Validators.minLength(15)]],
    }
  )
  currentUser:any
  showBtn: boolean = true;
  ngOnInit() {
    this.currentUser =  this.router.getCurrentNavigation().extras.state.userData;

      
    this.keyb.onKeyboardWillShow().subscribe((res)=>{
      this.zg.run(() => {
        this.showBtn=false;
      });
    });
    this.keyb.onKeyboardWillHide().subscribe((res)=>{
  
      this.zg.run(() => {
        this.showBtn=true;
      });
    })
  }

  close(tecla){
    if(tecla === 13){
      this.keyb.hide();
    }
  }

  createNewTicket(){
    if(this.formAddNew.valid){
      this.visual.loadingProcess()
      this.data.sendTicket(this.currentUser,this.formAddNew.getRawValue())
      this.formAddNew.reset()
    }else{
      this.visual.alertInfoBasic("Datos Erroneos")
    }
  
  }

}
