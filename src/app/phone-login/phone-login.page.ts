import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.page.html',
  styleUrls: ['./phone-login.page.scss'],
})
export class PhoneLoginPage implements OnInit {

  validFieldPhone:any;

  constructor(private nav:NavController,private formBuilder: FormBuilder,private authService:AuthServiceService) { }


  loginForm: FormGroup = this.formBuilder.group(
    {
      phone:['',[Validators.required,Validators.pattern(/\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/)]],
      code:['',[Validators.required,Validators.minLength(6)]]
    }
    )

  ngOnInit() {
  }

  onClickGoBack(){
    this.nav.navigateBack("intro");
  }

  fieldsGet(option:any){
    
    if(option == "phone"){
      this.loginForm.controls.phone.valid ? this.validFieldPhone = true : this.validFieldPhone = false;
    }else{
     // this.loginForm.controls.password.valid ? this.validFieldPassword = true : this.validFieldPassword = false;
    }
  }

  onChangePhone(){
    this.loginForm.getRawValue().phone.length >=1 && this.loginForm.controls.phone.valid ? this.validFieldPhone = true : this.validFieldPhone = false;
  }

}
