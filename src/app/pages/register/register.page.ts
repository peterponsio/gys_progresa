import { AuthServiceService } from './../../services/auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Component, OnInit, NgZone } from '@angular/core';
import { VisualsService } from 'src/app/services/visuals.service';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  seePass:boolean = false;
  passType:string = "password";

  seePass2:boolean = false;
  passType2:string = "password";

  registerForm: FormGroup = this.formBuilder.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.minLength(3),Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)]],
    password1: ['',[Validators.required,Validators.minLength(6)]],
    password2: ['',[Validators.required,Validators.minLength(6)]],
    terms:[false,[Validators.required]]
    });

    validFieldName:any;
    validFieldMail:any;
    validFieldPassword:any;
    validFieldPassword2:any;

    showBtn:boolean = true

  constructor(private nav:NavController, private formBuilder:FormBuilder,private authService:AuthServiceService,private alertService:VisualsService,private keyb:Keyboard,private zg: NgZone) { }

  ngOnInit() {
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

  onClickSeePass(){
    this.seePass == false ? this.passType = "text" : this.passType = "password";
    this.seePass = !this.seePass;
  }
  onClickSeePass2(){
    this.seePass2 == false ? this.passType2 = "text" : this.passType2 = "password";
    this.seePass2 = !this.seePass2;
  }

  fieldsGet(option:any){
    
    if(option == "email"){
      this.registerForm.controls.email.valid ? this.validFieldMail = true : this.validFieldMail = false;
      console.log(option);
    }else if(option == "name"){
      this.registerForm.controls.name.valid ? this.validFieldName = true : this.validFieldName = false;
    }else if(option == "password"){
      this.registerForm.controls.password1.valid ? this.validFieldPassword = true : this.validFieldPassword = false;
    }else{
      this.registerForm.controls.password2.valid ? this.validFieldPassword2 = true : this.validFieldPassword2 = false;
    }
  }

  onChangeMail(){
    this.registerForm.getRawValue().email.length >=1 && this.registerForm.controls.email.valid ? this.validFieldMail = true : this.validFieldMail = false;
  }

  onChangeName(){
    this.registerForm.getRawValue().name.length >=1 && this.registerForm.controls.name.valid ? this.validFieldName = true : this.validFieldName = false;
  }

  onChangePass2(){
    this.registerForm.getRawValue().password2.length >=1 && this.registerForm.controls.password2.valid ? this.validFieldPassword2 = true : this.validFieldPassword2 = false;
  }

  onChangePass(){
    this.registerForm.getRawValue().password1.length >=1 && this.registerForm.controls.password1.valid ? this.validFieldPassword = true : this.validFieldPassword = false;
  }

  createUser(){ 

    if(this.registerForm.valid){
      if(this.registerForm.getRawValue().terms == true){
        if(this.registerForm.getRawValue().password1 == this.registerForm.getRawValue().password2){
          this.alertService.loadingStartApp();
          this.authService.register(this.registerForm.getRawValue()).then(res=>{
            this.nav.navigateForward("tabs/list-elements",{animated:false});
            this.alertService.dissMissLoaders();
            if(res != null ){
              this.registerForm.reset()
              this.validFieldMail =false
              this.validFieldName  = false
              this.validFieldPassword = false
              this.validFieldPassword2 = false
            }
          }).catch(err=>{
            console.log(err)
            this.alertService.alertInfoBasic("Datos Erroneos")
          })
        }else{
          this.alertService.alertInfoBasic("Las contraseñas no coinciden")
        }
      }else{
        this.alertService.alertInfoBasic("Debe Acceptar los terminos de la app");
      }
   
    }else{
      this.alertService.alertInfoBasic("Datos Erroneos")
    }

  
  }

}
