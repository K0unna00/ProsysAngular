import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  frm : FormGroup;

  initializeForm(loginModel : any = {}){
    this.frm = this.formBuilder.group({
      userName : [loginModel.userName || "", [Validators.required]],
      password : [loginModel.password || "", [Validators.required]]
    });

    console.log("salam");
    
  }

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  get userName(){
    return this.frm.get("userName");
  }

  get password(){
    return this.frm.get("password");
  }

  LoginSubmit(){

  }

}
