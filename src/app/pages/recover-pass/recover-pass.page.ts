import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VisualsService } from 'src/app/services/visuals.service';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.page.html',
  styleUrls: ['./recover-pass.page.scss'],
})
export class RecoverPassPage implements OnInit {

  validFieldMail:any;

  recoverForm: FormGroup = this.formBuilder.group(
    {
      mail:['',[Validators.required,Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)]],
      //password:['',[Validators.required,Validators.minLength(6)]]
    })

  constructor(private formBuilder:FormBuilder,private authService:AuthServiceService,private alertService:VisualsService) { }

  ngOnInit() {
  }

  fieldsGet(option:any){
    if(option == "email"){
      this.recoverForm.controls.mail.valid ? this.validFieldMail = true : this.validFieldMail = false;
    }
  }

  onChangeMail(){
    this.recoverForm.getRawValue().mail.length >=1 && this.recoverForm.controls.mail.valid ? this.validFieldMail = true : this.validFieldMail = false;
  }

  onClickSendRecoverMail(){
    if(this.recoverForm.valid){
      this.authService.PasswordRecover(this.recoverForm.getRawValue().mail).catch(err=>{
        this.alertService.alertInfoBasic("El correo es incorrecto o no existe")
        console.log(err);
      });
    }
  }

}
