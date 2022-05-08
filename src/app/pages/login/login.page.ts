import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Component, OnInit, NgZone } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { VisualsService } from 'src/app/services/visuals.service';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validFieldMail:any;
  validFieldPassword:any;

  seePass:boolean = false;
  passType:string = "password";

  showBtn:boolean = true

  constructor(private nav:NavController,private formBuilder: FormBuilder,private authService:AuthServiceService,private alertService:VisualsService,private keyb:Keyboard,private zg: NgZone) { }

  loginForm: FormGroup = this.formBuilder.group(
    {
      mail:['',[Validators.required,Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    }
    )

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

  onClickGoBack(){
    this.nav.navigateBack("intro");
  }

  onClickRecoverPass(){
    this.nav.navigateForward("recover-pass",{animated:false});
  }
  
  onClickSeePass(){
    this.seePass == false ? this.passType = "text" : this.passType = "password";
    this.seePass = !this.seePass;
  }

  fieldsGet(option:any){
    
    if(option == "email"){
      this.loginForm.controls.mail.valid ? this.validFieldMail = true : this.validFieldMail = false;
    }else{
      this.loginForm.controls.password.valid ? this.validFieldPassword = true : this.validFieldPassword = false;
    }
  }

  onChangeMail(){
    this.loginForm.getRawValue().mail.length >=1 && this.loginForm.controls.mail.valid ? this.validFieldMail = true : this.validFieldMail = false;
  }

  onChangePass(){
    this.loginForm.getRawValue().password.length >=1 && this.loginForm.controls.password.valid ? this.validFieldPassword = true : this.validFieldPassword = false;
  }

  onClickLoginMail(){
    if(this.loginForm.valid){
      this.alertService.loadingStartApp();
      this.authService.login(this.loginForm.getRawValue()).then(res=>{
        console.log(res);
        this.alertService.dissMissLoaders();
      }).catch(err=>{
        console.log(err)
        this.alertService.alertInfoBasic("Datos Erroneos")
      })
    }else{
      this.alertService.alertInfoBasic("Datos Erroneos")
    }
  }

  onClickGoRegister(){
    this.nav.navigateForward("register",{animated:false});
  }


}
