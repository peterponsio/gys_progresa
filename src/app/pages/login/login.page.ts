import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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

  constructor(private nav:NavController,private formBuilder: FormBuilder,private authService:AuthServiceService) { }

  loginForm: FormGroup = this.formBuilder.group(
    {
      mail:['',[Validators.required,Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    }
    )

  ngOnInit() {
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
      console.log(option);

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
      this.authService.login(this.loginForm.getRawValue()).then(res=>{
        console.log(res);
        this.nav.navigateForward("tabs/list-elements",{animated:false});
      })
    }else{
      this.validFieldMail=false;
      this.validFieldPassword=false;
    }
  }

  onClickGoRegister(){
    this.nav.navigateForward("register",{animated:false});
  }


}
